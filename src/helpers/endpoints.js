export default {
  // Dropdown Start --------------------------------------------------------
  getSite: '/dropdown/getsite',
  getClient: '/dropdown/getclient',
  getIsisTask: '/dropdown/getIsisTask',
  getProduct: '/dropdown/getProduct',
  getUom: "/dropdown/getuom",
  getDisposition: "/dropdown/getdisposition",

  getOrderNo: "/dropdown/getorderno",
  getSupplier: "/dropdown/getsupplier",
  getCustomer: "/dropdown/getcustomer",
  getOrderType: "/dropdown/getordertype",
  // Dropdown End --------------------------------------------------------

  // Stock Holding Start --------------------------------------------------------
  stockHoldingSummary: "/stockholding",
  stockHoldingDetail: "/stockdetail/header/",
  stockDetail: "/stockdetail",
  stockBalanceForecast: "/foreshadowedstockbalance/",
  getStockHoldingHearder:"/getStockholdingColumn",
  // Stock Holding End --------------------------------------------------------
  
  // Stock Movement Start --------------------------------------------------------
  stockMovement: "/stockmovement",
  // Stock Movement End --------------------------------------------------------

  // purchace Order Start --------------------------------------------------------
  purchaseOrder: "/purchaseOrder",
  purchaseOrderCreate: "/purchaseOrder/store",
  getPOResources: "/getporecources",

  // purchace Order End --------------------------------------------------------

  // sales Order Start --------------------------------------------------------
  salesOrder: '/salesorder',
  salesOrderCreate: "/salesorder/store",
  getSoResources: '/getsorecources',
  getSoIdentity: "/getSoIdentity",
  // sales Order End --------------------------------------------------------

  // User Management Start --------------------------------------------------------
  userManagementModuleAccess: "/usermanagement/module",
  userManagementCreate: "/usermanagement/register",
  userManagementListUser: "/web_user",
  userManagementUser_Detail: "/web_user_detail/",
  userManagementUpdate: "/usermanagement/update/",
  userManagementresetpassword: "/usermanagement/forgot_password",
  userManagementCheckMailValidation: "/emailCheck",
  // User Management End --------------------------------------------------------

  stockDateRange: "/stockdaterange",
  stockAgeProfile:"/stockageprofile",

  userLogin: "/usermanagement/login",
  resetPassword: "/usermanagement/request_reset_password",

  orderCheck: "/orderCheck",
}