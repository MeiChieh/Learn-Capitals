import React from "react";
import robot from "../media/roboticon4.svg";

const ChatboxLeft = props => {
  return (
    <div className="chatbox chatbox-left ">
      <div className="avatar avatar-left">
        <img className="chaticon chaticon-left" src={robot} alt="robot icon" />
      </div>
      <div className="chat-content chat-content-left ">
        <div
          className="chat-message chat-message-left "
          style={props.messageStyle}
        >
          {props.message} <div>{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default ChatboxLeft;
