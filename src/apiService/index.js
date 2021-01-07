import axios from 'axios';
import endpoints from '../helpers/endpoints';

const showDetails = ({ module, item }) => {
  const url = `/${module}/${item.site}/${item.client}/${item.order_no}`;
  this.props.history.push(url);
};

const searchPurchaseOrder = async ({
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
  urls.push(`status=${status ? status.value : 'all'}`);
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
      setPage(newPage);
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
      if (setPage) setPage(newPage);
    }

    if (modifiedData.length < 1) {
      const tableStatus = 'noData';
      if (setPage) setPage(newPage);
    }
  } else {
    dispatch({ type: 'GET_PO_SUMMARY', data: [] });
    const data = [];
    if (setPage) setPage(newPage);
  }
};

export { showDetails, searchPurchaseOrder };
