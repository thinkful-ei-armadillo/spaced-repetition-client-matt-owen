import React, { Component } from "react";
import AuthApiService from "../services/auth-api-service";
import TokenService from "../services/token-service";
import IdleService from "../services/idle-service";

const UserContext = React.createContext({
	user: {},
	error: null,
	language: {},
	languageWords: {},
	currentWord: null,
	setUser: () => {},
	setLanguage: () => {},
	setHead: () => {},
	setError: () => {},
	clearError: () => {},
	clearWords: () => {},
	processLogin: () => {},
	processLogout: () => {}
});

export default UserContext;

export class UserProvider extends Component {
	constructor(props) {
		super(props);
		const state = {
			user: {},
			language: null,
			languageWords: null,
			currentWord: null,
			error: null
		};

		const jwtPayload = TokenService.parseAuthToken();

		if (jwtPayload)
			state.user = {
				id: jwtPayload.user_id,
				name: jwtPayload.name,
				username: jwtPayload.sub
			};

		this.state = state;
		IdleService.setIdleCallback(this.logoutBecauseIdle);
	}

	componentDidMount() {
		if (TokenService.hasAuthToken()) {
			IdleService.regiserIdleTimerResets();
			TokenService.queueCallbackBeforeExpiry(() => {
				this.fetchRefreshToken();
			});
		}
	}

	componentWillUnmount() {
		IdleService.unRegisterIdleResets();
		TokenService.clearCallbackBeforeExpiry();
	}

	setUser = user => {
		this.setState({ user });
	};

	setLanguage = language => {
		this.setState({
			language: language.language,
			languageWords: language.words
		});
	};

	setHead = head => {
		this.setState({
			currentWord: head
		});
	};

	setError = error => {
		console.error(error);
		this.setState({ error });
	};

	clearError = () => {
		this.setState({ error: null });
	};

	clearWords = () => {
		this.setState({ language: null, languageWords: null, currentWord: null });
	};

	processLogin = authToken => {
		TokenService.saveAuthToken(authToken);
		const jwtPayload = TokenService.parseAuthToken();
		this.setUser({
			id: jwtPayload.user_id,
			name: jwtPayload.name,
			username: jwtPayload.sub
		});

		IdleService.regiserIdleTimerResets();
		TokenService.queueCallbackBeforeExpiry(() => {
			this.fetchRefreshToken();
		});
	};

	processLogout = () => {
		TokenService.clearAuthToken();
		TokenService.clearCallbackBeforeExpiry();
		IdleService.unRegisterIdleResets();
		this.setUser({});
	};

	logoutBecauseIdle = () => {
		TokenService.clearAuthToken();
		TokenService.clearCallbackBeforeExpiry();
		IdleService.unRegisterIdleResets();
		this.setUser({ idle: true });
	};

	fetchRefreshToken = () => {
		AuthApiService.refreshToken()
			.then(res => {
				TokenService.saveAuthToken(res.authToken);
				TokenService.queueCallbackBeforeExpiry(() => {
					this.fetchRefreshToken();
				});
			})
			.catch(err => {
				this.setError(err);
			});
	};

	render() {
		const value = {
			user: this.state.user,
			error: this.state.error,
			language: this.state.language,
			languageWords: this.state.languageWords,
			currentWord: this.state.currentWord,
			setHead: this.setHead,
			setUser: this.setUser,
			setLanguage: this.setLanguage,
			setError: this.setError,
			clearError: this.clearError,
			clearWords: this.clearWords,
			processLogin: this.processLogin,
			processLogout: this.processLogout
		};
		return (
			<UserContext.Provider value={value}>
				{this.props.children}
			</UserContext.Provider>
		);
	}
}
