/* eslint-disable no-param-reassign */
/* eslint-disable prefer-const */
import axios from 'axios';
import numeral from 'numeral'
import endpoints from '../helpers/endpoints';

// Get Purchase Order
export const searchPurchaseOrder = async ({
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
}) => {
  const newPage = { ...page };
  const urls = [];

  // reset table
  if (readyDocument === false && Export === false) {
    newPage.data = [];
    newPage.tableStatus = 'waiting';
  }
  // Url
  urls.push(`searchParam=${searchInput || ''}`);
  urls.push(`site=${siteVal?.value ? siteVal.value : 'all'}`);
  urls.push(`client=${clientVal?.value ? clientVal.value : 'all'}`);
  urls.push(`orderType=${orderType ? orderType.value : 'all'}`);
  urls.push(`status=${status ? status.value : 'open'}`);
  if (task && task.value !== 'all') urls.push(`task=${task.value}`);
  urls.push(`page=${active || 1}`);
  if (Export === true) {
    urls.push('export=true');
  }

  const newData = await axios.get(`${endpoints.purchaseOrder}?${urls.join('&')}`);
  if (newData?.data?.data) {
    const modifiedData = newData.data.data.data;
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
      dispatch({ type: 'GET_PO_SUMMARY', data: modifiedData });
      dispatch({ type: 'PAGING', data: paging });
    }

    if (modifiedData.length < 1) {
      newPage.tableStatus = 'noData';
    }
  } else {
    dispatch({ type: 'GET_PO_SUMMARY', data: [] });
    newPage.data = [];
  }
  setPage(newPage);
};

export const getDetailPO = async ({ dispatch, props }) => {
  const { orderdetail, client, site } = props.match.params;
  const url = `/purchaseOrder?searchParam=${orderdetail}&client=${client}&site=${site}`;
  const { data } = await axios.get(url);
  if (data.data) {
    dispatch({ type: 'GET_PO_DETAIL', data: data.data.data[0] });
  }
};

export const getProductsTablePO = async ({
  export_ = 'false',
  readyDocument = 'false',
  page,
  setPage,
  dispatch,
  active,
  props,
}) => {
  const newPage = { ...page };
  const { orderdetail, client, site } = props.match.params;
  const url = `/purchaseOrder/${site}/${client}/${orderdetail}?page=${newPage.goPage}&export=${export_}`;
  const newData = await axios.get(url);
  if (newData?.data?.data) {
    let txt = []
    let modifiedData = newData.data.data.data.map(m => { 
      m.quantity = numeral(m.quantity).format('0,0')
      m.qty_processed = numeral(m.qty_processed).format('0,0')
      m.weight = numeral(m.weight).format('0,0.000')
      m.weight_processed = numeral(m.weight_processed).format('0,0.000')
      txt.push(m.batch?.length)
      return m
    })
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
      dispatch({ type: 'GET_PO_DETAIL_TABLE', data: modifiedData });
      dispatch({ type: 'PAGING', data: paging });
    }

    if (modifiedData.length < 1) {
      newPage.tableStatus = 'noData';
    }
  } else {
    dispatch({ type: 'GET_PO_DETAIL_TABLE', data: [] });
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
// And Purchase Order

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

