import React from "react";
import { Link } from "react-router-dom";

const ProductsCard = ({ product }) => {
  return (
    <Link to={`/product/${product.slug}`} className="product-card">
      <img src={`http://localhost:5000/images/${product.image}`} alt={product.name} />
      <h4>{product.name}</h4>
      <p>{Number(product.price).toLocaleString()}₫</p>
    </Link>
  );
};

export default ProductsCard;
