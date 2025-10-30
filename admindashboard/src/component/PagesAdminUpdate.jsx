import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import JoditEditor from "jodit-react";
import DOMPurify from "dompurify";
import "../CSS/productupdate.css";

export default function PagesAdminUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editor = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    status: "draft",
    image: "",
  });
  const [editorContent, setEditorContent] = useState("");
  const [file, setFile] = useState(null);

  // Lấy dữ liệu trang ban đầu
  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/pages/${id}`);
        const { title, slug, content, status, image } = res.data;
        setFormData({ title, slug, content, status, image });
        setEditorContent(content); // Set nội dung cho editor
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu trang:", err);
        navigate("/pages");
      }
    };
    fetchPage();
  }, [id, navigate]);

  // Tạo slug tự động
  const generateSlug = (text) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  // Handle input
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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpdate = async () => {
    const data = new FormData();
    data.append("title", formData.title);
    data.append("slug", formData.slug);

    // ✅ Sanitize nội dung editor trước khi gửi
    const sanitizedContent = DOMPurify.sanitize(editorContent, {
      ALLOWED_TAGS: ["p", "ul", "ol", "li", "a", "br", "img"],
      ALLOWED_ATTR: ["href", "target", "src", "alt"],
    });
    data.append("content", sanitizedContent);

    data.append("status", formData.status);

    if (file) {
      data.append("image", file);
    } else {
      data.append("image", formData.image);
    }

    try {
      await axios.put(`http://localhost:5000/api/pages/${id}`, data);
      navigate("/pages");
    } catch (err) {
      console.error("Lỗi khi cập nhật trang:", err);
    }
  };

  return (
    <div className="update-form-container">
      <h2>Cập nhật Trang</h2>

      <div>
        <label>Tiêu đề:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Slug:</label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
        />
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
        <label>Trạng thái:</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="draft">Nháp</option>
          <option value="published">Xuất bản</option>
          <option value="archived">Lưu trữ</option>
        </select>
      </div>

      <div>
        <label>Ảnh đại diện:</label>
        <input type="file" onChange={handleFileChange} />
        {file ? (
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            style={{ marginTop: "10px", maxWidth: "200px", maxHeight: "200px" }}
          />
        ) : formData.image ? (
          <img
            src={`http://localhost:5000/images/pages/${formData.image}`}
            alt="Current"
            style={{ marginTop: "10px", maxWidth: "200px", maxHeight: "200px" }}
          />
        ) : null}
      </div>

      <div>
        <button onClick={handleUpdate}>Lưu</button>
      </div>
    </div>
  );
}
