import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import JoditEditor from "jodit-react";
import DOMPurify from "dompurify"; // ✅ Thêm DOMPurify
import "../CSS/productupdate.css";

export default function NewsAdminUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editor = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    category_id: "",
    status: "draft",
    published_at: "",
    image: "",
  });

  const [file, setFile] = useState(null); // File mới
  const [categories, setCategories] = useState([]);
  const [editorContent, setEditorContent] = useState(""); // Nội dung editor
  const [isLoading, setIsLoading] = useState(true);

  // 1️⃣ Fetch dữ liệu bài viết và danh mục
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, catRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/news/id/${id}`),
          axios.get("http://localhost:5000/api/news-category"),
        ]);
        const news = newsRes.data;
        setFormData({
          title: news.title || "",
          slug: news.slug || "",
          content: news.content || "",
          category_id: news.category_id || "",
          status: news.status || "draft",
          published_at: news.published_at || "",
          image: news.image || "",
        });
        setEditorContent(news.content || "");
        setCategories(catRes.data || []);
        setIsLoading(false);
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu:", err);
        alert("Không thể tải dữ liệu bài viết.");
        setIsLoading(false);
        navigate("/news");
      }
    };
    fetchData();
  }, [id, navigate]);

  // 2️⃣ Xử lý input và tạo slug
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

  // 3️⃣ Xử lý file ảnh
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // 4️⃣ Submit
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("slug", formData.slug);

      // ✅ Sanitize content trước khi gửi
      const sanitizedContent = DOMPurify.sanitize(editorContent, {
        ALLOWED_TAGS: ["p", "ul", "ol", "li", "a", "br", "img"],
        ALLOWED_ATTR: ["href", "target", "src", "alt"],
      });
      data.append("content", sanitizedContent);

      data.append("category_id", formData.category_id);
      data.append("status", formData.status);
      data.append("published_at", formData.published_at || "");

      // ✅ File mới hoặc giữ tên cũ
      if (file) data.append("image", file);
      else data.append("image", formData.image);

      await axios.put(`http://localhost:5000/api/news/id/${id}`, data);
      alert("Cập nhật bài viết thành công!");
      navigate("/news");
    } catch (err) {
      console.error("Lỗi khi cập nhật:", err);
      alert("Cập nhật thất bại!");
    }
  };

  if (isLoading) return <div>Đang tải dữ liệu...</div>;

  return (
    <div className="update-form-container">
      <h2>Cập nhật Bài Viết</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Tiêu đề:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </div>

        <div>
          <label>Slug:</label>
          <input type="text" name="slug" value={formData.slug} onChange={handleChange} />
        </div>

        <div>
          <label>Nội dung:</label>
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
        </div>

        <div>
          <label>Danh mục:</label>
          <select name="category_id" value={formData.category_id} onChange={handleChange}>
            <option value="">-- Chọn danh mục --</option>
            {categories.map((cat) => (
              <option key={cat.category_id} value={cat.category_id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Trạng thái:</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div>
          <label>Ảnh:</label>
          <input type="file" onChange={handleFileChange} />
          {file ? (
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              style={{ marginTop: "10px", maxWidth: "200px", maxHeight: "200px" }}
            />
          ) : formData.image ? (
            <>
              <img
                src={`http://localhost:5000/images/news/${formData.image}`}
                alt="Current"
                style={{ marginTop: "10px", maxWidth: "200px", maxHeight: "200px" }}
              />
              <p style={{ marginTop: "5px", fontStyle: "italic" }}>
                Tên ảnh: {formData.image}
              </p>
            </>
          ) : null}
        </div>

        <div>
          <label>Ngày xuất bản:</label>
          <input
            type="date"
            name="published_at"
            value={formData.published_at ? formData.published_at.split("T")[0] : ""}
            onChange={handleChange}
          />
        </div>

        <button type="submit" style={{ marginTop: "20px", padding: "10px 20px" }}>
          Lưu
        </button>
      </form>
    </div>
  );
}
