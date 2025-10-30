import React, { useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";
import "../CSS/TagAssignmentPanel.css";

function TagAssignmentPanel() {
    // Data
    const [products, setProducts] = useState([]);
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    // Filters
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [brand, setBrand] = useState("all");
    const [sort, setSort] = useState("asc");
    const [filterTag, setFilterTag] = useState(""); // chosen tag to filter by ("" = all)

    // Tag assignment
    const [assignTag, setAssignTag] = useState(""); // tag to assign/remove

    // Selection
    const [selectedProducts, setSelectedProducts] = useState([]);
    const masterCheckboxRef = useRef(null);

    // Fetch static data
    useEffect(() => {
        axios.get("http://localhost:5000/api/tags").then(res => {
            const list = Array.isArray(res.data) ? res.data : [];
            setTags(list);
            // Initialize assignTag to first available tag id if present
            const firstId = list.length > 0 ? String(list[0].id) : null;
            setAssignTag(firstId ?? "");
        });
        axios.get("http://localhost:5000/api/category").then(res => {
            setCategories(Array.isArray(res.data) ? res.data : []);
        });
        axios.get("http://localhost:5000/api/brand").then(res => {
            setBrands(Array.isArray(res.data) ? res.data : []);
        });
    }, []);

    // Fetch products whenever non-tag filters change
    const fetchProducts = () => {
        const params = { search, category, brand, sort };
        axios.get("http://localhost:5000/api/tags/products", { params })
            .then(res => {
                const list = Array.isArray(res.data) ? res.data : [];
                setProducts(list);
                // Keep only selected IDs that still exist
                const validIds = new Set(list.map(p => p.product_id));
                setSelectedProducts(prev => prev.filter(id => validIds.has(id)));
            });
    };

    useEffect(() => {
        fetchProducts();
    }, [search, category, brand, sort]);

    // Client-side tag filtering
    const filteredProducts = useMemo(() => {
        if (!filterTag) return products;
        return products.filter(p =>
            Array.isArray(p.tags) &&
            p.tags.some(tag => String(tag.id) === filterTag)
        );
    }, [products, filterTag]);

    // Master checkbox state based on filtered rows only
    useEffect(() => {
        const el = masterCheckboxRef.current;
        if (!el) return;
        const total = filteredProducts.length;
        const selectedVisible = selectedProducts.filter(id =>
            filteredProducts.some(p => p.product_id === id)
        ).length;
        el.indeterminate = selectedVisible > 0 && selectedVisible < total;
        el.checked = total > 0 && selectedVisible === total;
    }, [selectedProducts, filteredProducts]);

    // Handlers
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
        const allSelected = visibleIds.length > 0 && visibleIds.every(id => selectedProducts.includes(id));

        if (allSelected) {
            // Unselect only the visible ones
            setSelectedProducts(prev => prev.filter(id => !visibleIds.includes(id)));
        } else {
            // Add visible ones to current selection
            const updated = new Set(selectedProducts);
            visibleIds.forEach(id => updated.add(id));
            setSelectedProducts(Array.from(updated));
        }
    };

    const handleAssignTag = () => {
        if (!assignTag || selectedProducts.length === 0) return;
        axios.post("http://localhost:5000/api/tags/assign-multiple", {
            tag_id: assignTag,
            product_ids: selectedProducts
        }).then(() => {
            alert("Tag assigned successfully");
            fetchProducts();
        });
    };

    const handleRemoveTag = () => {
        if (!assignTag || selectedProducts.length === 0) return;
        axios.delete("http://localhost:5000/api/tags/remove-multiple", {
            data: {
                tag_id: assignTag,
                product_ids: selectedProducts
            }
        }).then(() => {
            alert("Tag removed successfully");
            fetchProducts();
        });
    };

    const handleNukeTags = () => {
        if (selectedProducts.length === 0) return;
        axios.delete("http://localhost:5000/api/tags/remove-all", {
            data: {
                product_ids: selectedProducts
            }
        }).then(() => {
            alert("All tags removed from selected products");
            fetchProducts();
        });
    };

    const getCategoryName = (id) => {
        const match = categories.find(c => c.id === id || c.category_id === id);
        return match?.name ?? "Unknown";
    };

    const getBrandName = (id) => {
        const match = brands.find(b => b.id === id || b.brand_id === id);
        return match?.name ?? "Unknown";
    };

    const isActionDisabled = !assignTag || selectedProducts.length === 0;

    return (
        <div>
            <h2>Tag Management Panel</h2>

            {/* Filters row */}
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
                        <option key={c.id ?? c.category_id} value={c.id ?? c.category_id}>
                            {c.name}
                        </option>
                    ))}
                </select>

                <select value={brand} onChange={(e) => setBrand(e.target.value)}>
                    <option value="all">All Brands</option>
                    {brands.map(b => (
                        <option key={b.id ?? b.brand_id} value={b.id ?? b.brand_id}>
                            {b.name}
                        </option>
                    ))}
                </select>

                {/* Tag filter dropdown */}
                <select value={filterTag} onChange={(e) => setFilterTag(e.target.value)}>
                    <option value="">All Tags</option>
                    {tags.map(tag => (
                        <option key={tag.id} value={String(tag.id)}>
                            {tag.name}
                        </option>
                    ))}
                </select>

                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="asc">Name ASC</option>
                    <option value="desc">Name DESC</option>
                </select>
            </div>

            {/* Tag actions */}
            <div>
                <label style={{ marginRight: "8px" }}>Set tag:</label>
                <select value={assignTag} onChange={(e) => setAssignTag(e.target.value)}>
                    {tags.map(tag => (
                        <option key={tag.id} value={String(tag.id)}>
                            {tag.name}
                        </option>
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
                                {Array.isArray(p.tags) && p.tags.length > 0
                                    ? p.tags.map(tag => tag.name).join(", ")
                                    : "—"}
                            </td>
                        </tr>
                    ))}
                    {filteredProducts.length === 0 && (
                        <tr>
                            <td colSpan="5">No products found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default TagAssignmentPanel;
