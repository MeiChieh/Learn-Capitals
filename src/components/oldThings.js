// old data setup, obj in obj
// dataSetUp(data) {
//   const { name: country, capital, flag, area } = data;
//   const id = uuid.v4();
//   const currentCountry = { id, country, capital, flag, area };
//   const currentCountryKey = "country-" + id;
//   // make a copy of the current state
//   const updateRecord = Object.assign({}, this.state.gameRecord);
//   // put the new country into the copy
//   updateRecord[currentCountryKey] = currentCountry;
//   //set the copy as new state
//   this.setState({ gameRecord: updateRecord });
//   console.log(this.state.gameRecord);
// }

//問題：如何將'資訊'及'回答'交叉表示在不同的component中render出來？
//1) state = {record:[
//  {country: USA, id: uuid, capital: WaDC, answered: true, input: NY, compare: false},
//--> 已回答的紀錄，問題以及回答分別render出來
//  {country: UK, id: uuid, capital: london, answered: false}, ...
//--> 未回答的紀錄，只render出問題，回答顯示設為{answered = false}
// ]}

//2) state ={
//  [gameRecord:{country-uuid: {country: USA, capital: WaDC, answered: true}},
//  userInput:{}],
//  [cI:{},
//   uI:{}]
//}

//add userInput into gameRecord state
addInput = inputValue => {
  const appState = this.state.gameRecord;
  // get the current game record
  const currentGame = appState[appState.length - 1];
  // put user input into current game record
  currentGame.userInput = inputValue;
  currentGame.userAnswered = true;
  // remove the last game record from current state,
  appState.pop();
  // add the userInput added current game record
  const updatedState = [...appState, currentGame];
  // update state
  this.setState({ gameRecord: updatedState });
  // this.setState({ gameRecord: updatedState });
  console.log(updatedState);
};
