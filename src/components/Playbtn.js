import React from "react";

const Playbtn = props => {
  return (
    <div onClick={props.playClicked}>
      <div className="playbtn">Play Game</div>
    </div>
  );
};

export default Playbtn;
