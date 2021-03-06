import React, { Component } from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";
import UserContext from "../../contexts/UserContext";
import "./Header.css";

class Header extends Component {
	static contextType = UserContext;

	handleLogoutClick = () => {
		this.context.processLogout();
	};

	renderLogoutLink() {
		return (
			<div>
				<span>{this.context.user.name}</span>
				<nav role='navigation' className={"header-logout"}>
					<Link
						className={"header-link"}
						onClick={this.handleLogoutClick}
						to="/login">
						Logout
					</Link>
				</nav>
			</div>
		);
	}

	renderLoginLink() {
		return (
			<nav role='navigation' className="header-nav">
				<Link className="header-link" to="/login">
					Login
				</Link>{" "}
				<Link className="header-link" to="/register">
					Sign up
				</Link>
			</nav>
		);
	}
	// &iexcl;Aprendamos!
	render() {
		return (
			<header role='banner' className="header">
				<h1>
					<Link className="header-link" to="/">
						Spaced repetition
					</Link>{" "}
				</h1>
				{TokenService.hasAuthToken()
					? this.renderLogoutLink()
					: this.renderLoginLink()}
			</header>
		);
	}
}

export default Header;
