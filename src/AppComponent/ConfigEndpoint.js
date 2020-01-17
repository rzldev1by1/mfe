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

    "ddlordertype": baseUrl + "dropdown/getordertype"
};

const headers = {
    'userLevel': Authentication.getUserLevel(),
    'companyCode': Authentication.getCompanyCode(),
    'Authorization': 'Bearer ' + Authentication.getToken(),
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

export { endpoint, headers };