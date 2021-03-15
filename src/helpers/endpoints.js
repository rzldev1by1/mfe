export default {
  // Dropdown Start --------------------------------------------------------
  getSite: '/settings/sites',
  getClient: '/settings/clients',
  getIsisTask: '/settings/tasks',
  getProduct: '/v1/products/typeahead',
  getUom: '/dropdown/getuom',
  getDisposition: '/settings/dispositions',

  getOrderNo: '/dropdown/getorderno',
  getSupplier: '/settings/suppliers',
  getCustomer: '/settings/customers',
  getOrderType: '/dropdown/getordertype',
  // Dropdown End --------------------------------------------------------

  // Stock Holding Start --------------------------------------------------------
  stockHoldingSummary: '/v1/stocks/holding',
  getStockHoldingHearder: '/getStockholdingColumn',
  // Stock Holding End --------------------------------------------------------

  // Stock Movement Start --------------------------------------------------------
  stockMovement: '/v1/stocks/movement',
  // Stock Movement End --------------------------------------------------------

  // purchace Order Start --------------------------------------------------------
  purchaseOrder: '/v1/purchase-orders',
  purchaseOrderCreate: '/v1/purchase-orders',
  getPOResources: '/v1/preferences/purchase-order-options',

  // purchace Order End --------------------------------------------------------

  // sales Order Start --------------------------------------------------------
  salesOrder: '/v1/sales-orders',
  salesOrderCreate: '/v1/sales-orders',
  getSoResources: '/v1/preferences/sales-order-options',
  getSoIdentity: '/getSoIdentity',
  // sales Order End --------------------------------------------------------

  // User Management Start --------------------------------------------------------
  userManagementModuleAccess: '/v1/preferences/user-modules',
  userManagementCreate: '/v1/users',
  userManagementListUser: '/v1/users',
  userManagementUser_Detail: '/v1/users/',
  userManagementUpdate: '/v1/users/',
  userManagementresetpassword: '/v1/users/',
  userManagementCheckMailValidation: '/v1/users/check-email',
  // User Management End --------------------------------------------------------

  stockDateRange: '/v1/stocks/movement/date-range',
  stockAgeProfile: '/stockageprofile',

  userLogin: '/auth/login',
  userLogout: '/auth/logout',
  resetPassword: '/auth/forgot-password',

  orderCheck: '/orderCheck',
};
