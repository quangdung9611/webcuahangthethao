import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/user.css";

const PagesAdmin = () => {
  const [pagesList, setPagesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchPages = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/pages")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setPagesList(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error("Lỗi khi lấy pages:", err);
        setError("Không thể tải dữ liệu");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa trang này?")) return;

    fetch(`http://localhost:5000/api/pages/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Xóa thất bại");
        fetchPages();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (loading) return <p>Đang tải dữ liệu Pages...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="user-list">
      <button className="edit-btn" onClick={() => navigate("/pages/add")}>
        Thêm Page
      </button>

      <h2>Danh sách Pages</h2>

      <table className="table-list">
        <thead>
          <tr>
            <th>ID</th>
            <th>Slug</th>
            <th>Tiêu đề</th>
            <th>Ngày tạo</th>
            <th>Hình ảnh</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {pagesList.length > 0 ? (
            pagesList.map((page) => (
              <tr key={page.page_id}>
                <td>{page.page_id}</td>
                <td>{page.slug}</td>
                <td>{page.title}</td>
                <td>
                  {page.created_at
                    ? new Date(page.created_at).toLocaleDateString()
                    : "—"}
                </td>
                <td>
                  {page.image ? (
                    <img
                      src={`http://localhost:5000/images/pages/${page.image}`}
                      alt="Ảnh"
                      style={{ width: "200px", height: "auto", objectFit: "cover" }}
                    />
                  ) : (
                    "—"
                  )}
                </td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/pages/update/${page.page_id}`)}
                  >
                    Sửa
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(page.page_id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Chưa có page nào.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PagesAdmin;
