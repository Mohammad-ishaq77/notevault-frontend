import React from "react";

export default function Navbar({ onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#000" }}>
      <div className="container-fluid">
        {/* Brand/Logo */}
        <a className="navbar-brand" href="#">
          <img
            src="/notes.png"
            alt="NoteVault Logo"
            height="50" // adjust size as needed
            className="d-inline-block align-text-top"
          />
        </a>

        {/* Right-side button */}
        <div className="d-flex ms-auto">
          <button 
            className="btn btn-outline-light" 
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
