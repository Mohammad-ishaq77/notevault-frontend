import { useState, useEffect } from "react";
import { addNote, updateNote } from "../utils/api.js";

export default function AddNote({ onNoteAdded, editingNote, onCancelEdit }) {
  const [form, setForm] = useState(
    editingNote || { title: "", description: "", tag: "" }
  );

  useEffect(() => {
    // When editingNote changes, update form
    setForm(editingNote || { title: "", description: "", tag: "" });
  }, [editingNote]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleDescriptionInput = (e) => {
    e.target.style.height = "auto"; // reset height
    e.target.style.height = `${e.target.scrollHeight}px`; // set new height
    setForm({ ...form, description: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      if (editingNote) {
        const updated = await updateNote(editingNote._id, form, token);
        onNoteAdded(updated, true);
        onCancelEdit();
      } else {
        const note = await addNote(form, token);
        onNoteAdded(note, false);
        setForm({ title: "", description: "", tag: "" });
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h3>{editingNote ? "Edit Note" : "Add Note"}</h3>

      <div className="mb-3">
        <input
          name="title"
          placeholder="Title"
          className="form-control"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <textarea
          name="description"
          placeholder="Description"
          className="form-control"
          value={form.description}
          onInput={handleDescriptionInput}
          rows={1} // initial size
          required
        />
      </div>

      <div className="mb-3">
        <input
          name="tag"
          placeholder="Tag"
          className="form-control"
          value={form.tag}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary me-2">
        {editingNote ? "Update" : "Add"}
      </button>
      {editingNote && (
        <button type="button" className="btn btn-secondary" onClick={onCancelEdit}>
          Cancel
        </button>
      )}
    </form>
  );
}
