import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../CSS/TaggedProductsSlider.css";

const TaggedProductsSlider = ({ slug, fetchType = "newest" }) => {
  const [products, setProducts] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (!slug) return;

    fetch(`http://localhost:5000/api/products/category/${slug}/${fetchType}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
      })
      .catch(err => console.error("Lỗi khi lấy sản phẩm:", err));
  }, [slug, fetchType]);

  const settings = {
    infinite: products.length > 5,
    speed: 500,
    slidesToShow: Math.min(5, products.length),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: true,
    swipeToSlide: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: Math.min(3, products.length) } },
      { breakpoint: 768, settings: { slidesToShow: Math.min(2, products.length) } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  if (products.length === 0) return null;

  return (
    <div className="tagged-products-container">
      <button
        className="tagged-products-nav left"
        onClick={() => sliderRef.current?.slickPrev()}
      >
        ←
      </button>
      <button
        className="tagged-products-nav right"
        onClick={() => sliderRef.current?.slickNext()}
      >
        →
      </button>

      <div className="tagged-products-slider">
        <Slider ref={sliderRef} {...settings}>
          {products.map(product => {
            const tagName = Array.isArray(product.tags)
              ? product.tags[0]
              : product.tags?.split(",")[0];

            const tagClass =
              tagName === "Mới"
                ? "success"
                : tagName === "Bán Chạy"
                ? "danger"
                : "";

            return (
              <div key={product.product_id} className="tagged-products-slide">
                <Link to={`/product/${product.slug}`} className="tagged-products-link">
                  <div className="tagged-products-card">
                    <div className="tagged-products-tag-space">
                      {tagName && (
                        <div className={`product-tag ${tagClass}`}>
                          {tagName === "Mới"
                            ? "New!"
                            : tagName === "Bán Chạy"
                            ? "BestSeller 🔥"
                            : tagName}
                        </div>
                      )}
                    </div>
                    <div className="tagged-products-image-wrapper">
                      <img
                        src={`http://localhost:5000/images/${product.image}`}
                        alt={product.name}
                        className="tagged-products-image"
                      />
                    </div>
                    <h4>{product.name}</h4>
                    <p>{Number(product.price).toLocaleString("vi-VN")}₫</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default TaggedProductsSlider;