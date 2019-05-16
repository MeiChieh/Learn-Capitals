import React from "react";
import ChatboxLeft from "./ChatboxLeft";
import ChatboxRight from "./ChatboxRight";

const ChatboxLayout = props => {
  // props = props.askQuestion & props.gameRecord
  const { askQuestion, gameRecord } = props;

  console.log(gameRecord.length);

  const askCountry = () => {
    if (gameRecord.length == 0) {
      return;
    }
    for (let item of gameRecord) {
      console.log(item.country);
    }
  };

  askCountry();

  // if (askQuestion == true) {
  //   console.log("ask it");
  // }

  // for (let item of gameRecord) {
  //   return (
  //     <div className="chatbox-layout">
  //       <ChatboxLeft message={`Where is the capital of ${item.country}`} />
  //     </div>
  //   );
  // }

  return <div className="chatbox-layout" />;
};

export default ChatboxLayout;
