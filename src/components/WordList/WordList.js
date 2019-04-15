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
						<li className="word">
							<h4 className="language">{word.original}</h4>
							<p>{`correct answer count: ${word.correct_count}`}</p>
							<p>{`incorrect answer count: ${word.incorrect_count}`}</p>
						</li>
					);
			  });
	}
}

export default WordList;
