import React from "react";
import ChatboxLeft from "./ChatboxLeft";
import ChatboxRight from "./ChatboxRight";
import { bolder, randomQuestion } from "./helper.js";

class ChatboxLayout extends React.Component {
  componentDidMount() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  render() {
    let children = [];
    const updater = newChat => {
      children = [...children, newChat];
    };

    const { gameRecord } = this.props;

    for (let item of gameRecord) {
      const {
        country,
        capital,
        region,
        languages,
        population,
        idLs,
        flag,
        userAnswered,
        userInput,
        isCorrect,
        correctMessage,
        wrongMessage,
        moreInfo
      } = item;

      const robotQuestion = (
        <ChatboxLeft
          message={[randomQuestion(), bolder(country), "?"]}
          key={idLs[0]}
        />
      );
      const userAnswer = (
        <ChatboxRight message={bolder(userInput)} key={idLs[1]} />
      );
      const robotCorrectAnswer = (
        <ChatboxLeft message={correctMessage} key={idLs[2]} />
      );
      const robotWrongAnswer = (
        <ChatboxLeft message={wrongMessage} key={idLs[3]} />
      );
      const robotMoreInfo = (
        <ChatboxLeft message={moreInfo} key={idLs[4]} className="country-info">
          <div className="country-flag">
            <div className="country">{country}</div>
            <div>
              <img
                src={flag}
                alt={`flag of ${country}`}
                className="flag-style"
              />
            </div>
          </div>
          <div className="country-basic">
            <div>Capital: {capital}</div>
            <div>Region: {region}</div>
            <div>Main languages: {languages}</div>
            <div>Population: {population}</div>
          </div>
        </ChatboxLeft>
      );

      const chatLogic = () => {
        updater(robotQuestion);
        if (userAnswered) {
          updater(userAnswer);
          if (isCorrect === true) {
            updater(robotCorrectAnswer);
          } else if (isCorrect === false) {
            updater(robotWrongAnswer);
          } else {
            return;
          }
          if (moreInfo !== false) {
            updater(robotMoreInfo);
          }
        }
        if (userAnswered === false) {
          updater(robotMoreInfo);
        }
      };

      chatLogic();
    }

    return <div className="chatbox-layout">{children}</div>;
  }
}
export default ChatboxLayout;
