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
import { firstChat, pureAlphabet, bolder, getLanguage } from "./helper.js";

class App extends React.Component {
  state = {
    gameRecord: [],
    noInput: []
  };

  componentDidMount() {
    window.scrollTo(0, document.body.scrollHeight);
  }

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
      console.log(randomCountry);
    } catch (err) {
      console.error(err);
    }
  }

  // data setup after fetching, put data into state
  async dataSetUp(data) {
    const {
      name: country,
      capital,
      flag,
      area,
      region,
      languages,
      population
    } = data;
    const id = uuid.v4();
    const idLs = [
      id + "a",
      id + "b",
      id + "c",
      id + "d",
      id + "e",
      id + "f",
      id + "g"
    ];
    const language = await getLanguage(languages);
    const userAnswered = false;
    const isCorrect = null;
    const correctMessage = "";
    const wrongMessage = "";
    const moreInfo = false;
    // make a new object containing current country in the game
    const currentCountry = await {
      id,
      idLs,
      country,
      capital,
      flag,
      area,
      region,
      language,
      population,
      userAnswered,
      isCorrect,
      correctMessage,
      wrongMessage,
      moreInfo
    };
    // make a copy of the state gameRecord and add the current country object
    const updateRecord = [...this.state.gameRecord, currentCountry];
    //set the copy as new state
    setTimeout(() => {
      this.setState({ gameRecord: updateRecord });
    }, 1000);
  }

  // input processor for submitted input
  // 1) setState and compare answer
  inputProcessing = async inputValue => {
    const gameRecord = this.state.gameRecord;
    if (gameRecord.length === 0) {
      // if user input before game start (data fetched), show remind message
      this.setState({ noInput: firstChat.noInputMessage });
    } else {
      // set state: update user input, set userAnswered to true
      // try{};
      // catch(){}
      await this.stateSetter([
        ["userInput", inputValue],
        ["userAnswered", true]
      ]);
      await this.compareAns(this.state.gameRecord);
      console.log(this.state.gameRecord.language);
    }
  };

  // uiversal state setter
  stateSetter = updateArr => {
    // Array Template: updateArr = [[key1, value1],[key2, value2]]
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
  };

  // compare user input and answer
  compareAns = updatedState => {
    setTimeout(() => {
      const { country, capital, userInput, language } = updatedState[
        updatedState.length - 1
      ];
      // process input and answer to pure alphabet
      const pureAlphInput = pureAlphabet(userInput);
      const pureAlphAns = pureAlphabet(capital);
      console.log(this.state.language);
      // compare both, if equal, update correctMessage, and prepare to ask the next question
      if (pureAlphInput === pureAlphAns) {
        //setState for correctMessage
        this.stateSetter([
          ["isCorrect", true]
          // ["language", getLanguage(language)]
        ]);
        this.stateSetter([
          [
            "correctMessage",
            [
              "Brillant! ",
              bolder(capital),
              " is the capital of ",
              bolder(country)
            ]
          ]
        ]);
      } else {
        // setState for wrongMessage
        this.stateSetter([
          ["isCorrect", false]
          // ["language", getLanguage(language)]
        ]);

        this.stateSetter([
          [
            "wrongMessage",
            [
              "Oh no! ",
              bolder(userInput),
              " is not the capital of ",
              bolder(country),
              <br key={uuid.v4()} />,
              "The capital is",
              bolder(capital)
            ]
          ]
        ]);
      }
      // shoe more info
      setTimeout(() => {
        this.stateSetter([
          [
            "moreInfo",
            [
              "This is the basic information of",
              bolder(country),
              <div key={uuid.v4()}>
                <br />
              </div>
            ]
          ]
        ]);
      }, 2000);

      // fetch next country
      setTimeout(() => {
        this.fetchRandomCountry();
      }, 3000);
    }, 1000);
  };

  render() {
    const { firstChatMessage, firstChatStyle } = firstChat;

    return (
      <div className="app-layout" key={uuid.v4()}>
        <Header />
        <ChatboxFirstSpace>
          <ChatboxLeft message={firstChatMessage} messageStyle={firstChatStyle}>
            <Playbtn playClicked={this.playClicked} />
          </ChatboxLeft>
          {this.state.noInput}
        </ChatboxFirstSpace>
        <ChatboxLayout gameRecord={this.state.gameRecord} key={uuid.v4()} />
        <InputArea>
          <Searchbar addInput={this.inputProcessing} />
        </InputArea>
      </div>
    );
  }
}

export default App;
