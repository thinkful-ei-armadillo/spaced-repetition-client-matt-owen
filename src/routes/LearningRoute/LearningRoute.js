import React, { Component } from "react";
import UserContext from "../../contexts/UserContext";
import LanguageService from "../../services/language-api-service";

class LearningRoute extends Component {
	static contextType = UserContext;

	componentDidMount() {
		LanguageService.getHead().then(this.context.currentWord);
	}

	render() {
		return <section>LearningRoute</section>;
	}
}

export default LearningRoute;
