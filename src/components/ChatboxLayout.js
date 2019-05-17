import React from "react";
import ChatboxLeft from "./ChatboxLeft";
import ChatboxRight from "./ChatboxRight";

const ChatboxLayout = props => {
  const children = [];

  // never do async in rendering, bc react has to gather all render data and render them altogether
  // instead, just update the state asynchronously

  const { gameRecord } = props;

  for (let item of gameRecord) {
    const { country, id, userAnswered, userInput } = item;
    // render both question and answer when question is answered
    const qAndA = (
      <div key={id}>
        <ChatboxLeft message={`Where is the capital of ${country} ?`} />
        <ChatboxRight message={userInput} />
      </div>
    );
    // only render question when question is not answered yet
    const onlyQ = (
      <div key={id}>
        <ChatboxLeft message={`Where is the capital of ${country} ?`} />
      </div>
    );

    if (gameRecord.length === 0) {
      return;
    }

    // if userAnswered === false, only push left, vice versa
    userAnswered ? children.push(qAndA) : children.push(onlyQ);
  }

  return <div className="chatbox-layout">{children}</div>;
};
export default ChatboxLayout;
