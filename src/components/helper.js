import React from "react";
import uuid from "uuid";
import ChatboxLeft from "./ChatboxLeft";

// firstChat styling and message
export const initialChat = {
  firstChatStyle: {
    paddingBottom: "4vh"
  },
  firstChatMessage: (
    <div>
      Hello, welcome to learn world capitals. I am your friend Roboto, let's
      learn capitals of all countries in the world !
    </div>
  ),
  secondChatMessage: (
    <ChatboxLeft
      message="I will give you the name of the country, and you have to tell me where
      it's capital is."
    />
  ),
  thirdChatMessage: (
    <ChatboxLeft
      message={[
        "To skip current country,",
        " press ",
        bolder("Next Country"),
        ";",
        <br key={uuid.v4()} />,
        " To checkout the answer press",
        bolder("Show Answer"),
        "!",
        <br key={uuid.v4()} />,
        "Now press ",
        bolder("Play Game"),
        "to start your adventure !"
      ]}
    />
  ),
  // message to output when user input before clicking play game
  noInputMessage: (
    <ChatboxLeft message={["Please click ", bolder("Play Game"), "to start"]} />
  )
};

// Turn input into pure alphabet and return
export const pureAlphabet = str => {
  const makeCapital = str.toUpperCase().split("");
  const pureEnglish = rmAccent(makeCapital)
    .filter(item => item >= 65 && item <= 90)
    .map(item => String.fromCharCode(item))
    .join("");
  return pureEnglish;
};

// remove accent of alphabets
export function rmAccent(alphLs) {
  let alphNum = alphLs.map(i => i.charCodeAt());
  // convert accented alphabet to none accented
  const convert = [
    [65, 192, 197],
    [67, 199, 199],
    [69, 200, 203],
    [73, 204, 207],
    [78, 209, 209],
    [79, 210, 214],
    [83, 352, 353],
    [85, 217, 220],
    [89, 221, 221],
    [89, 376, 376]
  ];
  const newAlph = [];
  alphNum.forEach(num => {
    if (num >= 65 && num <= 90) {
      newAlph.push(num);
    }
    for (let i of convert) {
      if (num >= i[1] && num <= i[2]) {
        newAlph.push(i[0]);
      }
    }
  });
  return newAlph;
}

// Making string bold
export function bolder(str) {
  return <strong key={uuid.v4()}> {str} </strong>;
} // putting key helps tackle the unique key problem

//Structure languages into a comma separated string
export const getLanguages = languages => {
  const lan = [];
  for (let item of languages) {
    lan.push(item.name);
  }
  const lanStr = lan.join(", ");
  return lanStr;
};

// number formatter (12000 --> 12,000)
export const numNotation = num => {
  const numArr = String(num)
    .split("")
    .reverse();
  let counter = 0;
  const result = [];

  for (let number of numArr) {
    if (counter === 3) {
      counter = 0;
      result.push(",");
      result.push(number);
      counter++;
    } else {
      result.push(number);
      counter++;
    }
  }
  return result.reverse().join("");
};

// random string of praise
export const praise = () => {
  const niceWords = [
    "Brillant! ",
    "You're right! ",
    "That is correct! ",
    "Bingo! ",
    "Good guess! ",
    "Cool! ",
    "Yup, ",
    "Great! "
  ];

  return niceWords[Math.floor(Math.random() * niceWords.length)];
};

// random string of pitiness
export const pity = () => {
  const pityWords = [
    "Oh no, ",
    "That is close, but nope, ",
    "Unfortunately, it is incorrect, ",
    "That is wrong, we have to practice more. ",
    "Good guess, but it's wrong, ",
    "Nope, "
  ];
  return pityWords[Math.floor(Math.random() * pityWords.length)];
};
