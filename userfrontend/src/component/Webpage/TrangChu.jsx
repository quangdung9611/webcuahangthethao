import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import '../CSS/trangchu.css';
import BannerCarousel from "./BannerCarousel";
import ProductFilter from './ProductFilter';
import TaggedProductsSlider from "./TaggedProductsSlider";
import CategorySelectorSlider from "./CategorySelectorSlider";
import VoucherInput from "./VoucherInput";

const PRODUCTS_PER_PAGE = 8;

const TrangChu = () => {
  const [categories, setCategories] = useState([]);
  const [selectedSlugNewest, setSelectedSlugNewest] = useState(null);
  const [selectedSlugBestSeller, setSelectedSlugBestSeller] = useState(null);
  const [products, setProducts] = useState([]);
  const [flashSales, setFlashSales] = useState([]);
  const [timer, setTimer] = useState({});
  const [sortOption, setSortOption] = useState("default");
  const [activeVoucher, setActiveVoucher] = useState(null);
  const [latestNews, setLatestNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const location = useLocation();
  const searchQuery = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('search') || '';
  }, [location.search]);

useEffect(() => {
  window.scrollTo({ top: 0, behavior: "auto" }); // Giật lên đầu ngay lập tức
}, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/news/latest")
      .then(res => res.json())
      .then(data => setLatestNews(data))
      .catch(err => console.error("Lỗi khi lấy tin tức mới:", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/category")
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        if (data.length > 0) {
          setSelectedSlugNewest(data[0].slug);
          setSelectedSlugBestSeller(data[0].slug);
        }
      })
      .catch(err => console.error("Lỗi khi lấy danh mục:", err));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products?page=${currentPage}&limit=${PRODUCTS_PER_PAGE}`)
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data.products)) {
          setProducts(data.products);
          setTotalPages(data.totalPages || 1);
        } else {
          setProducts([]);
          setTotalPages(1);
        }
      })
      .catch(err => console.error("Lỗi khi lấy sản phẩm:", err));
  }, [currentPage]);

  useEffect(() => {
    fetch("http://localhost:5000/api/flash-sale/active")
      .then(res => res.json())
      .then(data => setFlashSales(data))
      .catch(err => console.error("Error fetching flash sales:", err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimer = {};
      flashSales.forEach(flash => {
        flash.products.forEach(p => {
          const diff = new Date(flash.end_at) - new Date();
          newTimer[p.product_id] = diff > 0 ? diff : 0;
        });
      });
      setTimer(newTimer);
    }, 1000);
    return () => clearInterval(interval);
  }, [flashSales]);

  const getSalePrice = (productId, originalPrice) => {
    const applicableSales = flashSales.filter(flash =>
      flash.products.some(p => p.product_id === productId)
    );
    if (applicableSales.length === 0) {
      return { price: originalPrice, isFlash: false, end_at: null };
    }
    const bestSale = applicableSales.reduce((prev, curr) =>
      prev.discount_value > curr.discount_value ? prev : curr
    );
    let salePrice;
    if (bestSale.discount_type === "percent") {
      salePrice = Math.round(originalPrice * (100 - bestSale.discount_value) / 100);
    } else {
      salePrice = originalPrice - bestSale.discount_value;
    }
    return { price: salePrice, isFlash: true, end_at: bestSale.end_at };
  };

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    const pad = (num) => (num < 10 ? '0' : '') + num;
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  };

  const applyVoucher = (price, product) => {
    if (!activeVoucher) return price;
    if (activeVoucher.category_id && activeVoucher.category_id !== product.category_id) return price;
    let finalPrice = price;
    if (activeVoucher.discount_type === "percent") {
      finalPrice = Math.round(price * (100 - activeVoucher.discount_value) / 100);
    } else {
      finalPrice = price - activeVoucher.discount_value;
    }
    return Math.max(0, finalPrice);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages || pageNumber === '...') return;
    setCurrentPage(pageNumber);
  };

  const getPaginationRange = () => {
    const delta = 2;
    const range = [1];
    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
      if (i > 1 && i < totalPages) range.push(i);
    }
    if (totalPages > 1) range.push(totalPages);
    const unique = [...new Set(range)].sort((a, b) => a - b);
    const final = [];
    let last = 0;
    for (let i of unique) {
      if (i > last + 1) final.push('...');
      final.push(i);
      last = i;
    }
    return final;
  };

  return (
    <div className="content">
      <BannerCarousel />

      <div className="customer-benefits-wrapper">
        {/* ... lợi ích khách hàng giữ nguyên ... */}
      </div>

      {!searchQuery && selectedSlugNewest && selectedSlugBestSeller && (
        <>
          <div className="title-head">SẢN PHẨM MỚI</div>
          <CategorySelectorSlider
            selectedSlug={selectedSlugNewest}
            onSelect={setSelectedSlugNewest}
            categories={categories}
          />
          <TaggedProductsSlider slug={selectedSlugNewest} fetchType="newest" />

          <div className="title-head">BÁN CHẠY</div>
          <CategorySelectorSlider
            selectedSlug={selectedSlugBestSeller}
            onSelect={setSelectedSlugBestSeller}
            categories={categories}
          />
          <TaggedProductsSlider slug={selectedSlugBestSeller} fetchType="bestseller" />
        </>
      )}

      <div className="title-head">
        {searchQuery
          ? `KẾT QUẢ TÌM KIẾM CHO: "${searchQuery}"`
          : "SẢN PHẨM NỔI BẬT"}
      </div>

      <ProductFilter
        onSortChange={setSortOption}
        sortOption={sortOption}
      />

      <div className="product-container">
        <div className="card-container">
          {products.length > 0 ? (
            products.map(product => {
              const { price: salePrice, isFlash, end_at } = getSalePrice(product.product_id, product.price);
              const finalPrice = applyVoucher(salePrice, product);
              return (
                <Link
                  key={product.product_id}
                  to={`/product/${product.slug}`}
                  className="product-link"
                >
                  <div className="product-card">
                    <img
                      src={`http://localhost:5000/images/${product.image}`}
                      alt={product.name}
                      loading="lazy"
                    />
                    {isFlash && <div className="flash-badge">FLASH SALE</div>}
                    <div className="product-info">
                      <p className="product-name">{product.name}</p>
                      <p className="product-price">
                        {(finalPrice < product.price) ? (
                          <>
                            <span className="old-price">
                              {Number(product.price).toLocaleString('vi-VN')} VNĐ
                            </span>
                            <span className="sale-price">
                              {Number(finalPrice).toLocaleString('vi-VN')} VNĐ
                            </span>
                          </>
                        ) : (
                          <span>{Number(finalPrice).toLocaleString('vi-VN')} VNĐ</span>
                        )}
                      </p>
                                            {isFlash && end_at && timer[product.product_id] > 0 && (
                        <p className="countdown">
                          {formatTime(timer[product.product_id])}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div style={{ padding: '20px', width: '100%', textAlign: 'center' }}>
              Không tìm thấy sản phẩm nào phù hợp.
            </div>
          )}
        </div>

        {/* ✅ Hiển thị phân trang */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              &laquo;
            </button>
            {getPaginationRange().map((page, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(page)}
                disabled={page === '...'}
                className={`pagination-button ${currentPage === page ? 'active' : ''}`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              &raquo;
            </button>
          </div>
        )}
      </div>

      {/* ✅ Tin tức mới */}
      <section id="latest-news">
        <div className="title-head">TIN TỨC MỚI</div>
        <div className="news-grid">
          {latestNews.map(news => (
            <div className="news-box" key={news.news_id}>
              <div className="thumbnail-frame">
                <img
                  src={`http://localhost:5000/images/news/${news.image}`}
                  alt={news.title}
                  className="thumbnail-img"
                />
              </div>
              <div className="news-content">
                <h3 className="news-title">{news.title}</h3>
                <div className="news-published">
                  <span className="line"></span>
                  <span className="time-label">
                    {new Date(news.published_at).toLocaleDateString("vi-VN")}
                  </span>
                  <span className="line"></span>
                </div>
                <p className="news-snippet">
                  {news.content.length > 150
                    ? news.content.slice(0, 150) + "..."
                    : news.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TrangChu;
