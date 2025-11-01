const express = require("express");
const router = express.Router();
const productController = require("../Controllers/ProductControllers");

// ==========================
// PRODUCT ROUTES
// ==========================

// 1. Lấy tất cả sản phẩm
router.get("/", productController.getAllProduct);

// 2️. Lấy danh mục + thương hiệu cho menu
router.get("/menu/categories-brands", productController.getAllCategoriesWithBrands);

// 3️. Lấy sản phẩm mới nhất (tag id = 1) theo category slug (đặt trước category/:slug)
router.get("/category/:slug/newest", productController.getNewestProductsByCategorySlug);

// 4. Lấy sản phẩm bán chạy (tag id = 2) theo category slug (đặt trước category/:slug)
router.get("/category/:slug/bestseller", productController.getBestSellerProductsByCategorySlug);

// 5. Lấy sản phẩm theo category + brand (đặt trước category/:slug để tránh conflict)
router.get("/category/:categorySlug/:brandSlug", productController.getProductsByCategoryAndBrand);

// 6. Lấy sản phẩm theo category slug
router.get("/category/:slug", productController.getProductsByCategorySlug);

// 7. Lấy sản phẩm theo brand slug
router.get("/brand/:slug", productController.getProductsByBrands);

// 8. Lấy sản phẩm theo slug
router.get("/slug/:slug", productController.getProductBySlug);

// 9. Lấy sản phẩm theo ID (đặt cuối cùng để không bị nuốt)
router.get("/:id", productController.getProductById);

// 10. Tạo sản phẩm mới
router.post("/", productController.uploadSingleImage, productController.createProduct);

// 11. Cập nhật sản phẩm
router.put("/:id", productController.uploadSingleImage, productController.updateProduct);

// 12. Xóa sản phẩm
router.delete("/:id", productController.deleteProduct);

module.exports = router;
