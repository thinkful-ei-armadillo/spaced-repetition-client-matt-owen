import React, { Component } from "react";
import { Link } from "react-router-dom";

import WordList from "../../components/WordList/WordList";
import LanguageService from "../../services/language-api-service";
import UserContext from "../../contexts/UserContext";
import "./DashboardRoute.css";

class DashboardRoute extends Component {
	static contextType = UserContext;
	componentDidMount() {
		LanguageService.getLanguage().then(this.context.setLanguage);
	}
	render() {
		const { language = null } = this.context;
		return !language ? (
			""
		) : (
			<section className="dashboard">
				<Link to={"/learn"}>{"Start Practicing"}</Link>
				<h2 className="language"> Practicing {this.context.language.name}</h2>
				<h2 className="total_correct">
					Total correct answers: {this.context.language.total_score}
				</h2>
				<WordList />
				<h3>{"Words to Practice"}</h3>
				{"<WordListItem />"}
			</section>
		);
	}
}

export default DashboardRoute;
