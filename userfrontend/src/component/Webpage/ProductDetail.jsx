import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { colorMap } from "./ColorMap";
import DOMPurify from "dompurify";
import "../CSS/trangchitiet.css";


// ✅ Lấy user_id từ localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.user_id;
const extractOptions = (materials) => {
  if (!materials || materials.length === 0)
    return { availableColors: [], availableSizes: [] };

  const colors = new Set();
  const sizes = new Set();

  materials.forEach((m) => {
    if (m.color) colors.add(m.color);
    if (m.size) sizes.add(m.size);
  });

  return {
    availableColors: Array.from(colors),
    availableSizes: Array.from(sizes),
  };
};

function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [displayImage, setDisplayImage] = useState("");
  const [currentStock, setCurrentStock] = useState(0);

  const [flashSales, setFlashSales] = useState([]);
  const [timer, setTimer] = useState(0);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [notification, setNotification] = useState({ show: false, message: "", type: "success" });
  const [showPreOrderForm, setShowPreOrderForm] = useState(false);
  const [preOrderData, setPreOrderData] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });
  const [preOrderLoading, setPreOrderLoading] = useState(false);

  // ========================================
  // 1. Fetch dữ liệu sản phẩm + materials
  // ========================================
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/slug/${slug}`);
        if (!res.ok) throw new Error("Không thể lấy dữ liệu sản phẩm");
        const data = await res.json();

        if (data && data.product_id) {
          let materials = [];
          try {
            const resMat = await fetch(
              `http://localhost:5000/api/product-materials/${data.product_id}`
            );
            if (resMat.ok) {
              const matData = await resMat.json();
              materials = Array.isArray(matData) ? matData : matData.materials || [];
            }
          } catch (err) {
            console.error("Lỗi fetch materials:", err);
          }

          const { availableColors, availableSizes } = extractOptions(materials);
          let defaultVariant = materials.length > 0 ? materials[0] : null;

          setProduct({
            ...data,
            materials,
            availableColors,
            availableSizes,
          });

          if (defaultVariant) {
            setSelectedColor(defaultVariant.color || null);
            setSelectedSize(defaultVariant.size || null);
            setDisplayImage(defaultVariant.image || data.image);
            setCurrentStock(defaultVariant.stock || 0);
            setQuantity(1);
          } else {
            setDisplayImage(data.image);
            setCurrentStock(data.stock || 0);
            setQuantity(1);
          }
        } else {
          setProduct(null);
        }
      } catch (err) {
        console.error("Lỗi khi tải sản phẩm:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  // ========================================
  // 2. Cập nhật stock khi chọn color/size
  // ========================================
  useEffect(() => {
    if (!product) return;

    if (product.materials && product.materials.length > 0) {
      const found = product.materials.find(
        (m) =>
          (!selectedColor || m.color === selectedColor) &&
          (!selectedSize || m.size === selectedSize)
      );

      if (found) {
        setCurrentStock(found.stock);
        return;
      }
    }

    setCurrentStock(product.stock);
  }, [product, selectedColor, selectedSize]);

  // ========================================
  // 3. Flash sale
  // ========================================
  useEffect(() => {
    const fetchFlashSales = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/flash-sale/active");
        if (!res.ok) throw new Error("Không thể lấy flash sale");
        const data = await res.json();

        const sales = [];
        data.forEach((fs) => {
          fs.products.forEach((p) => {
            sales.push({
              product_id: p.product_id,
              sale_price: p.sale_price,
              end_at: new Date(fs.end_at),
            });
          });
        });

        setFlashSales(sales);
      } catch (err) {
        console.error("Lỗi fetch flash sale:", err);
      }
    };
    fetchFlashSales();
  }, []);

  // Countdown
  useEffect(() => {
    const interval = setInterval(() => {
      if (!product) return;
      const bestFlash = getBestFlashSale(product);
      if (bestFlash) {
        const diff = bestFlash.end_at - new Date();
        setTimer(diff > 0 ? diff : 0);
      } else {
        setTimer(0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [flashSales, product]);

  const getBestFlashSale = (product) => {
    if (!product) return null;
    const sales = flashSales.filter(
      (fs) => fs.product_id === product.product_id && fs.end_at > new Date()
    );
    if (sales.length === 0) return null;
    return sales.reduce((best, curr) =>
      curr.sale_price < best.sale_price ? curr : best
    );
  };

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h}h ${m}m ${s}s`;
  };
    // ===== Voucher logic =====
  const [activeVoucher, setActiveVoucher] = useState(null);

  useEffect(() => {
    const savedVoucher = localStorage.getItem("appliedVoucher");
    if (savedVoucher) {
      setActiveVoucher(JSON.parse(savedVoucher));
    }
  }, []);

  const applyVoucher = (price) => {
    if (!activeVoucher) return price;

    // nếu voucher có category_id áp dụng
    if (activeVoucher.category_id && activeVoucher.category_id !== product.category_id) return price;

    if (activeVoucher.discount_type === "percent") {
      return Math.round(price * (100 - activeVoucher.discount_value) / 100);
    } else {
      return price - activeVoucher.discount_value;
    }
  };
   // 🛒 Thêm vào giỏ
  // ========================================
  const handleAddToCart = () => {
  if (!product) return;

  // Kiểm tra màu sắc và kích cỡ
  if (product.availableColors?.length > 0 && !selectedColor) {
    alert("Vui lòng chọn màu sắc trước khi thêm vào giỏ hàng!");
    return;
  }
  if (product.availableSizes?.length > 0 && !selectedSize) {
    alert("Vui lòng chọn kích cỡ trước khi thêm vào giỏ hàng!");
    return;
  }

  // Lấy giỏ hàng hiện tại
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const variantKey = `${product.product_id}-${selectedColor || "NoColor"}-${selectedSize || "NoSize"}`;
  const existingIndex = cart.findIndex((item) => item.variantKey === variantKey);

  // Lấy số lượng hiện có trong giỏ với variant này
  const existingQuantity = existingIndex >= 0 ? cart[existingIndex].quantity : 0;

  // Tổng số lượng sau khi thêm
  const totalQuantity = existingQuantity + quantity;

  // Kiểm tra tồn kho trước khi thêm
  if (totalQuantity > currentStock) {
    alert(`Số lượng vượt quá tồn kho hiện có (${currentStock}). Vui lòng giảm số lượng.`);
    return;
  }

  // Lấy giá (đã có flash sale nếu có)
  const bestFlash = getBestFlashSale(product);
  const price = bestFlash ? bestFlash.sale_price : Number(product.price);

  const cartItem = {
    productId: product.product_id,
    name: product.name,
    price,
    quantity,
    image: displayImage,
    color: selectedColor,
    size: selectedSize,
    variantKey,
  };

  if (existingIndex >= 0) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push(cartItem);
  }

 localStorage.setItem("cart", JSON.stringify(cart));
window.dispatchEvent(new Event('cartUpdated')); // ✅ Cập nhật header
navigate("/giohang");

};


  // ========================================
  //  Đặt hàng trước
  // ========================================
  const handlePreOrder = () => {
    setShowPreOrderForm(true);
  };

  const handlePreOrderSubmit = async (e) => {
  e.preventDefault();
  setPreOrderLoading(true);

  const errors = {};
if (!preOrderData.name.trim()) errors.name = "Vui lòng nhập họ tên";
if (!preOrderData.phone.trim()) errors.phone = "Vui lòng nhập số điện thoại";
if (!preOrderData.address.trim()) errors.address = "Vui lòng nhập địa chỉ";

  if (Object.keys(errors).length > 0) {
    setFormErrors(errors);
    setPreOrderLoading(false);
    return;
  }

  setFormErrors({});
  try {
    const price = getBestFlashSale(product)
      ? getBestFlashSale(product).sale_price
      : Number(product.price);
    const total = price * quantity;
    const fullProductName = `${product.name}${
      selectedSize ? " - " + selectedSize : ""
    }${selectedColor ? " - " + selectedColor : ""}`;

    const res = await fetch("http://localhost:5000/api/preorders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id: product.product_id,
        product_name: fullProductName,
        price,
        quantity,
        total_amount: total,
        color: selectedColor || null,
        size: selectedSize || null,
        customer_name: preOrderData.name,
        phone: preOrderData.phone,
        address: preOrderData.address,
        note: preOrderData.note,
      }),
    });

    if (!res.ok) throw new Error("Đặt hàng trước thất bại!");
    const data = await res.json();

    setNotification({
      show: true,
      message: "Đặt hàng trước thành công! Mã đơn #" + data.preorder_id,
      type: "success",
    });

    setShowPreOrderForm(false);
    setPreOrderData({ name: "", phone: "", address: "", note: "" });
    setQuantity(1);
  } catch (err) {
    setNotification({
      show: true,
      message: "Lỗi: " + err.message,
      type: "error",
    });
  } finally {
    setPreOrderLoading(false);
  }
};


  // ========================================
  // ✍️ Đánh giá sản phẩm
  // ========================================
  const fetchReviews = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/product-review/product/${product.product_id}`);
      if (!res.ok) throw new Error("Không thể lấy review");
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error("Lỗi fetch review:", err);
    }
  };

  useEffect(() => {
    if (product) fetchReviews();
  }, [product]);

 const handleSubmitReview = async () => {
  const errors = {};

  // ⚠️ Kiểm tra lỗi
  if (reviewRating === 0) {
    errors.rating = "Vui lòng chọn số sao!";
  }
  if (!reviewComment.trim()) {
    errors.comment = "Vui lòng nhập bình luận!";
  }

  // Nếu có lỗi -> set lỗi và dừng lại
  if (Object.keys(errors).length > 0) {
    setFormErrors(errors);
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/product-review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        product_id: product.product_id,
        rating: reviewRating,
        comment: reviewComment,
      }),
    });

    if (!res.ok) throw new Error("Gửi đánh giá thất bại!");

    // ✅ Hiển thị thông báo thành công
    setNotification({
      show: true,
      message: "Cảm ơn bạn đã đánh giá sản phẩm!",
      type: "success",
    });

    // Reset form
    setFormErrors({});
    setModalIsOpen(false);
    setReviewRating(0);
    setReviewComment("");
    fetchReviews();
  } catch (err) {
    // ❌ Hiển thị lỗi server
    setNotification({
      show: true,
      message: "Lỗi: " + err.message,
      type: "error",
    });
  }
};


  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (!product) return <p>Không tìm thấy sản phẩm</p>;

  const bestFlash = getBestFlashSale(product);
  const isFlashActive = bestFlash !== null;
  const displayPrice = isFlashActive ? bestFlash.sale_price : Number(product.price);

  return (
    <div className="container">
      <h2>Chi Tiết Sản Phẩm: {product.name}</h2>
      <div className="product-align">
        <img
          src={`http://localhost:5000/images/${displayImage}`}
          alt={product.name}
          style={{ width: "700px" }}
        />
        <div className="product-info">
          {/* <h2>{product.name}</h2> */}
         <p className="product-price">
            {(isFlashActive || activeVoucher) ? (
              <>
                <span className="old-price">
                  {Number(product.price).toLocaleString("vi-VN")} VNĐ
                </span>
                <span className="sale-price">
                  {Number(applyVoucher(displayPrice)).toLocaleString("vi-VN")} VNĐ
                </span>
              </>
            ) : (
              <span>{Number(product.price).toLocaleString("vi-VN")} VNĐ</span>
            )}
      </p>

          {isFlashActive && <p className="countdown">Còn lại: {formatTime(timer)}</p>}

          {/* Màu sắc */}
          {product.availableColors?.length > 0 && (
            <div className="product-options">
              <label>Màu sắc:</label>
              <div className="option-chips">
                {product.availableColors.map((color) => (
                  <span
                    key={color}
                    className={`color-chip ${selectedColor === color ? "active" : ""}`}
                    style={{
                      backgroundColor: colorMap[color] || "#fff",
                      border: selectedColor === color ? "2px solid #000" : "1px solid #ccc",
                    }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Kích cỡ */}
          {product.availableSizes?.length > 0 && (
            <div className="product-options">
              <label>Kích cỡ:</label>
              <div className="option-chips">
                {product.availableSizes.map((size) => (
                  <button
                    key={size}
                    className={`size-chip ${selectedSize === size ? "active" : ""}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Số lượng */}
          <div className="quantity-group">
            <label>Số lượng:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            />
          </div>

          <p>Tồn kho: {currentStock}</p>

          {currentStock > 0 ? (
            <button onClick={handleAddToCart} className="add-to-cart-btn">
             Thêm vào giỏ
            </button>
          ) : (
            <button onClick={handlePreOrder} className="preorder-btn">
             Đặt hàng trước
            </button>
          )}
     
          {/* Nút đánh giá sản phẩm */}
          <button
            onClick={() => setModalIsOpen(true)}
            className="review-btn"
            style={{ marginLeft: "10px" }}
          >
           Đánh giá sản phẩm
          </button>
        </div>
      </div>
      <div
        className="product-description"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(product.description || "", {
            ALLOWED_TAGS: ["p", "ul", "ol", "li", "a", "br"], // ❌ bỏ b, i, strong, em, u
            ALLOWED_ATTR: ["href", "target"], // chỉ cho phép link cơ bản
          }),
        }}
      ></div>

 {/* 📝 Form Preorder Popup */}
{showPreOrderForm && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h3>
        Đặt hàng trước: {product.name}
        {selectedColor && ` - ${selectedColor}`}
        {selectedSize && ` - ${selectedSize}`}
      </h3>

      <form onSubmit={handlePreOrderSubmit}>
        {/* Họ tên */}
        <label>Họ tên *</label>
        <input
          type="text"
          value={preOrderData.name}
          onChange={(e) =>
            setPreOrderData({ ...preOrderData, name: e.target.value })
          }
          className={formErrors.name ? "input-error-field" : ""}
        />
        {formErrors.name && (
          <p className="form-error-text">{formErrors.name}</p>
        )}

        {/* Số điện thoại */}
        <label>Số điện thoại *</label>
        <input
          type="text"
          value={preOrderData.phone}
          onChange={(e) =>
            setPreOrderData({ ...preOrderData, phone: e.target.value })
          }
          className={formErrors.phone ? "input-error-field" : ""}
        />
        {formErrors.phone && (
          <p className="form-error-text">{formErrors.phone}</p>
        )}

        {/* Địa chỉ */}
        <label>Địa chỉ *</label>
        <textarea
          value={preOrderData.address}
          onChange={(e) =>
            setPreOrderData({ ...preOrderData, address: e.target.value })
          }
          className={formErrors.address ? "input-error-field" : ""}
        />
        {formErrors.address && (
          <p className="form-error-text">{formErrors.address}</p>
        )}

        {/* Ghi chú */}
        <label>Ghi chú</label>
        <textarea
          value={preOrderData.note}
          onChange={(e) =>
            setPreOrderData({ ...preOrderData, note: e.target.value })
          }
        />

        <div className="modal-actions">
          <button
            type="button"
            onClick={() => setShowPreOrderForm(false)}
          >
            Hủy
          </button>
          <button type="submit" disabled={preOrderLoading}>
            {preOrderLoading ? "Đang gửi..." : "Gửi đặt hàng"}
          </button>
        </div>
      </form>
    </div>
  </div>
)}

 {/* ✍️ Modal đánh giá sản phẩm */}
{modalIsOpen && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h3>Đánh giá sản phẩm: {product.name}</h3>

      <form onSubmit={(e) => { e.preventDefault(); handleSubmitReview(); }}>
        {/* ⭐ Chọn số sao */}
        <label>Chọn số sao *</label>
        <div className="rating-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${reviewRating >= star ? "active" : ""}`}
              onClick={() => setReviewRating(star)}
              style={{
                cursor: "pointer",
                fontSize: "24px",
                color: reviewRating >= star ? "#FFD700" : "#ccc",
              }}
            >
              ★
            </span>
          ))}
        </div>
        {formErrors.rating && (
          <p className="input-error-text">{formErrors.rating}</p>
        )}

        {/* 📝 Bình luận */}
        <label>Bình luận của bạn *</label>
        <textarea
          value={reviewComment}
          onChange={(e) => setReviewComment(e.target.value)}
          placeholder="Nhập đánh giá..."
          className={formErrors.comment ? "input-error-field" : ""}
        />
        {formErrors.comment && (
          <p className="input-error-text">{formErrors.comment}</p>
        )}

        {/* 🎯 Nút hành động */}
        <div className="modal-actions">
          <button type="button" onClick={() => setModalIsOpen(false)}>
            Hủy
          </button>
          <button type="submit">Gửi đánh giá</button>
        </div>
      </form>
    </div>
  </div>
)}

      {/* 📢 Danh sách đánh giá */}
      <div className="reviews-section">
        <h3>Đánh giá sản phẩm</h3>
        {reviews.length > 0 ? (
          reviews.map((r) => (
            <div key={r.review_id} className="review-item">
              <strong>{r.username}</strong> -{" "}
              <span>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
              <p>{r.comment}</p>
              <small>{new Date(r.created_at).toLocaleString()}</small>
            </div>
          ))
        ) : (
          <p>Chưa có đánh giá nào cho sản phẩm này.</p>
        )}
      </div>
      {notification.show && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{notification.type === "success" ? "✅ Thành công" : "❌ Lỗi"}</h3>
            <p>{notification.message}</p>
            <div className="modal-actions">
              <button onClick={() => setNotification({ ...notification, show: false })}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
