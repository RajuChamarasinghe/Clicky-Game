import React, { Component } from "react";
import Header from "../Header/header-component";
import Main from "../Main/main-component";
import Footer from "../Footer";
import data from "../../data.json";
import './style.css';

export default class MemoryGame extends Component {
  state = {
    data,
    score: 0,
    topScore: 0
  };

  componentDidMount() {
    this.setState({ data: this.shuffleData(this.state.data) });
  }

  handleCorrectGuess = newData => {
    const { topScore, score } = this.state;
    const newScore = score + 1;
    const newTopScore = Math.max(newScore, topScore);

    this.setState({
      data: this.shuffleData(newData),
      score: newScore,
      topScore: newTopScore
    });
  };

  handleIncorrectGuess = data => {
    this.setState({
      data: this.resetData(data),
      score: 0
    });
  };

  resetData = data => {
    const resetData = data.map(item => ({ ...item, clicked: false }));
    return this.shuffleData(resetData);
  };

  shuffleData = data => {
    let i = data.length - 1;
    while (i > 0) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = data[i];
      data[i] = data[j];
      data[j] = temp;
      i--;
    }
    return data;
  };

  handleItemClick = id => {
    let guessedCorrectly = false;
    const newData = this.state.data.map(item => {
      const newItem = { ...item };
      if (newItem.id === id) {
        if (!newItem.clicked) {
          newItem.clicked = true;
          guessedCorrectly = true;
        }
      }
      return newItem;
    });
    guessedCorrectly
      ? this.handleCorrectGuess(newData)
      : this.handleIncorrectGuess(newData);
  };

  render() {
    return (
      <div>
        <Header score={this.state.score} topScore={this.state.topScore} />
        <header className="header">
          <h1>Clicky Game!</h1>
          <h2>Click on an image to earn points, but don't click on any more than once!</h2>
        </header>
        <Main>
          {this.state.data.map(item => (
            <div
              key={item.id}
              role="img"
              aria-label="click item"
              onClick={() => this.handleItemClick(item.id)}
              style={{ backgroundImage: `url("${item.image}")` }}
              className={`click-item${!this.state.score && this.state.topScore ? " shake" : ""}`}
            />
          ))}
        </Main>
        <Footer />
      </div>
    );
  }
}
