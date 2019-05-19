import React from "react";
import IconBtn from "./IconBtn";

const InputArea = props => {
  return (
    <div className="input-area">
      <div className="btns">
        <IconBtn
          func={props.toNext}
          className="nextbtn"
          message="Next Country"
        />
        <IconBtn
          func={props.showAns}
          className="ansbtn"
          message="Show Answer"
        />
      </div>
      <div className="input-loci">{props.children}</div>
    </div>
  );
};

export default InputArea;
