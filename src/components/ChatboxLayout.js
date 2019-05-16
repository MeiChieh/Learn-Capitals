import React from "react";
import ChatboxLeft from "./ChatboxLeft";
// import ChatboxLeft from "./ChatboxLeft";
// import ChatboxRight from "./ChatboxRight";

const ChatboxLayout = props => {
  const children = [];
  const { gameRecord } = props;

  for (let item of gameRecord) {
    if (gameRecord.length === 0) {
      return;
    }
    const { country, id } = item;

    // setTimeout cannot be set successfully
    children.push(
      <ChatboxLeft message={`Where is the capital of ${country} ?`} key={id} />
    );
  }

  return <div className="chatbox-layout">{children}</div>;
};
export default ChatboxLayout;
