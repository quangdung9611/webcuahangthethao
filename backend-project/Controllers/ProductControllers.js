const db = require('../db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ====== FOLDER LƯU ẢNH ======
const uploadFolder = path.join(__dirname, '../public/images');
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadFolder),
  filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });
exports.uploadSingleImage = upload.single('image');

// ====== PRODUCT CRUD ======

exports.getAllProduct = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;
  const offset = (page - 1) * limit;

  const countSql = `SELECT COUNT(*) AS total FROM products`;
  const dataSql = `
    SELECT product_id, name, slug, price, image, category_id
    FROM products
    ORDER BY created_at ASC
    LIMIT ? OFFSET ?
  `;

  db.query(countSql, (err, countResult) => {
    if (err) return res.status(500).json({ error: err.message });

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    db.query(dataSql, [limit, offset], (err, dataResult) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        products: dataResult,
        totalPages,
      });
    });
  });
};
// Lấy sản phẩm theo ID
exports.getProductById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM products WHERE product_id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!results.length) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    res.json(results[0]);
  });
};

// Lấy sản phẩm theo slug
exports.getProductBySlug = (req, res) => {
  const { slug } = req.params;
  db.query(
  'SELECT product_id, name, slug, price, image, description, category_id, brand_id FROM products WHERE slug = ?',
  [slug],
  (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!results.length) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    res.json(results[0]);
  });

};

// Lấy sản phẩm theo category slug có phân trang
exports.getProductsByCategorySlug = (req, res) => {
  const { slug } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;
  const offset = (page - 1) * limit;
  const brand = req.query.brand || null;

  // Đếm tổng số sản phẩm
  const countSql = `
    SELECT COUNT(*) AS total
    FROM products p
    JOIN categories c ON p.category_id = c.category_id
    WHERE c.slug = ?
    ${brand ? "AND p.brand_slug = ?" : ""}
  `;

  // Truy vấn sản phẩm theo phân trang
  const dataSql = `
    SELECT p.product_id, p.name, p.slug, p.price, p.image, p.category_id
    FROM products p
    JOIN categories c ON p.category_id = c.category_id
    WHERE c.slug = ?
    ${brand ? "AND p.brand_slug = ?" : ""}
    ORDER BY p.created_at DESC
    LIMIT ? OFFSET ?
  `;

  const countParams = brand ? [slug, brand] : [slug];
  const dataParams = brand ? [slug, brand, limit, offset] : [slug, limit, offset];

  db.query(countSql, countParams, (err, countResult) => {
    if (err) return res.status(500).json({ error: err.message });

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    db.query(dataSql, dataParams, (err, dataResult) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        products: dataResult,
        totalPages,
      });
    });
  });
};


exports.getNewestProductsByCategorySlug = (req, res) => {
  const { slug } = req.params;

  const sql = `
    SELECT 
      p.product_id,
      p.name,
      p.slug,
      p.price,
      p.image,
      p.description,
      p.created_at,
      c.name AS category_name,
      c.slug AS category_slug,
      b.name AS brand_name
    FROM products p
    JOIN categories c ON p.category_id = c.category_id
    LEFT JOIN brands b ON p.brand_id = b.brand_id
    WHERE c.slug = ?
    ORDER BY p.created_at DESC
    LIMIT 5
  `;

  db.query(sql, [slug], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    // ✅ Chuyển description từ HTML sang text thường
   const sanitizedResults = results.map(product => ({
      ...product,
      description: product.description
        ? product.description
            .replace(/<[^>]*>/g, '')
            .replace(/&nbsp;/gi, ' ')
            .trim()
        : ''
    }));

    res.json({
      products: sanitizedResults,
      total: sanitizedResults.length
    });
  });
};




// Lấy sản phẩm theo brand slug
exports.getProductsByBrands = (req, res) => {
  const { slug } = req.params;
  const sql = `
    SELECT p.* FROM products p
    JOIN brands br ON p.brand_id = br.brand_id
    WHERE br.slug = ?
  `;
  db.query(sql, [slug], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Tạo sản phẩm mới
// Tạo sản phẩm mới
exports.createProduct = (req, res) => {
  const { category_id, brand_id, name, slug, description, price } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!category_id || !brand_id || !name || !slug || !price || !image) {
    return res.status(400).json({ error: 'Thiếu dữ liệu' });
  }

  const parsedPrice = parseInt(price, 10);
  const safeDescription = description ? description.toString() : ""; // ✅ tránh lỗi ký tự HTML hoặc xuống dòng

  const sql = `
    INSERT INTO products (category_id, brand_id, name, slug, description, price, image)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [category_id, brand_id, name, slug, safeDescription, parsedPrice, image], (err, result) => {
    if (err) {
      console.error("❌ Lỗi SQL khi thêm sản phẩm:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Thêm sản phẩm thành công', product_id: result.insertId });
  });
};


// Cập nhật sản phẩm
exports.updateProduct = (req, res) => {
  const { id } = req.params;

  const {
    category_id,
    brand_id,
    name,
    slug,
    description,
    price,
    image: oldImageName // tên ảnh cũ nếu không upload mới
  } = req.body;

  const image = req.file ? req.file.filename : oldImageName;
  const parsedPrice = parseInt(price, 10);
  const safeDescription = description ? description.toString() : ""; // ✅ chuyển mô tả HTML thành chuỗi an toàn

  if (!category_id || !brand_id || !name || !slug || !parsedPrice) {
    return res.status(400).json({ error: "Thiếu dữ liệu bắt buộc" });
  }

  console.log("🟢 Mô tả nhận được:", safeDescription); // debug mô tả gửi lên

  const sql = `
    UPDATE products
    SET category_id=?, brand_id=?, name=?, slug=?, description=?, price=?, image=?
    WHERE product_id=?
  `;

  db.query(
    sql,
    [category_id, brand_id, name, slug, safeDescription, parsedPrice, image, id],
    (err) => {
      if (err) {
        console.error("❌ Lỗi SQL khi cập nhật sản phẩm:", err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Cập nhật sản phẩm thành công" });
    }
  );
};


// Xóa sản phẩm
exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM materials WHERE product_id=?', [id], (err1) => {
    if (err1) return res.status(500).json({ error: err1.message });
    db.query('DELETE FROM products WHERE product_id=?', [id], (err2) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.json({ message: 'Xóa sản phẩm thành công' });
    });
  });
};

// Lấy sản phẩm theo category + brand có phân trang
exports.getProductsByCategoryAndBrand = (req, res) => {
  const { categorySlug, brandSlug } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;
  const offset = (page - 1) * limit;

  // Đếm tổng số sản phẩm
  const countSql = `
    SELECT COUNT(*) AS total
    FROM products p
    JOIN categories c ON p.category_id = c.category_id
    JOIN brands b ON p.brand_id = b.brand_id
    WHERE c.slug = ? AND b.slug = ?
  `;

  // Truy vấn sản phẩm theo phân trang
  const dataSql = `
    SELECT p.product_id, p.name, p.slug, p.price, p.image, p.category_id
    FROM products p
    JOIN categories c ON p.category_id = c.category_id
    JOIN brands b ON p.brand_id = b.brand_id
    WHERE c.slug = ? AND b.slug = ?
    ORDER BY p.created_at DESC
    LIMIT ? OFFSET ?
  `;

  db.query(countSql, [categorySlug, brandSlug], (err, countResult) => {
    if (err) return res.status(500).json({ error: err.message });

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    db.query(dataSql, [categorySlug, brandSlug, limit, offset], (err, dataResult) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        products: dataResult,
        totalPages,
      });
    });
  });
};

// ==================== LẤY DANH MỤC KÈM THƯƠNG HIỆU ====================
exports.getAllCategoriesWithBrands = (req, res) => {
  const sql = `
    SELECT c.category_id, c.name AS category_name, c.slug AS category_slug,
           b.brand_id, b.name AS brand_name, b.slug AS brand_slug
    FROM categories c
    LEFT JOIN products p ON p.category_id = c.category_id
    LEFT JOIN brands b ON b.brand_id = p.brand_id
    ORDER BY c.category_id, b.brand_id
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const categories = [];
    const map = {};

    results.forEach(row => {
      if (!map[row.category_id]) {
        map[row.category_id] = {
          category_id: row.category_id,
          name: row.category_name,
          slug: row.category_slug,
          brands: []
        };
        categories.push(map[row.category_id]);
      }

      if (row.brand_id && !map[row.category_id].brands.some(b => b.brand_id === row.brand_id)) {
        map[row.category_id].brands.push({
          brand_id: row.brand_id,
          name: row.brand_name,
          slug: row.brand_slug
        });
      }
    });

    res.json(categories);
  });
};
