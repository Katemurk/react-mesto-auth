import React from "react";
let date = new Date();

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__copyright">
        © {date.getFullYear()} Mesto Russia
      </div>
    </footer>
  );
}
export default Footer;
