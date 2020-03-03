import AppComponent from '../AppComponent';
import Authentication from '../Auth/Authentication';

let baseUrl = AppComponent.getBaseUrl();

const endpoint = {
    'userLogin': baseUrl + "userlogin",

    'stockHoldingSummary': baseUrl + "stockholding",
    'stockHoldingDetail': baseUrl + "stockdetail/header/",
    'stockDetail': baseUrl + "stockdetail/",
    // 'stockBalanceForecast': baseUrl + "foreshadowedstockbalance/",
    'stockBalanceForecast': baseUrl + "stockdetail/forshadowed/",

    'stockMovement': baseUrl + "stockmovement",

    "purchaseOrder": baseUrl + "purchaseOrder",

    "salesOrder" : baseUrl + "salesorder",

    "getClient": baseUrl + "dropdown/getclient",
    "getSite": baseUrl + "dropdown/getsite",
    "OrderNO" : baseUrl + "dropdown/getorderno",
    "getSupplier": baseUrl + "dropdown/getsupplier",
    "getOrderType": baseUrl + "dropdown/getordertype",

    "UserManagement_ModuleAccess": baseUrl + "usermanagement/module",

    "UserManagement_Create": baseUrl + "usermanagement/register",
    "UserManagement_ListUser": baseUrl + "web_user",
    "UserManagement_User_Detail": baseUrl + "web_user_detail/",
    "UserManagement_Update": baseUrl + "usermanagement/update/",
};

const headers = {
    // 'userLevel': Authentication.getUserLevel(),
    // 'companyCode': Authentication.getCompanyCode(),
    'userLevel': 'WAREHOUSE',
    'client': 'MLS',
    'Authorization': 'Bearer ' + Authentication.getToken(),
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

const POheaders = {
    'userLevel': Authentication.getUserLevel(),
    'companyCode': Authentication.getCompanyCode(),
    'Authorization': 'Bearer ' + Authentication.getToken(),
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Client': 'MLS'
};
export { endpoint, headers, POheaders };
