const express = require("express");
const router = express.Router();
const voucherController = require("../Controllers/VoucherControllers");

// Lấy tất cả voucher
router.get("/", voucherController.getAllVouchers);

// Lấy voucher theo ID
router.get("/:id", voucherController.getVoucherById);

// Áp dụng mã giảm giá (nhận mã đã mã hóa từ body)
router.post("/apply", voucherController.getVoucherByCode);

// Tạo voucher mới (nhận dữ liệu đã mã hóa từ body)
router.post("/", voucherController.createVoucher);

// Cập nhật voucher
router.put("/:id", voucherController.updateVoucher);

// Xóa voucher
router.delete("/:id", voucherController.deleteVoucher);

module.exports = router;
