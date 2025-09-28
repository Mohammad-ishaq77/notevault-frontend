import React from "react";

export default function HomeNavbar({ onAbout }) {
  return (
    <nav
      className="navbar px-3"
      style={{ padding: "10px", backgroundColor: "#000" }} // solid black
    >
      {/* Logo */}
      <a className="navbar-brand" href="/">
        <img
          src="/notes.png"
          alt="NoteVault Logo"
          height="50" // adjust size as needed
          className="d-inline-block align-text-top"
        />
      </a>

      {/* Smaller button */}
      <button
            className="btn btn-outline-light" 
        onClick={onAbout}
        style={{ padding: "4px 10px", fontSize: "0.85rem" }} // smaller
      >
        About US
      </button>
    </nav>
  );
}
