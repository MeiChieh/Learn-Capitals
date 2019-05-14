import React from "react";
import "./App.css";
import Header from "./Header";
import ChatboxLayoutLeft from "./ChatboxLayoutLeft";
import ChatboxLayoutRight from "./ChatboxLayoutRight";

import ChatboxLeft from "./ChatboxLeft";
import ChatboxRight from "./ChatboxRight";
import InputArea from "./InputArea";

class App extends React.Component {
  render() {
    return (
      <div className="app-layout">
        <Header />
        <ChatboxLayoutLeft>
          <ChatboxLeft />
        </ChatboxLayoutLeft>
        <ChatboxLayoutRight>
          <ChatboxRight />
        </ChatboxLayoutRight>
        <InputArea />
      </div>
    );
  }
}

export default App;
