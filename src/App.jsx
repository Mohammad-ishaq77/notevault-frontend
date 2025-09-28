import { useState, useEffect } from "react";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Notes from "./components/Notes.jsx";
import Navbar from "./components/Navbar.jsx";
import HomeNavbar from "./components/HomeNavbar.jsx";
import About from "./components/About.jsx";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setShowSignup(false);
    setShowAbout(false);
  };

  const handleAbout = () => {
    setShowAbout(true);
  };

  return (
    <div className="container-fluid p-0 min-vh-100 d-flex flex-column">
      {isLoggedIn ? (
        <>
          <Navbar onLogout={handleLogout} />
          <Notes />
        </>
      ) : (
        <>
          <HomeNavbar onAbout={handleAbout} />

          <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1">
            {/* Title slightly below the top */}
            <h1 className="text-center my-2">NoteVault App</h1>

            {/* Show About page if selected */}
            {showAbout ? (
              <About />
            ) : showSignup ? (
              <div className="w-100 d-flex flex-column align-items-center">
                <Signup
                  onSignup={() => {
                    setIsLoggedIn(true);
                    setShowSignup(false);
                  }}
                />
                <p className="text-center mt-3">
                  Already have an account?{" "}
                  <button
                    className="btn btn-link p-0"
                    onClick={() => setShowSignup(false)}
                  >
                    Login
                  </button>
                </p>
              </div>
            ) : (
              <div className="w-100 d-flex flex-column align-items-center">
                <Login onLogin={() => setIsLoggedIn(true)} />
                <p className="text-center mt-3">
                  Don’t have an account?{" "}
                  <button
                    className="btn btn-link p-0"
                    onClick={() => setShowSignup(true)}
                  >
                    Signup
                  </button>
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
