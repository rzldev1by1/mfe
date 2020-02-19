import AppComponent from '../AppComponent';
import Authentication from '../Auth/Authentication';

let baseUrl = AppComponent.getBaseUrl();

const endpoint = {
    'userLogin': baseUrl + "userlogin",

    'stockHoldingSummary': baseUrl + "stockholding",
    'stockDetail': baseUrl + "stockdetail/",
    'foreshadowedBalance': baseUrl + "foreshadowedstockbalance/",

    'stockMovement': baseUrl + "stockmovement",

    "purchaseOrder": baseUrl + "purchaseOrder",

    "ddlclient": baseUrl + "dropdown/getclient",

    "ddlsite": baseUrl + "dropdown/getsite",

    "ddlsupplier": baseUrl + "dropdown/getsupplier",

    "ddlordertype": baseUrl + "dropdown/getordertype",

    "UserManagement_ModuleAccess": baseUrl + "usermanagement/module",

    "UserManagement_Create": baseUrl + "usermanagement/register",
    "UserManagement_ListUser": baseUrl + "web_user",
    "UserManagement_User_Detail": baseUrl + "web_user_detail/",
    "UserManagement_Update": baseUrl + "usermanagement/update/",
};

const headers = {
    'userLevel': Authentication.getUserLevel(),
    'companyCode': Authentication.getCompanyCode(),
    'Authorization': 'Bearer ' + Authentication.getToken(),
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

export { endpoint, headers };
