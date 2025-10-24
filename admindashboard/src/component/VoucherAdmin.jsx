import React, { useEffect, useState } from "react";
import "../CSS/user.css";

function Voucher() {
  const [vouchers, setVouchers] = useState([]);

  // ✅ Lấy danh sách voucher
  const fetchVouchers = () => {
    fetch("http://localhost:5000/api/vouchers")
      .then((res) => res.json())
      .then((data) => setVouchers(data))
      .catch((err) => console.error("Lỗi khi lấy dữ liệu:", err));
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  // ✅ Xóa voucher
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa voucher này?")) {
      fetch(`http://localhost:5000/api/vouchers/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            fetchVouchers(); // cập nhật danh sách
          } else {
            console.error("Lỗi khi xóa:", res.statusText);
          }
        })
        .catch((err) => {
          console.error("Lỗi khi xóa:", err);
          alert("Có lỗi khi kết nối đến máy chủ.");
        });
    }
  };

  return (
    <div className="user-list">
      <button
        className="edit-btn"
        onClick={() => (window.location.href = `/voucher/add/`)}
      >
        Thêm Voucher
      </button>
      <h2>Danh sách Voucher</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Code</th>
            <th>Loại</th>
            <th>Giá trị</th>
            <th>Đơn tối thiểu</th>
            <th>Ngày bắt đầu</th>
            <th>Ngày kết thúc</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {vouchers.length > 0 ? (
            vouchers.map((v) => (
              <tr key={v.voucher_id}>
                <td>{v.voucher_id}</td>
                <td>{v.code}</td>
                <td>{v.discount_type}</td>
                <td>{v.discount_value.toLocaleString()}</td>
                <td>{v.min_order_amount.toLocaleString()}</td>
                <td>{v.start_date ? v.start_date.slice(0, 10) : "-"}</td>
                <td>{v.end_date ? v.end_date.slice(0, 10) : "-"}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() =>
                      (window.location.href = `/voucher/update/${v.voucher_id}`)
                    }
                  >
                    Sửa
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(v.voucher_id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">Không có voucher nào.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Voucher;
