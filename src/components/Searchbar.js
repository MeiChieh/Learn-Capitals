import React from "react";
import "./App.scss";

class Searchbar extends React.Component {
  // if input submitted, push the submitted value to state, and set the value of input
  // to the submitted value of the state
  // this.props.addInput

  state = { userInput: "" };

  fetchInput = e => {
    e.preventDefault();
    this.setState({ userInput: e.target.value });
  };

  submitIt = e => {
    e.preventDefault();
    // console.log(this.state.userInput);
    this.props.addInput(this.state.userInput);
    // cannot have any delay, or the event is not recognized
    this.setState({ userInput: "" });
  };

  clearField = e => {
    e.target.value = "";
    console.log(e.target);
  };

  render() {
    return (
      <div className="searchbar">
        <form className="input-form" onSubmit={this.submitIt}>
          <input
            className="input-field"
            type="text"
            placeholder="Enter Capital Name"
            value={this.state.userInput}
            onChange={this.fetchInput}
            // onFocus={this.clearField}
          />
          <button type="submit" className="input-button">
            <div className="input-button-text">Submit</div>
          </button>
        </form>
      </div>
    );
  }
}

export default Searchbar;
