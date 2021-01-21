/* eslint-disable no-param-reassign */
/* eslint-disable prefer-const */
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
  readyDocument = 'false',
  page,
  setPage,
  dispatch,
  active,
  module,
}) => {
  const newPage = { ...page };
  const urls = [];
  let endpointsUrl = '';
  let paramType = '';

  if (module === 'purchaseOrder') {
    endpointsUrl = endpoints.purchaseOrder;
    paramType = 'GET_PO_SUMMARY';
  }
  if (module === 'salesOrder') {
    endpointsUrl = endpoints.salesOrder;
    paramType = 'GET_SO_SUMMARY';
  }
  if (module === 'StockHolding') {
    endpointsUrl = endpoints.stockHoldingSummary;
    paramType = 'GET_SH_SUMMARY';
  }

  // reset table
  if (readyDocument === false && Export === false) {
    newPage.data = [];
    newPage.tableStatus = 'waiting';
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
  }

  const newData = await axios.get(`${endpointsUrl}?${urls.join('&')}`);
  if (newData?.data?.data) {
    const modifiedData = newData.data.data.data;
    modifiedData.map((item, idx) => {
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
      item.customername = item?.customername?.split(':');
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
      newPage.data = modifiedData;
      dispatch({ type: paramType, data: modifiedData });
      dispatch({ type: 'PAGING', data: paging });
    }

    if (modifiedData.length < 1) {
      newPage.tableStatus = 'noData';
    }
  } else {
    dispatch({ type: paramType, data: [] });
    newPage.data = [];
  }
  setPage(newPage);
};

export const getDetailHeader = async ({ dispatch, props, module }) => {
  const { orderdetail, client, site, orderno } = props.match.params;

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

  const url = endpointsUrl;
  const { data } = await axios.get(url);
  if (data.data) {
    dispatch({ type: paramType, data: data.data.data[0] });
  }
};

export const getDetailData = async ({
  export_ = 'false',
  readyDocument = 'false',
  page,
  setPage,
  dispatch,
  active,
  props,
  module,
}) => {
  const newPage = { ...page };
  const { orderdetail, client, site, orderno } = props.match.params;

  let endpointsUrl = '';
  let paramType = '';
  if (module === 'purchaseOrder') {
    endpointsUrl = `/purchaseOrder/${site}/${client}/${orderdetail}?page=${newPage.goPage}&export=${export_}`;
    paramType = 'GET_PO_DETAIL_TABLE';
  }
  if (module === 'salesOrder') {
    endpointsUrl = `/salesorder/${orderno}?client=${client}&site=${site}&page=${newPage.goPage}&export=${export_}`;
    paramType = 'GET_SO_DETAIL_TABLE';
  }

  const url = endpointsUrl;
  const newData = await axios.get(url);
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
      newPage.exportData = modifiedData;
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
      newPage.data = modifiedData;
      dispatch({ type: paramType, data: modifiedData });
      dispatch({ type: 'PAGING', data: paging });
    }

    if (modifiedData.length < 1) {
      newPage.tableStatus = 'noData';
    }
  } else {
    dispatch({ type: paramType, data: [] });
    newPage.data = [];
  }

  if (readyDocument === 'false' && export_ === 'false') {
    newPage.data = [];
    newPage.tableStatus = 'waiting';
  }
  setPage(newPage);
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

  //set customer Details
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
