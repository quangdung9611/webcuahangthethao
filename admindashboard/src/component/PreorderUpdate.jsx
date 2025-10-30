// 📄 src/pages/PreorderUpdate.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/productupdate.css";

const PreorderUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [preorder, setPreorder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 🧾 Lấy dữ liệu đơn đặt hàng trước
  useEffect(() => {
    const fetchPreorder = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/preorders/${id}`);
        setPreorder(res.data);
      } catch (err) {
        console.error("❌ Lỗi khi lấy preorder:", err);
        alert("Không thể tải dữ liệu đơn đặt hàng trước.");
      } finally {
        setLoading(false);
      }
    };
    fetchPreorder();
  }, [id]);

  // 📝 Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreorder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 💾 Cập nhật preorder
  const handleUpdate = async () => {
    if (!preorder) return;

    setSaving(true);
    try {
      const payload = {
        customer_name: preorder.customer_name,
        phone: preorder.phone,
        address: preorder.address,
        note: preorder.note,
        status: preorder.status,
      };

      await axios.put(`http://localhost:5000/api/preorders/${id}`, payload);

      alert("✅ Cập nhật đơn đặt hàng trước thành công!");
      navigate("/preorder");
    } catch (err) {
      console.error("❌ Lỗi khi cập nhật preorder:", err);
      alert("Không thể cập nhật đơn đặt hàng trước!");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Đang tải dữ liệu đơn đặt hàng...</p>;
  if (!preorder) return <p>Không tìm thấy đơn đặt hàng!</p>;

  return (
    <div className="update-form-container">
      <h2>Cập nhật Đơn Đặt Hàng #{preorder.preorder_id}</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        {/* 🧍 Thông tin khách hàng */}
        <div className="form-section">
          <label>Tên khách hàng:</label>
          <input
            type="text"
            name="customer_name"
            value={preorder.customer_name || ""}
            onChange={handleChange}
          />

          <label>Số điện thoại:</label>
          <input
            type="text"
            name="phone"
            value={preorder.phone || ""}
            onChange={handleChange}
          />

          <label>Địa chỉ:</label>
          <input
            type="text"
            name="address"
            value={preorder.address || ""}
            onChange={handleChange}
          />

          <label>Ghi chú:</label>
          <textarea
            name="note"
            value={preorder.note || ""}
            onChange={handleChange}
          />
        </div>

        {/* ⚙️ Trạng thái */}
        <div className="form-section">
          <label>Trạng thái đơn:</label>
         <select
                name="status"
                value={preorder.status || "pending"}
                onChange={handleChange}
                >
                {preorder.status === "pending" && (
                    <>
                    <option value="pending">Chờ xác nhận</option>
                    <option value="confirmed">Đã xác nhận</option>
                    <option value="canceled">Đã hủy</option>
                    </>
                )}
                {preorder.status === "confirmed" && (
                    <>
                    <option value="confirmed">Đã xác nhận</option>
                    <option value="canceled">Đã hủy</option>
                    </>
                )}
                {preorder.status === "canceled" && (
                    <option value="canceled">Đã hủy</option>
                )}
        </select>

        </div>

        {/* 💾 Nút lưu */}
        <div className="form-section">
          <button
            type="button"
            onClick={handleUpdate}
            disabled={saving}
            className="save-btn"
          >
            {saving ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PreorderUpdate;
