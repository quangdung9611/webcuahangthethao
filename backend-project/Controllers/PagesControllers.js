const db = require("../db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ==================== TẠO FOLDER LƯU ẢNH ====================
const uploadFolder = path.join(__dirname, "../public/images/pages");
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder, { recursive: true });

// ==================== MULTER CONFIG ====================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadFolder),
  filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });

// Middleware upload ảnh
const uploadImage = upload.single("image");

// ==================== CONTROLLERS ====================

// Lấy tất cả pages (published)
const getAllPages = (req, res) => {
  const sql = "SELECT * FROM pages WHERE status = 'published' ORDER BY created_at DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy danh sách pages:", err);
      return res.status(500).json({ message: "Lỗi server" });
    }
    res.json(results);
  });
};

// Lấy page theo ID
const getPageById = (req, res) => {
  const sql = "SELECT * FROM pages WHERE page_id = ?";
  db.query(sql, [req.params.id], (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy chi tiết page:", err);
      return res.status(500).json({ message: "Lỗi server" });
    }
    if (!results.length) {
      return res.status(404).json({ message: "Không tìm thấy trang" });
    }
    res.json(results[0]);
  });
};

const getPageBySlug = (req, res, next) => {
  const { slug } = req.params;

  // Nếu slug là số → chuyển sang getPageById
  if (!isNaN(slug)) return next();

  const sql = "SELECT * FROM pages WHERE slug = ? AND status = 'published' LIMIT 1";
  db.query(sql, [slug], (err, results) => {
    if (err) return res.status(500).json({ message: "Lỗi server", details: err });
    if (!results.length) return res.status(404).json({ message: "Không tìm thấy trang" });
    res.json(results[0]);
  });
};

const getAboutPage = (req, res) => {
  const sql = `
    SELECT page_id, slug, title, content, image, status, created_at
    FROM pages
    WHERE slug = 'gioi-thieu' AND status = 'published'
    LIMIT 1
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Lỗi server", details: err });
    if (!results.length) return res.status(404).json({ message: "Không tìm thấy trang giới thiệu" });
    res.json(results[0]);
  });
};

// Tạo mới page
const createPage = (req, res) => {
  const { title, slug, content, status } = req.body;
  const image = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO pages (title, slug, content, image, status)
    VALUES (?, ?, ?, ?, ?)
  `;
  const values = [title, slug, content, image, status || "draft"];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Lỗi khi thêm page:", err);
      return res.status(500).json({ message: "Lỗi server" });
    }
    res.status(201).json({
      message: "Thêm trang thành công",
      page_id: result.insertId,
    });
  });
};

// Cập nhật page
const updatePage = (req, res) => {
  const { title, slug, content, status } = req.body;
  const image = req.file ? req.file.filename : req.body.image || null;

  const sql = `
    UPDATE pages
    SET title=?, slug=?, content=?, image=?, status=?
    WHERE page_id=?
  `;
  const values = [title, slug, content, image, status || "draft", req.params.id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Lỗi khi cập nhật page:", err);
      return res.status(500).json({ message: "Lỗi server" });
    }
    if (!result.affectedRows) {
      return res.status(404).json({ message: "Không tìm thấy trang" });
    }
    res.json({ message: "Cập nhật trang thành công" });
  });
};

// Xóa page
const deletePage = (req, res) => {
  const sql = "DELETE FROM pages WHERE page_id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error("Lỗi khi xóa page:", err);
      return res.status(500).json({ message: "Lỗi server" });
    }
    if (!result.affectedRows) {
      return res.status(404).json({ message: "Không tìm thấy trang" });
    }
    res.json({ message: "Xóa trang thành công" });
  });
};

// ==================== EXPORT ====================
module.exports = {
  uploadImage,
  getAllPages,
  getPageById,
  getPageBySlug,
  createPage,
  updatePage,
  deletePage,
  getAboutPage,
};
