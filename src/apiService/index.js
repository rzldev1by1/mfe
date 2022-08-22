import axios from 'axios';
import numeral from 'numeral';
import moment from 'moment';
import * as EmailValidator from 'email-validator';
import endpoints from '../helpers/endpoints';
import * as utility from './UmUtility';

const today = moment(Date());
const menuAvailable = [
  'purchase orders',
  'create sales order',
  'stock holding',
  'stock movement',
  'manage supplier users',
];
const dateFormate = endpoints.env.REACT_APP_API_URL_FORMATE;

const allModule = {
  StockHolding: {
    endpointsUrl: endpoints.stockHoldingSummary,
    paramType: 'GET_SH_SUMMARY',
    paramPaging: 'PAGING_SH'
  },
  purchaseOrder: {
    endpointsUrl: endpoints.purchaseOrder,
    paramType: 'GET_PO_SUMMARY',
    paramPaging: 'PAGING_PO'
  },
  salesOrder: {
    endpointsUrl: endpoints.salesOrder,
    paramType: 'GET_SO_SUMMARY',
    paramPaging: 'PAGING_SO',
  },
  UserManagement: {
    endpointsUrl: endpoints.userManagementListUser,
    paramType: 'GET_UM_SUMMARY',
    paramPaging: 'PAGING_UM'
  },
  SupplierManagement: {
    endpointsUrl: endpoints.supplierManagement,
    paramType: 'GET_SP_SUMMARY',
    paramPaging: 'PAGING_SP'
  },
}

export const formatDate = (date) => {
  if (date !== 'Invalid date' || date === undefined || date === null || date === '') {
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
  user,
  typeDate,
  customerOrderRef,
  vendorOrderNo,
  dataDefault,
}) => {
  const urls = [];
  let endpointsUrlData = '';
  let paramData = '';
  let paramPagingData = '';
  searchInput = searchInput || '';

  Object.keys(allModule).forEach((allModuleKey) => {
    if (allModuleKey === module) {
      paramData = allModule[allModuleKey].paramType
      paramPagingData = allModule[allModuleKey].paramPaging
      endpointsUrlData = allModule[allModuleKey].endpointsUrl
    }
  });

  if (!dataDefault) {
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
      let userSite = '';
      let UserClient = '';
      if ((user.userLevel !== 'Admin' && user?.site) || (user.userLevel !== 'ADMIN' && user?.site)) {
        userSite = user?.site;
      } else userSite = siteVal || 'all';

      if ((user.userLevel !== 'Admin' && user?.client) || (user.userLevel !== 'ADMIN' && user?.client)) {
        UserClient = user?.client;
      } else UserClient = clientVal || 'all';

      urls.push(`search=${searchInput?.toUpperCase() || ''}`);
      urls.push(`site=${userSite}`);
      urls.push(`client=${UserClient}`);
      urls.push(`orderType=${orderType ? orderType.value : 'all'}`);
      urls.push(`status=${status ? status.value : 'open'}`);
      if (task && task?.value !== 'all') urls.push(`task=${task.value || 'all'}`);
      if (customerOrderRef) urls.push(`customerOrderRef=${customerOrderRef}`);
      if (vendorOrderNo) urls.push(`vendorOrderNo=${vendorOrderNo}`);
      console.log(typeDate)
      if (typeDate) {
        const typeDateSearch = typeDate.slice(0, 1).toUpperCase() + typeDate.substr(1);
        urls.push(`start${typeDateSearch}=${fromDate || ''}`);
        urls.push(`end${typeDateSearch}=${toDate || ''}`);
      }
    }
    urls.push(`page=${active || 1}`);

    if (Export === true) urls.push('export=true');
    else dispatch({ type: 'TABLE_STATUS', data: 'waiting' });
    dispatch({ type: 'TABLE_STATUS', data: 'waiting' });

    const newData = await axios.get(`${endpointsUrlData}?${urls.join('&')}`);
    const Meta = newData?.data?.meta;
    const Data = newData?.data?.data;

    // Table Status
    const element = document.getElementById('searchInput');
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
      Data.forEach((item, idx) => {
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
        item.no = idx + 1;
        item.po_date = item.po_date && item.po_date !== '' ? item.po_date : '-';
        item.total_order = numeral(item.total_order).format('0,0');
        item.disabled = item.disabled && item.disabled !== 'Y' ? 'Active' : 'Suspended';
        item.site = item.site && item.site !== '' ? item.site : 'All';
        item.client = item.client && item.client !== '' ? item.client : 'All';
        item.last_access = item.last_access && item.last_access !== '' ? moment(item.last_access).format(`${dateFormate}`) : '-';
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
        dispatch({ type: paramData, data: Data });
        dispatch({ type: paramPagingData, data: paging });
      }
    }
  }

};

export const getDetailHeader = async ({ dispatch, props, module }) => {
  const { orderdetail, client, site, orderno, product } = props?.match?.params;

  let endpointsUrl = '';
  let paramType = '';
  if (module === 'PurchaseOrdersDetail') {
    endpointsUrl = `${endpoints.purchaseOrder}?search=${orderdetail}&client=${client}&site=${site}`;
    paramType = 'GET_PO_DETAIL';
  }
  if (module === 'SalesOrdersDetail') {
    endpointsUrl = `${endpoints.salesOrder}?search=${orderno}&client=${client}&site=${site}`;
    paramType = 'GET_SO_DETAIL';
  }
  if (module === 'StockHoldingDetail') {
    endpointsUrl = `${endpoints.stockHoldingSummary}/${site}/${client}/${product}/detail-header`;
    paramType = 'GET_SH_DETAIL';
  }

  const url = endpointsUrl;
  const { data } = await axios.get(url);
  if (module === 'SalesOrdersDetail' || module === 'PurchaseOrdersDetail') {
    if (data.data) {
      dispatch({ type: paramType, data: data.data[0] });
    }
  }
  if (module === 'StockHoldingDetail') {
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
  if (module === 'PurchaseOrdersDetail') {
    endpointsUrl = `${endpoints.purchaseOrder}/${site}/${client}/${orderdetail}?page=${active}&export=${export_}`;
    paramType = 'GET_PO_DETAIL_TABLE';
    paramPaging = 'PAGING_PO_DETAIL';
  }
  if (module === 'SalesOrdersDetail') {
    endpointsUrl = `${endpoints.salesOrder}/${orderno}?client=${client}&site=${site}&page=${active}&export=${export_}`;
    paramType = 'GET_SO_DETAIL_TABLE';
    paramPaging = 'PAGING_SO_DETAIL';
  }
  if (module === 'StockHoldingDetail') {
    endpointsUrl = `${endpoints.stockHoldingSummary}/${site}/${client}/${product}/detail-line?page=${active}&export=${export_}`;
    paramType = 'GET_SH_DETAIL_TABLE';
    paramPaging = 'PAGING_SH_DETAIL';
  }
  if (module === 'supplierManagement') {
    endpointsUrl = `${endpoints.supplierManagement}/${product}`;
    paramType = 'GET_SP_DETAIL_TABLE';
    paramPaging = 'PAGING_SP_DETAIL';
  }

  const url = endpointsUrl;
  dispatch({ type: 'TABLE_STATUS', data: 'waiting' });
  const newData = await axios.get(url);
  const Meta = newData?.data?.meta;
  const Data = newData?.data?.data;

  // Table Status
  if (Data?.length) {
    dispatch({ type: 'TABLE_STATUS', data: '' });
  } else if (Data?.length < 1) {
    dispatch({ type: 'TABLE_STATUS', data: 'noData' });
  }
  // End Table Status
  if (Data) {
    const txt = [];
    const modifiedData = Data.map((m) => {
      m.qty = numeral(m.qty).format('0,0'); // qty
      m.quantity = numeral(m.quantity).format('0,0'); // qty in purchase order details
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
      m.no_of_carton = Math.round(
        parseFloat(m.order_qty.replace(/,/g, '')) / parseFloat(m.carton_qty.replace(/,/g, '')),
      );
      if (fulfill === true) {
        m.edit_qty = m.order_qty;
        m.edit_carton = m.no_of_carton;
      }
      m.rotadate = m.rotadate && m.rotadate !== '' ? m.rotadate : '-';
      txt.push(m.batch?.length);
      return m;
    });
    if (export_ !== 'true') {
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

export const getForecast = async ({ export_ = 'false', dispatch, active, props }) => {
  const { product, client, site } = props?.match?.params;
  const url = `${endpoints.stockHoldingSummary}/${site}/${client}/${product}/detail-balance?page=${active}&export=${export_}`;
  dispatch({ type: 'GET_SH_DETAIL_FORECAST', data: [] });
  dispatch({ type: 'TABLE_STATUS', data: 'waiting' });
  const { data } = await axios.get(url);
  const forecast = [];
  Object.keys(data.data).forEach((value) => forecast.push(data.data[value]));
  if (data) {
    if (!data && forecast.length === 0) {
      return 0;
    }
    const modifiedData = forecast;
    const Meta = data?.meta;
    modifiedData.forEach((item) => {
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
    dispatch({ type: 'GET_SH_DETAIL_FORECAST', data: modifiedData });
    dispatch({ type: 'PAGING_SH_FORECAST', data: pagination });
  }
  return false
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

  await axios
    .get(url)
    .then((res) => {
      const data = res?.data?.data[0];
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
  let { period } = dropdownValue;
  const paramUrl = [];
  period = period?.value || 'week';

  // get Data
  paramUrl.push(`startDate=${dropdownValue?.fromDate || ''}`);
  paramUrl.push(`endDate=${dropdownValue?.toDate || ''}`);
  paramUrl.push(`filterType=${period}`);
  paramUrl.push(`client=${dropdownValue?.clientVal?.value || user.client || ''}`);
  paramUrl.push(`site=${dropdownValue?.siteVal?.value || user.site || ''}`);
  paramUrl.push(`product=${dropdownValue?.productVal?.value || ''}`);

  await axios
    .get(`${url}?${paramUrl.join('&')}`)
    .then((res) => {
      const data = res?.data?.data;
      const newData = [];

      // re arrange data array
      data.map((datas) => {
        const tmpRow = {
          site: datas.site,
          client: datas.client,
          uom: datas.uom,
          product: datas.product,
          product_name: datas.product_name,
        };

        for (const key in datas) {
          if (key.includes('sum_')) {
            const dates = key.replace('sum_', '');
            const tmp = datas[key];
            const tmpArr = tmp.split('-');
            tmpRow[`sa_plus_${dates}`] = numeral(tmpArr[0]).format('0,0');
            tmpRow[`sa_minus_${dates}`] = numeral(tmpArr[1]).format('0,0');
            tmpRow[`rec_${dates}`] = numeral(tmpArr[2]).format('0,0');
            tmpRow[`send_${dates}`] = numeral(tmpArr[3]).format('0,0');
          }
        }
        return newData.push(tmpRow);
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

export const restuctureMenuList = (sources) => {
  let newUserMenu = [];
  const userMenu = sources;
  if (userMenu.length) {
    newUserMenu = sources.map((item) => {
      const newItem = {};
      newItem.menuid = item.menu_id;
      newItem.menuname = item.menu_name;
      return newItem;
    });
  }
  return newUserMenu;
};

export const restructureAccount = (sources) => {
  const newAccount = {};
  const account = sources?.data;

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

// User Management

// Get Info Account
export const getAccountInfo = async ({ userId, state, setState, dispatch, loadSite, loadClient, moduleAccess }) => {
  const { data } = await axios.get(endpoints.userManagementUser_Detail + userId);
  const newState = { ...state };
  const result = restructureAccount(data);
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
  const userMenu = [...accountInfoUser.userMenu].map((item) => {
    return item.menuid;
  });

  const menus = moduleAccess
    ?.filter((item) => {
      return menuAvailable.indexOf(item.menu_name.toLowerCase()) !== -1;
    })
    .map((item) => {
      const newItem = item;
      let isStatus = false;
      if (accountInfoUser.web_group !== utility.webgroup.ADMIN) {
        isStatus = !!userMenu.includes(item.menu_id);
      }
      newItem.status = isStatus;
      return newItem;
    });

  const newMenus = menus.filter((item) => item.menu_id !== 'menu_manageUsers_supplierUsers');
  if (isDevelopment === 'false') {
    newState.moduleAccess = newMenus;
    newIsEnableAllModule =
      newMenus?.filter((item) => {
        return item.status === true;
      })?.length === newMenus?.length;
    newState.isEnableAllModule = newIsEnableAllModule;
  } else {
    newState.moduleAccess = menus;
    newIsEnableAllModule =
      menus?.filter((item) => {
        return item.status === true;
      })?.length === menus?.length;
    newState.isEnableAllModule = newIsEnableAllModule;
  }
  // and ModalAccess

  // LoadSite
  let newIsEnableAllSite = { ...newState.isEnableAllSite };
  const sites = loadSite?.map((item) => {
    const newItem = item;
    newItem.status = accountInfoUser.site === null ? true : item.site === accountInfoUser.site;
    return newItem;
  });
  newIsEnableAllSite =
    sites?.filter((item) => {
      return item.status === true;
    })?.length === sites?.length;
  newState.sites = sites;
  newState.isEnableAllSite = newIsEnableAllSite;
  // end LoadSite

  // LoadClient
  let newIsEnableAllClient = { ...newState.isEnableAllClient };
  const clients = loadClient?.map((item) => {
    const newItem = item;
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

// End Get Info Account

// Check Email
export const checkEmails = async ({ email }) => {
  const data = await axios.post(endpoints.userManagementCheckMailValidation, { email }).catch((error) => {
    if (error.response) {
      return error.response;
    }
    return false
  });
  return data;
};

export const checkEmailValidation = ({ textmail, state }) => {
  const newState = { ...state };
  const validFormat = EmailValidator.validate(textmail);
  newState.validation.email.isValid = !!validFormat;

  if (!validFormat) {
    newState.validation.email.message = utility.validationMsg.INVALID_EMAIL;
    newState.validation.email.invalidClass = 'is-invalid';
  } else {
    newState.validation.email.message = '';
    newState.validation.email.invalidClass = '';
  }
  return newState.validation;
};

export const onBlurEmail = async ({ e, state, setState }) => {
  const { value } = e;
  const newState = { ...state };
  const { data } = await axios.post(endpoints.userManagementCheckMailValidation, { email: value });
  newState.validation.email.isValid = !!(newState.oldAccountInfo.email !== value && data?.exists !== true);

  if (!newState.validation.email.isValid) {
    newState.validation.email.message = utility.validationMsg.EMAIL_EXIST;
    newState.validation.email.invalidClass = 'is-invalid';
  } else {
    newState.validation.email.message = '';
    newState.validation.email.invalidClass = '';
    if (!checkEmailValidation({ textmail: value, state, setState }).email.isValid) {
      newState.validation.email.message = utility.validationMsg.INVALID_EMAIL;
      newState.validation.email.invalidClass = 'is-invalid';
    } else {
      newState.validation.email.message = '';
    }
  }
  setState(newState);
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

// End Check Email

// Check Name
export const checkNameValidation = ({ textName, state }) => {
  const newState = { ...state };
  const isValid = textName !== '';
  newState.validation.name.isValid = isValid;
  if (!isValid) newState.validation.name.message = utility.validationMsg.USERNAME_REQUIRED;
  else newState.validation.name.message = '';
  return newState.validation;
};

export const onChangeName = ({ e, state, setState }) => {
  const { value } = e.target;
  const newState = { ...state };
  newState.validation = checkNameValidation({ textName: value, state, setState });
  newState.accountInfo.user = value;
  newState.isValidForm = false;
  newState.changed = true;
  setState(newState);
};

// and Check Name
export const loadUsers = async ({ dispatch }) => {
  const { data } = await axios.get(`${endpoints.userManagementListUser}`);
  dispatch({ type: 'GET_UM_USERS_DATA', data: data.data.data });
};
export const loadModuleAccess = async ({ dispatch }) => {
  const { data } = await axios.get(endpoints.userManagementModuleAccess);
  dispatch({ type: 'GET_UM_MODAL_ACCESS', data });
};
export const loadSites = async ({ dispatch }) => {
  const { data } = await axios.get(endpoints.getSite);
  dispatch({ type: 'GET_UM_LOAD_SITE', data });
};
export const loadClients = async ({ dispatch }) => {
  const { data } = await axios.get(endpoints.getClient);
  dispatch({ type: 'GET_UM_LOAD_CLIENT', data });
};

export const submitUserManagement = async ({ data }) => {
  const ret = await axios.post(endpoints.userManagementCreate, data);
  return ret;
};

export const updateRequest = async ({ param, state, setState, props, dispatch }) => {
  const newState = { ...state };
  const { userId, user, email } = newState.accountInfo;
  const url = `${endpoints.userManagementUpdate}${newState.accountInfo.web_user}`;

  const { status } = await axios.put(url, param);
  if (status === 200) {
    const lastChangedUser = {};
    lastChangedUser.name = user;
    lastChangedUser.userId = userId;
    lastChangedUser.email = email;
    const userData = lastChangedUser;
    dispatch({ type: 'CHANGED_USER', userData });

    newState.isSaveProgressing = false;
    newState.isResetSuccess = true;
    props.history.push('/users-management');
  } else {
    newState.isSaveProgressing = false;
    newState.isResetSuccess = false;
  }
  setState(newState);
};

export const saveClick = ({ props, state, setState, dispatch }) => {
  const newState = { ...state };
  const newParam = {};
  const adminMenu = newState.moduleAccess.map((item) => {
    return item.menuid;
  });

  const userMenu = newState.moduleAccess
    .filter((item) => {
      return item.status === true;
    })
    .map((item) => {
      return item.menu_id;
    });

  const site = newState.sites.find((item) => {
    return item.status === true;
  });

  const siteValue =
    site &&
      newState.sites.filter((item) => {
        return item.status === true;
      }).length !== newState.sites.length
      ? site.site
      : null;

  const client = newState.clients.find((item) => {
    return item.status === true;
  });

  const clientValue =
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

  const dataParam = newParam;
  const newValidation = { ...newState.validation };
  const emailValid = checkEmailValidation({ textmail: dataParam.email, state, setState });
  const nameValid = checkNameValidation({ textName: dataParam.email, state, setState });

  if (!emailValid.email.isValid) newValidation.email = emailValid.email;
  if (!emailValid.name.isValid) newValidation.name = nameValid.name;

  if (newValidation.email.isValid && newValidation.name.isValid && dataParam.userMenu.length) {
    newState.isSaveProgressing = true;
    newState.validation = newValidation;
    updateRequest({ param: dataParam, state, setState, props, dispatch });
  } else {
    newState.isValidForm = true;
    newState.validation = newValidation;
  }
  setState(newState);
};

export const resetPassword = ({ state, setState, props }) => {
  const newState = { ...state };
  const { match } = props;
  const webUserId = match.params.id;
  const { user, email } = newState.accountInfo;

  const url = `${endpoints.userManagementresetpassword}${webUserId}/reset-password`;
  const newText = user.substring(0, 1);
  const result = utility.generateUserID(today);
  const newPassword = result + newText.toLowerCase();
  const param = { email, webUserId, newPassword };

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
  if (changeMode === true) {
    localStorage.setItem('darkModeLocal', false);
    setChangeMode(false);
  } else if (changeMode === false) {
    localStorage.setItem('darkModeLocal', true);
    setChangeMode(true);
  } else {
    localStorage.setItem('darkModeLocal', false);
    setChangeMode(false);
  }
};
// End User Management
