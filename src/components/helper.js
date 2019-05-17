import React from "react";
import uuid from "uuid";
import ChatboxLeft from "./ChatboxLeft";

// firstChat styling and message
export const firstChat = {
  firstChatStyle: {
    paddingBottom: "4vh"
  },
  firstChatMessage:
    "Hello, welcome to learn world countries. I am Roboto, let's prepare you for the next Irish bar drinking game. I will give you the name of the country, and you have to tell me where it's capital is. If you are not sure about where this country is, you can click on the map icon and have a look.",

  // message to output when user input before clicking play game
  noInputMessage: (
    <ChatboxLeft message={["Please click ", bolder("Play Game"), "to start"]} />
  )
};

// Turn input into pure alphabet and return
export const pureAlphabet = str => {
  const pure = str
    .toUpperCase()
    .split("")
    .filter(item => item.charCodeAt() >= 65 && item.charCodeAt() <= 90)
    .join("");
  return pure;
};
// Making string bold
export function bolder(str) {
  return <strong key={uuid.v4()}> {str} </strong>;
}
// putting key helps tackle the unique key problem

//Destructure language
export const getLanguage = languages => {
  const lan = [];
  for (let item of languages) {
    lan.push(item.name);
    console.log(item.name);
  }
};
