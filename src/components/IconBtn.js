import React from "react";

const IconBtn = props => {
  return (
    <div onClick={props.func} className="iconbtn">
      <div>{props.message}</div>
    </div>
  );
};
export default IconBtn;
