import React from "react";

const IconBtn = props => {
  return (
    <div onClick={props.func} className="iconbtn">
      <div className="btn-words">{props.message}</div>
    </div>
  );
};
export default IconBtn;
