import React from "react";
import "./App.scss";
import Header from "./Header";
import ChatboxLayout from "./ChatboxLayout";
import ChatboxLeft from "./ChatboxLeft";
import ChatboxRight from "./ChatboxRight";
import InputArea from "./InputArea";
import Searchbar from "./Searchbar";

class App extends React.Component {
  render() {
    return (
      <div className="app-layout">
        <Header />
        <ChatboxLayout>
          <ChatboxLeft />
          <ChatboxRight />
          <ChatboxLeft />
          <ChatboxRight />
          <ChatboxLeft />
          <ChatboxRight />
          <ChatboxLeft />
          <ChatboxRight />
        </ChatboxLayout>

        <InputArea>
          <Searchbar />
        </InputArea>
      </div>
    );
  }
}

export default App;
