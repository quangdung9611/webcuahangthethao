const db = require('../db');

// Tạo tag mới
exports.createTag = (req, res) => {
    const { name } = req.body;
    const sql = "INSERT INTO tags (name) VALUES (?)";

    db.query(sql, [name], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        const insertedId = result.insertId;
        db.query("SELECT * FROM tags WHERE id = ?", [insertedId], (err2, rows) => {
            if (err2) return res.status(500).json({ error: err2.message });
            res.status(201).json(rows[0]);
        });
    });
};

// Lấy tất cả tag
exports.getAllTags = (req, res) => {
    db.query("SELECT * FROM tags", (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(rows);
    });
};

// Lấy tag theo ID
exports.getTagById = (req, res) => {
    const { tagId } = req.params;
    db.query("SELECT * FROM tags WHERE id = ?", [tagId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        if (rows.length === 0) return res.status(404).json({ error: "Không tìm thấy tag" });
        res.status(200).json(rows[0]);
    });
};

// Cập nhật tag
exports.updateTag = (req, res) => {
    const { tagId } = req.params;
    const { name } = req.body;

    db.query("UPDATE tags SET name = ? WHERE id = ?", [name, tagId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Tag không tồn tại" });

        db.query("SELECT * FROM tags WHERE id = ?", [tagId], (err2, rows) => {
            if (err2) return res.status(500).json({ error: err2.message });
            res.status(200).json(rows[0]);
        });
    });
};

// Xóa tag
exports.deleteTag = (req, res) => {
    const { tagId } = req.params;
    db.query("DELETE FROM tags WHERE id = ?", [tagId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Tag không tồn tại" });
        res.status(200).json({ message: "Xóa tag thành công" });
    });
};

// Gán tag cho sản phẩm
exports.assignTagToProduct = (req, res) => {
    const { product_id, tag_id } = req.body;
    db.query("INSERT INTO product_tags (product_id, tag_id) VALUES (?, ?)", [product_id, tag_id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Gán tag cho sản phẩm thành công" });
    });
};

// Xóa tag khỏi sản phẩm
exports.removeTagFromProduct = (req, res) => {
    const { product_id, tag_id } = req.body;
    db.query("DELETE FROM product_tags WHERE product_id = ? AND tag_id = ?", [product_id, tag_id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Xóa tag khỏi sản phẩm thành công" });
    });
};

// Lấy tất cả tag của sản phẩm
exports.getTagsForProduct = (req, res) => {
    const { productId } = req.params;
    const sql = `
    SELECT tags.id, tags.name
    FROM product_tags
    JOIN tags ON product_tags.tag_id = tags.id
    WHERE product_tags.product_id = ?
  `;
    db.query(sql, [productId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(rows);
    });
};

// Lấy tất cả sản phẩm theo tag
exports.getProductsByTag = (req, res) => {
    const { tagId } = req.params;
    const sql = `
    SELECT products.product_id, products.name
    FROM product_tags
    JOIN products ON product_tags.product_id = products.product_id
    WHERE product_tags.tag_id = ?
  `;
    db.query(sql, [tagId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(rows);
    });
};

// Gán tag cho nhiều sản phẩm
exports.assignTagToMultipleProducts = (req, res) => {
    const { tag_id, product_ids } = req.body;
    const inserts = product_ids.map(product_id => [product_id, tag_id]);
    db.query("INSERT INTO product_tags (product_id, tag_id) VALUES ?", [inserts], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Gán tag cho nhiều sản phẩm thành công" });
    });
};

// Gán tag theo category
exports.assignTagByCategory = (req, res) => {
    const { tag_id, category_id } = req.body;
    db.query("SELECT product_id FROM products WHERE category_id = ?", [category_id], (err, products) => {
        if (err) return res.status(500).json({ error: err.message });
        const inserts = products.map(p => [p.product_id, tag_id]);
        db.query("INSERT INTO product_tags (product_id, tag_id) VALUES ?", [inserts], (err2) => {
            if (err2) return res.status(500).json({ error: err2.message });
            res.status(201).json({ message: "Gán tag cho sản phẩm theo category thành công" });
        });
    });
};

// Gán tag theo brand
exports.assignTagByBrand = (req, res) => {
    const { tag_id, brand_id } = req.body;
    db.query("SELECT product_id FROM products WHERE brand_id = ?", [brand_id], (err, products) => {
        if (err) return res.status(500).json({ error: err.message });
        const inserts = products.map(p => [p.product_id, tag_id]);
        db.query("INSERT INTO product_tags (product_id, tag_id) VALUES ?", [inserts], (err2) => {
            if (err2) return res.status(500).json({ error: err2.message });
            res.status(201).json({ message: "Gán tag cho sản phẩm theo brand thành công" });
        });
    });
};

// Xóa tag khỏi nhiều sản phẩm
exports.removeTagFromMultipleProducts = (req, res) => {
    const { tag_id, product_ids } = req.body;
    const sql = `
    DELETE FROM product_tags 
    WHERE tag_id = ? AND product_id IN (?)
  `;
    db.query(sql, [tag_id, product_ids], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Xóa tag khỏi nhiều sản phẩm thành công" });
    });
};

// Xoá tất cả tag khỏi selected products
exports.nukeAllTagsFromSelectedProducts = (req, res) => {
    const { product_ids } = req.body;

    if (!Array.isArray(product_ids) || product_ids.length === 0) {
        return res.status(400).json({ error: "Danh sách sản phẩm không hợp lệ" });
    }

    const sql = "DELETE FROM product_tags WHERE product_id IN (?)";
    db.query(sql, [product_ids], (err, result) => {
        if (err) {
            console.error("Nuke error:", err);
            return res.status(500).json({ error: "Xóa tất cả tag thất bại" });
        }

        res.status(200).json({ message: "Đã xóa tất cả tag khỏi các sản phẩm đã chọn" });
    });
};


// Lọc sản phẩm theo tag, category, brand
exports.getFilteredProducts = (req, res) => {
    const { search = "", category = "all", brand = "all", sort = "asc" } = req.query;

    let sql = `
        SELECT 
            p.product_id, 
            p.name, 
            p.category_id, 
            p.brand_id,
            GROUP_CONCAT(t.name SEPARATOR ', ') AS tag_names
        FROM products p
        LEFT JOIN product_tags pt ON p.product_id = pt.product_id
        LEFT JOIN tags t ON pt.tag_id = t.id
        WHERE 1=1
    `;
    const params = [];

    if (search) {
        sql += ` AND p.name LIKE ?`;
        params.push(`%${search}%`);
    }

    if (category !== "all") {
        sql += ` AND p.category_id = ?`;
        params.push(category);
    }

    if (brand !== "all") {
        sql += ` AND p.brand_id = ?`;
        params.push(brand);
    }

    sql += ` GROUP BY p.product_id ORDER BY p.name ${sort === "desc" ? "DESC" : "ASC"}`;

    db.query(sql, params, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        const formatted = results.map(p => ({
            ...p,
            tags: p.tag_names
                ? p.tag_names.split(', ').map(name => ({ name }))
                : []
        }));

        res.status(200).json(formatted);
    });
};

