import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import "../CSS/product.css";

function VoucherAdd() {
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    discount_type: "percent",
    discount_value: "",
    min_order_amount: 0,
    usage_limit: 1,
    start_date: "",
    end_date: "",
    status: "active",
  });

  const navigate = useNavigate();
  const secretKey = "your-secret-key"; // 🔐 Nên lưu ở biến môi trường

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.code || !formData.discount_value) {
      alert("Vui lòng nhập mã voucher và giá trị giảm giá!");
      return;
    }

    // 🔒 Mã hóa toàn bộ dữ liệu JSON
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify({
        code: formData.code,
        description: formData.description,
        discount_type: formData.discount_type,
        discount_value: Number(formData.discount_value),
        min_order_amount: Number(formData.min_order_amount),
        usage_limit: Number(formData.usage_limit),
        start_date: formData.start_date || null,
        end_date: formData.end_date || null,
        status: formData.status,
      }),
      secretKey
    ).toString();

    try {
      const res = await fetch("http://localhost:5000/api/vouchers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload: encryptedData }),
      });

      const data = await res.json();
      if (res.ok) {
        navigate("/voucher");
      } else {
        alert(data.error || "Lỗi khi thêm voucher!");
      }
    } catch (err) {
      console.error("Lỗi khi thêm voucher:", err);
      alert("Lỗi kết nối đến máy chủ!");
    }
  };

  return (
    <div className="form-container">
      <h2>Thêm Voucher</h2>
      <form onSubmit={handleSubmit}>
        <label>Mã Voucher</label>
        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleChange}
          placeholder="Nhập mã voucher"
          required
        />

        <label>Mô tả</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Nhập mô tả"
        />

        <label>Loại giảm giá</label>
        <select
          name="discount_type"
          value={formData.discount_type}
          onChange={handleChange}
        >
          <option value="percent">Phần trăm (%)</option>
          <option value="fixed">Tiền cố định</option>
        </select>

        <label>Giá trị giảm</label>
        <input
          type="number"
          name="discount_value"
          value={formData.discount_value}
          onChange={handleChange}
          required
        />

        <label>Giá trị đơn tối thiểu</label>
        <input
          type="number"
          name="min_order_amount"
          value={formData.min_order_amount}
          onChange={handleChange}
        />

        <label>Giới hạn lượt dùng</label>
        <input
          type="number"
          name="usage_limit"
          value={formData.usage_limit}
          onChange={handleChange}
        />

        <label>Ngày bắt đầu</label>
        <input
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
        />

        <label>Ngày kết thúc</label>
        <input
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
        />

        <label>Trạng thái</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="active">Active</option>
          <option value="scheduled">Scheduled</option>
          <option value="expired">Expired</option>
        </select>

        <button type="submit">Thêm Voucher</button>
      </form>
    </div>
  );
}

export default VoucherAdd;
