import React from "react";
import uuid from "uuid";
import "./App.scss";
import Header from "./Header";
import ChatboxFirstSpace from "./ChatboxFirstSpace";
import ChatboxLayout from "./ChatboxLayout";
import ChatboxLeft from "./ChatboxLeft";
import Playbtn from "./Playbtn";
import InputArea from "./InputArea";
import Searchbar from "./Searchbar";
// inline style
import firstChatStyle from "./inlineStyle.js";

class App extends React.Component {
  state = {
    gameRecord: [],
    ask: false,
    noInput: []
  };

  // first chat message
  firstChat =
    "Hello, welcome to learn world countries. I am Roboto, let's prepare you for the next Irish bar drinking game. I will give you the name of the country, and you have to tell me where it's capital is. If you are not sure about where this country is, you can click on the map icon and have a look.";

  // styling for the first chat
  firstChatStyle = firstChatStyle.firstChatStyle;

  // if submit under no input, push noImputMessage to noInput
  // noInput = [];
  noInputMessage = <ChatboxLeft message="Please click Play Game to start" />;

  // when play button is clicked, fetch country data
  playClicked = () => {
    console.log("play clicked!");
    this.fetchRandomCountry();
  };

  async fetchRandomCountry() {
    const response = await fetch(`https://restcountries.eu/rest/v2/all`);
    try {
      const countryJsonData = await response.json();
      // choose a random country from the 250 countries
      const randomCountry = await countryJsonData[
        Math.floor(Math.random() * 250)
      ];
      await this.dataSetUp(randomCountry);
    } catch (err) {
      console.error(err);
    }
  }

  // data setup after fetching, put data into state
  dataSetUp(data) {
    const { name: country, capital, flag, area } = data;
    const id = uuid.v4();
    const answered = false;
    // make a new object containing current country in the game
    const currentCountry = { id, country, capital, flag, area, answered };
    // make a copy of the state gameRecord and add the current country object
    const updateRecord = [...this.state.gameRecord, currentCountry];
    //set the copy as new state
    this.setState({ gameRecord: updateRecord });
    // console.log(this.state.gameRecord[this.state.gameRecord.length - 1]);
  }

  inputProcessing = async inputValue => {
    if (this.state.gameRecord.length === 0) {
      this.setState({ noInput: this.noInputMessage });
    } else {
      await this.addInput(inputValue);
      await this.hah();
    }
  };

  hah = () => {
    console.log(this.state.gameRecord);
  };

  //add userInput into gameRecord state
  addInput = inputValue => {
    const appState = this.state.gameRecord;
    // get the current game record
    const currentGame = appState[appState.length - 1];
    // put user input into current game record
    currentGame.userInput = inputValue;
    // remove the last game record from current state,
    appState.pop();
    // add the userInput added current game record
    const updatedState = [...appState, currentGame];
    // update state
    this.setState({ gameRecord: updatedState });
    // console.log(updatedState);
  };

  render() {
    return (
      <div className="app-layout">
        <Header />
        <ChatboxFirstSpace>
          <ChatboxLeft
            message={this.firstChat}
            messageStyle={this.firstChatStyle}
          >
            <Playbtn playClicked={this.playClicked} />
          </ChatboxLeft>
          {/* <ChatboxLeft message="Please click Play Game to start" /> */}
          {this.state.noInput}
        </ChatboxFirstSpace>

        <ChatboxLayout gameRecord={this.state.gameRecord} />

        <InputArea>
          <Searchbar addInput={this.inputProcessing} />
        </InputArea>
      </div>
    );
  }
}

export default App;
