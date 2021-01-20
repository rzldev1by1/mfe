/* eslint-disable no-param-reassign */
/* eslint-disable prefer-const */
import axios from 'axios';
import numeral from 'numeral';
import moment from 'moment';
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
      if (parseInt(item.on_hand_qty + item.expected_in_qty)  >= item.expected_out_qty) {
        item.status = 'OK';
        item.statusTxt = 'OK';
      }if (parseInt(item.on_hand_qty + item.expected_in_qty)  <= item.expected_out_qty) {
        item.status =  'SHORTAGE';
        item.statusTxt = 'SHORTAGE';
      }
      item.product = String(item.product)
      item.expected_in_qty = numeral(item.expected_in_qty).format('0,0')
      item.expected_out_qty = numeral(item.expected_out_qty).format('0,0')
      item.on_hand_qty = numeral(item.on_hand_qty).format('0,0')
      item.pallets = numeral(item.pallets).format('0,0')
      item.expected_in_wgt = numeral(item.expected_in_wgt).format('0,0.000')
      item.weight_processed = numeral(item.weight_processed).format('0,0.000')
      item.price = numeral(item.price).format('0,0.00')
      item.customername = item?.customername?.split(":")
    })
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
    if(module === 'salesOrder' || module === 'purchaseOrder'){
      if (data.data) {
        dispatch({ type: paramType, data: data.data.data[0] });
      }
  }
  if(module === 'stockHolding'){
    if (data.data) {
      dispatch({ type: paramType, data: data.data[0] });
    }
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
  const { orderdetail, client, site, orderno, product, } = props.match.params;

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
  if (module === 'stockHolding') {
    endpointsUrl = `/stockdetail/${product}?client=${client}&site=${site}&page=${newPage.goPage}&export=${export_}`;
    paramType = 'GET_SH_DETAIL_TABLE';
  }

  const url = endpointsUrl;
  const newData = await axios.get(url);
  if (newData?.data?.data) {
    let txt = [];
    let modifiedData = newData.data.data.data.map((m) => {
      m.quantity = numeral(m.quantity).format('0,0');
      m.qty_processed = numeral(m.qty_processed).format('0,0');
      m.weight = numeral(m.weight).format('0,0.000').replace(".", ",");
      m.weight_processed = numeral(m.weight_processed).format('0,0.000').replace(".", ",");
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

export const getForescast = async ({
  export_='false',
  readyDocument = 'false',
  page,
  setPage,
  dispatch,
  active,
  props,
}) => {
  const newPage = { ...page };
  const { product, client, site } = props.match.params;
  const url = `/stockbal?client=${client}&product=${product}&site=${site}&page=${page}&export=${export_}`;
  const { data } = await axios.get(url);
  const available2 = data[0][0]['available orders']
  const available = Object.values(available2);
  available.map(available => {
    if(available['closingbalance'] < 0){
      available['closingbalance'] = 0
    }
    return available
  })
  if (data[0][0]['stock expiry'].length === 0) {
    this.setState({
      tableStatusForecast: 'noData'
    })
    return
  }
  let expiryDateSH = data[0][0]['stock expiry']
  let idxForcast = expiryDateSH?.length -1
  let expdt = expiryDateSH[idxForcast]?.stockexpirydate
  
  let closingbal = [{ closingbalancetext: `Closing Balance as on ${moment(expdt).format('DD/MM/YYYY')}`, totalbalance: data[0][0]['closing balance'] }]
  const openingbal = [{ openingbalancetext: `Opening Balance as on ${moment().format('DD/MM/YYYY')}`, startbalance: data[0][0]['opening balance'] }]
  let txt = []
  let expiry = Object.values(expiryDateSH);
  expiry.map(expiry => {
    expiry['qty'] = expiry['quantity']
    closingbal[0].totalbalance = parseInt(closingbal[0].totalbalance) - parseInt(expiry.qty)
    if(closingbal[0].totalbalance <= 0){
      closingbal[0].totalbalance = 0
    }
    if(expiry['batchnum']){
      expiry['newstockexpirydate'] = `Batch (${expiry['batchnum']}) Stock Expires on ${moment(expiry['stockexpirydate']).format('DD/MM/YYYY')}`
    }else{
      expiry['newstockexpirydate'] = `Stock Expires on ${moment(expiry['stockexpirydate']).format('DD/MM/YYYY')}`
    }
    expiry['closingstock'] = closingbal[0].totalbalance
    txt.push(expiry.newstockexpirydate?.length)
    
    return expiry
  
  })

  let largest= 0;

  for (let i=0; i<=largest;i++){
      if (txt[i]>largest) {
          largest=txt[i];
      }
  }

  dispatch({ type: 'TOTAL_LENGTH', data: largest })
  let concat = openingbal.concat(available)
  concat = concat.concat(expiry)
  concat = concat.concat(closingbal)

  if (data) {
    const pagination = {
      active: active ||  data.current_page,
      show:  data.per_page,
      total:  data.total,
      last_page:  data.last_page,
      from:  data.from,
      to:  data.to,
    };
    const paging = pagination;
      newPage.dataForecast = concat;
      dispatch({ type: "GET_SH_DETAIL_FORESCAST", data: concat });
      dispatch({ type: 'PAGING', data: paging });
  } else {
    newPage.tableStatus = 'noData';
  }
  if (readyDocument === 'false' && export_ === 'false') {
    newPage.dataForecast = [];
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
