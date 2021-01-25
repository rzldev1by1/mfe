/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import numeral from 'numeral';
import endpoints from '../helpers/endpoints';

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
    paramType = 'GET_SO_SUMMARY'
    paramPaging = 'PAGING_SO';;
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
  urls.push(`searchParam=${searchInput?.toUpperCase() || ''}`);
  urls.push(`site=${siteVal?.value ? siteVal.value : 'all'}`);
  urls.push(`client=${clientVal?.value ? clientVal.value : 'all'}`);
  urls.push(`orderType=${orderType ? orderType.value : 'all'}`);
  urls.push(`status=${status ? status.value : 'open'}`);
  if (task && task.value !== 'all') urls.push(`task=${task.value}`);
  urls.push(`page=${active || 1}`);
  if (Export === true) {
    urls.push('export=true');
  } else {
    dispatch({ type: 'TABLE_STATUS', data: 'waiting' });
  }
  dispatch({ type: 'TABLE_STATUS', data: 'waiting' })
  const newData = await axios.get(`${endpointsUrl}?${urls.join('&')}`);

  // Table Status
  const dataStatus = newData?.data?.data?.data;
  if (dataStatus?.length) {
    dispatch({ type: 'TABLE_STATUS', data: '' });
  } else if (dataStatus?.length < 1) {
    dispatch({ type: 'TABLE_STATUS', data: 'noData' });
  }
  // End Table Status

  if (newData?.data?.data) {
    const modifiedData = newData.data.data.data;
    modifiedData.map((item, idx) => {
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
      if (customerName !== undefined) item.customername = customerName[1];
    });

    if (Export === true) {
      await dispatch({ type: 'EXPORT_DATA', data: modifiedData });
    } else {
      const pagination = {
        active: active || newData.data.data.current_page,
        show: newData.data.data.per_page,
        total: newData.data.data.total,
        last_page: newData.data.data.last_page,
        from: newData.data.data.from,
        to: newData.data.data.to,
      };
      const paging = pagination;
      dispatch({ type: paramType, data: modifiedData });
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
    endpointsUrl = `/purchaseOrder?searchParam=${orderdetail}&client=${client}&site=${site}`;
    paramType = 'GET_PO_DETAIL';
  }
  if (module === 'salesOrder') {
    endpointsUrl = `/salesorder?searchParam=${orderno}&client=${client}&site=${site}`;
    paramType = 'GET_SO_DETAIL';
  }
  if (module === 'stockHolding') {
    endpointsUrl = `/stockdetail/header/${product}?client=${client}&site=${site}`;
    paramType = 'GET_SH_DETAIL';
  }

  const url = endpointsUrl;
  const { data } = await axios.get(url);
  if (module === 'salesOrder' || module === 'purchaseOrder') {
    if (data.data) {
      dispatch({ type: paramType, data: data.data.data[0] });
    }
  }
  if (module === 'stockHolding') {
    if (data.data) {
      dispatch({ type: paramType, data: data.data[0] });
    }
  }
};

export const getDetailData = async ({
  export_ = 'false',
  dispatch,
  active,
  props,
  module,
}) => {
  const { orderdetail, client, site, orderno, product } = props.match.params;
  let endpointsUrl = '';
  let paramType = '';
  if (module === 'purchaseOrder') {
    endpointsUrl = `/purchaseOrder/${site}/${client}/${orderdetail}?page=${active}&export=${export_}`;
    paramType = 'GET_PO_DETAIL_TABLE';
  }
  if (module === 'salesOrder') {
    endpointsUrl = `/salesorder/${orderno}?client=${client}&site=${site}&page=${active}&export=${export_}`;
    paramType = 'GET_SO_DETAIL_TABLE';
  }
  if (module === 'stockHolding') {
    endpointsUrl = `/stockdetail/${product}?client=${client}&site=${site}&page=${active}&export=${export_}`;
    paramType = 'GET_SH_DETAIL_TABLE';
  }

  const url = endpointsUrl;
    dispatch({ type: 'TABLE_STATUS', data: 'waiting' })
  const newData = await axios.get(url);
  // Table Status
  const dataStatus = newData?.data?.data;
  if (dataStatus?.length) {
    dispatch({ type: 'TABLE_STATUS', data: '' });
  } else if (dataStatus?.length < 1) {
    dispatch({ type: 'TABLE_STATUS', data: 'noData' });
  }
  // End Table Status
  if (newData?.data?.data) {
    let txt = [];
    let modifiedData = newData.data.data.data.map((m) => {
      m.quantity = numeral(m.quantity).format('0,0');
      m.qty_processed = numeral(m.qty_processed).format('0,0');
      m.weight = numeral(m.weight).format('0,0.000').replace('.', ',');
      m.weight_processed = numeral(m.weight_processed).format('0,0.000').replace('.', ',');
      txt.push(m.batch?.length);
      return m;
    });
    if (export_ === 'true') {
      
    } else {
      const pagination = {
        active: active || newData.data.data.current_page,
        show: newData.data.data.per_page,
        total: newData.data.data.total,
        last_page: newData.data.data.last_page,
        from: newData.data.data.from,
        to: newData.data.data.to,
      };
      const paging = pagination;
      dispatch({ type: paramType, data: modifiedData });
      dispatch({ type: 'PAGING', data: paging });
    }
  } else {
    dispatch({ type: paramType, data: [] });
  }
};

export const getForescast = async ({
  export_ = 'false',
  dispatch,
  active,
  props,
}) => {
  const { product, client, site } = props.match.params;
  const url = `/stock-balance-forecast?client=${client}&product=${product}&site=${site}&page=${active}&export=${export_}&limit=50`;
  dispatch({ type: 'GET_SH_DETAIL_FORESCAST', data: [] });
  dispatch({ type: 'TABLE_STATUS', data: 'waiting' });
  const { data } = await axios.get(url);
  let forecast = [];
  Object.keys(data.data).map((value) => forecast.push(data.data[value]));
  if (data) {
    if (!data && forecast.length === 0) {
      return 0;
    }
    const pagination = {
      active: active || data.current_page,
      show: data.per_page,
      total: data.total,
      last_page: data.last_page,
      from: data.from,
      to: data.to,
    };
    dispatch({ type: 'GET_SH_DETAIL_FORESCAST', data: forecast });
    dispatch({ type: 'PAGING', data: pagination });
  }
};

export const submitPurchaseOrder = async ({ orderDetails, lineDetails }) => {
  const ret = await axios.post(endpoints.purchaseOrderCreate, { orderDetails, lineDetails });
  return ret;
};

export const submitSalesOrder = async ({ header, lineDetail }) => {
  const ret = await axios.post(endpoints.salesOrderCreate, { header, lineDetail });
  return ret;
};

export const showDetails = ({ module, item }) => {
  const url = `/${module}/${item.site}/${item.client}/${item.order_no}`;
  this.props.history.push(url);
};

export const checkOrderNo = async ({ client, orderNo }) => {
  const { data } = await axios.post('/orderCheck', {
    client,
    order_no: orderNo,
  });

  if (data.message === 'not available') {
    return { status: false, message: 'Order number exist' };
  }
  if (data.message === 'The client field is required.') {
    return { status: false, message: 'Please select client' };
  }

  return { status: true, message: null };
};

export const getCustomerDetail = async ({ client, customer, customerDetails, dispatch }) => {
  if (!client) {
    return;
  }

  let customerVal = customer?.value;
  client = client?.value?.value;
  const { data } = await axios.get(`${endpoints.getSoIdentity}?client=${client || ''}&customerNo=${customerVal}`);

  // set customer Details
  const identity = data?.identity[0];
  customerDetails.customer.value = customer;
  customerDetails.address1.value = identity?.address_1 || '';
  customerDetails.address2.value = identity?.address_2 || '';
  customerDetails.address3.value = identity?.address_3 || '';
  customerDetails.address4.value = identity?.address_4 || '';
  customerDetails.address5.value = identity?.address_5 || '';
  customerDetails.suburb.value = identity?.city || '';
  customerDetails.postcode.value = identity?.postcode || '';
  customerDetails.state.value = identity?.state || '';
  customerDetails.country.value = identity?.country || '';
  dispatch({ type: 'RESET_CUSTOMER_DETAIL', data: customerDetails });
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

        let detail = data.detail;
        detail.map((details) => {
          let dates = details.date.replaceAll('-', '_');
          tmp_row['sa_plus_' + dates] = details.sa_plus;
          tmp_row['sa_minus_' + dates] = details.sa_minus;
          tmp_row['rec_' + dates] = details.recv_weight;
          tmp_row['send_' + dates] = details.send_weight;
        });
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
