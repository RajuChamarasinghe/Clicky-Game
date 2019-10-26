import React, {Component} from "react";
import "./style.css";

// Component for the Navbar

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      animating: false
    };
  }

  renderMessage() {
    switch (this.state.message) {
      case "correct":
        return "You guessed correctly!";
      case "incorrect":
        return "You guessed incorrectly!";
      default:
        return "Click an image to begin!";
    }
  };

  componentDidUpdate({ score, topScore }, prevState) {
    const newState = { animating: true };

    if (score === 0 && topScore === 0) {
      newState.message = "";
    } else if (score === 0 && topScore > 0) {
      newState.message = "incorrect";
    } else {
      newState.message = "correct";
    }

    if (score !== this.props.score || this.state.message !== newState.message) {
      this.setState(newState);
    }
  }

  render() {
    return (
      <nav className="navbar">
        <ul>
          <li className="brand">
            <a href="/">Clicky Game</a>
          </li>
          <li
            className={this.state.animating ? this.state.message : ""}
            onAnimationEnd={() => this.setState({ animating: false })}
          >
            {this.renderMessage()}
          </li>
          <li>
            Score: {this.props.score} | Top Score: {this.props.topScore}
          </li>
        </ul>
      </nav>
    );
  }
}
