import React, { Component } from "react";
import UserContext from "../../contexts/UserContext";
import LanguageService from "../../services/language-api-service";
import "./WordListItem.css";

export default class WordListItem extends Component {
  static contextType = UserContext;

  componentDidMount() {
    LanguageService.getHead().then(this.context.setHead);
  }
  render() {
    return (
      <div className="word-item-container">
        {this.context.currentWord && (
          <div className="container">
            <form className="word-item-form">
              <h2 className="word-header">Translate the word:</h2>
              <span id="word">{this.context.currentWord.nextWord}</span>
              <label htmlFor="learn-guess-input">
                What's the translation for this word?
              </label>
              <input type="text" id="learn-guess-input" required autoComplete="off"/>
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
