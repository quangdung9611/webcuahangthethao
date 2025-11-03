import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductsFilterSidebar from "./ProductsFilterSidebar";
import ProductsGrid from "./ProductsGrid";
import ProductsPaginationControls from "./ProductsPaginationControls";

import "../../CSS/Products.css";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Tạo object filters từ URL params
  const filters = useMemo(() => ({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "all",
    brand: searchParams.get("brand") || "all",
    priceMin: Number(searchParams.get("priceMin")) || 0,
    priceMax: Number(searchParams.get("priceMax")) || 10000000,
    page: Number(searchParams.get("page")) || 1,
  }), [searchParams]);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalFilteredCount, setTotalFilteredCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/category")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Lỗi lấy danh mục:", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/brand")
      .then(res => res.json())
      .then(data => setBrands(data))
      .catch(err => console.error("Lỗi lấy thương hiệu:", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/products/price-range")
      .then(res => {
        if (!res.ok) throw new Error(`Lỗi HTTP: ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (data.min !== undefined && data.max !== undefined) {
          setPriceRange([data.min, data.max]);
        }
      })
      .catch(err => console.error("Lỗi lấy khoảng giá:", err));
  }, []);

  // Fetch sản phẩm theo bộ lọc
  useEffect(() => {
    const query = new URLSearchParams({
      search: filters.search,
      category: filters.category,
      brand: filters.brand,
      priceMin: filters.priceMin,
      priceMax: filters.priceMax,
      page: filters.page,
      limit: 8,
    }).toString();

    fetch(`http://localhost:5000/api/products?${query}`)
      .then(res => {
        if (!res.ok) throw new Error(`Lỗi HTTP: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setProducts(Array.isArray(data.products) ? data.products : []);
        setTotalPages(data.totalPages || 1);
        setTotalFilteredCount(data.totalFilteredCount || 0);
      })
      .catch(err => {
        console.error("Lỗi lấy sản phẩm:", err);
        setProducts([]);
        setTotalPages(1);
      });
  }, [filters]);

  // Cập nhật bộ lọc và reset trang về 1 nếu cần
  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    if (key !== "page") newParams.set("page", "1");
    setSearchParams(newParams);
  };

  return (
    <div className="products-page">
      <div className="products-layout">
        <div className="products-filter-box">
          <ProductsFilterSidebar
            filters={filters}
            categories={categories}
            brands={brands}
            priceRange={priceRange}
            updateFilter={updateFilter}
          />
        </div>

        <div className="products-panel-box">
          <div className="products-panel-content">
            <h3>Kết quả tìm kiếm (Tổng: {totalFilteredCount} sản phẩm)</h3>
            {products.length === 0 ? (
              <p className="no-results">Không tìm thấy sản phẩm phù hợp với bộ lọc hiện tại.</p>
            ) : (
              <ProductsGrid products={products} />
            )}
            {products.length > 0 && (
              <ProductsPaginationControls
                currentPage={filters.page}
                totalPages={totalPages}
                updatePage={(page) => updateFilter("page", page)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
