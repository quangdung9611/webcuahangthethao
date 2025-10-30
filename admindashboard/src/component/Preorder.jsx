import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/orderadmin.css";

const Preorder = () => {
  const [preorders, setPreorders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedPreorder, setExpandedPreorder] = useState(null);
  const navigate = useNavigate();

  // ✅ Lấy danh sách preorder
  useEffect(() => {
    const fetchPreorders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/preorders");
        const data = await res.json();
        setPreorders(data);
      } catch (err) {
        console.error("❌ Lỗi khi lấy preorder:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPreorders();
  }, []);

  const toggleExpand = (id) => {
    setExpandedPreorder(expandedPreorder === id ? null : id);
  };

  if (loading) return <p>Đang tải dữ liệu đặt hàng trước...</p>;

  return (
    <div className="order-page">
      <h2>Danh Sách Đơn Đặt Hàng Trước</h2>
      <table className="order-table">
        <thead>
          <tr>
            <th>Mã</th>
            <th>Tên Sản Phẩm</th>
            <th>Khách Hàng</th>
            <th>SĐT</th>
            <th>Địa Chỉ</th>
            <th>Trạng Thái</th>
            <th>Tổng Tiền</th>
            <th>Ngày Tạo</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {preorders.length > 0 ? (
            preorders.map((p) => (
              <React.Fragment key={p.preorder_id}>
                <tr>
                  <td>#{p.preorder_id}</td>
                  <td>{p.product_name}</td>
                  <td>{p.customer_name}</td>
                  <td>{p.phone}</td>
                  <td>{p.address || "-"}</td>
                  <td>
                    <span className={`status ${p.status || "pending"}`}>
                      {p.status || "pending"}
                    </span>
                  </td>
                  <td>{Number(p.total_amount).toLocaleString()} ₫</td>
                  <td>
                    {p.created_at
                      ? new Date(p.created_at).toLocaleString("vi-VN")
                      : "-"}
                  </td>
                  <td>
                    <button
                      className="btn-detail"
                      onClick={() => toggleExpand(p.preorder_id)}
                    >
                      {expandedPreorder === p.preorder_id ? "Ẩn" : "Xem"}
                    </button>
                    <button
                      className="edit-btn"
                      onClick={() =>
                        navigate(`/preorder/update/${p.preorder_id}`)
                      }
                    >
                      Sửa
                    </button>
                  </td>
                </tr>

                {expandedPreorder === p.preorder_id && (
                  <tr className="order-details">
                    <td colSpan="9">
                      <h4>Chi tiết đơn đặt hàng:</h4>
                      <ul>
                        <li>
                          <strong>Giá:</strong>{" "}
                          {Number(p.price).toLocaleString()} ₫
                        </li>
                        <li>
                          <strong>Số lượng:</strong> {p.quantity}
                        </li>
                        <li>
                          <strong>Ghi chú:</strong> {p.note || "Không có"}
                        </li>
                      </ul>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="9">Không có đơn đặt hàng trước nào.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Preorder;
