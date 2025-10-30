import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import JoditEditor from "jodit-react";
import DOMPurify from "dompurify";

import "../CSS/product.css";

const variantSuggestions = {
  "Áo Cầu Lông": { sizes: ["S", "M", "L", "XL", "XXL"], imagePerColor: false },
  "Giày Cầu Lông": { sizes: ["38", "39", "40", "41", "42", "43", "44"], imagePerColor: true },
  "Vợt Cầu Lông": { sizes: ["3U", "4U"], imagePerColor: false },
  "Vợt PickleBall": { sizes: ["3U", "4U"], imagePerColor: false },
  "Vợt Tennis": { sizes: ["3U", "4U"], imagePerColor: false },
};

// Bảng màu chung
const colorPalette = [
  "Đen", "Trắng", "Đỏ", "Xanh", "Vàng", "Xám", "Xanh Navy", "Hồng", "Nâu", "Cam", "Tím",
];
function toSlug(str) {
  str = str
    .normalize("NFD") // tách ký tự + dấu
    .replace(/[\u0300-\u036f]/g, "") // bỏ dấu
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/[^a-zA-Z0-9\s-]/g, "") // loại ký tự đặc biệt
    .trim()
    .replace(/\s+/g, "-") // khoảng trắng → "-"
    .toLowerCase();
  return str;
}
function ProductAdd() {
  const navigate = useNavigate();
  const editor = useRef(null);

  const [productData, setProductData] = useState({
    category_id: "",
    brand_id: "",
    name: "",
    slug: "",
    description: "",
    price: "",
  });

  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [stockMap, setStockMap] = useState({});
  const [colorFiles, setColorFiles] = useState({});
  const [imagePerColor, setImagePerColor] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/category").then(res => setCategories(res.data));
    axios.get("http://localhost:5000/api/brand").then(res => setBrands(res.data));
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

      if (name === "name") {
      const generatedSlug = toSlug(value); // dùng hàm mới
      setProductData(prev => ({ ...prev, name: value, slug: generatedSlug }));
    } else if (name === "price") {
      // Loại bỏ dấu phân cách, lưu số nguyên
      const numericValue = parseInt(value.toString().replace(/\./g, ""), 10) || 0;
      setProductData(prev => ({ ...prev, price: numericValue }));
    } else {
      setProductData(prev => ({ ...prev, [name]: value }));
    }
  }, []);

  useEffect(() => {
    if (!productData.category_id) return;
    const category = categories.find(c => c.category_id === parseInt(productData.category_id));
    if (!category) return;
    const variant = variantSuggestions[category.name] || { sizes: [], imagePerColor: false };
    setSizes(variant.sizes);
    setSelectedSizes(variant.sizes);
    setSelectedColors([]);
    setStockMap({});
    setColorFiles({});
    setImagePerColor(variant.imagePerColor);
  }, [productData.category_id, categories]);

  const toggleSelection = (key, value) => {
    if (key === "size") {
      setSelectedSizes(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    } else if (key === "color") {
      setSelectedColors(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    }
  };

  const handleStockChange = (size, color, value) => {
    const key = `${size}-${color}`;
    setStockMap(prev => ({ ...prev, [key]: parseInt(value) || 0 }));
  };

  const handleColorFileChange = (e, color) => {
    setColorFiles(prev => ({ ...prev, [color]: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const { category_id, brand_id, name, slug, price, description } = productData;
  if (!category_id || !brand_id || !name || !slug || !price || !file) {
    alert("Vui lòng nhập đầy đủ thông tin sản phẩm!");
    return;
  }

  try {
    const data = new FormData();

    Object.entries(productData).forEach(([key, value]) => {
      if (key === "description") {
        // Loại bỏ thẻ không mong muốn, chỉ giữ cơ bản
        const cleanDesc = DOMPurify.sanitize(value, {
          ALLOWED_TAGS: ["p", "ul", "ol", "li", "a", "br", "img"],
          ALLOWED_ATTR: ["href", "target", "src", "alt"],
        });
        const finalDesc = cleanDesc.replace(/<\/?(b|u|span|strong|i)[^>]*>/g, "");
        data.append("description", finalDesc);
      } else if (key === "price") {
        // Ép kiểu nguyên, tránh ±1 đơn vị
        const numPrice = Math.round(Number(value));
        data.append("price", !isNaN(numPrice) && numPrice >= 0 ? numPrice : 0);
      } else {
        data.append(key, value);
      }
    });

    data.append("image", file);

    const res = await axios.post("http://localhost:5000/api/products", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const product_id = res.data.product_id;

    const variantsArray = [];
    selectedSizes.forEach(size => {
      selectedColors.forEach(color => {
        const key = `${size}-${color}`;
        const stockValue = Math.round(stockMap[key]) || 0;
        variantsArray.push({
          size,
          color,
          stock: stockValue,
          image: imagePerColor ? colorFiles[color]?.name || null : null,
        });
      });
    });

    const variantData = new FormData();
    variantData.append("product_id", product_id);
    variantData.append("variants", JSON.stringify(variantsArray));

    if (imagePerColor) {
      Object.keys(colorFiles).forEach(color => {
        if (colorFiles[color]) variantData.append(`colorFile-${color}`, colorFiles[color]);
      });
    }

    await axios.post("http://localhost:5000/api/product-materials", variantData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Tạo sản phẩm và thêm biến thể thành công!");
    navigate("/product");
  } catch (err) {
    console.error(err);
    alert("Lỗi server khi tạo sản phẩm hoặc thêm biến thể");
  }
};

  return (
    <div className="form-container">
      <h2>Thêm sản phẩm mới</h2>
      <form onSubmit={handleSubmit}>
        <label>Danh mục *</label>
        <select
          name="category_id"
          value={productData.category_id}
          onChange={handleChange}
          required
        >
          <option value="">-- Chọn danh mục --</option>
          {categories.map((c) => (
            <option key={c.category_id} value={c.category_id}>
              {c.name}
            </option>
          ))}
        </select>

        <label>Thương hiệu *</label>
        <select
          name="brand_id"
          value={productData.brand_id}
          onChange={handleChange}
          required
        >
          <option value="">-- Chọn thương hiệu --</option>
          {brands.map((b) => (
            <option key={b.brand_id} value={b.brand_id}>
              {b.name}
            </option>
          ))}
        </select>

        <label>Tên sản phẩm *</label>
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={handleChange}
          required
        />

        <label>Slug sản phẩm *</label>
        <input
          type="text"
          name="slug"
          value={productData.slug}
          onChange={handleChange}
          required
          disabled
        />

        <label>Mô tả sản phẩm *</label>
                <JoditEditor
              ref={editor}
              value={productData.description}
              onBlur={(newContent) => {
                // chỉ cập nhật khi rời khỏi editor
                setProductData((prev) => ({ ...prev, description: newContent }));
              }}
              config={{
                readonly: false,
                height: 300,
                toolbarSticky: false,
                buttons:
                  "ul,ol,|,left,center,right,justify,|,link,image,table,|,source",
                showCharsCounter: true,
                showWordsCounter: true,
                showXPathInStatusbar: false,
                // ✅ Làm sạch nội dung khi dán (không copy style, màu, font, in đậm)
                cleanHTML: {
                  cleanOnPaste: true,
                  replaceNBSP: true,
                  removeEmptyElements: true,
                  removeTags: ["style", "script", "b", "strong", "u", "i"],
                },
                askBeforePasteHTML: false,
                askBeforePasteFromWord: false,
                disablePlugins: ["pasteStorage"],
                pasteHTMLAction: "insert_clear",
                processPasteHTML: true,
                processPasteFromWord: true,
              }}
            />

            <label>Giá *</label>
             <input
                type="text"
                name="price"
                value={productData.price.toLocaleString("vi-VN")}
                onChange={handleChange}
                required
              />

        <label>Hình ảnh chính *</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />

        {sizes.length > 0 && (
          <div>
            <label>Kích cỡ:</label>
            <div className="button-group">
              {sizes.map((size) => (
                <button
                  type="button"
                  key={size}
                  className={selectedSizes.includes(size) ? "active" : ""}
                  onClick={() => toggleSelection("size", size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <label>Màu sắc:</label>
          <div className="button-group">
            {colorPalette.map((color) => (
              <button
                type="button"
                key={color}
                className={selectedColors.includes(color) ? "active" : ""}
                onClick={() => toggleSelection("color", color)}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {imagePerColor && selectedColors.length > 0 && (
          <div style={{ marginTop: "10px" }}>
            <h3>Ảnh từng màu</h3>
            {selectedColors.map((color) => (
              <div key={color}>
                <span>{color}: </span>
                <input
                  type="file"
                  onChange={(e) => handleColorFileChange(e, color)}
                  required
                />
              </div>
            ))}
          </div>
        )}

        {(selectedSizes.length > 0 || selectedColors.length > 0) && (
          <div style={{ marginTop: "20px" }}>
            <h3>Nhập số lượng cho từng biến thể</h3>
            {selectedSizes.length > 0 && selectedColors.length > 0 ? (
              selectedSizes.map((size) =>
                selectedColors.map((color) => (
                  <div key={`${size}-${color}`}>
                    <span>
                      {size} - {color}:{" "}
                    </span>
                    <input
                      type="number"
                      value={stockMap[`${size}-${color}`] || ""}
                      onChange={(e) =>
                        handleStockChange(size, color, e.target.value)
                      }
                    />
                  </div>
                ))
              )
            ) : (
              selectedColors.map((color) => (
                <div key={color}>
                  <span>{color}: </span>
                  <input
                    type="number"
                    value={stockMap[`_-${color}`] || ""}
                    onChange={(e) =>
                      handleStockChange("_", color, e.target.value)
                    }
                  />
                </div>
              ))
            )}
          </div>
        )}

        <button type="submit" style={{ marginTop: "20px" }}>
          Thêm sản phẩm & biến thể
        </button>
      </form>
    </div>
  );
}

export default ProductAdd;
