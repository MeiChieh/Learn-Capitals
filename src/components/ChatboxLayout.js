import React from "react";
import ChatboxLeft from "./ChatboxLeft";
// import ChatboxLeft from "./ChatboxLeft";
// import ChatboxRight from "./ChatboxRight";

class ChatboxLayout extends React.Component {
  state = {};
  // askCountry = () => {
  //   if (this.props.gameRecord.length == 0) {
  //     return;
  //   }
  //   for (let item of this.props.gameRecord) {
  //     console.log(item.country);
  //   }
  // };

  render() {
    const children = [];
    const { gameRecord } = this.props;

    for (let item of gameRecord) {
      if (gameRecord.length == 0) {
        return;
      }
      const { country } = item;

      // function pushIt() {
      //   setTimeout(() => {
      children.push(
        <ChatboxLeft message={`Where is the capital of ${country} ?`} />
      );
      //   }, 1000);
      // }
    }

    return <div className="chatbox-layout">{children}</div>;
  }

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
}
export default ChatboxLayout;
