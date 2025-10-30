import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import DOMPurify from "dompurify";
import "../CSS/productupdate.css";

const PagesAdminAdd = () => {
  const navigate = useNavigate();
  const editor = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    status: "draft",
  });
  const [editorContent, setEditorContent] = useState(""); // Nội dung editor
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Tạo slug tự động
  const generateSlug = (text) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setFormData((prev) => ({
        ...prev,
        title: value,
        slug: generateSlug(value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};
    if (!formData.title) validationErrors.title = "Tiêu đề không được để trống";
    if (!formData.slug) validationErrors.slug = "Slug không được để trống";
    if (!editorContent) validationErrors.content = "Nội dung không được để trống";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("slug", formData.slug);

    // ✅ Sanitize editor content trước khi gửi
    const sanitizedContent = DOMPurify.sanitize(editorContent, {
      ALLOWED_TAGS: ["p", "ul", "ol", "li", "a", "br", "img"],
      ALLOWED_ATTR: ["href", "target", "src", "alt"],
    });
    data.append("content", sanitizedContent);

    data.append("status", formData.status);
    if (image) data.append("image", image);

    setLoading(true);
    fetch("http://localhost:5000/api/pages", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log("Response:", resData);
        setTimeout(() => {
          navigate("/pages");
        }, 1000);
        setFormData({ title: "", slug: "", content: "", status: "draft" });
        setEditorContent("");
        setImage(null);
        setErrors({});
      })
      .catch((err) => {
        console.error("Error when adding page:", err);
        alert("Lỗi khi thêm trang.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="update-form-container">
      <h2>Thêm Trang Mới</h2>
      <form onSubmit={handleSubmit}>
        {/* Tiêu đề */}
        <label>Tiêu đề</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Nhập tiêu đề"
          required
        />
        {errors.title && <p className="error">{errors.title}</p>}

        {/* Slug */}
        <label>Slug</label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          placeholder="Nhập slug (đường dẫn)"
          required
        />
        {errors.slug && <p className="error">{errors.slug}</p>}

        {/* Nội dung */}
        <label>Nội dung</label>
        <JoditEditor
          ref={editor}
          value={editorContent}
          onBlur={(newContent) => {
            setEditorContent(newContent);
            setFormData((prev) => ({ ...prev, content: newContent }));
          }}
          config={{
            readonly: false,
            height: 300,
            toolbarSticky: false,
            buttons:
              "ul,ol,|,left,center,right,justify,|,link,image,table,|,source",
            cleanHTML: {
              cleanOnPaste: true,
              replaceNBSP: true,
              removeEmptyElements: true,
              removeTags: ["style", "script", "b", "strong", "i", "u"],
            },
            askBeforePasteHTML: false,
            askBeforePasteFromWord: false,
            disablePlugins: ["pasteStorage"],
            pasteHTMLAction: "insert_clear",
            processPasteHTML: true,
            processPasteFromWord: true,
          }}
        />
        {errors.content && <p className="error">{errors.content}</p>}

        {/* Trạng thái */}
        <label>Trạng thái</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="draft">Nháp</option>
          <option value="published">Xuất bản</option>
          <option value="archived">Lưu trữ</option>
        </select>

        {/* Ảnh */}
        <label>Ảnh</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            style={{ marginTop: "10px", maxWidth: "200px", maxHeight: "200px" }}
          />
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Đang thêm..." : "Thêm"}
        </button>
      </form>
    </div>
  );
};

export default PagesAdminAdd;
