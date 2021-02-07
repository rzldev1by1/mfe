export default {
  // Dropdown Start --------------------------------------------------------
  getSite: '/settings/sites',
  getClient: '/settings/clients',
  getIsisTask: '/settings/tasks',
  getProduct: '/v1/products/typeahead',
  getUom: '/dropdown/getuom',
  getDisposition: '/settings/dispositions',

  getOrderNo: '/dropdown/getorderno',
  getSupplier: '/dropdown/getsupplier',
  getCustomer: '/settings/customers',
  getOrderType: '/dropdown/getordertype',
  // Dropdown End --------------------------------------------------------

  // Stock Holding Start --------------------------------------------------------
  stockHoldingSummary: '/stockholding',
  stockHoldingDetail: '/stockdetail/header/',
  stockDetail: '/stockdetail',
  stockBalanceForecast: '/foreshadowedstockbalance/',
  getStockHoldingHearder: '/getStockholdingColumn',
  // Stock Holding End --------------------------------------------------------

  // Stock Movement Start --------------------------------------------------------
  stockMovement: '/stockmovement',
  // Stock Movement End --------------------------------------------------------

  // purchace Order Start --------------------------------------------------------
  purchaseOrder: '/purchaseOrder',
  purchaseOrderCreate: '/purchaseOrder/store',
  getPOResources: '/getporecources',

  // purchace Order End --------------------------------------------------------

  // sales Order Start --------------------------------------------------------
  salesOrder: '/v1/sales-orders',
  salesOrderCreate: '/v1/sales-orders',
  getSoResources: '/v1/preferences/sales-order-options',
  getSoIdentity: '/getSoIdentity',
  // sales Order End --------------------------------------------------------

  // User Management Start --------------------------------------------------------
  userManagementModuleAccess: '/usermanagement/module',
  userManagementCreate: '/usermanagement/register',
  userManagementListUser: '/v1/users',
  userManagementUser_Detail: '/web_user_detail/',
  userManagementUpdate: '/usermanagement/update/',
  userManagementresetpassword: '/usermanagement/forgot_password',
  userManagementCheckMailValidation: '/emailCheck',
  // User Management End --------------------------------------------------------

  stockDateRange: '/stockdaterange',
  stockAgeProfile: '/stockageprofile',

  userLogin: '/auth/login',
  resetPassword: '/usermanagement/request_reset_password',

  orderCheck: '/orderCheck',
};
