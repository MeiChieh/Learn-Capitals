import React from "react";
import IconBtn from "./IconBtn";
// import Searchbar from "./Searchbar";

const InputArea = props => {
  return (
    <div className="input-area">
      <IconBtn />
      {props.children}
    </div>
  );
};

export default InputArea;
