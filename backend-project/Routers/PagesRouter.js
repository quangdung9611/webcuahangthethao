const express = require("express");
const router = express.Router();
const PagesController = require("../Controllers/PagesControllers");

// Lấy tất cả pages
router.get("/", PagesController.getAllPages);

// ✅ Lấy trang giới thiệu (dạng động, không ghi cứng slug)
router.get("/gioi-thieu", PagesController.getAboutPage);

// Lấy page theo slug (ví dụ: /gioi-thieu)
router.get("/:slug", PagesController.getPageBySlug);

// Lấy page theo ID
router.get("/:id", PagesController.getPageById);

// Tạo mới page
router.post("/", PagesController.uploadImage, PagesController.createPage);

// Cập nhật page
router.put("/:id", PagesController.uploadImage, PagesController.updatePage);

// Xóa page
router.delete("/:id", PagesController.deletePage);

module.exports = router;
