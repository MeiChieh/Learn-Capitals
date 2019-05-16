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
import firstChat from "./helper.js";

class App extends React.Component {
  state = {
    gameRecord: [],
    noInput: []
  };

  noInputMessage = <ChatboxLeft message="Please click [Play Game] to start" />;

  // when play button is clicked, fetch country data
  playClicked = () => {
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
    const showAns = false;
    // make a new object containing current country in the game
    const currentCountry = { id, country, capital, flag, area, showAns };
    // make a copy of the state gameRecord and add the current country object
    const updateRecord = [...this.state.gameRecord, currentCountry];
    //set the copy as new state
    setTimeout(() => {
      this.setState({ gameRecord: updateRecord });
    }, 1000);
    // this.setState({ gameRecord: updateRecord });
    // console.log(this.state.gameRecord[this.state.gameRecord.length - 1]);
  }

  inputProcessing = async inputValue => {
    if (this.state.gameRecord.length === 0) {
      this.setState({ noInput: this.noInputMessage });
      // this.setState({ noInput: this.noInputMessage });
    } else {
      await this.addInput(inputValue);
    }
  };

  //add userInput into gameRecord state
  addInput = inputValue => {
    const appState = this.state.gameRecord;
    // get the current game record
    const currentGame = appState[appState.length - 1];
    // put user input into current game record
    currentGame.userInput = inputValue;
    currentGame.showAns = true;
    // remove the last game record from current state,
    appState.pop();
    // add the userInput added current game record
    const updatedState = [...appState, currentGame];
    // update state
    this.setState({ gameRecord: updatedState });
    // this.setState({ gameRecord: updatedState });
    console.log(updatedState);
  };

  render() {
    const { firstChatMessage, firstChatStyle } = firstChat;

    return (
      <div className="app-layout">
        <Header />
        <ChatboxFirstSpace>
          <ChatboxLeft message={firstChatMessage} messageStyle={firstChatStyle}>
            <Playbtn playClicked={this.playClicked} />
          </ChatboxLeft>
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
