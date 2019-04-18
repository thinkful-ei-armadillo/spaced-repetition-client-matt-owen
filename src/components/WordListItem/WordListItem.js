import React, { Component } from "react";
import UserContext from "../../contexts/UserContext";
import LanguageService from "../../services/language-api-service";
import "./WordListItem.css";
import LanguageApiService from "../../services/language-api-service";

export default class WordListItem extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);

    this.state = {
      guess: "",
      original: "",
      displayFeedback: false,
      display: false
    };
  }
  componentDidMount() {
    LanguageService.getHead().then(res => {
      this.setState({ display: true });
      this.context.setHead(res);
    });
  }

  handleChange(guess) {
    let cleanGuess = guess.toLowerCase().trim();
    this.setState({ guess: cleanGuess });
  }

  handleSubmit(e) {
    e.preventDefault();
    LanguageApiService.postGuess(this.state.guess).then(res => {
      this.setState({
        original: this.context.currentWord.nextWord,
        displayFeedback: true
      });
      this.context.setHead(res);
      return;
    });
  }

  handleClick() {
    this.setState({ displayFeedback: false });
  }

  render() {
    let h2Response, feedback;
    if (this.state.displayFeedback) {
      h2Response = this.context.currentWord.isCorrect
        ? "You were correct! :D"
        : "Good try, but not quite right :(";
      feedback = (
        <p className="feedback">
          The correct translation for{" "}
          <span lang="es" className="feedback-span">
            {this.state.original}
          </span>{" "}
          was{" "}
          <span className="feedback-span">
            {this.context.currentWord.answer}
          </span>{" "}
          and you chose {this.state.guess}!
        </p>
      );
    }

    return this.state.displayFeedback ? (
      <div className="word-item-container">
        <div className="container">
          <div className="word-item-form">
            <div className="DisplayScore">
              <p>{`Your total score is: ${
                this.context.currentWord.totalScore
              }`}</p>
            </div>
            <h2 className="response">{h2Response}</h2>
            <div className="DisplayFeedback">{feedback}</div>
            <button
              id={"learn-guess-button"}
              onClick={() => {
                this.handleClick();
              }}
            >
              Try another word!
            </button>
          </div>
        </div>
      </div>
    ) : (
      <div className="word-item-container">
        {this.context.currentWord && (
          <div className="container">
            <form
              className="word-item-form"
              onSubmit={e => this.handleSubmit(e)}
            >
              <h2 className="word-header">Translate the word:</h2>
              <span lang="es" id="word">
                {this.context.currentWord.nextWord}
              </span>
              <label htmlFor="learn-guess-input">
                What's the translation for this word?
              </label>
              <input
                type="text"
                id="learn-guess-input"
                required
                autoComplete="off"
                onChange={e => this.handleChange(e.target.value)}
              />
              <button type="submit" id="learn-guess-button">
                Submit your answer
              </button>
            </form>
            <div className="score-container">
              <p>Your total score is: {this.context.currentWord.totalScore}</p>
              <p>{`You have answered this word correctly ${
                this.context.currentWord.wordCorrectCount
              } times.`}</p>
              <p>{`You have answered this word incorrectly ${
                this.context.currentWord.wordIncorrectCount
              } times.`}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
