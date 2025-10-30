import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ❌ Không cần useParams nữa
import "../CSS/news.css";

const News = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = () => {
      setLoading(true);
      fetch("http://localhost:5000/api/news") // ✅ Gọi API lấy tất cả bài viết
        .then((res) => {
          if (!res.ok) throw new Error("Lỗi khi fetch dữ liệu");
          return res.json();
        })
        .then((data) => {
          setNewsList(Array.isArray(data) ? data : []);
        })
        .catch((err) => {
          console.error(err);
          setError("Không thể tải dữ liệu");
        })
        .finally(() => setLoading(false));
    };

    fetchNews();
  }, []); // ❌ Không phụ thuộc vào slug nữa

  if (loading) return <p>Đang tải tin tức...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="news-container">
      {newsList.length === 0 ? (
        <p>Chưa có tin tức nào.</p>
      ) : (
        newsList.map((news) => (
          <Link
            key={news.news_id}
            to={`/news/${news.slug}`}
            className="news-card-link"
          >
            <div className="news-card">
              {news.image && (
                <img
                  src={`http://localhost:5000/images/news/${news.image}`}
                  alt={news.title}
                  className="news-image"
                />
              )}
              <div className="news-content">
                <h2 className="news-title">{news.title}</h2>
                <p className="news-meta">
                  Ngày xuất bản:{" "}
                  {news.published_at
                    ? new Date(news.published_at).toLocaleDateString("vi-VN")
                    : "Chưa có"}
                </p>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default News;
