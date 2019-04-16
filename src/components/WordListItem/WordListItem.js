import React, { Component } from "react";
import UserContext from "../../contexts/UserContext";
import LanguageService from "../../services/language-api-service";

export default class WordListItem extends Component {
  static contextType = UserContext;

  componentDidMount() {
    LanguageService.getHead().then(this.context.setHead);
  }
  render() {
    return (
      <div className="word-item-container">
        {this.context.currentWord && (
          <form className="word-item-form">
            <h2>
              Translate the word:
            </h2>
            <span>{this.context.currentWord.nextWord}</span>
            <p>Your total score is: {this.context.currentWord.totalScore}</p>
            <p>{`You have answered this word correctly ${this.context.currentWord.wordCorrectCount} times.`}</p>
            <p>{`You have answered this word incorrectly ${this.context.currentWord.wordIncorrectCount} times.`}</p>
            <label htmlFor="learn-guess-input" id="learn-guess-input">
              What's the translation for this word?
            </label>
            <input type="text" id="learn-guess-input" required />
            <button type="submit">Submit your answer</button>
          </form>
        )}
      </div>
    );
  }
}
