import React, { useState } from 'react';
import './Navbar.css'; // We'll create this CSS file next

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-brand">Bhagavan GopalaJosyula</a>
        <div className="menu-icon" onClick={toggleMenu}>
          <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <a href="#home" className="nav-links" onClick={toggleMenu}>
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#about" className="nav-links" onClick={toggleMenu}>
              About
            </a>
          </li>
          <li className="nav-item">
            <a href="#resume" className="nav-links" onClick={toggleMenu}>
              Resume
            </a>
          </li>
          <li className="nav-item">
            <a href="#contact" className="nav-links" onClick={toggleMenu}>
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;