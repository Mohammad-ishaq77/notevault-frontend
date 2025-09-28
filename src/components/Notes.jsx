import { useEffect, useState, useRef } from "react";
import { fetchNotes, deleteNote } from "../utils/api.js";
import AddNote from "./AddNote.jsx";
import jsPDF from "jspdf";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const addNoteRef = useRef(null); // <-- ref for the AddNote section

  const loadNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await fetchNotes(token);
      setNotes(data);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleNoteAdded = (note, isUpdate) => {
    if (isUpdate) {
      setNotes(notes.map((n) => (n._id === note._id ? note : n)));
    } else {
      setNotes([...notes, note]);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (window.confirm("Delete this note?")) {
      await deleteNote(id, token);
      setNotes(notes.filter((n) => n._id !== id));
    }
  };

  // Scroll to AddNote form when editing
  const handleEdit = (note) => {
    setEditingNote(note);
    addNoteRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Download all notes as PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    let yOffset = 10;

    notes.forEach((note, index) => {
      doc.setFontSize(14);
      doc.text(`Title: ${note.title}`, 10, yOffset);
      yOffset += 8;

      doc.setFontSize(12);
      const descriptionLines = doc.splitTextToSize(
        `Description: ${note.description}`,
        180
      );
      doc.text(descriptionLines, 10, yOffset);
      yOffset += descriptionLines.length * 6;

      doc.setFontSize(10);
      doc.text(`Tag: ${note.tag}`, 10, yOffset);
      yOffset += 10;

      if (yOffset > 280 && index !== notes.length - 1) {
        doc.addPage();
        yOffset = 10;
      }
    });

    doc.save("notes.pdf");
  };

  return (
    <div className="container my-4 text-dark">
      <h2 className="text-center mb-4">Your Notes</h2>

      {/* Add Note Form */}
      <div ref={addNoteRef} className="bg-dark p-3 rounded shadow">
        <AddNote
          onNoteAdded={handleNoteAdded}
          editingNote={editingNote}
          onCancelEdit={() => setEditingNote(null)}
        />
      </div>

      {/* PDF Download Button */}
      <div className="d-flex justify-content-end my-3">
        {notes.length > 0 && (
          <button className="btn btn-success" onClick={downloadPDF}>
            Download All Notes as PDF
          </button>
        )}
      </div>

      {/* Notes Grid */}
      <div className="row mt-4">
        {notes.length === 0 ? (
          <p className="text-muted text-center">No notes found. Add some!</p>
        ) : (
          notes.map((note) => (
            <div key={note._id} className="col-md-4 mb-3">
              <div
                className="card shadow-sm h-100 bg-dark text-light border-secondary"
              >
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{note.title}</h5>
                  <p className="card-text">{note.description}</p>
                  <span className="badge bg-secondary mb-2">{note.tag}</span>
                  <div className="mt-auto d-flex justify-content-between">
                    <button
                      className="btn btn-sm btn-outline-light"
                      onClick={() => handleEdit(note)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(note._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
