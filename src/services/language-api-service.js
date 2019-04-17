import config from "../config";
import TokenService from "./token-service";

const LanguageApiService = {
	getLanguage() {
		return fetch(`${config.API_ENDPOINT}/language`, {
			method: "GET",
			headers: {
				authorization: `Bearer ${TokenService.getAuthToken()}`
			}
		}).then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	},
	
	getHead() {
		return fetch(`${config.API_ENDPOINT}/language/head`, {
			method: "GET",
			headers: {
				authorization: `Bearer ${TokenService.getAuthToken()}`
			}
		}).then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	},

	postGuess(guess) {
		return fetch(`${config.API_ENDPOINT}/language/head`, {
			method: "POST",
			headers: {
				'Content-Type': "application/json",
				authorization: `Bearer ${TokenService.getAuthToken()}`
			},
			body : JSON.stringify(guess)
		}).then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	}
};

export default LanguageApiService;
