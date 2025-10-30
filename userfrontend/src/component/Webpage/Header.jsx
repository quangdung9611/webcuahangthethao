import React, { useEffect, useState, useRef, useCallback } from 'react';
import '../CSS/header.css';
import { Link, useNavigate } from 'react-router-dom';

// ✅ Hàm Debounce
const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

// ✅ Chuẩn hóa chuỗi (bỏ dấu, viết thường, bỏ khoảng trắng)
const normalizeText = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '');
};

export default function Header() {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [menuData, setMenuData] = useState([]); // ✅ thêm state này để tránh lỗi .map
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cartCount, setCartCount] = useState(0);
const [aboutPage, setAboutPage] = useState(null);

  const navigate = useNavigate();
  const searchRef = useRef(null);

  // ✅ Lấy user từ localStorage
  useEffect(() => {
    const updateUser = () => {
      const storedUser = localStorage.getItem('user');
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };
    updateUser();
    window.addEventListener('userChanged', updateUser);
    return () => window.removeEventListener('userChanged', updateUser);
  }, []);

  // ✅ Lấy danh sách sản phẩm để gợi ý tìm kiếm
  useEffect(() => {
    fetch('http://localhost:5000/api/products?fields=name,slug')
      .then((res) => res.json())
      .then((data) => setAllProducts(data))
      .catch((err) => console.error('Lỗi lấy sản phẩm:', err));
  }, []);
  // ✅ Lấy slug trang giới thiệu
  useEffect(() => {
  fetch("http://localhost:5000/api/pages/gioi-thieu")
    .then((res) => res.json())
    .then((data) => setAboutPage(data))
    .catch((err) => console.error("Lỗi tải trang giới thiệu:", err));
}, []);
  // ✅ Lấy danh mục + thương hiệu cho menu
  useEffect(() => {
    fetch('http://localhost:5000/api/products/menu/categories-brands')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMenuData(data);
        } else {
          console.warn(' API không trả về mảng:', data);
          setMenuData([]);
        }
      })
      .catch((err) => console.error('Lỗi tải menu:', err));
  }, []);

  // ✅ Ẩn gợi ý khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  useEffect(() => {
  updateCartCount();
  window.addEventListener('cartUpdated', updateCartCount);
  return () => window.removeEventListener('cartUpdated', updateCartCount);
}, []);
  // ✅ Hàm lọc gợi ý
  const handleSuggest = useCallback(
    (query) => {
      if (query.length < 1) {
        setSuggestions([]);
        return;
      }
      const normalizedQuery = normalizeText(query);
      const filtered = allProducts
        .filter((product) =>
          normalizeText(product.name).includes(normalizedQuery)
        )
        .slice(0, 6);
      setSuggestions(filtered);
    },
    [allProducts]
  );

  const debouncedSuggest = useRef(debounce(handleSuggest, 300)).current;

  // ✅ Khi gõ input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(true);
    debouncedSuggest(value);
  };
  const updateCartCount = () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  setCartCount(total);
};

  // ✅ Khi submit tìm kiếm
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    const query = searchTerm.trim();
    if (query) {
      navigate(`/?search=${encodeURIComponent(query)}`);
    } else {
      navigate('/');
    }
  };

  // ✅ Khi chọn gợi ý
  const handleSuggestionClick = (slug, name) => {
    setSearchTerm(name);
    setShowSuggestions(false);
    navigate(`/product/${slug}`);
  };

  // ✅ Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.dispatchEvent(new Event('userChanged'));
    navigate('/');
  };

  return (
    <header className="header">
      <div className="top-border"></div>

      <div className="header-main">
        <div className="container">
          <div className="header-content">

            {/* Logo */}
            <div className="logo">
              <Link to="/">
                <img src="http://localhost:5000/images/logo.jpg" alt="Logo" />
              </Link>
            </div>

            {/* MENU */}
            <nav className="nav">
             {aboutPage && (
                <div className="dropdown">
                  <Link to={`/pages/${aboutPage.slug}`}>{aboutPage.title}</Link>
                </div>
              )}


              {/* ✅ Menu động (Category + Brand) */}
            {menuData.length > 0 && menuData.map((category) => (
              <div className="dropdown" key={category.category_id}>
                <Link to={`/category/${category.slug}`}>
                  {category.name}
                </Link>
                {category.brands?.length > 0 && (
                  <div className="dropdown-menu">
                    {category.brands.map((brand) => (
                      <Link
                        key={brand.brand_id}
                        to={`/category/${category.slug}/${brand.slug}`} // ✅ dùng slug đúng
                      >
                        {brand.name} {/* ✅ dùng name đúng */}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

              <div className="dropdown">
                <Link to="/news/category/tin-tuc">Tin Tức</Link>
              </div>
            </nav>

            {/* BÊN PHẢI */}
            <div className="right-section">

              {/* Ô tìm kiếm */}
              <div className="search-box-wrapper" ref={searchRef}>
                <form className="search-box" onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    placeholder="Bạn cần tìm gì..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    onFocus={() => searchTerm.length > 0 && handleSuggest(searchTerm)}
                  />
                  <button type="submit">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 451 451" className="svg-ico-search">
                        <g>
                          <path d="M447.05,428l-109.6-109.6c29.4-33.8,47.2-77.9,47.2-126.1C384.65,86.2,298.35,0,192.35,0C86.25,0,0.05,86.3,0.05,192.3
                            s86.3,192.3,192.3,192.3c48.2,0,92.3-17.8,126.1-47.2L428.05,447c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4
                            C452.25,441.8,452.25,433.2,447.05,428z M26.95,192.3c0-91.2,74.2-165.3,165.3-165.3c91.2,0,165.3,74.2,165.3,165.3
                            s-74.1,165.4-165.3,165.4C101.15,357.7,26.95,283.5,26.95,192.3z" />
                        </g>
                      </svg>

                  </button>
                </form>

                {showSuggestions && suggestions.length > 0 && (
                  <div className="search-suggestions">
                    {suggestions.map((product) => (
                      <div
                        key={product.slug}
                        className="suggestion-item"
                        onClick={() => handleSuggestionClick(product.slug, product.name)}
                      >
                        {product.name}
                      </div>
                    ))}
                    <div
                      className="suggestion-item search-full"
                      onClick={handleSearchSubmit}
                    >
                      Tìm kiếm đầy đủ cho “{searchTerm}”
                    </div>
                  </div>
                )}
              </div>

              {/* Tài khoản */}
              <div className="account-dropdown">
                <div className="user-info">
                  <span id="user-login-register-icon">
                    <img src="http://localhost:5000/images/user-login-register-icon.png" alt="user-icon" />
                  </span>
                  {user && <span className="username"><strong>{user.username}</strong></span>}
                </div>
                <div className="dropdown-menu1">
                  {user ? (
                    <>
                      <Link to="/profile" className="dropdown-item">Trang Cá Nhân</Link>
                      <Link to="/My-order" className="dropdown-item">Đơn hàng của tôi</Link>
                      <span onClick={handleLogout} className="dropdown-item logout">Đăng Xuất</span>
                    </>
                  ) : (
                    <>
                      <Link to="/register" className="dropdown-item">Đăng Ký</Link>
                      <Link to="/login" className="dropdown-item">Đăng Nhập</Link>
                    </>
                  )}
                </div>
              </div>

              {/* Giỏ hàng */}
              <Link to="/giohang" className="icon badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6h15l-1.5 9h-12L6 6z" />
                  <path d="M6 6L4 3" />
                </svg>
               <span className="badge-count">{cartCount}</span>

              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
