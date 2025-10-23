const express = require('express'); // import express trước
const app = express();               // tạo app sau khi import
const cors = require('cors');
const path = require('path');
const db = require('./db');

const productRoutes = require('./Routers/productRouter');
const userRoutes = require('./Routers/userRouter');
const authRoutes = require('./Routers/authRouter');
const categoryRoutes = require('./Routers/CategoryRouter');
const voucherRoutes = require("./Routers/voucherRouter");
const checkoutRoutes = require("./Routers/CheckoutRouter");
const orderRoutes = require('./Routers/orderRouter');
const productMaterialRouter = require("./Routers/MaterialProductRouter");
const flashSaleRouter = require("./Routers/flashSaleRouter");
const flashSaleProductRouter = require("./Routers/FlashSaleProductRouter");
const newsRouter = require("./Routers/NewsRouter");
const newsCategoryRouter = require("./Routers/NewsCategoryRouter");
const brandRoutes = require("./Routers/BrandRouter");
const pageRoutes = require("./Routers/PagesRouter");
const preorderRoutes = require("./Routers/PreorderRouter");
const ProductReviewRoutes = require("./Routers/ProductReviewRouter");
const FeedBackRoutes = require("./Routers/FeedBackRouter");
// const TagRouter = require('./Routers/TagRouter');
const TagRouter = require('./Routers/TagRouter')
// Cho phép gọi API từ frontend
app.use(cors());

// Static để phục vụ ảnh
app.use('/images', express.static(path.join(__dirname, '/public/images')));

// JSON Parser
app.use(express.json());

// Route test
app.get('/api', (req, res) => {
  res.send('Kết nối thành công');
});

// Sử dụng routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/category', categoryRoutes);
app.use("/api/vouchers", voucherRoutes);
app.use("/api/checkout", checkoutRoutes);
// Routes order
app.use('/api/orders', orderRoutes);
// Routes ProductMaterials
app.use("/api/product-materials", productMaterialRouter);
app.use("/api/flash-sale", flashSaleRouter);
app.use("/api/flash-sale-products", flashSaleProductRouter);
// Routes News
app.use("/api/news", newsRouter);
//Routes News-Categogy
app.use("/api/news-category", newsCategoryRouter);
//Routes Brands
app.use("/api/brand", brandRoutes);
// Routes Pages
app.use("/api/pages", pageRoutes);
// Routes Preoders
app.use("/api/preorders", preorderRoutes);
// Routes ProdutReviews
app.use("/api/product-review", ProductReviewRoutes);

app.use("/api/feedback", FeedBackRoutes);
// Routes tags
app.use("/api/tags", TagRouter);
// Chạy server
app.listen(5000, () => {
  console.log('Server đang chạy tại http://localhost:5000');
});
