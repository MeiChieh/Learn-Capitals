import React from "react";
import ChatboxLeft from "./ChatboxLeft";
import ChatboxRight from "./ChatboxRight";

class ChatboxLayout extends React.Component {
  // props = props.askQuestion & props.gameRecord
  // constructor() {
  //   super();
  //   // this.gameRecord = this.props.gameRecord;
  // }

  state = {};
  askCountry = () => {
    if (this.props.gameRecord.length == 0) {
      return;
    }
    for (let item of this.props.gameRecord) {
      console.log(item.country);
    }
  };

  render() {
    // console.log(gameRecord.length);
    this.askCountry();
    const { askQuestion, gameRecord } = this.props;
    return <div className="chatbox-layout" />;
  }
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

export default ChatboxLayout;
