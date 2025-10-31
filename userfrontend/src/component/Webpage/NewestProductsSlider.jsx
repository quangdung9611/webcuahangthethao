import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../CSS/NewestProductsSlider.css";

const NewestProductsSlider = ({ slug }) => {
  const [products, setProducts] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (!slug) return console.log("Slug received:", slug); // tránh gọi khi chưa có slug

    fetch(`http://localhost:5000/api/products/category/${slug}/newest`)
      .then(res => res.json())
      .then(data => {
        // ✅ Backend trả { products: [...], total: 5 }
        setProducts(data.products || []);
      })
      .catch(err => console.error("Lỗi khi lấy sản phẩm mới nhất:", err));
  }, [slug]);

  const settings = {
  infinite: products.length > 5,
  speed: 500,
  slidesToShow: Math.min(5, products.length),
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false, // bạn đang dùng custom buttons nên tắt arrows mặc định
  pauseOnHover: true,
  swipeToSlide: true,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: Math.min(3, products.length) } },
    { breakpoint: 768, settings: { slidesToShow: Math.min(2, products.length) } },
    { breakpoint: 480, settings: { slidesToShow: 1 } },
  ],
};


  if (products.length === 0) return null; // Không có sản phẩm thì không render slider

  return (
    <div className="newest-products-container">
      <button
        className="newest-products-nav left"
        onClick={() => sliderRef.current?.slickPrev()}
      >
        ←
      </button>
      <button
        className="newest-products-nav right"
        onClick={() => sliderRef.current?.slickNext()}
      >
        →
      </button>

      <div className="newest-products-slider">
        <Slider ref={sliderRef} {...settings}>
          {products.map(product => (
            <div key={product.product_id} className="newest-products-slide">
              <Link to={`/product/${product.slug}`} className="newest-products-link">
                <div className="newest-products-card">
                  <img
                    src={`http://localhost:5000/images/${product.image}`}
                    alt={product.name}
                    className="newest-products-image"
                  />
                  <h4>{product.name}</h4>
                  <p>{Number(product.price).toLocaleString("vi-VN")}₫</p>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default NewestProductsSlider;
