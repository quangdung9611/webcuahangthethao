import React from "react";
import "../CSS/sibebar.css";
import { Link } from 'react-router-dom';
const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>
      <ul className="sidebar-menu">
        <li><Link to="/">🏠 Dashboard</Link></li>
        <li><Link to="/users">👥 Users</Link></li>
        <li><Link to="/product">📦 Products</Link></li>
        <li><Link to="/categogy"> Categories</Link></li>
        <li><Link to="/voucher">Voucher</Link></li>
        <li><Link to="/order">🛒 Orders</Link></li>
        <li>📊 Reports</li>
      </ul>
    </div>
  );
};

export default Sidebar;
