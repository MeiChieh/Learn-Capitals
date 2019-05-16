import React from "react";
import ChatboxLeft from "./ChatboxLeft";
import ChatboxRight from "./ChatboxRight";

const ChatboxLayout = props => {
  const children = [];
  // const { gameRecord } = props;

  // const lag = item => {
  //   setTimeout(() => {
  //     console.log(item);
  //     this.children.push(item);
  //   }, 1000);
  // };

  // never do async in rendering, bc react has to gather all render data and render them altogether

  const { gameRecord } = props;

  for (let item of gameRecord) {
    const { country, id, showAns, userInput } = item;
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

    // if showAns === false, only push left, vice versa
    showAns ? children.push(qAndA) : children.push(onlyQ);
    // showAns ? this.lag(qAndA) : this.lag(onlyQ);
  }

  return <div className="chatbox-layout">{children}</div>;
};
export default ChatboxLayout;
