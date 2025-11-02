import React from "react";

const ProductsFilterSidebar = ({
  filters,
  categories,
  brands,
  priceRange,
  updateFilter,
}) => {
  const handleResetFilters = () => {
    updateFilter("search", "");
    updateFilter("category", "all");
    updateFilter("brand", "all");
    updateFilter("priceMin", priceRange[0]);
    updateFilter("priceMax", priceRange[1]);
  };

  return (
    <aside className="products-sidebar">
      <h3>Lọc sản phẩm</h3>

      {/* 🔍 Tìm kiếm */}
      <input
        type="text"
        placeholder="Tìm sản phẩm..."
        value={filters.search}
        onChange={(e) => updateFilter("search", e.target.value)}
      />

      {/* 📂 Danh mục */}
      <label>Danh mục</label>
      <select
        value={filters.category}
        onChange={(e) => updateFilter("category", e.target.value)}
      >
        <option value="all">Tất cả</option>
        {categories.map((c) => (
          <option key={c.category_id} value={c.slug}>
            {c.name}
          </option>
        ))}
      </select>

      {/* 🏷️ Thương hiệu */}
      <label>Thương hiệu</label>
      <select
        value={filters.brand}
        onChange={(e) => updateFilter("brand", e.target.value)}
      >
        <option value="all">Tất cả</option>
        {brands.map((b) => (
          <option key={b.brand_id} value={b.slug}>
            {b.name}
          </option>
        ))}
      </select>

      {/* 💰 Khoảng giá */}
      <label>Khoảng giá (₫)</label>
      <div className="price-filter">
        <input
          type="number"
          value={filters.priceMin}
          onChange={(e) => updateFilter("priceMin", e.target.value)}
          min={priceRange[0]}
          max={priceRange[1]}
        />
        <span> - </span>
        <input
          type="number"
          value={filters.priceMax}
          onChange={(e) => updateFilter("priceMax", e.target.value)}
          min={priceRange[0]}
          max={priceRange[1]}
        />
      </div>
    </aside>
  );
};

export default ProductsFilterSidebar;
