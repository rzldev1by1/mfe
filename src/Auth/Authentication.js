// import moment from 'moment';

import axios from 'axios';
import menunav from '../menunav'; 

import AppComponent from '../AppComponent';
// import { endpoint } from '../AppComponent/ConfigEndpoint';

class Authentication {
	static endpoint = "usermanagement/login";
	static resetPassword = 'usermanagement/request_reset_password';
  
	static staticMethod() {
		return 'static method has been called.';
	}

	static isAuthenticated = () => {
		return !Authentication.getToken() ? false : true;
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
		console.log(userDetails.token)
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
        let user = Authentication.getUser();
        if (!user) { return false };
        return user["userLevel"];
	}
	
	static getClient = () => {
        let user = Authentication.getUser();
		if (!user) { return "false" };
		if(user["client"]){ //check empty or not
			return user["client"];
		}else{
			return "";
		};
    }
    static getSite = () => {
        let user = Authentication.getUser();
		if (!user) { return "false" };
		if(user["site"]){ //check empty or not
			return user["site"];
		}else{
			return "";
		};
    }

		static getName = () => {
				let user = Authentication.getUser();
				if (!user) { return false };
				return user["name"];
		}

		static getId = () => {
				let user = Authentication.getUser();
				if (!user) { return false };
				return user["userId"];
		}

	static getToken = () => {
		let user = Authentication.getUser();
		if (!user) { return false };
		return user["token"];
	}

	static getExpiredDate = () => {
		// let user = Authentication.getUser();
		// if (!user) { return false };
		// return user["expiredDate"];
	}

	static getCompanyCode = () => {
		let user = Authentication.getUser();
		if (!user) { return false };
		if(user["company"]){ //check empty or not
			return user["company"];
		}else{
			return "";
		}; 
	}

	static getWebUser = () => {
		let user = Authentication.getUser();
		if (!user) { return false };
		// return user["userModules"][0].web_user;
		return user["webUser"];
	}

	static getUserMenu = () => {
		let user = JSON.parse(localStorage.getItem("user"));
		if(user){
			if(user["userModules"]){
				if(user["userModules"].length)
					return user["userModules"].map((item)=>{return item.menu_id});
			}
		}
		else
			return [];
	}

	static eraseAllLocalData = () => {
		let localStorageKeys = [
            Authentication.getUser(),
            "columnDataPO",
			// "filterDataItem",
			// "columnDataItem",
			// "masterDataList",
			// "end"
		];

		localStorageKeys.forEach(element => {
			if (localStorage.getItem(element)) {
				localStorage.removeItem(element);
			}
        });

        // let user = Authentication.getUser();
        // localStorage.removeItem(user); 
	}

	static expiredTokenCheck = (code) => {
		if(code===401 || code===400){
			//token expired 
			localStorage.setItem("expiredSession", "true");
			Authentication.signOut() 
			window.location = "/"; 
		}
	}

	static signOut = () => {
		Authentication.eraseAllLocalData();
		Authentication.setAuthenticate(null);
	}

	static getSavedColumn = () => {
		return JSON.parse(localStorage.getItem('savedColumn'))
	}

	requestResetPasswordHandler = (payload) => {
		return (
            axios.post(AppComponent.getBaseUrl() + Authentication.resetPassword, payload,
			{
				headers: { 'Content-Type': 'application/json' }
			})
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

	authenticationHandler = (payload) => {
		let result = {};

		return (
            axios.post(AppComponent.getBaseUrl() + Authentication.endpoint, payload,
			{
				headers: { 'Content-Type': 'application/json' }
			})
		    .then(res => {
                // if (res.data) {
                //     if (res.data.error) {
                //         result.isSuccess = false
                //         result.message = res.data.error.status_code === 401 ? "Username or password is not valid" : res.data.error.message;
                //         return result;
                //     } else {
                //         result.isSuccess = true;
                //         Authentication.setAuthenticate(res.data);
                //         // return this.renewToken();
                //         return result;
                //     }
                // } else {
                //     result.isSuccess = false;
                //     result.message = res.data.error.message;
                //     return result;
                // }
                if (res.data) {


										let stringMenus = res.data.userModules.length? res.data.userModules.map((item)=>{return item.menu_id;}):[];
										let menuItems =	menunav.items.filter((item) => { return stringMenus.indexOf(item.key) !== -1 });
										// let accessMenu = menuItems.length ? menuItems[0].url:"/Welcome";
										let accessMenu = "/Welcome";

										console.log(res.data)
                    result.isSuccess = true;
					result.url = accessMenu;
                    Authentication.setAuthenticate(res.data);
                    // return this.renewToken();
                    return result;
                }
            })
            .catch(function (error) {
                result.isSuccess = false;
                result.message = "Failed to process your request";

                if (error.response) {
                    result.message = error.response.status ? "Username or password is not valid" : "Failed to process your request";
                }

                return result;
            })
        );
	}

	renewToken = () => {
		let oldToken = Authentication.getToken();
		let result = {};

        return (
            axios.post(Authentication.endpoint, {
                headers: {
                    'token': oldToken,
                    'Content-Type': 'application/json'
                }
            })
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
        );
	}
}

export default Authentication;
