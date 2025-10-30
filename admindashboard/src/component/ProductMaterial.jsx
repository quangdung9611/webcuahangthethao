import React, { useEffect, useState } from "react";
import "../CSS/user.css";

function ProductMaterials() {
  const [materials, setMaterials] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const materialsPerPage = 5;

  useEffect(() => {
    fetchMaterials();
    fetchProducts();
  }, []);

  const fetchMaterials = () => {
    fetch("http://localhost:5000/api/product-materials")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMaterials(data);
        } else {
          setMaterials([]);
        }
      })
      .catch((err) => console.error(err));
  };

  const fetchProducts = () => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (material_id) => {
    if (!window.confirm("Bạn có chắc muốn xóa biến thể này?")) return;

    fetch(`http://localhost:5000/api/product-materials/${material_id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) fetchMaterials();
        else console.error("Xóa thất bại");
      })
      .catch((err) => console.error(err));
  };

  const filteredMaterials = selectedProduct
    ? materials.filter((m) => String(m.product_id) === String(selectedProduct))
    : materials;

  const indexOfLast = currentPage * materialsPerPage;
  const indexOfFirst = indexOfLast - materialsPerPage;
  const currentMaterials = Array.isArray(filteredMaterials)
    ? filteredMaterials.slice(indexOfFirst, indexOfLast)
    : [];

  const totalPages = Math.ceil(
    Array.isArray(filteredMaterials) ? filteredMaterials.length / materialsPerPage : 1
  );

  return (
    <div className="user-list">
      <div className="header-actions">
        <button
          className="edit-btn"
          onClick={() => (window.location.href = "/product-material/add")}
        >
          Thêm
        </button>

        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="filter-select"
        >
          <option value="">Tất cả sản phẩm</option>
          {Array.isArray(products) &&
            products.map((p) => (
              <option key={p.product_id} value={p.product_id}>
                {p.name}
              </option>
            ))}
        </select>
      </div>

      <h2>Danh sách Biến thể (Materials)</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product ID</th>
            <th>Màu</th>
            <th>Kích cỡ</th>
            <th>SKU</th>
            <th>Số lượng</th>
            <th>Hình ảnh</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentMaterials.length > 0 ? (
            currentMaterials.map((m) => (
              <tr key={m.material_id}>
                <td>{m.material_id}</td>
                <td>{m.product_id}</td>
                <td>{m.color || "-"}</td>
                <td>{m.size || "-"}</td>
                <td>{m.sku || "-"}</td>
                <td>{m.stock}</td>
                <td>
                  {m.image ? (
                    <img
                      src={`http://localhost:5000/images/${m.image}`}
                      alt={m.color}
                      width={50}
                    />
                  ) : (
                    "-"
                  )}
                </td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() =>
                      (window.location.href = `/product-material/update/${m.material_id}`)
                    }
                  >
                    Sửa
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(m.material_id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">Không có biến thể nào.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Trang trước
        </button>

        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx + 1}
            className={currentPage === idx + 1 ? "active-page" : ""}
            onClick={() => setCurrentPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Trang sau
        </button>
      </div>
    </div>
  );
}

export default ProductMaterials;
