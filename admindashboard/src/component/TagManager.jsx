import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/TagManager.css"; // ✅ Import your CSS file

const TagManager = () => {
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");
    const [editingTagId, setEditingTagId] = useState(null);
    const [editingTagName, setEditingTagName] = useState("");

    useEffect(() => {
        fetchTags();
    }, []);

    const fetchTags = () => {
        axios.get("http://localhost:5000/api/tags")
            .then(res => setTags(res.data))
            .catch(err => console.error("Failed to fetch tags", err));
    };

    const handleCreateTag = () => {
        if (!newTag.trim()) return;
        axios.post("http://localhost:5000/api/tags", { name: newTag })
            .then(() => {
                setNewTag("");
                fetchTags();
            })
            .catch(err => alert("Failed to create tag"));
    };

    const handleDeleteTag = async (id) => {
        if (!window.confirm("Are you sure you want to delete this tag?")) return;
        console.log("Deleting tag ID:", id);
        try {
            const res = await axios.delete(`http://localhost:5000/api/tags/${id}`);
            if (res.status === 200 || res.status === 204) {
                fetchTags();
            } else {
                console.warn("Unexpected status:", res.status);
                alert("Failed to delete tag");
            }
        } catch (err) {
            console.error("Delete error:", err);
            alert("Failed to delete tag");
        }
    };

    const handleEditTag = (id, name) => {
        setEditingTagId(id);
        setEditingTagName(name);
    };

    const handleUpdateTag = () => {
        if (!editingTagName.trim()) return;
        axios.put(`http://localhost:5000/api/tags/${editingTagId}`, { name: editingTagName })
            .then(() => {
                setEditingTagId(null);
                setEditingTagName("");
                fetchTags();
            })
            .catch(err => alert("Failed to update tag"));
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Tag Manager</h2>

            <div style={{ marginBottom: "20px" }}>
                <h3>Create New Tag</h3>
                <input
                    type="text"
                    placeholder="Enter tag name"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    style={{ padding: "10px", borderRadius: "6px", marginRight: "10px" }}
                />
                <button onClick={handleCreateTag} disabled={!newTag.trim()}>
                    Create Tag
                </button>
            </div>

            <h3>Existing Tags</h3>
            <ul className="tag-list">
                {tags.map((tag) => (
                    <li key={tag.id} className="tag-item">
                        {editingTagId === tag.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editingTagName}
                                    onChange={(e) => setEditingTagName(e.target.value)}
                                    style={{ padding: "6px", borderRadius: "4px", marginRight: "8px", flexGrow: 1 }}
                                />
                                <div className="tag-actions">
                                    <button onClick={handleUpdateTag}>Save</button>
                                    <button onClick={() => setEditingTagId(null)} style={{ marginLeft: "6px" }}>
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <span className="tag-name">{tag.name}</span>
                                <div className="tag-actions">
                                    <button onClick={() => handleEditTag(tag.id, tag.name)}>Edit</button>
                                    <button onClick={() => handleDeleteTag(tag.id)} className="delete-btn">
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TagManager;
