import AppComponent from '../AppComponent';
import Authentication from '../Auth/Authentication';

let baseUrl = AppComponent.getBaseUrl();

const endpoint = {
    'userLogin': baseUrl + "userlogin",

    'stockHoldingSummary': baseUrl + "stockholding",
    'stockDetail': baseUrl + "stockdetail/",
    'stockBalanceForecast': baseUrl + "foreshadowedstockbalance/",

    'stockMovement': baseUrl + "stockmovement",

    "purchaseOrder": baseUrl + "purchaseOrder",

    "getClient": baseUrl + "dropdown/getclient",
    "getSite": baseUrl + "dropdown/getsite",
    "getSupplier": baseUrl + "dropdown/getsupplier",
    "getOrderType": baseUrl + "dropdown/getordertype",

    "UserManagement_ModuleAccess": baseUrl + "usermanagement/module"
};

const headers = {
    'userLevel': Authentication.getUserLevel(),
    'companyCode': Authentication.getCompanyCode(),
    'Authorization': 'Bearer ' + Authentication.getToken(),
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

export { endpoint, headers };
