import React from "react";
import "./App.scss";
import user from "../media/user1.svg";

const ChatboxRight = () => {
  return (
    <div className="chatbox-right">
      <div className="chat-content-right">
        <div className="chat-message-right">
          Taipei is the capital of taiwan
        </div>
      </div>
      <div className="avatar-right">
        <img className="user-icon" src={user} alt="" />
      </div>
    </div>
  );
};

export default ChatboxRight;
