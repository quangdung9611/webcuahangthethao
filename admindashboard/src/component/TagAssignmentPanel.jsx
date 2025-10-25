import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../CSS/TagAssignmentPanel.css";

function TagAssignmentPanel() {
    const [products, setProducts] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState(""); // Will auto-select first tag
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [brand, setBrand] = useState("all");
    const [sort, setSort] = useState("asc");
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [showOnlyTagged, setShowOnlyTagged] = useState(false);
    const masterCheckboxRef = useRef(null);

    useEffect(() => {
        axios.get("http://localhost:5000/api/tags").then(res => {
            setTags(res.data);
            if (res.data.length > 0) {
                setSelectedTag(res.data[0].id.toString()); // ✅ Auto-select first tag
            }
        });
        axios.get("http://localhost:5000/api/category").then(res => setCategories(res.data));
        axios.get("http://localhost:5000/api/brand").then(res => setBrands(res.data));
    }, []);

    const fetchProducts = () => {
        const params = { search, category, brand, sort };
        axios.get("http://localhost:5000/api/tags/products", { params })
            .then(res => {
                setProducts(res.data);
                const validIds = res.data.map(p => p.product_id);
                setSelectedProducts(prev => prev.filter(id => validIds.includes(id)));
            });
    };

    useEffect(() => {
        fetchProducts();
    }, [search, category, brand, sort]);

    useEffect(() => {
        if (masterCheckboxRef.current) {
            const total = filteredProducts.length;
            const selected = selectedProducts.filter(id =>
                filteredProducts.some(p => p.product_id === id)
            ).length;

            masterCheckboxRef.current.indeterminate = selected > 0 && selected < total;
            masterCheckboxRef.current.checked = selected === total && total > 0;
        }
    }, [selectedProducts, products, showOnlyTagged]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCategory("all");
        setBrand("all");
    };

    const toggleProduct = (id) => {
        setSelectedProducts(prev =>
            prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        const visibleIds = filteredProducts.map(p => p.product_id);
        const allSelected = visibleIds.every(id => selectedProducts.includes(id));

        if (allSelected) {
            setSelectedProducts(prev => prev.filter(id => !visibleIds.includes(id)));
        } else {
            const updated = Array.from(new Set([...selectedProducts, ...visibleIds]));
            setSelectedProducts(updated);
        }
    };

    const handleAssignTag = () => {
        axios.post("http://localhost:5000/api/tags/assign-multiple", {
            tag_id: selectedTag,
            product_ids: selectedProducts
        }).then(() => {
            alert("Tag assigned successfully");
            fetchProducts();
        });
    };

    const handleRemoveTag = () => {
        axios.delete("http://localhost:5000/api/tags/remove-multiple", {
            data: {
                tag_id: selectedTag,
                product_ids: selectedProducts
            }
        }).then(() => {
            alert("Tag removed successfully");
            fetchProducts();
        });
    };

    const getCategoryName = (id) => {
        const match = categories.find(c => c.id === id || c.category_id === id);
        return match?.name || "Unknown";
    };

    const getBrandName = (id) => {
        const match = brands.find(b => b.id === id || b.brand_id === id);
        return match?.name || "Unknown";
    };

    const toggleTagFilter = () => {
        setShowOnlyTagged(prev => !prev);
    };

    const filteredProducts = showOnlyTagged
        ? products.filter(p => p.tags && p.tags.length > 0)
        : products;

    const isActionDisabled = !selectedTag || selectedProducts.length === 0;

    const handleNukeTags = () => {
        axios.delete("http://localhost:5000/api/tags/remove-all", {
            data: {
                product_ids: selectedProducts
            }
        }).then(() => {
            alert("All tags removed from selected products");
            fetchProducts();
        });
    };

    return (
        <div>
            <h2>Tag Management Panel</h2>

            <div>
                <input
                    type="text"
                    placeholder="Search product name..."
                    value={search}
                    onChange={handleSearch}
                />

                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="all">All Categories</option>
                    {categories.map(c => (
                        <option key={c.id || c.category_id} value={c.id || c.category_id}>
                            {c.name}
                        </option>
                    ))}
                </select>

                <select value={brand} onChange={(e) => setBrand(e.target.value)}>
                    <option value="all">All Brands</option>
                    {brands.map(b => (
                        <option key={b.id || b.brand_id} value={b.id || b.brand_id}>
                            {b.name}
                        </option>
                    ))}
                </select>

                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="asc">Name ASC</option>
                    <option value="desc">Name DESC</option>
                </select>
            </div>

            <div>
                <label style={{ marginRight: "8px" }}>Set tag:</label>
                <select value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)}>
                    {tags.map(tag => (
                        <option key={tag.id} value={tag.id.toString()}>{tag.name}</option>
                    ))}
                </select>

                <button onClick={handleAssignTag} disabled={isActionDisabled}>
                    Assign Tag
                </button>
                <button onClick={handleRemoveTag} disabled={isActionDisabled}>
                    Remove Tag
                </button>
                <button onClick={handleNukeTags} disabled={selectedProducts.length === 0}>
                    Nuke All Tags
                </button>
                <button onClick={toggleTagFilter}>
                    {showOnlyTagged ? "Show All Products" : "Show Only Tagged Products"}
                </button>
            </div>

            <p>Products loaded: {filteredProducts.length}</p>

            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                ref={masterCheckboxRef}
                                onChange={toggleSelectAll}
                            />
                        </th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Tags</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map(p => (
                        <tr key={p.product_id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedProducts.includes(p.product_id)}
                                    onChange={() => toggleProduct(p.product_id)}
                                />
                            </td>
                            <td>{p.name}</td>
                            <td>{getCategoryName(p.category_id)}</td>
                            <td>{getBrandName(p.brand_id)}</td>
                            <td>
                                {p.tags && p.tags.length > 0
                                    ? p.tags.map(tag => tag.name).join(", ")
                                    : "—"}
                            </td>
                        </tr>
                    ))}
                    {filteredProducts.length === 0 && (
                        <tr>
                            <td colSpan="5">
                                {showOnlyTagged
                                    ? "No products with tags found."
                                    : "No products found."}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default TagAssignmentPanel;
