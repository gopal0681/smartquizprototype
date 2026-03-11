import React from "react";
import { Link } from "react-router-dom";
import "../Css/Header.css";


const Header = () => {
    return (
    <header className="header">
      <div className="logo">
        <Link to="/">Smart Quiz</Link>
      </div>        
       <nav className="nav-links">
          <Link to="/login"> Login </Link>  
          
          <Link to="/signup"> Sign Up </Link>

        </nav>
    </header>
  );
};

export default Header;