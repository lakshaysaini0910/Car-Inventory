import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import "./Navbar.css"


const Navbar = () => {

  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className={`navbar ${location.pathname === '/' ? 'home-navbar' : ''}`}>

      <Link to="/" className="logo">
        <img src="/logo.png" alt="Car Inventory" />
      </Link>


      <nav>

        <ul className="nav-links">

          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/stock-cars">Stock Cars</Link>
          </li>

          <li>
            <Link to="/sell-cars">Sell Cars</Link>
          </li>

          <li>
            <Link to="/about">About Us</Link>
          </li>

          <li>
            <Link to="/contact">Contact</Link>
          </li>

        </ul>

      </nav>



      <button
        className="menu-button"
        onClick={() => setMenuOpen(true)}
      >
        ☰
      </button>



      <div className={`mobile-sidebar ${menuOpen ? "open" : ""}`}>

        <button
          className="close-button"
          onClick={() => setMenuOpen(false)}
        >
          ✕
        </button>


        <ul>

          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>

          <li>
            <Link to="/stock-cars" onClick={() => setMenuOpen(false)}>
              Stock Cars
            </Link>
          </li>

          <li>
            <Link to="/sell-cars" onClick={() => setMenuOpen(false)}>
              Sell Cars
            </Link>
          </li>

          <li>
            <Link to="/about" onClick={() => setMenuOpen(false)}>
              About Us
            </Link>
          </li>

          <li>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </li>

        </ul>

      </div>

    </div>
  )
}

export default Navbar