import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../CSS/giohang.css";
function GioHang() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartData);
  }, []);

  const handleQuantityChange = (index, value) => {
    const newCart = [...cart];
    if (newCart[index].voucherApplied) return;
    newCart[index].quantity = Number(value);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event('cartUpdated')); // ✅ Thông báo cho Header
  };

  const handleRemove = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event('cartUpdated')); 
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container">
      <h2>Giỏ Hàng</h2>
      {cart.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, idx) => (
                <tr key={idx}>
                  <td>
                    <img
                      src={`http://localhost:5000/images/${item.image}`}
                      alt={item.name}
                      width="200px"
                    />
                  </td>
                  <td>
                    {item.name}
                    {item.size && ` - Size: ${item.size}`}
                    {item.color && ` - Màu: ${item.color}`}
                  </td>
                  <td>{item.price.toLocaleString()} VNĐ</td>
                  <td>
                  <div className="quantity-control">
                      <button
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(idx, item.quantity - 1)}
                        disabled={item.quantity <= 1 || item.voucherApplied}
                      >
                        −
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(idx, item.quantity + 1)}
                        disabled={item.voucherApplied}
                      >
                        +
                      </button>
                    </div>


                  </td>
                  <td>{(item.price * item.quantity).toLocaleString()} VNĐ</td>
                  <td>
                    <button className="remove-btn" onClick={() => handleRemove(idx)}>
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Tổng tiền: {total.toLocaleString()} VNĐ</h3>

          <Link to="/checkout">
            <button
              className="checkout-btn"
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "#E95211",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "16px",
                borderRadius: "5px"
              }}
            >
              Đặt Hàng
            </button>
          </Link>
        </>
      )}
    </div>
  );
}

export default GioHang;