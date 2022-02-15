import axios from 'axios';
import numeral from 'numeral';
import moment from 'moment';
import * as EmailValidator from 'email-validator';
import endpoints from '../helpers/endpoints';
import * as utility from './UmUtility';

const today = moment(Date());
const menuAvailable = ['purchase orders', 'create sales order', 'stock holding', 'stock movement', 'manage supplier users'];
const dateFormate = endpoints.env.REACT_APP_API_URL_FORMATE;

export const formatDate = (date) => {
  if (date !== "Invalid date" || date === undefined || date === null || date === '') {
    return moment(date).format(dateFormate) || false;
  }
  return '-';

};

export const getSummaryData = async ({
  siteVal,
  clientVal,
  orderType,
  task,
  status,
  searchInput,
  Export = false,
  dispatch,
  active,
  module,
  fromDate,
  toDate,
  user
}) => {
  const urls = [];
  let endpointsUrl = '';
  let paramType = '';
  let paramPaging = '';
  searchInput = searchInput || '';

  if (module === 'purchaseOrder') {
    endpointsUrl = endpoints.purchaseOrder;
    paramType = 'GET_PO_SUMMARY';
    paramPaging = 'PAGING_PO';
  }
  if (module === 'salesOrder') {
    endpointsUrl = endpoints.salesOrder;
    paramType = 'GET_SO_SUMMARY';
    paramPaging = 'PAGING_SO';
  }
  if (module === 'StockHolding') {
    endpointsUrl = endpoints.stockHoldingSummary;
    paramType = 'GET_SH_SUMMARY';
    paramPaging = 'PAGING_SH';
  }
  if (module === 'UserManagement') {
    endpointsUrl = endpoints.userManagementListUser;
    paramType = 'GET_UM_SUMMARY';
    paramPaging = 'PAGING_UM';
  }

  if (module === 'SupplierManagement') {
    endpointsUrl = endpoints.supplierManagement;
    paramType = 'GET_SP_SUMMARY';
    paramPaging = 'PAGING_SP';
  }
  // Url
  if (module === 'UserManagement') {
    urls.push(`search=${searchInput || ''}`);
  }
  if (module === 'SupplierManagement') {
    urls.push(`search=${searchInput || ''}`);
    urls.push(`startDate=${fromDate || ''}`);
    urls.push(`endDate=${toDate || ''}`);
  }
  if (module === 'purchaseOrder' || module === 'salesOrder' || module === 'StockHolding') {
    urls.push(`search=${searchInput?.toUpperCase() || ''}`);
    urls.push(`site=${siteVal || user?.site || 'all'}`);
    urls.push(`client=${clientVal || user?.client || 'all'}`);
    urls.push(`orderType=${orderType ? orderType.value : 'all'}`);
    urls.push(`status=${status ? status.value : 'open'}`);
  }
  if (task && task?.value !== 'all') urls.push(`task=${task.value || 'all'}`);
  urls.push(`page=${active || 1}`);
  if (Export === true) {
    urls.push('export=true');
  } else {
    dispatch({ type: 'TABLE_STATUS', data: 'waiting' });
  }
  dispatch({ type: 'TABLE_STATUS', data: 'waiting' });
  const newData = await axios.get(`${endpointsUrl}?${urls.join('&')}`);
  const Meta = newData?.data?.meta;
  const Links = newData?.data?.links;
  const Data = newData?.data?.data;

  // Table Status
  let element = document.getElementById('searchInput');
  if (element) {
    if (element.value !== searchInput) {
      return;
    }
  }

  if (Data?.length) {
    dispatch({ type: 'TABLE_STATUS', data: '' });
  } else if (Data?.length < 1) {
    dispatch({ type: 'TABLE_STATUS', data: 'noData' });
  }
  // End Table Status

  if (Data) {
    Data.map((item, idx) => {
      const customerName = item?.customername?.split(':');
      item.product = String(item.product);
      item.expected_in_qty = numeral(item.expected_in_qty).format('0,0');
      item.expected_out_qty = numeral(item.expected_out_qty).format('0,0');
      item.on_hand_qty = numeral(item.on_hand_qty).format('0,0');
      item.pallets = numeral(item.pallets).format('0,0');
      item.expected_in_wgt = numeral(item.expected_in_wgt).format('0,0.000');
      item.weight = numeral(item.weight).format('0,0.000');
      item.weight_processed = numeral(item.weight_processed).format('0,0.000');
      item.price = numeral(item.price).format('0,0.00');
      item.delivery_date = item.delivery_date && item.delivery_date !== '' ? item.delivery_date : '-';
      item.date_received = item.date_received && item.date_received !== '' ? item.date_received : '-';
      item.date_released = item.date_released && item.date_released !== '' ? item.date_released : '-';
      item.date_completed = item.date_completed && item.date_completed !== '' ? item.date_completed : '-';
      // Supplier Management PO Date format
      item.no = idx + 1;
      item.po_date = item.po_date && item.po_date !== '' ? item.po_date : '-';
      item.total_order = numeral(item.total_order).format('0,0')
      // User Management Data
      item.disabled = item.disabled = item.disabled && item.disabled !== 'Y' ? 'Active' : 'Suspended';
      item.site = item.site && item.site !== '' ? item.site : 'All';
      item.client = item.client && item.client !== '' ? item.client : 'All';
      item.last_access =
        item.last_access && item.last_access !== '' ? moment(item.last_access).format(`${dateFormate}`) : '-';
      if (customerName !== undefined) item.customername = customerName[1];
    });

    if (Export === true) {
      await dispatch({ type: 'EXPORT_DATA', data: Data });
    } else {
      const pagination = {
        active: active || Meta.current_page,
        show: Meta.per_page,
        total: Meta.total,
        last_page: Meta.last_page,
        from: Meta.from,
        to: Meta.to,
      };
      const paging = pagination;
      dispatch({ type: paramType, data: Data });
      dispatch({ type: paramPaging, data: paging });
    }
  }
};

export const getDetailHeader = async ({ dispatch, props, module }) => {
  const { orderdetail, client, site, orderno, product } = props?.match?.params;

  let endpointsUrl = '';
  let paramType = '';
  if (module === 'purchaseOrder') {
    endpointsUrl = `${endpoints.purchaseOrder}?search=${orderdetail}&client=${client}&site=${site}`;
    paramType = 'GET_PO_DETAIL';
  }
  if (module === 'salesOrder') {
    endpointsUrl = `${endpoints.salesOrder}?search=${orderno}&client=${client}&site=${site}`;
    paramType = 'GET_SO_DETAIL';
  }
  if (module === 'stockHolding') {
    endpointsUrl = `${endpoints.stockHoldingSummary}/${site}/${client}/${product}/detail-header`;
    paramType = 'GET_SH_DETAIL';
  }

  const url = endpointsUrl;
  const { data } = await axios.get(url);
  if (module === 'salesOrder' || module === 'purchaseOrder') {
    if (data.data) {
      dispatch({ type: paramType, data: data.data[0] });
    }
  }
  if (module === 'stockHolding') {
    if (data.data) {
      dispatch({ type: paramType, data: data.data });
    }
  }
};

export const getDetailData = async ({ export_ = 'false', dispatch, active, props, module, fulfill }) => {
  const { orderdetail, client, site, orderno, product } = props?.match?.params;
  let endpointsUrl = '';
  let paramType = '';
  let paramPaging = '';
  if (module === 'purchaseOrder') {
    endpointsUrl = `${endpoints.purchaseOrder}/${site}/${client}/${orderdetail}?page=${active}&export=${export_}`;
    paramType = 'GET_PO_DETAIL_TABLE';
    paramPaging = 'PAGING_PO_DETAIL';
  }
  if (module === 'salesOrder') {
    endpointsUrl = `${endpoints.salesOrder}/${orderno}?client=${client}&site=${site}&page=${active}&export=${export_}`;
    paramType = 'GET_SO_DETAIL_TABLE';
    paramPaging = 'PAGING_SO_DETAIL';
  }
  if (module === 'stockHolding') {
    endpointsUrl =
      `${endpoints.stockHoldingSummary}/${site}/${client}/${product}/detail-line?page=${active}&export=${export_}`;
    paramType = 'GET_SH_DETAIL_TABLE';
    paramPaging = 'PAGING_SH_DETAIL';
  }
  if (module === 'supplierManagement') {
    endpointsUrl = `${endpoints.supplierManagement}/${product}`
    paramType = 'GET_SP_DETAIL_TABLE';
    paramPaging = 'PAGING_SP_DETAIL';
  }

  const url = endpointsUrl;
  dispatch({ type: 'TABLE_STATUS', data: 'waiting' });
  const newData = await axios.get(url);
  const Meta = newData?.data?.meta;
  const Links = newData?.data?.links;
  const Data = newData?.data?.data;

  // Table Status
  if (Data?.length) {
    dispatch({ type: 'TABLE_STATUS', data: '' });
  } else if (Data?.length < 1) {
    dispatch({ type: 'TABLE_STATUS', data: 'noData' });
  }
  // End Table Status
  if (Data) {
    let txt = [];
    let modifiedData = Data.map((m) => {
      m.qty = numeral(m.qty).format('0,0'); //qty
      m.quantity = numeral(m.quantity).format('0,0'); //qty in purchase order details
      m.qty_processed = numeral(m.qty_processed).format('0,0');
      m.weight = numeral(m.weight).format('0,0.000');
      m.weight = numeral(m.weight).format('0,0.000');
      m.weight = numeral(m.weight).format('0,0.000');
      m.completed = m.completed == 'Y' ? 'Yes' : 'x';
      m.released = m.released == 'Y' ? 'Yes' : 'x';

      // Supplier Management
      m.carton_qty = numeral(m.carton_qty).format('0,0'); // carton_qty
      m.order_qty = numeral(m.order_qty).format('0,0'); // order_qty
      m.no_of_carton = numeral(m.no_of_carton).format('0,0'); // no_of_carton
      m.no_of_carton = Math.round((parseFloat(m.order_qty.replace(/,/g, ''))) / (parseFloat(m.carton_qty.replace(/,/g, ''))));
      if (fulfill === true) {
        m.edit_qty = m.order_qty
        m.edit_carton = m.no_of_carton
      }
      m.rotadate = m.rotadate && m.rotadate !== '' ? m.rotadate : '-';
      txt.push(m.batch?.length);
      return m;
    });
    if (export_ === 'true') {
    } else {
      const pagination = {
        active: active || Meta?.current_page,
        show: Meta?.per_page,
        total: Meta?.total,
        last_page: Meta?.last_page,
        from: Meta?.from,
        to: Meta?.to,
      };
      const paging = pagination;
      dispatch({ type: paramType, data: modifiedData });
      dispatch({ type: paramPaging, data: paging });
    }
  } else {
    dispatch({ type: paramType, data: [] });
  }
};

export const getForescast = async ({ export_ = 'false', dispatch, active, props }) => {
  const { product, client, site } = props?.match?.params;
  const url = `${endpoints.stockHoldingSummary}/${site}/${client}/${product}/detail-balance?page=${active}&export=${export_}`;
  dispatch({ type: 'GET_SH_DETAIL_FORESCAST', data: [] });
  dispatch({ type: 'TABLE_STATUS', data: 'waiting' });
  const { data } = await axios.get(url);
  let forecast = [];
  Object.keys(data.data).forEach((value) => forecast.push(data.data[value]));
  if (data) {
    if (!data && forecast.length === 0) {
      return 0;
    }
    const modifiedData = forecast;
    const Meta = data?.meta;
    const Links = data?.links;
    modifiedData.forEach((item, idx) => {
      item.in = numeral(item.in).format('0,0');
      item.out = numeral(item.out).format('0,0');
      item.balance = numeral(item.balance).format('0,0');
    });
    const pagination = {
      active: active || Meta?.current_page,
      show: Meta?.per_page,
      total: Meta?.total,
      last_page: Meta?.last_page,
      from: Meta?.from,
      to: Meta?.to,
    };
    dispatch({ type: 'GET_SH_DETAIL_FORESCAST', data: modifiedData });
    dispatch({ type: 'PAGING_SH_FORECAST', data: pagination });
  }
};

export const submitPurchaseOrder = async ({ orderDetail, lineDetails }) => {
  const ret = await axios.post(endpoints.purchaseOrderCreate, { orderDetail, lineDetails });
  return ret;
};

export const submitSalesOrder = async ({ header, lineDetail }) => {
  const ret = await axios.post(endpoints.salesOrderCreate, { orderDetail: header, lineDetails: lineDetail });
  return ret;
};

export const showDetails = ({ module, item }) => {
  const url = `/${module}/${item.site}/${item.client}/${item.order_no}`;
  this.props.history.push(url);
};

export const checkOrderNo = async ({ client, orderNo, module = 'sales-orders' }) => {
  const version = endpoints.env.REACT_APP_API_URL_VERSION;
  const { data } = await axios.post(`/${version}/${module}/check-order-number`, {
    client: client?.value,
    order_no: orderNo,
  });

  if (data.status === 'failed') {
    return { status: false, message: 'Order Number already exists!' };
  }
  if (data.message === 'The client field is required.') {
    return { status: false, message: 'Please select client' };
  }

  return { status: true, message: null };
};

// Stock Movement
export const getDateRange = async ({ setDefaultDate }) => {
  const url = `${endpoints.stockDateRange}`;
  let productData = [];

  await axios
    .get(url)
    .then((res) => {
      let data = res?.data?.data[0];
      setDefaultDate({
        minDate: data?.min_date,
        maxDate: data?.max_date,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getStockMovement = async ({ dropdownValue, dispatch, user }) => {
  const url = `${endpoints.stockMovement}`;
  let { siteVal, clientVal, period, fromDate, toDate, productVal } = dropdownValue;
  let paramUrl = [];
  period = period?.value || 'week';

  //get Data
  paramUrl.push(`startDate=${fromDate || ''}`);
  paramUrl.push(`endDate=${toDate || ''}`);
  paramUrl.push(`filterType=${period}`);
  paramUrl.push(`client=${clientVal?.value || user.client || '' }`);
  paramUrl.push(`site=${siteVal?.value || user.site || ''}`);
  paramUrl.push(`product=${productVal?.value || ''}`);

  await axios
    .get(`${url}?${paramUrl.join('&')}`)
    .then((res) => {
      let data = res?.data?.data;
      let newData = [];

      // re arrange data array
      data.map((data, index) => {
        let tmp_row = {
          site: data.site,
          client: data.client,
          uom: data.uom,
          product: data.product,
          product_name: data.product_name,
        };

        for (var key in data) {
          if (key.includes('sum_')) {
            let dates = key.replace('sum_', '');
            let tmp = data[key];
            let tmp_arr = tmp.split('-');
            tmp_row[`sa_plus_${dates}`] = numeral(tmp_arr[0]).format('0,0');
            tmp_row[`sa_minus_${dates}`] = numeral(tmp_arr[1]).format('0,0');
            tmp_row[`rec_${dates}`] = numeral(tmp_arr[2]).format('0,0');
            tmp_row[`send_${dates}`] = numeral(tmp_arr[3]).format('0,0');
          }
        }

        // let detail = data.detail;
        // detail.map((details) => {
        //   let dates = details.date.replaceAll('-', '_');
        //   tmp_row['sa_plus_' + dates] = details.sa_plus;
        //   tmp_row['sa_minus_' + dates] = details.sa_minus;
        //   tmp_row['rec_' + dates] = details.recv_weight;
        //   tmp_row['send_' + dates] = details.send_weight;
        // });
        newData.push(tmp_row);
      });

      const pagination = {
        active: 1,
        show: 50,
        total: data.length,
        last_page: 1,
        from: newData.length > 0 ? 1 : 0,
        to: data.length,
      };
      dispatch({ type: 'PAGING', data: pagination });
      dispatch({ type: 'GET_SM_SUMMARY', data: newData });
    })
    .catch((error) => {
      console.log(error);
    });
};
// End Stock Movement

// User Management

// Get Info Account
export const getAccountInfo = async ({ userid, state, setState, dispatch, loadSite, loadClient, moduleAccess }) => {
  const { data } = await axios.get(endpoints.userManagementUser_Detail + userid);
  const newState = { ...state };
  let result = restructureAccount(data);
  if (data && data !== '') {
    let adminClassName = newState.adminClass;

    if (result.web_group !== utility.webgroup.ADMIN) adminClassName = ' ';
    newState.accountInfo = result;
    dispatch({ type: 'GET_UM_INFO_ACCOUNT', data: result });
    newState.oldAccountInfo = result;
    newState.isLoadComplete = true;
    newState.adminClass = adminClassName;
  }
  const accountInfoUser = result;

  // ModalAccess
  const isDevelopment = endpoints.env.REACT_APP_SUPPLIER;
  let newIsEnableAllModule = { ...newState.isEnableAllModule };
  let userMenu = [...accountInfoUser.userMenu].map((item, index) => {
    return item.menuid;
  });

  let menus = moduleAccess?.filter((item) => {
    return menuAvailable.indexOf(item.menu_name.toLowerCase()) !== -1;
  }).map((item, index) => {
    let newItem = item;
    let isStatus = false;
    if (accountInfoUser.web_group !== utility.webgroup.ADMIN) {
      isStatus = !!userMenu.includes(item.menu_id);
    }
    newItem.status = isStatus;
    return newItem;
  });

  const newMenus = menus.filter((item) => item.menu_id !== "menu_manageUsers_supplierUsers")
  if (isDevelopment == "false") {
    newState.moduleAccess = newMenus;
    newIsEnableAllModule = newMenus?.filter((item) => { return item.status === true; })?.length === newMenus?.length;
    newState.isEnableAllModule = newIsEnableAllModule;
  }
  else {
    newState.moduleAccess = menus;
    newIsEnableAllModule = menus?.filter((item) => { return item.status === true; })?.length === menus?.length;
    newState.isEnableAllModule = newIsEnableAllModule;
  }
  // and ModalAccess

  // LoadSite
  let newIsEnableAllSite = { ...newState.isEnableAllSite };
  let sites = loadSite?.map((item, index) => {
    let newItem = item;
    newItem.status = accountInfoUser.site === null ? true : item.site === accountInfoUser.site;
    return newItem;
  });
  newIsEnableAllSite = sites?.filter((item) => { return item.status === true; })?.length === sites?.length;
  newState.sites = sites;
  newState.isEnableAllSite = newIsEnableAllSite;
  // end LoadSite

  // LoadClient
  let newIsEnableAllClient = { ...newState.isEnableAllClient };
  let clients = loadClient?.map((item, index) => {
    let newItem = item;
    newItem.status = accountInfoUser.client === null ? true : item.code === accountInfoUser.client;
    return newItem;
  });

  newIsEnableAllClient =
    clients?.filter((item) => {
      return item.status === true;
    })?.length === clients?.length;
  newState.clients = clients;
  newState.isEnableAllClient = newIsEnableAllClient;
  // end LoadClient

  setState(newState);
};

export const restructureAccount = (sources) => {
  let newAccount = {};
  let account = sources?.data;

  if (account) {
    newAccount.user = account.name;
    newAccount.email = account.email;
    newAccount.lastAccess = today;
    newAccount.lastLogin = today;
    newAccount.thisAccess = today;
    newAccount.thisLogin = today;
    newAccount.userMenu = restuctureMenuList(account.user_menus);
    newAccount.userId = account.userid;
    newAccount.client = account.client;
    newAccount.disabled = account.disabled === 'Y';
    newAccount.passwordChange = account.passwordChange ? account.passwordChange : '';
    newAccount.site = account.site;
    newAccount.web_group = account.web_group;
    newAccount.web_user = account.web_user;
    newAccount.request_forgot_password = account.request_forgot_password;
  }
  return newAccount;
};

export const restuctureMenuList = (sources) => {
  let newUserMenu = [];
  let userMenu = sources;
  if (userMenu.length) {
    newUserMenu = sources.map((item) => {
      let newItem = {};
      newItem.menuid = item.menu_id;
      newItem.menuname = item.menu_name;
      return newItem;
    });
  }
  return newUserMenu;
};
// End Get Info Account

// Check Email
export const checkEmails = async ({ email }) => {
  const data = await axios.post(endpoints.userManagementCheckMailValidation, { email }).catch(function (error) {
    if (error.response) {
      return error.response;
    }
  });
  return data;
};

export const onChangeEmail = ({ e, state, setState }) => {
  const newState = { ...state };
  onBlurEmail({ e: e.target, state, setState });
  const { value } = e.target;
  newState.validation = checkEmailValidation({ textmail: value, state, setState });
  newState.accountInfo.email = value;
  newState.isValidForm = false;
  newState.changed = true;
  setState(newState);
};

export const onBlurEmail = async ({ e, state, setState }) => {
  const { value } = e;
  const newState = { ...state };
  const { data } = await axios.post(endpoints.userManagementCheckMailValidation, { email: value });
  newState.validation.email['isValid'] =
    !!(newState.oldAccountInfo.email !== value && data?.exists !== true);

  if (!newState.validation.email['isValid']) {
    newState.validation.email['message'] = utility.validationMsg.EMAIL_EXIST;
    newState.validation.email['invalidClass'] = 'is-invalid';
  } else {
    newState.validation.email['message'] = '';
    newState.validation.email['invalidClass'] = '';
    if (!checkEmailValidation({ textmail: value, state, setState }).email['isValid']) {
      newState.validation.email['message'] = utility.validationMsg.INVALID_EMAIL;
      newState.validation.email['invalidClass'] = 'is-invalid';
    } else {
      newState.validation.email['message'] = '';
    }
  }
  setState(newState);
};

export const checkEmailValidation = ({ textmail, state, setState }) => {
  const newState = { ...state };
  let validFormat = EmailValidator.validate(textmail);
  newState.validation.email['isValid'] = !!validFormat;

  if (!validFormat) {
    newState.validation.email['message'] = utility.validationMsg.INVALID_EMAIL;
    newState.validation.email['invalidClass'] = 'is-invalid';
  } else {
    newState.validation.email['message'] = '';
    newState.validation.email['invalidClass'] = '';
  }
  return newState.validation;
};
// End Check Email

// Check Name
export const onChangeName = ({ e, state, setState }) => {
  const { name, value } = e.target;
  const newState = { ...state };
  newState.validation = checkNameValidation({ textName: value, state, setState });
  newState.accountInfo.user = value;
  newState.isValidForm = false;
  newState.changed = true;
  setState(newState);
};
export const checkNameValidation = ({ textName, state, setState }) => {
  const newState = { ...state };
  let isValid = textName !== '';
  newState.validation.name['isValid'] = isValid;
  if (!isValid) newState.validation.name['message'] = utility.validationMsg.USERNAME_REQUIRED;
  else newState.validation.name['message'] = '';
  return newState.validation;
};
// and Check Name
export const loadUsers = async ({ dispatch }) => {
  const { data } = await axios.get(`${endpoints.userManagementListUser}`);
  dispatch({ type: 'GET_UM_USERS_DATA', data: data.data.data });
};
export const loadModuleAccess = async ({ dispatch }) => {
  const { data } = await axios.get(endpoints.userManagementModuleAccess);
  dispatch({ type: 'GET_UM_MODAL_ACCESS', data: data });
};
export const loadSites = async ({ dispatch }) => {
  const { data } = await axios.get(endpoints.getSite);
  dispatch({ type: 'GET_UM_LOAD_SITE', data: data });
};
export const loadClients = async ({ dispatch }) => {
  const { data } = await axios.get(endpoints.getClient);
  dispatch({ type: 'GET_UM_LOAD_CLIENT', data: data });
};

export const submitUserManagement = async ({ data }) => {
  const ret = await axios.post(endpoints.userManagementCreate, data);
  return ret;
};

export const saveClick = ({ props, state, setState, dispatch }) => {
  const newState = { ...state };
  let newParam = {};
  let adminMenu = newState.moduleAccess.map((item, index) => {
    return item.menuid;
  });

  let userMenu = newState.moduleAccess
    .filter((item) => {
      return item.status === true;
    })
    .map((item, index) => {
      return item.menu_id;
    });

  let site = newState.sites.find((item, index) => {
    return item.status === true;
  });

  let siteValue =
    site &&
      newState.sites.filter((item) => {
        return item.status === true;
      }).length !== newState.sites.length
      ? site.site
      : null;

  let client = newState.clients.find((item, index) => {
    return item.status === true;
  });

  let clientValue =
    client &&
      newState.clients.filter((item) => {
        return item.status === true;
      }).length !== newState.clients.length
      ? client.code
      : null;

  const accountInfo = { ...newState.accountInfo };
  newParam.name = accountInfo.user;
  newParam.webGroup = accountInfo.web_group;
  newParam.email = accountInfo.email;
  newParam.lastAccess = accountInfo.lastAccess;
  newParam.lastLogin = accountInfo.lastLogin;
  newParam.thisAccess = accountInfo.thisAccess;
  newParam.thisLogin = accountInfo.thisLogin;
  newParam.userMenu = accountInfo.web_group === utility.webgroup.ADMIN ? adminMenu : userMenu;
  newParam.client = accountInfo.web_group === utility.webgroup.ADMIN ? null : clientValue;
  newParam.site = accountInfo.web_group === utility.webgroup.ADMIN ? null : siteValue;
  newParam.disabled = accountInfo.disabled ? 'Y' : 'N';

  let dataParam = newParam;
  let newValidation = { ...newState.validation };
  let emailValid = checkEmailValidation({ textmail: dataParam.email, state, setState });
  let nameValid = checkNameValidation({ textName: dataParam.email, state, setState });

  if (!emailValid.email['isValid']) newValidation.email = emailValid.email;
  if (!emailValid.name['isValid']) newValidation.name = nameValid.name;

  if (newValidation.email['isValid'] && newValidation.name['isValid'] && dataParam.userMenu.length) {
    newState.isSaveProgressing = true;
    newState.validation = newValidation;
    updateRequest({ param: dataParam, state, setState, props, dispatch });
  } else {
    newState.isValidForm = true;
    newState.validation = newValidation;
  }
  setState(newState);
};

export const updateRequest = async ({ param, state, setState, props, dispatch }) => {
  const newState = { ...state };
  const { userId, user, email, web_user } = newState.accountInfo;
  let url = `${endpoints.userManagementUpdate}${web_user}`;

  const { data, status } = await axios.put(url, param);
  if (status === 200) {
    let lastChangedUser = {};
    lastChangedUser.name = user;
    lastChangedUser.userId = userId;
    lastChangedUser.email = email;
    let data = lastChangedUser;
    dispatch({ type: 'CHANGED_USER', data });

    newState.isSaveProgressing = false;
    newState.isResetSuccess = true;
    props.history.push('/users-management');
  } else {
    newState.isSaveProgressing = false;
    newState.isResetSuccess = false;
  }
  setState(newState);
};

export const resetPassword = ({ state, setState, props }) => {
  const newState = { ...state };
  const { match } = props;
  let web_user_id = match.params.id;
  const { user, userId, email, userMenu } = newState.accountInfo;

  let url = `${endpoints.userManagementresetpassword}${web_user_id}/reset-password`;
  let newText = user.substring(0, 1);
  let result = utility.generateUserID(today);
  let new_password = result + newText.toLowerCase();
  let param = { email: email, web_user: web_user_id, new_password: new_password };

  newState.isLoadReset = true;
  setState(newState);

  axios.post(url, param).then((res) => {
    if (res.status === 200) {
      newState.isSaveProgressing = false;
      newState.isResetSuccess = true;
      newState.popUpReset = true;
      newState.isLoadReset = false;
      setState(newState);
    }
  });
};

export const DarkModeChange = ({ changeMode, setChangeMode }) => {
  if (changeMode == true) {
    localStorage.setItem("darkModeLocal", false);
    setChangeMode(false)
  } else if (changeMode == false) {
    localStorage.setItem("darkModeLocal", true);
    setChangeMode(true)
  } else {
    localStorage.setItem("darkModeLocal", false);
    setChangeMode(false)
  }
}
// End User Management
