import React from "react";
import "./App.scss";
import earth from "../media/earth5.svg";

const Header = () => {
  return (
    <div className="app-header">
      <span className="header-text">Learn World Capitals</span>
      <img className="header-img" src={earth} alt="" />
      {/* <div className='headerImg'></div> */}
      {/* <h2 className="ui header">
        <i className="flag icon" />
        <div className="content">Learn World Countries</div>
      </h2> */}
    </div>
  );
};

export default Header;
