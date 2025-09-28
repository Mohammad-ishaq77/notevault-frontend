import { useState } from "react";

export default function About() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Thank you for your feedback! We will contact you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="container my-5">
      {/* About Section */}
      <p className="text-center text-dark">
        NoteVault is a secure and user-friendly note-taking application designed to help you
        store, organize, and manage your notes efficiently. Built using the MERN stack 
        (MongoDB, Express.js, React, Node.js), it ensures your notes are accessible anytime, anywhere.
      </p>

      <h3 className="mt-4 text-dark">How It Works</h3>
      <ul className="text-dark">
        <li><strong>Signup/Login:</strong> Create an account or log in to access your personal notes.</li>
        <li><strong>Add Notes:</strong> Add new notes with a title, description, and tag.</li>
        <li><strong>Edit & Update:</strong> Edit any note and update it in real-time.</li>
        <li><strong>Delete Notes:</strong> Remove notes you no longer need.</li>
        <li><strong>Download PDF:</strong> Download all your notes as a single PDF file for offline access.</li>
        <li><strong>Secure Storage:</strong> Notes are securely stored in a MongoDB database.</li>
        <li><strong>Feedback:</strong> If you encounter any problems or have suggestions, please send them using the feedback form below.</li>
      </ul>

      <p className="mt-4 text-center text-dark">
        <strong>Developer:</strong> Developed with ❤️ by Mohammad Ishaq, MERN Stack Developer.<br />
        <strong>Email:</strong> <a href="mailto:khanishaqk88@gmail.com">khanishaqk88@gmail.com</a>
      </p>

      {/* Feedback Form */}
      <h3 className="mt-5 text-dark">Feedback</h3>
      <form 
        onSubmit={handleSubmit} 
        className="card p-4 shadow" 
        style={{ backgroundColor: "#212529", color: "#f8f9fa" }}
      >
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control bg-dark text-light border-secondary"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control bg-dark text-light border-secondary"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea
            name="message"
            className="form-control bg-dark text-light border-secondary"
            rows="4"
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-light w-100">
          Send Feedback
        </button>
      </form>
    </div>
  );
}
