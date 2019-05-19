import React from "react";
import uuid from "uuid";
import "../style/App.scss";
import Header from "./Header";
import ChatboxFirstSpace from "./ChatboxFirstSpace";
import ChatboxLayout from "./ChatboxLayout";
import ChatboxLeft from "./ChatboxLeft";
import Playbtn from "./Playbtn";
import InputArea from "./InputArea";
import Searchbar from "./Searchbar";
import {
  initialChat,
  pureAlphabet,
  bolder,
  getLanguages,
  numNotation,
  praise,
  pity
} from "./helper.js";

class App extends React.Component {
  state = {
    gameRecord: [],
    thirdChat: false,
    noInput: []
  };

  componentDidMount() {
    window.scrollTo(0, document.body.scrollHeight);
    setTimeout(() => {
      this.setState({ thirdChat: initialChat.thirdChatMessage });
    }, 2000);
  }

  // when play button is clicked, fetch country data
  playClicked = e => {
    e.preventDefault();
    this.fetchRandomCountry();
  };
  showAns = e => {
    e.preventDefault();
    if (this.state.gameRecord.length === 0) {
      return;
    }
    setTimeout(() => {
      this.stateSetter([["userAnswered", false]]);
    }, 500);

    setTimeout(() => {
      this.fetchRandomCountry();
    }, 1500);
  };

  async fetchRandomCountry() {
    const response = await fetch(`https://restcountries.eu/rest/v2/all`);
    try {
      const countryJsonData = await response.json();
      // choose a random country from the 250 countries in the database
      const randomCountry = await countryJsonData[
        Math.floor(Math.random() * 250)
      ];
      await this.dataSetUp(randomCountry);
      // console.log(randomCountry);
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
      // latlng,
      languages: preLanguages,
      population: prePopulation
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
    const languages = await getLanguages(preLanguages);
    const population = numNotation(prePopulation);
    const userAnswered = null;
    const isCorrect = null;
    const correctMessage = "";
    const wrongMessage = "";
    const moreInfo = false;
    // make a new object containing current country in the game, and add some custom keys
    const currentCountry = await {
      id,
      idLs,
      country,
      capital,
      flag,
      area,
      region,
      languages,
      population,
      userAnswered,
      isCorrect,
      correctMessage,
      wrongMessage,
      moreInfo
    };
    // make a copy of the state gameRecord and add the current country object
    const updateRecord = await [...this.state.gameRecord, currentCountry];

    //set the copy as new state
    await setTimeout(() => {
      this.setState({ gameRecord: updateRecord });
    }, 500);
  }

  // input processor for submitted input
  // 1) setState and compare answer
  inputProcessing = async inputValue => {
    if (inputValue === "") {
      return;
    }
    const gameRecord = this.state.gameRecord;
    if (gameRecord.length === 0) {
      // if user submit input before game start (data fetched), show remind message
      this.setState({ noInput: initialChat.noInputMessage });
      // if user submit when answer not compared
    } else {
      // set state: update user input, set userAnswered to true
      await this.stateSetter([
        ["userInput", inputValue],
        ["userAnswered", true]
      ]);
      await this.compareAns(this.state.gameRecord);
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
      const { country, capital, userInput } = updatedState[
        updatedState.length - 1
      ];
      // process input and answer to pure alphabet
      const pureAlphInput = pureAlphabet(userInput);
      const pureAlphAns = pureAlphabet(capital);
      // console.log(this.state.languages);

      // compare both, if equal, update correctMessage, and prepare to ask the next question
      if (pureAlphInput === pureAlphAns) {
        //setState for correctMessage
        this.stateSetter([["isCorrect", true]]);
        this.stateSetter([
          [
            "correctMessage",
            [
              praise(),
              bolder(capital),
              " is the capital of ",
              bolder(country),
              "."
            ]
          ]
        ]);
      } else {
        // setState for wrongMessage
        this.stateSetter([["isCorrect", false]]);

        this.stateSetter([
          [
            "wrongMessage",
            [
              pity(),
              bolder(userInput),
              " is not the capital of ",
              bolder(country),
              <br key={uuid.v4()} />,
              "The capital is",
              bolder(capital),
              "."
            ]
          ]
        ]);
      }
      // show more info
      setTimeout(() => {
        this.stateSetter([
          [
            "moreInfo",
            ["Here's some basic information of", bolder(country), " :"]
          ]
        ]);
      }, 2000);

      // fetch next country delay
      setTimeout(() => {
        this.fetchRandomCountry();
      }, 4000);
      // compare delay
    }, 500);
  };

  render() {
    const { firstChatMessage, firstChatStyle } = initialChat;

    return (
      <div className="app-layout" key={uuid.v4()}>
        <Header />
        <ChatboxFirstSpace>
          <ChatboxLeft message={firstChatMessage} messageStyle={firstChatStyle}>
            <Playbtn playClicked={this.playClicked} />
          </ChatboxLeft>

          {/* {this.state.secondChat} */}
          {this.state.thirdChat}
          {this.state.noInput}
        </ChatboxFirstSpace>
        <ChatboxLayout gameRecord={this.state.gameRecord} key={uuid.v4()} />
        <InputArea
          gameRecord={this.state.gameRecord}
          toNext={this.playClicked}
          showAns={this.showAns}
        >
          <Searchbar addInput={this.inputProcessing} />
        </InputArea>
      </div>
    );
  }
}

export default App;
