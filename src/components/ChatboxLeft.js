import React from "react";
import "./App.scss";
import robot from "../media/roboticon4.svg";

const ChatboxLeft = () => {
  return (
    <div className="chatbox-left">
      <div className="avatar-left">
        <img className="robot-icon" src={robot} alt="robot icon" />
      </div>
      <div className="chat-content-left">
        <div className="chat-message-left">Where is the capital of Taiwan?</div>
      </div>
    </div>
  );
};

export default ChatboxLeft;
