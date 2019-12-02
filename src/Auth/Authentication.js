import axios from 'axios';
// import moment from 'moment';
import AppComponent from '../AppComponent';

class Authentication {
	static endpoint = "user/session";

	static isAuthenticated = () => {
		return !Authentication.getToken() ? false : true;
	}

	static setAuthenticate = (userDetails) => {
		// if (userDetails === null) {
		// 	let keysToRemove = [ "user", "filterDataItem", "columnDataItem" ];
		// 	keysToRemove.forEach(i => {
		// 		localStorage.removeItem(i)
		// 	});
		// 	return;
		// }
		// userDetails["expiredDate"] = moment().add(1, 'minutes');
		// userDetails["now"] = new Date();
		// localStorage.setItem("user", JSON.stringify(user)); 
	}

	static renewExpiredDate = () => {
		// let user = JSON.parse(localStorage.user);
		// user.last_login_date = moment().add(1, 'minutes');
		// localStorage.setItem("user", JSON.stringify(user));
	}

	static getUser = () => {
		return JSON.parse(localStorage.getItem("user"));
	}

	static getToken = () => {
		// let user = Authentication.getUser();
		// if (!user) { return false };
		// return user["session_token"];
	}

	static getExpiredDate = () => {
		// let user = Authentication.getUser();
		// if (!user) { return false };
		// return user["expiredDate"];
	}

	static getCompanyCode = () => {
		// let user = Authentication.getUser();
		// if (!user) { return false };
		// return user["company"];
	}

	static eraseAllLocalData = () => {
		// let localStorageKeys = [
		// 	"filterDataItem",
		// 	"columnDataItem",
		// 	"masterDataList",
		// 	"end"
		// ];

		// localStorageKeys.forEach(element => {
		// 	if (localStorage.getItem(element)) {
		// 		localStorage.removeItem(element);
		// 	}
		// });
	}

	static signOut = () => {
		Authentication.eraseAllLocalData();
		Authentication.setAuthenticate(null);
	}

	authenticationHandler = (data) => {
		let result = {};
		let params = {};

		return axios.post(AppComponent.getBaseUrl() + Authentication.endpoint, data,
			{
				params: params,
				headers: { 'Content-Type': 'application/json' }
			}
		)
		.then(res => {
			if (res.data) {
				if (res.data.error) {
					result.isSuccess = false
					result.message = res.data.error.status_code === 401 ? "Invalid username or password" : res.data.error.message;
					return result;
				} else {
					result.isSuccess = true;
					Authentication.setAuthenticate(res.data);
					return this.renewToken();
				}
			} else {
				result.isSuccess = false;
				result.message = res.data.error.message;
				return result;
			}
		})
		.catch(function (error) {
			result.isSuccess = false;
			if (error.response) {
				result.message = error.response.status === 401 ? error.response.data.error.message : "Failed to process your request";
			} else {
				result.message = "Failed to process your request";
			}
			return result;
		});
	}

	renewToken = () => {
		let oldToken = Authentication.getToken();
		let result = {};
		let params = {};

		return axios.get(AppComponent.getBaseUrl() + Authentication.endpoint,
			{
				params: params,
				headers: {
					'X-DreamFactory-Session-Token': oldToken,
					'Content-Type': 'application/json' 
				}
			}
		)
		.then(res => {
			result.isSuccess = true;
			Authentication.setAuthenticate(res.data);
			return result;
		})
		.catch(function (error) {
			result.isSuccess = false;
			if (error.response) {
				result.message = error.response.status === 401 ? error.response.data.error.message : "Failed to process your request";
			} else {
				result.message = "Failed to process your request";
			}
			return result;
		})
	}
}

export default Authentication;