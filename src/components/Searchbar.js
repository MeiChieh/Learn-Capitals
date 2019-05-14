import React from "react";
import "./App.scss";

const Searchbar = () => {
  return (
    <div className="searchbar">
      <div className="ui action input">
        <input type="text" placeholder="Enter Capital Name" />
        <button className="ui button">Submit</button>
      </div>
    </div>
  );
};

export default Searchbar;
