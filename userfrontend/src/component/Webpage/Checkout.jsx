import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import "../CSS/checkout.css";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [recipientName, setRecipientName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const [total, setTotal] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
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
    if (!voucherCode) return alert("Vui lòng nhập mã giảm giá");
    if (cart.length === 0) return alert("Giỏ hàng trống");

    try {
      const secretKey = "your-secret-key"; // 👉 nên dùng biến môi trường
      const encryptedCode = CryptoJS.AES.encrypt(voucherCode, secretKey).toString();

      const res = await fetch("http://localhost:5000/api/vouchers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload: encryptedCode }),
      });

      if (!res.ok) throw new Error("Mã giảm giá không hợp lệ hoặc đã hết hạn");
      const voucher = await res.json();

      if (total < voucher.min_order_amount) {
        return alert(
          `Đơn hàng phải từ ${voucher.min_order_amount.toLocaleString("vi-VN")} VNĐ để sử dụng voucher này!`
        );
      }

      let newAmount = total;
      if (voucher.discount_type === "percent") {
        newAmount = Math.round(total * (1 - voucher.discount_value / 100));
      } else if (voucher.discount_type === "fixed") {
        newAmount = Math.max(0, total - voucher.discount_value);
      }

      setFinalAmount(newAmount);
      alert(`Voucher áp dụng thành công! Tổng thanh toán: ${newAmount.toLocaleString("vi-VN")} VNĐ`);
    } catch (err) {
      alert(err.message || "Lỗi khi áp dụng mã giảm giá!");
    }
  };

  const handleCheckout = async () => {
    if (!recipientName || !phone || !addressLine) {
      return alert("Vui lòng nhập đầy đủ thông tin người nhận!");
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.user_id) {
      alert("Vui lòng đăng nhập trước khi thanh toán!");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      alert("Giỏ hàng trống!");
      return;
    }

    try {
      const updatedCart = [];

      for (let item of cart) {
        const productId = item.productId || item.product_id;
        let materialId = item.material_id;

        if (!productId) {
          return alert(`Sản phẩm "${item.name}" bị lỗi ID!`);
        }

        if (!materialId) {
          const res = await fetch(`http://localhost:5000/api/product-materials/${productId}`);
          if (!res.ok) {
            return alert(`Không lấy được biến thể cho sản phẩm "${item.name}"`);
          }

          const materials = await res.json();
          const matched = materials.find(
            (m) => m.color === item.color && m.size === item.size
          );

          if (!matched) {
            return alert(`Sản phẩm "${item.name}" chưa có biến thể phù hợp!`);
          }

          materialId = matched.material_id;
        }

        const stockRes = await fetch(`http://localhost:5000/api/product-materials/${materialId}/stock`);
        if (!stockRes.ok) {
          return alert(`Không kiểm tra được tồn kho cho sản phẩm "${item.name}"`);
        }

        const materialData = await stockRes.json();
        const currentStock = materialData.stock;

        if (currentStock === undefined) {
          return alert(`Sản phẩm "${item.name}" chưa có thông tin tồn kho!`);
        }

        if (currentStock < item.quantity) {
          return alert(
            `Sản phẩm "${item.name}" chỉ còn ${currentStock} sản phẩm, bạn đã chọn ${item.quantity}!`
          );
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
        alert("Thanh toán thành công!");
        localStorage.removeItem("cart");
        navigate(`/order-success/${data.order_id}`);
      } else {
        alert(data.error || "Lỗi khi thanh toán!");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối đến máy chủ.");
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
    </div>
  );
}
