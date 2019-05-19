import React from "react";

class Searchbar extends React.Component {
  // if input submitted, push the submitted value to state, and set the value of input
  // to the submitted value of the state
  // this.props.addInput
  constructor() {
    super();
    this.inputField = React.createRef();
  }

  componentDidMount() {
    this.inputField.focus();
    // React will assign the current property with the DOM element when the component mounts, and assign it back to null when it unmounts. ref updates happen before componentDidMount or componentDidUpdate lifecycle methods.
  }

  state = { userInput: "" };

  //set input state
  fetchInput = e => {
    e.preventDefault();
    this.setState({ userInput: e.target.value });
  };

  submitIt = e => {
    e.preventDefault();
    this.props.addInput(this.state.userInput);
    // cannot have any delay, or the event is not recognized
    this.setState({ userInput: "" });
  };

  // assign element to ref for input to stay focus on new instance
  // using the ref callback to store a reference to a DOM node in an instance property.
  setRef = el => {
    this.inputField = el;
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
            ref={this.setRef}
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
