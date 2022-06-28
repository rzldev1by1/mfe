import axios from 'axios';
import endpoints from './endpoints';

const baseUrl = endpoints.env.REACT_APP_API_URL;
const options = { headers: { 'Content-Type': 'application/json' } };
class Helpers {
  static staticMethod() {
    return 'static method has been called.';
  }

  static isAuthenticated = () => {
    return !this.getToken() ? false : true;
  };

  static setAuthenticate = (userDetails) => {
    if (userDetails === null) {
      let keysToRemove = ['user', 'filterDataItem', 'columnDataItem'];
      keysToRemove.forEach((i) => {
        localStorage.removeItem(i);
      });
      return;
    }
    localStorage.setItem('user', JSON.stringify(userDetails));
  };
  static getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
  };

  static getUserLevel = () => {
    let user = this.getUser();
    if (!user) {
      return false;
    }
    return user['userLevel'];
  };

  static getClient = () => {
    let user = this.getUser();
    if (!user) {
      return 'false';
    }
    if (user['client']) {
      return user['client'];
    } else {
      return '';
    }
  };
  static getSite = () => {
    let user = this.getUser();
    if (!user) {
      return 'false';
    }
    if (user['site']) {
      return user['site'];
    } else {
      return '';
    }
  };

  static getName = () => {
    let user = this.getUser();
    if (!user) {
      return false;
    }
    return user['name'];
  };

  static getId = () => {
    let user = this.getUser();
    if (!user) {
      return false;
    }
    return user['userId'];
  };

  static getToken = () => {
    let user = this.getUser();
    if (!user) {
      return false;
    }
    return user['token'];
  };

  static getCompanyCode = () => {
    let user = this.getUser();
    if (!user) {
      return false;
    }
    if (user['company']) {
      return user['company'];
    } else {
      return '';
    }
  };

  static getWebUser = () => {
    let user = this.getUser();
    if (!user) {
      return false;
    }
    return user['webUser'];
  };

  static getUserMenu = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      if (user['userModules']) {
        if (user['userModules'].length)
          return user['userModules'].map((item) => {
            return item.menu_id;
          });
      }
    } else return [];
  };

  static eraseAllLocalData = () => {
    let user = this.getUser();
    localStorage.removeItem(user);
  };

  static signOut = () => {
    this.eraseAllLocalData();
    this.setAuthenticate(null);
  };

  static getSavedColumn = () => {
    return JSON.parse(localStorage.getItem('savedColumn'));
  };

  static requestResetPasswordHandler = (payload) => {
    return axios
      .post(baseUrl + '/auth/forgot-password', payload, options)
      .then((res) => {
        if (res.data) {
          return res;
        }
      })
      .catch(function (error) {
        return error.response.data;
      });
  };

  static authenticationHandler = async (payload) => {
    let result = {};
    try {
      const { data } = await axios.post(baseUrl + '/usermanagement/login', payload, options);
      if (data) {
        result.isSuccess = true;
        result.redirect = '/';
        result.data = data;
        this.setAuthenticate(data);
      }
      return result;
    } catch (error) {
      result.isSuccess = false;
      result.message = 'Failed to process your request';
      if (error.response) {
        result.message = error.response.status ? 'Username or password is not valid' : 'Failed to process your request';
      }
      return result;
    }
  };

  static renewToken = () => {
    let oldToken = this.getToken();
    let result = {};

    return axios
      .post(baseUrl + '/usermanagement/login', {
        headers: {
          token: oldToken,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        result.isSuccess = true;
        this.setAuthenticate(res.data);
        return result;
      })
      .catch(function (error) {
        result.isSuccess = false;
        if (error.response) {
          result.message =
            error.response.status === 401 ? error.response.data.error.message : 'Failed to process your request';
        } else {
          result.message = 'Failed to process your request';
        }
        return result;
      });
  };
}

export default Helpers;
