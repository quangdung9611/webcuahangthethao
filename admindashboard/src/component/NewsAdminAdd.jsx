import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import DOMPurify from "dompurify";
import "../CSS/product.css";

const NewsAdminAdd = () => {
  const navigate = useNavigate();
  const editor = useRef(null);

  const [formData, setFormData] = useState({
    category_id: "",
    title: "",
    slug: "",
    content: "",
    status: "draft",
    published_at: "",
  });
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};
    if (!formData.title) validationErrors.title = "Tiêu đề không được để trống";
    if (!formData.slug) validationErrors.slug = "Slug không được để trống";
    if (!formData.content) validationErrors.content = "Nội dung không được để trống";
    if (!formData.category_id) validationErrors.category_id = "Danh mục không được để trống";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = new FormData();
    data.append("category_id", formData.category_id);
    data.append("title", formData.title);
    data.append("slug", formData.slug);
    data.append(
      "content",
      DOMPurify.sanitize(formData.content, {
        ALLOWED_TAGS: ["p", "ul", "ol", "li", "a", "br", "img"],
        ALLOWED_ATTR: ["href", "target", "src", "alt"],
        FORBID_TAGS: ["b", "strong", "i", "u", "style", "script"],
      })
    );
    data.append("status", formData.status);
    data.append("published_at", formData.published_at);
    if (image) data.append("image", image);

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/news", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      console.log("Response:", result);
      navigate("/news");
      // Reset form
      setFormData({
        category_id: "",
        title: "",
        slug: "",
        content: "",
        status: "draft",
        published_at: "",
      });
      setImage(null);
      setErrors({});
    } catch (err) {
      console.error("Error when adding news:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-form-container">
      <h2>Thêm Tin Tức</h2>
      <form onSubmit={handleSubmit}>
        <label>Danh mục</label>
        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          required
        >
          <option value="">-- Chọn danh mục --</option>
          <option value="1">Tin tức</option>
          <option value="2">Giới thiệu</option>
          <option value="3">Hướng dẫn thanh toán</option>
          <option value="4">Hướng dẫn bảo hành</option>
        </select>
        {errors.category_id && <p className="error">{errors.category_id}</p>}

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

        <label>Slug</label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          placeholder="Nhập slug"
          required
          disabled
        />
        {errors.slug && <p className="error">{errors.slug}</p>}

        <label>Nội dung</label>
        <JoditEditor
          ref={editor}
          value={formData.content}
          onBlur={(newContent) => setFormData((prev) => ({ ...prev, content: newContent }))}
          config={{
            readonly: false,
            height: 300,
            toolbarSticky: false,
            buttons: "ul,ol,|,left,center,right,justify,|,link,image,table,|,source",
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
        {errors.content && <p className="error">{errors.content}</p>}

        <label>Trạng thái</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>

        <label>Ngày xuất bản</label>
        <input
          type="date"
          name="published_at"
          value={formData.published_at}
          onChange={handleChange}
        />

        <label>Ảnh</label>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

        <button type="submit" disabled={loading}>
          {loading ? "Đang thêm..." : "Thêm"}
        </button>
      </form>
    </div>
  );
};

export default NewsAdminAdd;
