const express = require("express");
const router = express.Router();
const productController = require("../Controllers/ProductControllers");

// ==========================
// PRODUCT ROUTES
// ==========================

// 1️⃣ Lấy tất cả sản phẩm
router.get("/", productController.getAllProduct);

// 2️⃣ Lấy danh mục + thương hiệu cho menu
router.get("/menu/categories-brands", productController.getAllCategoriesWithBrands);

// 3️⃣ Lấy sản phẩm mới nhất theo category slug (đặt trước category/:slug)
router.get("/category/:slug/newest", productController.getNewestProductsByCategorySlug);

// 4️⃣ Lấy sản phẩm theo category + brand (đặt trước category/:slug để tránh conflict)
router.get("/category/:categorySlug/:brandSlug", productController.getProductsByCategoryAndBrand);

// 5️⃣ Lấy sản phẩm theo category slug
router.get("/category/:slug", productController.getProductsByCategorySlug);

// 6️⃣ Lấy sản phẩm theo brand slug
router.get("/brand/:slug", productController.getProductsByBrands);

// 7️⃣ Lấy sản phẩm theo slug
router.get("/slug/:slug", productController.getProductBySlug);

// 8️⃣ Lấy sản phẩm theo ID (đặt cuối cùng để không bị nuốt)
router.get("/:id", productController.getProductById);

// 9️⃣ Tạo sản phẩm mới
router.post("/", productController.uploadSingleImage, productController.createProduct);

// 🔟 Cập nhật sản phẩm
router.put("/:id", productController.uploadSingleImage, productController.updateProduct);

// 1️⃣1️⃣ Xóa sản phẩm
router.delete("/:id", productController.deleteProduct);

module.exports = router;
