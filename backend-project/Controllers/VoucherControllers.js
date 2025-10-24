const db = require('../db'); // file kết nối database
const CryptoJS = require('crypto-js'); // dùng để giải mã dữ liệu từ frontend

// Lấy tất cả voucher
exports.getAllVouchers = (req, res) => {
  const sql = `
    SELECT voucher_id, code, description, discount_type, discount_value,
           min_order_amount, usage_limit, used_count, start_date, end_date,
           status, created_at
    FROM voucher
    ORDER BY voucher_id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Áp dụng mã voucher (nhận mã đã mã hóa)
exports.getVoucherByCode = (req, res) => {
  const { payload } = req.body;
  const secretKey = 'your-secret-key'; // Nên lưu ở biến môi trường
  const today = new Date().toISOString().slice(0, 10);

  try {
    const bytes = CryptoJS.AES.decrypt(payload, secretKey);
    const decryptedCode = bytes.toString(CryptoJS.enc.Utf8);

    const sql = `
      SELECT voucher_id, description, discount_type, discount_value,
             min_order_amount, usage_limit, used_count, start_date, end_date,
             status
      FROM voucher
      WHERE code = ?
        AND status = 'active'
        AND (start_date IS NULL OR start_date <= ?)
        AND (end_date IS NULL OR end_date >= ?)
        AND used_count < usage_limit
      LIMIT 1
    `;

    db.query(sql, [decryptedCode, today, today], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0)
        return res.status(404).json({ message: "Mã giảm giá không hợp lệ hoặc đã hết hạn" });

      const {
        voucher_id,
        description,
        discount_type,
        discount_value,
        min_order_amount,
        usage_limit,
        used_count,
        start_date,
        end_date,
        status
      } = results[0];

      res.json({
        valid: true,
        voucher_id,
        description,
        discount_type,
        discount_value,
        min_order_amount,
        usage_limit,
        used_count,
        start_date,
        end_date,
        status,
        message: "Áp dụng thành công"
      });
    });
  } catch (err) {
    return res.status(400).json({ error: "Không thể giải mã mã voucher" });
  }
};

// Lấy voucher theo ID
exports.getVoucherById = (req, res) => {
  const { id } = req.params;

  const sql = `SELECT * FROM voucher WHERE voucher_id = ? LIMIT 1`;

  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ message: "Không tìm thấy voucher" });
    res.json(results[0]);
  });
};

// Tạo voucher mới (nhận dữ liệu đã mã hóa)
exports.createVoucher = (req, res) => {
  const { payload } = req.body;
  const secretKey = 'your-secret-key';

  try {
    const bytes = CryptoJS.AES.decrypt(payload, secretKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    const {
      code,
      description,
      discount_type,
      discount_value,
      min_order_amount,
      usage_limit,
      start_date,
      end_date,
      status,
    } = decryptedData;

    const sql = `
      INSERT INTO voucher
      (code, description, discount_type, discount_value, min_order_amount,
       usage_limit, start_date, end_date, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        code,
        description,
        discount_type,
        discount_value,
        min_order_amount,
        usage_limit,
        start_date,
        end_date,
        status || "active",
      ],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Tạo voucher thành công", voucherId: result.insertId });
      }
    );
  } catch (err) {
    return res.status(400).json({ error: "Không thể giải mã dữ liệu voucher" });
  }
};

// Cập nhật voucher
exports.updateVoucher = (req, res) => {
  const { id } = req.params;
  const {
    code,
    description,
    discount_type,
    discount_value,
    min_order_amount,
    usage_limit,
    start_date,
    end_date,
    status,
  } = req.body;

  const sql = `
    UPDATE voucher
    SET code=?, description=?, discount_type=?, discount_value=?, 
        min_order_amount=?, usage_limit=?, start_date=?, end_date=?, status=?
    WHERE voucher_id=?
  `;

  db.query(
    sql,
    [
      code,
      description,
      discount_type,
      discount_value,
      min_order_amount,
      usage_limit,
      start_date,
      end_date,
      status,
      id,
    ],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Cập nhật voucher thành công" });
    }
  );
};

// Xóa voucher
exports.deleteVoucher = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM voucher WHERE voucher_id=?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Xóa voucher thành công" });
  });
};
