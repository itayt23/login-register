import React from "react";
import './NavBar.css';
import logo from '../assets/lognet_logo.png'; 

const NavBar = () => {
  return (
    <div className="navbar-container">
        <header className="header">
            <img src={logo} alt="Logo" /> 

            <nav className="nav-links">
                <a href="/">Home</a>
                <a href="/login" className="login">Login</a>
                <a href="/register" className="register">Register</a>
            </nav>
        </header>
    </div>
  )
}

export default NavBar
