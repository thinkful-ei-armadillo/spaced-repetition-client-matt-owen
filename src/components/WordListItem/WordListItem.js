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
      guess: ""
    };
  }
  componentDidMount() {
    LanguageService.getHead().then(this.context.setHead);
  }

  handleChange(guess) {
    let cleanGuess = guess.toLowerCase().trim();
    this.setState({ guess: cleanGuess });
  }

  handleSubmit(e) {
    e.preventDefault();
    LanguageApiService
      .postGuess(this.state.guess)
      // .then()
  }

  render() {
    return (
      <div className="word-item-container">
        {this.context.currentWord && (
          <div className="container">
            <form
              className="word-item-form"
              onSubmit={e => this.handleSubmit(e)}
            >
              <h2 className="word-header">Translate the word:</h2>
              <span id="word">{this.context.currentWord.nextWord}</span>
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
              <button
                type="submit"
                id="learn-guess-button"
              >
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
