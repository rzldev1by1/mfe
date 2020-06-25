// import moment from 'moment';

import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;
const options = { headers: { 'Content-Type': 'application/json' } }
class Helpers {
	static staticMethod() {
		return 'static method has been called.';
	}

	static isAuthenticated = () => {
		return !this.getToken() ? false : true;
	}

	static setAuthenticate = (userDetails) => {
		if (userDetails === null) {
			let keysToRemove = ["user", "filterDataItem", "columnDataItem"];
			keysToRemove.forEach(i => {
				localStorage.removeItem(i)
			});
			return;
		}
		// userDetails["expiredDate"] = moment().add(1, 'minutes');
		// userDetails["now"] = new Date();
		localStorage.setItem("user", JSON.stringify(userDetails));
	}

	static renewExpiredDate = () => {
		// let user = JSON.parse(localStorage.user);
		// user.last_login_date = moment().add(1, 'minutes');
		// localStorage.setItem("user", JSON.stringify(user));
	}

	static getUser = () => {
		return JSON.parse(localStorage.getItem("user"));
	}



	static getUserLevel = () => {
		let user = this.getUser();
		if (!user) { return false };
		return user["userLevel"];
	}

	static getClient = () => {
		let user = this.getUser();
		if (!user) { return "false" };
		if (user["client"]) { //check empty or not
			return user["client"];
		} else {
			return "";
		};
	}
	static getSite = () => {
		let user = this.getUser();
		if (!user) { return "false" };
		if (user["site"]) { //check empty or not
			return user["site"];
		} else {
			return "";
		};
	}

	static getName = () => {
		let user = this.getUser();
		if (!user) { return false };
		return user["name"];
	}

	static getId = () => {
		let user = this.getUser();
		if (!user) { return false };
		return user["userId"];
	}

	static getToken = () => {
		let user = this.getUser();
		if (!user) { return false };
		return user["token"];
	}

	static getExpiredDate = () => {
		// let user = this.getUser();
		// if (!user) { return false };
		// return user["expiredDate"];
	}

	static getCompanyCode = () => {
		let user = this.getUser();
		if (!user) { return false };
		if (user["company"]) { //check empty or not
			return user["company"];
		} else {
			return "";
		};
	}

	static getWebUser = () => {
		let user = this.getUser();
		if (!user) { return false };
		// return user["userModules"][0].web_user;
		return user["webUser"];
	}

	static getUserMenu = () => {
		let user = JSON.parse(localStorage.getItem("user"));
		if (user) {
			if (user["userModules"]) {
				if (user["userModules"].length)
					return user["userModules"].map((item) => { return item.menu_id });
			}
		}
		else
			return [];
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

		let user = this.getUser();
		localStorage.removeItem(user);
	}

	static signOut = () => {
		this.eraseAllLocalData();
		this.setAuthenticate(null);
	}

	static getSavedColumn = () => {
		return JSON.parse(localStorage.getItem('savedColumn'))
	}

	static requestResetPasswordHandler = (payload) => {
		return (
			axios.post(baseUrl + "usermanagement/request_reset_password", payload, options)
				.then(res => {
					if (res.data) {
						return res;
					}
				})
				.catch(function (error) {
					return error.response.data;
				})
		);
	}

	static authenticationHandler = async (payload) => {
		let result = {}
		try {
			const { data } = await axios.post(baseUrl + "usermanagement/login", payload, options)
			if (data) {
				result.isSuccess = true;
				result.redirect = "/";
				result.data = data
				this.setAuthenticate(data);
			}
			return result;
		} catch (error) {
			result.isSuccess = false;
			result.message = "Failed to process your request";
			if (error.response) {
				result.message = error.response.status ? "Username or password is not valid" : "Failed to process your request";
			}
			return result;
		}
	}

	static renewToken = () => {
		let oldToken = this.getToken();
		let result = {};

		return (
			axios.post(baseUrl + "/usermanagement/login", {
				headers: {
					'token': oldToken,
					'Content-Type': 'application/json'
				}
			})
				.then(res => {
					result.isSuccess = true;
					this.setAuthenticate(res.data);
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
		);
	}
}

export default Helpers;
