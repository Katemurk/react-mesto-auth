import React from "react";

function Header(props) {
  return (
    <header className="header">
      <div className="header__info">
        <div className="header__logo"></div>
        <div className="header__block">{props.children}</div>
      </div>
    </header>
  );
}

export default Header;
