import React from "react";
import ChatboxLeft from "./ChatboxLeft";
import ChatboxRight from "./ChatboxRight";
// import InfoBlock from "./InfoBlock";
import { bolder } from "./helper.js";

class ChatboxLayout extends React.Component {
  // window scroll must be placed here, but why?
  componentDidMount() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  render() {
    const children = [];
    const { gameRecord } = this.props;

    for (let item of gameRecord) {
      const {
        country,
        capital,
        region,
        language,
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
      console.log(language);
      // const showLanguage = language => {
      //   for (let item of language) {
      //     return item;
      //   }
      // };
      // console.log(language);
      // console.log(languages[0]);

      // const getLanguages = async languages => {
      //   await languages.onload();
      //   for (let item of languages) {
      //     console.log(item.name);
      //     return item.name;
      //   }
      // };
      // getLanguages();
      // chat content [robQ, userAns, robCorr, robWrong]
      const robotQuestion = (
        <ChatboxLeft
          message={["What is the capital of ", bolder(country), "?"]}
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
        <ChatboxLeft message={moreInfo} key={idLs[4]} className="country-flag">
          <div className="country-flag">
            <div>{country}</div>
            <div>
              <img
                src={flag}
                alt={`flag of ${country}`}
                className="flagStyle"
              />
            </div>
          </div>
          <div className="country-basic-info">
            <div className="capital">Capital: {capital}</div>
            <div className="region">Region: {region}</div>
            <div className="language">
              Main languages: {language}
              {/* {languages[1].name} */}
            </div>
            <div className="population">Population: {population}</div>
          </div>
        </ChatboxLeft>
      );
      // {for (let item of languages){return item.name}}

      const universal = () => {
        children.push(robotQuestion);
        if (userAnswered) {
          children.push(userAnswer);
          // if(isCorrect) means if isCorrect exists!!!
          if (isCorrect === true) {
            children.push(robotCorrectAnswer);
          } else if (isCorrect === false) {
            children.push(robotWrongAnswer);
          } else {
            return;
          }
          if (moreInfo !== false) {
            children.push(robotMoreInfo);
          }
        }
      };

      universal();
    }

    return <div className="chatbox-layout">{children}</div>;
  }
}
export default ChatboxLayout;
