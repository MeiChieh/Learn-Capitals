import React from "react";
import earth from "../media/earth5.svg";

const Header = () => {
  return (
    <div className="app-header">
      <span className="header-text">Learn World Capitals</span>
      <img className="header-img" src={earth} alt="earth icon" />
    </div>
  );
};

export default Header;
