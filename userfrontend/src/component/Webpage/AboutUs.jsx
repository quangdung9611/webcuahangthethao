import React, { useEffect, useState } from "react";
import "../CSS/about.css";
const AboutUs = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/api/pages/gioi-thieu")
      .then((res) => {
        if (!res.ok) throw new Error("Lỗi khi fetch dữ liệu");
        return res.json();
      })
      .then((data) => {
        setAbout(data); // API trả về object
      })
      .catch((err) => {
        console.error(err);
        setError("Không thể tải dữ liệu");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Đang tải nội dung...</p>;
  if (error) return <p>{error}</p>;
  if (!about) return <p>Không tìm thấy trang giới thiệu.</p>;

  return (
    <div className="about-container">
      <div className="about-card">
        <h2 className="about-title">{about.title}</h2>
        {about.image && (
          <img
            src={`http://localhost:5000/images/pages/${about.image}`}
            alt="Ảnh giới thiệu"
            className="about-image"
          />
        )}
        <p className="about-content">{about.content}</p>
      </div>
    </div>
  );
};

export default AboutUs;
