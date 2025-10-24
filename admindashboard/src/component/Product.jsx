import React, { useEffect, useState } from "react";
import "../CSS/user.css";

function Product() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  // ==== Lấy danh sách sản phẩm có phân trang ====
  const fetchProducts = () => {
    fetch(`http://localhost:5000/api/products?page=${currentPage}&limit=1000`)
      .then((res) => res.json())
      .then((data) => {
        const productList = Array.isArray(data)
          ? data
          : Array.isArray(data.products)
          ? data.products
          : [];
        setProducts(productList);
        setFilteredProducts(productList);
      })
      .catch((err) => console.error("Lỗi khi lấy dữ liệu sản phẩm:", err));
  };

  const fetchCategories = () => {
    fetch("http://localhost:5000/api/category")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Lỗi khi lấy loại sản phẩm:", err));
  };

  const fetchBrands = () => {
    fetch("http://localhost:5000/api/brand")
      .then((res) => res.json())
      .then((data) => setBrands(data))
      .catch((err) => console.error("Lỗi khi lấy thương hiệu:", err));
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBrands();
  }, []);

  const filterProducts = (categoryId, brandId) => {
    let filtered = Array.isArray(products) ? [...products] : [];

    if (categoryId) {
      filtered = filtered.filter(
        (product) => String(product.category_id) === String(categoryId)
      );
    }

    if (brandId) {
      filtered = filtered.filter(
        (product) => String(product.brand_id) === String(brandId)
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleFilterCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    filterProducts(categoryId, selectedBrand);
  };

  const handleFilterBrand = (brandId) => {
    setSelectedBrand(brandId);
    filterProducts(selectedCategory, brandId);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            fetchProducts();
          } else {
            console.error("Lỗi khi xóa:", res.statusText);
          }
        })
        .catch((err) => console.error("Lỗi khi xóa:", err));
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = Array.isArray(filteredProducts)
    ? filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
    : [];

  const totalPages = Math.ceil(
    Array.isArray(filteredProducts) ? filteredProducts.length / productsPerPage : 1
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="user-list">
      <div className="header-actions">
        <button
          className="edit-btn"
          onClick={() => (window.location.href = `/product/add`)}
        >
          Thêm
        </button>

        <select
          value={selectedCategory}
          onChange={(e) => handleFilterCategory(e.target.value)}
          className="filter-select"
        >
          <option value="">Tất cả loại sản phẩm</option>
          {categories.map((cat) => (
            <option key={cat.category_id} value={cat.category_id}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          value={selectedBrand}
          onChange={(e) => handleFilterBrand(e.target.value)}
          className="filter-select"
        >
          <option value="">Tất cả thương hiệu</option>
          {brands.map((brand) => (
            <option key={brand.brand_id} value={brand.brand_id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>

      <h2>Danh sách Sản Phẩm</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>Hình Ảnh</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <tr key={product.product_id}>
                <td>{product.product_id}</td>
                <td>{product.name}</td>
                <td>{Number(product.price).toLocaleString()} đ</td>
                <td>
                  <img
                    src={`http://localhost:5000/images/${product.image}`}
                    alt={product.name}
                    className="product-image"
                  />
                </td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() =>
                      (window.location.href = `/product/update/${product.product_id}`)
                    }
                  >
                    Sửa
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(product.product_id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Không có sản phẩm nào.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Trang trước
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className={currentPage === index + 1 ? "active-page" : ""}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Trang sau
        </button>
      </div>
    </div>
  );
}

export default Product;
