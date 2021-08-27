const version = process.env.REACT_APP_API_URL_VERSION;
export default {
  // Dropdown Start --------------------------------------------------------
  getSite: '/settings/sites',
  getClient: '/settings/clients',
  getIsisTask: '/settings/tasks',
  getProduct: `/${version}/products/typeahead`,
  getUom: '/dropdown/getuom',
  getDisposition: '/settings/dispositions',

  getOrderNo: '/dropdown/getorderno',
  getSupplier: '/settings/suppliers',
  getCustomer: '/settings/customers',
  getOrderType: '/dropdown/getordertype',

  getFilterDetailSP: '/supplier-management-options',
  // Dropdown End --------------------------------------------------------

  // Stock Holding Start --------------------------------------------------------
  stockHoldingSummary: `/${version}/stocks/holding`,
  getStockHoldingHearder: '/getStockholdingColumn',
  // Stock Holding End --------------------------------------------------------

  // Stock Movement Start --------------------------------------------------------
  stockMovement: `'/${version}/stocks/movement'`,
  // Stock Movement End --------------------------------------------------------

  // purchace Order Start --------------------------------------------------------
  purchaseOrder: `/${version}/purchase-orders`,
  purchaseOrderCreate: `/${version}/purchase-orders`,
  getPOResources: `/${version}/preferences/purchase-order-options`,

  // purchace Order End --------------------------------------------------------

  // sales Order Start --------------------------------------------------------
  salesOrder: `/${version}/sales-orders`,
  salesOrderCreate: `/${version}/sales-orders`,
  getSoResources: `/${version}/preferences/sales-order-options`,
  getSoIdentity: '/getSoIdentity',
  // sales Order End --------------------------------------------------------

  // User Management Start --------------------------------------------------------
  userManagementModuleAccess: `/${version}/preferences/user-modules`,
  userManagementCreate: `/${version}/users`,
  userManagementListUser: `/${version}/users`,
  userManagementUser_Detail: `/${version}/users/`,
  userManagementUpdate: `/${version}/users/`,
  userManagementresetpassword: `/${version}/users/`,
  userManagementCheckMailValidation: `/${version}/users/check-email`,
  // User Management End --------------------------------------------------------

  // Supplier Management ----------------------------------------------------
  supplierManagement: `${version}/supplier-management`,
  // Supplier Management End ----------------------------------------------------

  stockDateRange: `/${version}/stocks/movement/date-range`,
  stockAgeProfile: '/stockageprofile',

  userLogin: '/auth/login',
  userLogout: '/auth/logout',
  resetPassword: '/auth/forgot-password',

  orderCheck: '/orderCheck',
};
