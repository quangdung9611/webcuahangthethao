import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import JoditEditor from "jodit-react";
import DOMPurify from "dompurify"; // ✅ Thêm thư viện này
import "../CSS/productupdate.css"; // Đảm bảo file CSS này tồn tại

// Gợi ý size theo danh mục
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
  return str
    .normalize("NFD") // tách ký tự + dấu
    .replace(/[\u0300-\u036f]/g, "") // bỏ dấu
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/[^a-zA-Z0-9\s-]/g, "") // loại ký tự đặc biệt
    .trim()
    .replace(/\s+/g, "-") // khoảng trắng → "-"
    .toLowerCase();
}
export default function ProductUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editor = useRef(null);

  const [formData, setFormData] = useState({
    category_id: "",
    brand_id: "",
    name: "",
    slug: "",
    description: "", // Giữ nguyên nội dung HTML từ Jodit
    price: "",
    image: "", // Tên ảnh chính hiện tại
  });
  const [file, setFile] = useState(null); // File ảnh chính mới
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Trạng thái tải dữ liệu

  // Biến thể
  const [sizes, setSizes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [stockMap, setStockMap] = useState({});
  const [colorFiles, setColorFiles] = useState({}); // Lưu File object mới hoặc string (tên file cũ)
  const [imagePerColor, setImagePerColor] = useState(false);
const [editorContent, setEditorContent] = useState("");
const typingTimeout = useRef(null);
  // ================== 1. Fetch data cơ bản (Product, Categories, Brands) ==================
  const stripHtml = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};
// 👇 Đặt ngay sau đây
// useEffect(() => {
//   setFormData(prev => ({ ...prev, description: editorContent }));
// }, [editorContent]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      // Tải danh mục và thương hiệu
      const [catRes, brandRes] = await Promise.all([
        axios.get("http://localhost:5000/api/category"),
        axios.get("http://localhost:5000/api/brand"),
      ]);
      setCategories(catRes.data);
      setBrands(brandRes.data);

      // Tải thông tin sản phẩm
      const productRes = await axios.get(`http://localhost:5000/api/products/${id}`);
      const product = productRes.data;

      // Gán dữ liệu vào form
      setFormData({
        category_id: product.category_id || "",
        brand_id: product.brand_id || "",
        name: product.name || "",
        slug: product.slug || "",
        description: product.description || "",
        price: product.price || "",
        image: product.image || "",
      });
      // ✅ Gán nội dung mô tả đã được làm sạch
        const cleanHTML = DOMPurify.sanitize(product.description || "", {
          ALLOWED_TAGS: ["p", "ul", "ol", "li", "a", "br"],
          ALLOWED_ATTR: ["href", "target"],
        });
      // Gán nội dung HTML vào editor
      setEditorContent(product.description || "");

      setIsLoading(false);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu ban đầu:", err);
      alert("Không thể tải dữ liệu sản phẩm.");
      setIsLoading(false);
    }
  };

  fetchData();
}, [id]);

  // ================== 2. Fetch Biến thể (Variants) ==================
  const fetchVariants = useCallback(async (currentCategoryId, currentCategories) => {
    if (!currentCategoryId || currentCategories.length === 0) return;

    try {
      const res = await axios.get(`http://localhost:5000/api/product-materials/${id}`);
      const materials = res.data;

      const category = currentCategories.find(c => c.category_id === parseInt(currentCategoryId));
      const variant = variantSuggestions[category?.name] || { sizes: [], imagePerColor: false };

      // Cập nhật gợi ý size và trạng thái ảnh theo màu
      setSizes(variant.sizes);
      setImagePerColor(variant.imagePerColor);

      if (materials.length > 0) {
        const sizesSet = new Set();
        const colorsSet = new Set();
        const stockTmp = {};
        const colorFileTmp = {};

        for (let m of materials) {
          if (m.size) sizesSet.add(m.size);
          if (m.color) colorsSet.add(m.color);

          const key = `${m.size || ""}-${m.color || ""}`;
          // Giả định backend trả về stock trong API này. Nếu không, phải gọi API stock riêng
          if (m.stock !== undefined) {
             stockTmp[key] = m.stock;
          } else if (m.material_id) {
             // FALLBACK: Gọi API stock riêng (chậm hơn)
             const stockRes = await axios.get(`http://localhost:5000/api/product-materials/${m.material_id}/stock`);
             stockTmp[key] = stockRes.data.stock || 0;
          }

          if (m.image) colorFileTmp[m.color] = m.image; // Lưu tên file ảnh cũ
        }

        setSelectedSizes(Array.from(sizesSet).length > 0 ? Array.from(sizesSet) : variant.sizes);
        setSelectedColors(Array.from(colorsSet));
        setStockMap(stockTmp);
        setColorFiles(colorFileTmp);
      } else {
        // Nếu chưa có material, áp dụng gợi ý mặc định
        setSelectedSizes(variant.sizes);
        setSelectedColors([]);
        setStockMap({});
        setColorFiles({});
      }
    } catch (err) {
      console.error("Lỗi khi tải biến thể:", err);
    }
  }, [id]);

  // Gọi fetchVariants sau khi dữ liệu cơ bản đã tải xong
  useEffect(() => {
    if (!isLoading && formData.category_id && categories.length > 0) {
      fetchVariants(formData.category_id, categories);
    }
  }, [isLoading, formData.category_id, categories, fetchVariants]);

  // ================== Handle Input ==================
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .normalize("NFD") // loại bỏ dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-") // thay thế ký tự không hợp lệ bằng dấu gạch ngang
    .replace(/^-+|-+$/g, ""); // loại bỏ dấu gạch ngang ở đầu/cuối
};
  // Hàm xử lý chung cho input/select
 const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "price") {
    // Loại bỏ dấu phân cách, chỉ lấy số
    const numericValue = parseInt(value.replace(/\./g, ""), 10) || 0;
    setFormData(prev => ({ ...prev, price: numericValue }));
  } else if (name === "name") {
  const generatedSlug = toSlug(value); // ✅ dùng hàm mới
  setFormData(prev => ({ ...prev, name: value, slug: generatedSlug }));
}
 else {
    setFormData(prev => ({ ...prev, [name]: value }));
  }
};
 // Hàm xử lý file ảnh chính
  const handleFileChange = (e) => setFile(e.target.files[0]);

  // ================== Handle Biến thể ==================

  // Xử lý toggle size/color
  const toggleSelection = (key, value) => {
    if (key === "size") {
      setSelectedSizes(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    } else if (key === "color") {
      setSelectedColors(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    }
  };

  // Xử lý nhập số lượng tồn kho
  const handleStockChange = (size, color, value) => {
    const key = `${size || ""}-${color || ""}`;
    setStockMap(prev => ({ ...prev, [key]: parseInt(value) || 0 }));
  };

  // Xử lý file ảnh từng màu
  const handleColorFileChange = (e, color) => {
    const file = e.target.files.length > 0 ? e.target.files[0] : null;
    setColorFiles(prev => ({ ...prev, [color]: file }));
  };


  // ================== Submit ==================
 // --- Trong handleUpdate ---
const handleUpdate = async (e) => {
  e.preventDefault();
  const { category_id, brand_id, name, slug, price, description } = formData;
  if (!category_id || !brand_id || !name || !slug || !price) {
    alert("Vui lòng nhập đầy đủ thông tin sản phẩm bắt buộc!");
    return;
  }
  try {
    const productData = new FormData();
    Object.keys(formData).forEach(k => {
      if (k !== "description") productData.append(k, formData[k]);
    });

    // ✅ sửa: sanitize description trước khi gửi
    const sanitizedDesc = DOMPurify.sanitize(editorContent, {
      ALLOWED_TAGS: ["p", "ul", "ol", "li", "a", "br"],
      ALLOWED_ATTR: ["href", "target"],
    });
    productData.append("description", sanitizedDesc);

    // ✅ sửa: ép kiểu giá rõ ràng
    productData.append("price", parseInt(formData.price, 10));

    if (file) productData.append("image", file);

    await axios.put(`http://localhost:5000/api/products/${id}`, productData);

    // --- Cập nhật biến thể ---
    const variantsArray = [];
    const sizesToIterate = selectedSizes.length > 0 ? selectedSizes : [""];
    const colorsToIterate = selectedColors.length > 0 ? selectedColors : [""];

    sizesToIterate.forEach(size => {
      colorsToIterate.forEach(color => {
        const key = `${size || ""}-${color || ""}`;
        const stockValue = stockMap[key] || 0;
        const colorFile = colorFiles[color];

        let imageName = null;
        if (imagePerColor) {
           if (colorFile instanceof File) {
               imageName = colorFile.name; // ✅ sửa: tên file mới
           } else if (typeof colorFile === "string") {
               imageName = colorFile; // ✅ sửa: tên file cũ
           }
        }

        variantsArray.push({
          size,
          color,
          stock: stockValue,
          image: imageName,
        });
      });
    });

    const variantData = new FormData();
    variantData.append("product_id", id);
    variantData.append("variants", JSON.stringify(variantsArray));

    if (imagePerColor) {
      Object.keys(colorFiles).forEach(color => {
        const fileOrString = colorFiles[color];
        if (fileOrString instanceof File) {
          variantData.append(`colorFile-${color}`, fileOrString); // ✅ sửa: upload file mới
        }
      });
    }

    await axios.put(`http://localhost:5000/api/product-materials/upsert/${id}`, variantData);

    alert("Cập nhật sản phẩm và biến thể thành công!");
    navigate("/product");
  } catch (err) {
    console.error("Lỗi cập nhật:", err);
    alert("Cập nhật thất bại!");
  }
};

  if (isLoading) {
    return <div className="update-form-container">Đang tải dữ liệu...</div>;
  }

  // ================== Render ==================
  return (
    <div className="update-form-container">
      <h2>Cập nhật sản phẩm</h2>
      <form onSubmit={handleUpdate}>
        
        {/* Category */}
        <label>Danh mục *</label>
        <select name="category_id" value={formData.category_id} onChange={handleChange} required>
          <option value="">-- Chọn danh mục --</option>
          {categories.map(c => <option key={c.category_id} value={c.category_id}>{c.name}</option>)}
        </select>

        {/* Brand */}
        <label>Thương hiệu *</label>
        <select name="brand_id" value={formData.brand_id} onChange={handleChange} required>
          <option value="">-- Chọn thương hiệu --</option>
          {brands.map(b => <option key={b.brand_id} value={b.brand_id}>{b.name}</option>)}
        </select>

        {/* Name */}
        <label>Tên sản phẩm *</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        {/* Slug */}
        <label>Slug sản phẩm *</label>
        <input type="text" name="slug" value={formData.slug} onChange={handleChange} required />

     {/* Description (JoditEditor) */}
 
<JoditEditor
  ref={editor}
  value={editorContent}
  onBlur={(newContent) => {
    // ✅ sửa: cập nhật editorContent và formData.description khi blur, tránh render liên tục
    setEditorContent(newContent);
    setFormData((prev) => ({ ...prev, description: newContent }));
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
    cleanHTML: {
      cleanOnPaste: true,
      replaceNBSP: true,
      removeEmptyElements: true,
      removeTags: ["style", "script", "b", "strong", "i", "u"], // ✅ sửa: loại bỏ thẻ in đậm, nghiêng, underline
    },
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    disablePlugins: ["pasteStorage"],
    pasteHTMLAction: "insert_clear",
    processPasteHTML: true,
    processPasteFromWord: true,
  }}
  />
      <label>Giá</label>
       <input
          type="text"
          name="price"
          value={formData.price.toLocaleString("vi-VN")}
          onChange={handleChange}
          required
        />


        {/* Main Image */}
        <label>Hình ảnh chính *</label>
        <input type="file" onChange={handleFileChange} />
        {formData.image && (
          <>
            <img 
              src={`http://localhost:5000/images/${formData.image}`} 
              alt="Hình sản phẩm" 
              style={{ width: '200px', height: 'auto', display: 'block', marginTop: '10px' }}
            />
            <p style={{ marginTop: '5px', fontStyle: 'italic' }}>Tên ảnh: {formData.image}</p>
          </>
        )}
        {/* Size Selection */}
        {sizes.length > 0 && (
          <div>
            <label style={{ marginTop: '20px', display: 'block' }}>Kích cỡ:</label>
            <div className="button-group">
              {sizes.map(size => (
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

        {/* Color Selection */}
        <div>
          <label style={{ marginTop: '20px', display: 'block' }}>Màu sắc:</label>
          <div className="button-group">
            {colorPalette.map(color => (
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

        {/* Image Per Color */}
        {imagePerColor && selectedColors.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h3>Ảnh từng màu</h3>
            {selectedColors.map(color => (
              <div key={color} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ minWidth: '80px' }}>{color}: </span>
                <input type="file" onChange={e => handleColorFileChange(e, color)} style={{ marginRight: '10px' }} />
                {colorFiles[color] && (
                  <img
                    src={
                      typeof colorFiles[color] === "string"
                        ? `http://localhost:5000/images/${colorFiles[color]}`
                        : URL.createObjectURL(colorFiles[color]) // Hiển thị ảnh mới tạm thời
                    }
                    alt={color}
                    width={50}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Stock Input */}
        {(selectedSizes.length > 0 || selectedColors.length > 0) && (
          <div style={{ marginTop: '20px' }}>
            <h3>Nhập số lượng tồn kho</h3>
            {/* Logic lặp qua các biến thể đã chọn */}
            {(selectedSizes.length > 0 ? selectedSizes : [""]).map(size =>
              (selectedColors.length > 0 ? selectedColors : [""]).map(color => (
                <div key={`${size}-${color}`} style={{ marginBottom: '10px' }}>
                  <span>{size ? `${size} - ` : ''}{color || 'Mặc định'}: </span>
                  <input
                    type="number"
                    value={stockMap[`${size || ""}-${color || ""}`] || ""}
                    onChange={e => handleStockChange(size, color, e.target.value)}
                    min="0"
                    style={{ marginLeft: '5px', padding: '10px' }}
                  />
                </div>
              ))
            )}
          </div>
        )}

        <button type="submit" style={{ marginTop: "30px", padding: '10px 20px' }}>Cập nhật sản phẩm & biến thể</button>
      </form>
    </div>
  );
}