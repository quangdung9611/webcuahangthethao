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
  const productsPerPage = 8;

  const normalizeId = (v) => String(v ?? "").trim();

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/products?page=${currentPage}&limit=1000`
      );
      const data = await res.json();

      let productList = [];
      if (Array.isArray(data)) {
        productList = data;
      } else if (data && Array.isArray(data.products)) {
        productList = data.products;
      } else if (data && data.data && Array.isArray(data.data)) {
        productList = data.data;
      }

      setProducts(productList);
      setFilteredProducts(productList);
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu sản phẩm:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/category");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Lỗi khi lấy loại sản phẩm:", err);
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/brand");
      const data = await res.json();
      setBrands(data);
    } catch (err) {
      console.error("Lỗi khi lấy thương hiệu:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBrands();
  }, []);

  const filterProducts = (categoryId, brandId) => {
    let filtered = Array.isArray(products) ? [...products] : [];

    const hasCategory =
      categoryId !== undefined && categoryId !== null && categoryId !== "";
    const hasBrand =
      brandId !== undefined && brandId !== null && brandId !== "";

    if (hasCategory) {
      const cid = normalizeId(categoryId);
      filtered = filtered.filter(
        (product) => normalizeId(product.category_id) === cid
      );
    }

    if (hasBrand) {
      const bid = normalizeId(brandId);
      filtered = filtered.filter(
        (product) => normalizeId(product.brand_id) === bid
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

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Xóa sản phẩm thành công!");
        const updatedProducts = products.filter((p) => p.product_id !== id);
        setProducts(updatedProducts);
        filterProducts(selectedCategory, selectedBrand);
      } else {
        alert("Lỗi khi xóa sản phẩm!");
      }
    } catch (err) {
      console.error("Lỗi khi xóa:", err);
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = Array.isArray(filteredProducts)
    ? filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
    : [];

  const totalPages = Math.max(
    1,
    Math.ceil(
      Array.isArray(filteredProducts)
        ? filteredProducts.length / productsPerPage
        : 1
    )
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/default.png";
                    }}
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
