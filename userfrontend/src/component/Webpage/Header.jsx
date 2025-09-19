import React, { useEffect, useState } from 'react';
import '../CSS/header.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Lấy thông tin user khi load + lắng nghe sự kiện userChanged
  useEffect(() => {
    const updateUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    // Gọi khi component mount
    updateUser();

    // Lắng nghe khi có thay đổi user (login/logout)
    window.addEventListener("userChanged", updateUser);

    // Cleanup khi component bị hủy
    return () => {
      window.removeEventListener("userChanged", updateUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);

    // 🔹 Phát sự kiện cập nhật ngay lập tức
    window.dispatchEvent(new Event("userChanged"));

    navigate("/");
  };

  return (
    <header className="header">
      {/* Dải đen mỏng phía trên */}
      <div className="top-border"></div>

      {/* Phần chính */}
      <div className="header-main">
        <div className="container">
          <div className="header-content">

            {/* Logo */}
            <div className="logo">
              <a href="#">
                <img src="http://localhost:5000/images/logo.jpg" alt="Logo" />
              </a>
            </div>

            {/* Menu chính */}
            <nav className="nav">
              <a href="#">VỀ BITI'S</a>
              <div className="dropdown">
                <button>NHÃN HIỆU ▾</button>
                <div className="dropdown-menu">
                  <a href="#">Nhãn hiệu A</a>
                  <a href="#">Nhãn hiệu B</a>
                </div>
              </div>
              <div className="dropdown">
                <Link to="/categogy/vot-cau-long">Vợt Cầu Lông</Link>
                <div className="dropdown-menu">
                  <Link to="/VotYonex">Vợt Yonex</Link>
                  <Link to="/VotLining">Vợt Lining</Link>
                </div>
              </div>
              <div className="dropdown">
                <Link to="/categogy/vot-pickle-ball">Vợt PickleBall</Link>
                <div className="dropdown-menu">
                  <Link to="/VotHead">Vợt Head</Link>
                  <Link to="/VotJoola">Vợt Joola</Link>
                </div>
              </div>
              
               <div className="dropdown">
                <Link to="/categogy/vot-tennis">Vợt Tennis</Link>
                <div className="dropdown-menu">
                  <Link to="/VotHead">Vợt Head</Link>
                  <Link to="/VotJoola">Vợt Joola</Link>
                </div>
              </div>
               <div className="dropdown">
                <Link to="/categogy/giay-the-thao">Giày</Link>
                <div className="dropdown-menu">
                  <Link to="/VotHead">Vợt Head</Link>
                  <Link to="/VotJoola">Vợt Joola</Link>
                </div>
              </div>
              
              <div className="dropdown">
                <button>PHỤ KIỆN ▾</button>
                <div className="dropdown-menu">
                  <a href="#">Túi</a>
                  <a href="#">Vớ</a>
                </div>
              </div>
            </nav>

            {/* Search và icon bên phải */}
            <div className="right-section">
              <div className="search-box">
                <input type="text" placeholder="Bạn cần tìm gì..." />
                <button>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
              
              <div className="icons">
                {/* Dropdown User */}
                <div className="account-dropdown">
                  {/* Icon + Username */}
                  <div className="user-info">
                    <i className="fa-regular fa-user user-icon"></i>
                    {user && (
                      <span className="username">
                        Xin chào, <strong>{user.username}</strong>
                      </span>
                    )}
                  </div>

                  {/* Dropdown menu */}
                  <div className="dropdown-menu1">
                    {user ? (
                      <>
                        <Link to="/profile" className="dropdown-item">
                          Trang Cá Nhân
                        </Link>
                        <span onClick={handleLogout} className="dropdown-item logout">
                          Đăng Xuất
                        </span>
                      </>
                    ) : (
                      <>
                        <Link to="/register" className="dropdown-item">
                          Đăng Ký
                        </Link>
                        <Link to="/login" className="dropdown-item">
                          Đăng Nhập
                        </Link>
                      </>
                    )}
                  </div>
                </div>

                {/* Icon Yêu thích */}
              


                {/* Icon Giỏ hàng */}
                <Link to="/giohang" className="icon badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 6h15l-1.5 9h-12L6 6z" />
                    <path d="M6 6L4 3" />
                  </svg>
                  <span className="badge-count">0</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}
