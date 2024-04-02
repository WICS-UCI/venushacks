import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <footer id="footer">
      <a href="mailto:contact@venushacks.com" target="_top">
        <i className="fa fa-envelope" />
      </a>
      <a
        href="https://www.facebook.com/venushacksUCI/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fa fa-facebook" />
      </a>
      <a
        href="https://www.instagram.com/venushacksuci"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fa fa-instagram" />
      </a>
    </footer>
  );
}

export default Footer;
