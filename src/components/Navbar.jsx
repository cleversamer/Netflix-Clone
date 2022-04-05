import React, { useState, useEffect } from "react";
import "../css/navbar.css";

const Navbar = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => setShow(window.scrollY > 100));

    return () => window.removeEventListener("scroll");
  }, []);

  const getClasses = () => {
    return `nav ${show && "nav--black"}`;
  };

  return (
    <nav className={getClasses()}>
      <a href="index.html">
        <img className="nav__logo" src="images/logo.png" alt="Netflix logo" />
      </a>

      <img className="nav__avatar" src="images/avatar.png" alt="Avatar" />
    </nav>
  );
};

export default Navbar;
