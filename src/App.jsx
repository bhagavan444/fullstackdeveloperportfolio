import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

// Components
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";

// 🔄 Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <Router>
      <ScrollToTop />
      <div className="pt-0">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} /> {/* Redirect to /home */}
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          
          <Route path="/resume" element={<Resume />} />
          
          <Route path="/contact" element={<Contact />} />
          
          {/* Optional fallback route */}
          <Route path="*" element={<h1 className="text-center text-3xl">404 - Page Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;