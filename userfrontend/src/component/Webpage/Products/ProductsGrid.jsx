import React from "react";
import ProductsCard from "./ProductsCard";

const ProductsGrid = ({ products }) => {
  if (!Array.isArray(products)) return null;

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductsCard key={product.product_id} product={product} />
      ))}
    </div>
  );
};

export default ProductsGrid;
