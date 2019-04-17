import React, { Component } from "react";
import UserContext from "../../contexts/UserContext";

class WordList extends Component {
	static contextType = UserContext;

	render() {
		const { languageWords = null } = this.context;
		return !languageWords
			? ""
			: languageWords.map(word => {
					return (
						<div className="wordlist-container" key={word.id}>
							<li className="word" key={word.id}>
								<h4 className="language">{word.original}</h4>
								<p>{`correct answer count: ${word.correct_count}`}</p>
								<p>{`incorrect answer count: ${word.incorrect_count}`}</p>
							</li>
						</div>
					);
			  });
	}
}
export default WordList;
