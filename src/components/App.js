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

  // message to output when user input before clicking play game
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
    const userAnswered = false;
    const isCorrect = false;
    const correctMessage = "";
    const wrongMessage = "";
    // make a new object containing current country in the game
    const currentCountry = {
      id,
      country,
      capital,
      flag,
      area,
      userAnswered,
      isCorrect,
      correctMessage,
      wrongMessage
    };
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
      // if user input before game start (data fetched)
      this.setState({ noInput: this.noInputMessage });
    } else {
      // set state: update user input, set userAnswered to true
      await this.stateSettter([
        ["userInput", inputValue],
        ["userAnswered", true]
      ]);
    }
  };

  // uiversal state setter
  stateSettter = updateArr => {
    // updateArr = [[key1, value1],[key2, value2]]
    // get gameRecord state
    const appState = this.state.gameRecord;
    // get the current game record
    const currentGame = appState[appState.length - 1];
    // put user input into current game record
    for (let item of updateArr) {
      const key = item[0];
      const value = item[1];
      currentGame[key] = value;
    }
    // remove the last game record from current state,
    appState.pop();
    // add the userInput added current game record
    const updatedState = [...appState, currentGame];
    // update state
    this.setState({ gameRecord: updatedState });
    // this.setState({ gameRecord: updatedState });
    console.log(updatedState);
  };

  // turn input into pure alphabet and return
  pureAlphabet(str) {
    const pure = str
      .toUpperCase()
      .split("")
      .filter(item => item.charCodeAt() >= 65 && item.charCodeAt() <= 90)
      .join("");

    console.log(pure);
    return pure;
  }
  // compare user input and ans
  compareAns = async updatedState => {
    const { country, capital, userInput } = updatedState;
    console.log(capital);
    // process input and answer to pure alphabet
    const pureAlphInput = this.pureAlphabet(userInput);
    const pureAlphAns = this.pureAlphabet(capital);
    console.log(pureAlphAns);
    // compare both, if equal, update
    if (pureAlphInput === pureAlphAns) {
      console.log("brillant!");
    } else {
      console.log(`This is not the capital of ${country}`);
    }
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
