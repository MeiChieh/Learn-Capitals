import React from "react";
import user from "../media/user1.svg";

const ChatboxRight = props => {
  return (
    <div className="chatbox chatbox-right">
      <div className="chat-content chat-content-right ">
        <div className="chat-message chat-message-right ">{props.message}</div>
      </div>
      <div className="avatar avatar-right">
        <img className="chaticon chaticon-right" src={user} alt="" />
      </div>
    </div>
  );
};

export default ChatboxRight;
