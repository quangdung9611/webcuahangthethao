// 📄 routes/preorderRoutes.js
const express = require('express');
const router = express.Router();
const preorderController = require('../Controllers/PreorderControllers');

// ✅ Lấy danh sách tất cả đơn đặt hàng trước
router.get('/', preorderController.getAllPreorders);

// ✅ Lấy danh sách preorder theo user
router.get('/user/:user_id', preorderController.getPreordersByUser);

// ✅ Lấy chi tiết preorder theo ID
router.get('/:preorder_id', preorderController.getPreorderById);

// ✅ Tạo preorder mới (mặc định status: pending)
router.post('/', preorderController.createPreorder);

// ✅ Cập nhật trạng thái preorder (pending → confirmed → canceled)
router.put('/:preorder_id', preorderController.updatePreorderStatus);

module.exports = router;
