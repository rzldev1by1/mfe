/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import numeral from 'numeral';
import moment from 'moment';
import endpoints from '../helpers/endpoints';
import * as utility from './UmUtility';
import * as EmailValidator from 'email-validator';

const today = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
const menuAvailable = ['purchase orders', 'create sales order', 'stock holding', 'stock movement'];

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
}) => {
  const urls = [];
  let endpointsUrl = '';
  let paramType = '';
  let paramPaging = '';

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

  // Url
  if (module === 'UserManagement') {
    urls.push(`search=${searchInput?.toUpperCase() || ''}`);
  }
  if (module === 'purchaseOrder' || module === 'salesOrder' || module === 'StockHolding') {
    urls.push(`search=${searchInput?.toUpperCase() || ''}`);
    urls.push(`site=${siteVal?.value ? siteVal.value : 'all'}`);
    urls.push(`client=${clientVal?.value ? clientVal.value : 'all'}`);
    urls.push(`orderType=${orderType ? orderType.value : 'all'}`);
    urls.push(`status=${status ? status.value : 'open'}`);
  }
  if (task && task.value !== 'all') urls.push(`task=${task.value}`);
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
  if (Data?.length) {
    dispatch({ type: 'TABLE_STATUS', data: '' });
  } else if (Data?.length < 1) {
    dispatch({ type: 'TABLE_STATUS', data: 'noData' });
  }
  // End Table Status

  if (Data) {
    Data.map((item, idx) => {
      const customerName = item?.customername?.split(':');
      if (parseInt(item.on_hand_qty + item.expected_in_qty) >= item.expected_out_qty) {
        item.status = 'OK';
        item.statusTxt = 'OK';
      }
      if (parseInt(item.on_hand_qty + item.expected_in_qty) <= item.expected_out_qty) {
        item.status = 'SHORTAGE';
        item.statusTxt = 'SHORTAGE';
      }
      item.product = String(item.product);
      item.expected_in_qty = numeral(item.expected_in_qty).format('0,0');
      item.expected_out_qty = numeral(item.expected_out_qty).format('0,0');
      item.on_hand_qty = numeral(item.on_hand_qty).format('0,0');
      item.pallets = numeral(item.pallets).format('0,0');
      item.expected_in_wgt = numeral(item.expected_in_wgt).format('0,0.000');
      item.weight_processed = numeral(item.weight_processed).format('0,0.000');
      item.price = numeral(item.price).format('0,0.00');
      // User Management Data
      item.disabled = item.disabled = item.disabled && item.disabled !== 'Y' ? 'Active' : 'Suspended';
      item.site = item.site && item.site !== '' ? item.site : 'All';
      item.client = item.client && item.client !== '' ? item.client : 'All';
      item.last_access = item.last_access && item.last_access !== '' ? item.last_access : '-';
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
  } else {
    dispatch({ type: paramType, data: [] });
  }
};

export const getDetailHeader = async ({ dispatch, props, module }) => {
  const { orderdetail, client, site, orderno, product } = props.match.params;

  let endpointsUrl = '';
  let paramType = '';
  if (module === 'purchaseOrder') {
    endpointsUrl = endpoints.purchaseOrder + `?search=${orderdetail}&client=${client}&site=${site}`;
    paramType = 'GET_PO_DETAIL';
  }
  if (module === 'salesOrder') {
    endpointsUrl = endpoints.salesOrder + `?search=${orderno}&client=${client}&site=${site}`;
    paramType = 'GET_SO_DETAIL';
  }
  if (module === 'stockHolding') {
    endpointsUrl = endpoints.stockHoldingSummary + `/${site}/${client}/${product}/detail-header`;
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

export const getDetailData = async ({ export_ = 'false', dispatch, active, props, module }) => {
  const { orderdetail, client, site, orderno, product } = props.match.params;
  let endpointsUrl = '';
  let paramType = '';
  let paramPaging = '';
  if (module === 'purchaseOrder') {
    endpointsUrl = endpoints.purchaseOrder + `/${site}/${client}/${orderdetail}?page=${active}&export=${export_}`;
    paramType = 'GET_PO_DETAIL_TABLE';
    paramPaging = 'PAGING';
  }
  if (module === 'salesOrder') {
    endpointsUrl = endpoints.salesOrder + `/${orderno}?client=${client}&site=${site}&page=${active}&export=${export_}`;
    paramType = 'GET_SO_DETAIL_TABLE';
    paramPaging = 'PAGING';
  }
  if (module === 'stockHolding') {
    endpointsUrl =
      endpoints.stockHoldingSummary + `/${site}/${client}/${product}/detail-line?page=${active}&export=${export_}`;
    paramType = 'GET_SH_DETAIL_TABLE';
    paramPaging = 'PAGING_SH_DETAIL';
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
      m.qty = numeral(m.qty).format('0,0');
      m.qty_processed = numeral(m.qty_processed).format('0,0');
      m.weight = numeral(m.weight).format('0,0.000').replace('.', ',');
      m.weight_processed = numeral(m.weight_processed).format('0,0.000').replace('.', ',');
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
  const { product, client, site } = props.match.params;
  const url = endpoints.stockHoldingSummary + `/${site}/${client}/${product}/detail-balance`;
  dispatch({ type: 'GET_SH_DETAIL_FORESCAST', data: [] });
  dispatch({ type: 'TABLE_STATUS', data: 'waiting' });
  const { data } = await axios.get(url);
  let forecast = [];
  Object.keys(data.data).map((value) => forecast.push(data.data[value]));
  if (data) {
    if (!data && forecast.length === 0) {
      return 0;
    }
    const modifiedData = forecast;
    const Meta = data?.meta;
    const Links = data?.links;

    modifiedData.map((item, idx) => {
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
  const { data } = await axios.post(`/v1/${module}/check-order-number`, {
    client: client?.value,
    order_no: orderNo,
  });

  if (data.status === 'failed') {
    return { status: false, message: 'Order number exist' };
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
        minDate: data.min_date,
        maxDate: data.max_date,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getStockMovement = async ({ dropdownValue, dispatch }) => {
  const url = `${endpoints.stockMovement}`;
  let { siteVal, clientVal, period, fromDate, toDate, productVal } = dropdownValue;
  let paramUrl = [];
  period = period?.value || 'week';

  //get Data
  paramUrl.push(`startDate=${fromDate || ''}`);
  paramUrl.push(`endDate=${toDate || ''}`);
  paramUrl.push(`filterType=${period}`);
  paramUrl.push(`client=${clientVal?.value || ''}`);
  paramUrl.push(`site=${siteVal?.value || ''}`);
  paramUrl.push(`product=${productVal?.value || ''}`);

  await axios
    .get(url + '?' + paramUrl.join('&'))
    .then((res) => {
      let data = res?.data?.data;
      let newData = [];

      // re arrange data array
      data.map((data, index) => {
        let tmp_row = {
          site: data.site,
          client: data.client,
          packdesc: data.packdesc,
          product: data.product,
          product_name: data.product_name,
        };

        for (var key in data) {
          if (key.includes('sum_')) {
            let dates = key.replace('sum_', '');
            let tmp = data[key];
            let tmp_arr = tmp.split('-');
            tmp_row['sa_plus_' + dates] = tmp_arr[0];
            tmp_row['sa_minus_' + dates] = tmp_arr[1];
            tmp_row['rec_' + dates] = tmp_arr[2];
            tmp_row['send_' + dates] = tmp_arr[3];
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
        from: 1,
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
  let result = restructureAccount(data.data);
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
  let newIsEnableAllModule = { ...newState.isEnableAllModule };
  let userMenu = [...accountInfoUser.userMenu].map((item, index) => {
    return item.menuid;
  });
  let menus = moduleAccess
    ?.filter((item) => {
      return menuAvailable.indexOf(item.menuname.toLowerCase()) !== -1;
    })
    .map((item, index) => {
      let newItem = item;
      let isStatus = false;
      if (accountInfoUser.web_group !== utility.webgroup.ADMIN) {
        isStatus = userMenu.includes(item.menuid) ? true : false;
      }
      newItem.status = isStatus;
      return newItem;
    });
  newIsEnableAllModule =
    menus?.filter((item) => {
      return item.status === true;
    })?.length === menus?.length
      ? true
      : false;
  newState.moduleAccess = menus;
  // and ModalAccess

  // LoadSite
  let newIsEnableAllSite = { ...newState.isEnableAllSite };
  let sites = loadSite?.map((item, index) => {
    let newItem = item;
    newItem.status = accountInfoUser.site === null ? true : item.site === accountInfoUser.site ? true : false;
    return newItem;
  });
  newIsEnableAllSite =
    sites?.filter((item) => {
      return item.status === true;
    })?.length === sites?.length
      ? true
      : false;
  newState.sites = sites;
  newState.isEnableAllSite = newIsEnableAllSite;
  // end LoadSite

  // LoadClient
  let newIsEnableAllClient = { ...newState.isEnableAllClient };
  let clients = loadClient?.map((item, index) => {
    let newItem = item;
    newItem.status = accountInfoUser.client === null ? true : item.code === accountInfoUser.client ? true : false;
    return newItem;
  });

  newIsEnableAllClient =
    clients?.filter((item) => {
      return item.status === true;
    })?.length === clients?.length
      ? true
      : false;
  newState.clients = clients;
  newState.isEnableAllClient = newIsEnableAllClient;
  // end LoadClient

  setState(newState);
};

export const restructureAccount = (sources) => {
  let newAccount = {};
  let account = sources[0];

  if (account) {
    newAccount.user = account.name;
    newAccount.email = account.email;
    newAccount.lastAccess = today;
    newAccount.lastLogin = today;
    newAccount.thisAccess = today;
    newAccount.thisLogin = today;
    newAccount.userMenu = restuctureMenuList(account.module);
    newAccount.userId = account.userid;
    newAccount.client = account.client;
    newAccount.disabled = account.disabled !== 'Y' ? false : true;
    newAccount.passwordChange = account.passwordChange ? account.passwordChange : '';
    newAccount.site = account.site;
    newAccount.web_group = account.web_group;
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
  const { data } = await axios.post(endpoints.userManagementCheckMailValidation, { email });
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
  const { value } = e.target;
  const newState = { ...state };
  const { data } = await axios.post(endpoints.userManagementCheckMailValidation, { email: value });
  newState.validation.email['isValid'] = newState.oldAccountInfo.email !== value && data === 0 ? true : false;

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
  newState.validation.email['isValid'] = validFormat ? true : false;

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
  let isValid = textName === '' ? false : true;
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
      return item.menuid;
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
  const { userId, user, email } = newState.accountInfo;
  let url = `${endpoints.userManagementUpdate}${userId}`;

  const { data, status } = await axios.post(url, param);
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

  let url = `${endpoints.userManagementresetpassword}`;
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
// End User Management
