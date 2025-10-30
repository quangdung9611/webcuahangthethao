import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/checkout.css";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [recipientName, setRecipientName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const [total, setTotal] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    const t = storedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(t);
    setFinalAmount(t);

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setRecipientName(user.username || "");
      setPhone(user.phone || "");
      setAddressLine(user.address || "");
    }
  }, []);

  const handleApplyVoucher = async () => {
    if (!voucherCode.trim()) {
      setNotification({ show: true, message: "Vui lòng nhập mã giảm giá!", type: "error" });
      return;
    }

    if (cart.length === 0) {
      setNotification({ show: true, message: "Giỏ hàng trống!", type: "error" });
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/vouchers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: voucherCode }),
      });

      if (!res.ok) throw new Error("Mã giảm giá không hợp lệ hoặc đã hết hạn!");
      const voucher = await res.json();

      if (total < voucher.min_order_amount) {
        setNotification({
          show: true,
          message: `Đơn hàng phải từ ${voucher.min_order_amount.toLocaleString("vi-VN")} VNĐ để sử dụng voucher này!`,
          type: "error",
        });
        return;
      }

      let newAmount = total;
      if (voucher.discount_type === "percent") {
        newAmount = Math.round(total * (1 - voucher.discount_value / 100));
      } else if (voucher.discount_type === "fixed") {
        newAmount = Math.max(0, total - voucher.discount_value);
      }

      setFinalAmount(newAmount);
      setNotification({
        show: true,
        message: `🎉 Mã giảm giá áp dụng thành công! Tổng thanh toán: ${newAmount.toLocaleString("vi-VN")} VNĐ`,
        type: "success",
      });
    } catch (err) {
      setNotification({
        show: true,
        message: err.message || "Lỗi khi áp dụng mã giảm giá!",
        type: "error",
      });
    }
  };

  const handleCheckout = async () => {
    if (!recipientName || !phone || !addressLine) {
      setNotification({ show: true, message: "Vui lòng nhập đầy đủ thông tin người nhận!", type: "error" });
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.user_id) {
      setNotification({ show: true, message: "Vui lòng đăng nhập trước khi thanh toán!", type: "error" });
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      setNotification({ show: true, message: "Giỏ hàng trống!", type: "error" });
      return;
    }

    try {
      const updatedCart = [];

      for (let item of cart) {
        const productId = item.productId || item.product_id;
        let materialId = item.material_id;

        if (!productId) {
          setNotification({ show: true, message: `Sản phẩm "${item.name}" bị lỗi ID!`, type: "error" });
          return;
        }

        if (!materialId) {
          const res = await fetch(`http://localhost:5000/api/product-materials/${productId}`);
          if (!res.ok) {
            setNotification({ show: true, message: `Không lấy được biến thể cho sản phẩm "${item.name}"`, type: "error" });
            return;
          }

          const materials = await res.json();
          const matched = materials.find((m) => m.color === item.color && m.size === item.size);
          if (!matched) {
            setNotification({ show: true, message: `Sản phẩm "${item.name}" chưa có biến thể phù hợp!`, type: "error" });
            return;
          }

          materialId = matched.material_id;
        }

        const stockRes = await fetch(`http://localhost:5000/api/product-materials/${materialId}/stock`);
        if (!stockRes.ok) {
          setNotification({ show: true, message: `Không kiểm tra được tồn kho cho sản phẩm "${item.name}"`, type: "error" });
          return;
        }

        const materialData = await stockRes.json();
        const currentStock = materialData.stock;

        if (currentStock === undefined) {
          setNotification({ show: true, message: `Sản phẩm "${item.name}" chưa có thông tin tồn kho!`, type: "error" });
          return;
        }

        if (currentStock < item.quantity) {
          setNotification({
            show: true,
            message: `Sản phẩm "${item.name}" chỉ còn ${currentStock} sản phẩm, bạn đã chọn ${item.quantity}!`,
            type: "error",
          });
          return;
        }

        updatedCart.push({
          product_id: productId,
          material_id: materialId,
          name: item.name,
          price: Number(item.price),
          quantity: item.quantity,
          color: item.color || null,
          size: item.size || null,
          discount_amount: item.discount_amount || 0,
        });
      }

      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.user_id,
          recipient_name: recipientName,
          phone,
          address_line: addressLine,
          items: updatedCart,
          total_amount: total,
          final_amount: finalAmount,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setNotification({
          show: true,
          message: "🎉 Thanh toán thành công! Cảm ơn bạn đã mua hàng ❤️",
          type: "success",
        });
        localStorage.removeItem("cart");
        setTimeout(() => navigate(`/order-success/${data.order_id}`), 1500);
      } else {
        setNotification({ show: true, message: data.error || "Lỗi khi thanh toán!", type: "error" });
      }
    } catch (err) {
      console.error(err);
      setNotification({ show: true, message: "Lỗi kết nối đến máy chủ.", type: "error" });
    }
  };

  return (
    <div className="checkout-container">
      <h2>Thanh Toán</h2>

      <div className="checkout-cart">
        <h3>Giỏ hàng</h3>
        {cart.length === 0 ? (
          <p>Giỏ hàng trống</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Màu</th>
                <th>Size</th>
                <th>Số lượng</th>
                <th>Giá</th>
                <th>Tạm tính</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <td>{item.color || "-"}</td>
                  <td>{item.size || "-"}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price.toLocaleString("vi-VN")} VNĐ</td>
                  <td>{(item.price * item.quantity).toLocaleString("vi-VN")} VNĐ</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <p className="checkout-total">Tổng: {total.toLocaleString("vi-VN")} VNĐ</p>
        <p className="checkout-final">Tổng thanh toán: {finalAmount.toLocaleString("vi-VN")} VNĐ</p>

        <h3>Thông tin người nhận</h3>
        <label>Họ tên:</label>
        <input type="text" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} />

        <label>Số điện thoại:</label>
        <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} />

        <label>Địa chỉ:</label>
        <input type="text" value={addressLine} onChange={(e) => setAddressLine(e.target.value)} />

        <label>Mã giảm giá:</label>
        <input
          type="text"
          value={voucherCode}
          placeholder="Nhập mã giảm giá"
          onChange={(e) => setVoucherCode(e.target.value)}
        />
        <button onClick={handleApplyVoucher} className="apply-voucher-btn">
          Áp dụng
        </button>
      </div>

      <button className="checkout-btn" onClick={handleCheckout}>
        Thanh Toán
      </button>

      {notification.show && (
        <div className="notification-overlay">
          <div className={`notification-modal ${notification.type}`}>
            <p>{notification.message}</p>
            <button onClick={() => setNotification({ show: false, message: "", type: "" })}>
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
