import helpers from 'helpers';

let baseUrl = process.env.REACT_APP_API_URL;

const endpoint = {
    'userLogin': baseUrl + "usermanagement/login",

    'stockHoldingSummary': baseUrl + "stockholding",
    'stockHoldingDetail': baseUrl + "stockdetail/header/",
    'stockDetail': baseUrl + "stockdetail/",
    // 'stockBalanceForecast': baseUrl + "foreshadowedstockbalance/",
    'stockBalanceForecast': baseUrl + "stockdetail/forshadowed/",

    'stockMovement': baseUrl + "stockmovement",

    "purchaseOrder": baseUrl + "purchaseOrder",
    "purchaseOrderCreate": baseUrl + "purchaseOrder/store",

    "salesOrder" : baseUrl + "salesorder",
    "salesOrderCreate": baseUrl + "salesorder/store",

    "getClient": baseUrl + "dropdown/getclient",
    "getSite": baseUrl + "dropdown/getsite",
    "OrderNO" : baseUrl + "dropdown/getorderno",
    "getSupplier": baseUrl + "dropdown/getsupplier",
    "getOrderType": baseUrl + "dropdown/getordertype",
    "getSoResources": baseUrl + "getsorecources",
    "getPOResources": baseUrl + "getporecources",
    "orderCheck": baseUrl + "orderCheck",

    "getSoIdentity":baseUrl + "getSoIdentity",
    "getProduct": baseUrl + "dropdown/getProduct",
    "getUom": baseUrl + "dropdown/getuom",
    "getDisposition": baseUrl + "dropdown/getdisposition",
    "UserManagement_ModuleAccess": baseUrl + "usermanagement/module",

    "UserManagement_Create": baseUrl + "usermanagement/register",
    "UserManagement_ListUser": baseUrl + "web_user",
    "UserManagement_User_Detail": baseUrl + "web_user_detail/",
    "UserManagement_Update": baseUrl + "usermanagement/update/",
    "UserManagement_resetpassword": baseUrl + "usermanagement/forgot_password",
};

const headers = {
    'userLevel': helpers.getUserLevel(),
    'client': helpers.getClient(),
    'Authorization': 'Bearer ' + helpers.getToken(),
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'WebUser': helpers.getWebUser(),
};

const POheaders = {
    'userLevel': helpers.getUserLevel(),
    'companyCode': helpers.getCompanyCode(),
    'Authorization': 'Bearer ' + helpers.getToken(),
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Client': helpers.getClient()
};

const getUserSite = helpers.getSite()
export { endpoint, headers, POheaders, getUserSite };
