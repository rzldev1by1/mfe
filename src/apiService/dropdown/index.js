import axios from 'axios';
import endpoints from '../../helpers/endpoints';

export const getSite = async ({ dispatch }) => {
  const { data } = await axios.get(endpoints.getSite);
  const siteData = data.map((d) => ({ value: d.site, label: `${d.site}: ${d.name}` }));
  const site = { value: 'all', label: 'All Site' };
  siteData.splice(0, 0, site);
  dispatch({ type: 'SITE_DATA', data: siteData });
};

export const getClient = async ({ dispatch }) => {
  const { data } = await axios.get(endpoints.getClient);
  const clientData = data.map((d) => ({ value: d.code, label: `${d.code}: ${d.name}` }));
  const client = { value: 'all', label: 'All Client' };
  clientData.splice(0, 0, client);
  dispatch({ type: 'CLIENT_DATA', data: clientData });
};

export const getStatus = async ({ dispatch }) => {
  const statusData = [
    { value: 'open', label: 'All Open' },
    { value: 'all', label: 'All Status' },
    { value: 'unavailable', label: '0: Unavailable' },
    { value: 'available', label: '1: Available' },
    { value: 'released', label: '2: Released' },
    { value: 'part_released', label: '3: Part Released' },
    { value: 'completed', label: '4: Completed' },
  ];
  dispatch({ type: 'STATUS_DATA', data: statusData });
};

export const getOrderType = async ({ dispatch, company, client, module }) => {
  let url = '';
  if (module === 'purchaseOrder') {
    url = endpoints.getPOResources;
  } else {
    url = endpoints.getSoResources;
  }

  const { data } = await axios.get(`${url}?company=${company}&client=${client}`);
  let orderTypeFilterData = [];
  if (module === 'purchaseOrder') {
    orderTypeFilterData = data.orderTypeFilter.map((dataIndex) => ({
      value: dataIndex.code,
      label: `${dataIndex.code}: ${dataIndex.description}`,
    }));
  } else {
    orderTypeFilterData = data.orderTypeFilter.map((dataIndex) => ({
      value: dataIndex.code,
      label: `${dataIndex.code}: ${dataIndex.name}`,
    }));
  }

  const orderType = { value: 'all', label: 'All Order Type' };
  orderTypeFilterData.splice(0, 0, orderType);
  dispatch({ type: 'ORDER_TYPE_DATA', data: orderTypeFilterData });
};

export const getTask = async ({ dispatch, client, site }) => {
  const clientParam = client?.value ? client.value : client;
  const siteParam = site?.value ? site.value : site;
  const { data } = await axios.get(`${endpoints.getIsisTask}?client=${clientParam}&site=${siteParam}&order=po`);
  const taskData = data && data.map((c) => ({ value: c.code, label: `${c.code}: ${c.name}` }));
  const task = { value: 'all', label: 'All Task' };
  taskData.splice(0, 0, task);
  dispatch({ type: 'TASK_DATA', data: taskData });
};

export const siteCheck = (siteData, site) => {
  let l = null;
  if (site)
    if (siteData) {
      siteData.forEach((data) => {
        if (data.value === site) l = data.label;
      });
    }
  return l;
};

export const clientCheck = (clientData, client) => {
  let l = null;
  if (client)
    if (clientData) {
      clientData.forEach((data) => {
        if (data.value === client) l = data.label;
      });
    }
  return l;
};

export const getPOResources = async ({ user, dispatch }) => {
  const { data } = await axios.get(
    `${endpoints.getPOResources}?company=${user.company || ''}&client=${user.client || 'all'}`,
  );

  const orderTypeData = data.orderType.map((datas) => ({
    value: datas.code,
    label: `${datas.code}: ${datas.description}`,
  }));

  const resources = { orderType: orderTypeData };
  dispatch({ type: 'PO_RESOURCES', data: resources });
};

export const getSOResources = async ({ user, dispatch }) => {
  const { data } = await axios.get(
    `${endpoints.getSoResources}?company=${user.company || ''}&client=${user.client || 'all'}`,
  );

  // Order Type
  const orderType = data.orderType.map((datas) => ({
    value: datas.code,
    label: `${datas.code}: ${datas.name}`,
  }));

  // Order Type for Filter
  const orderTypeFilter = data.orderTypeFilter.map((datas) => ({
    value: datas.code,
    label: `${datas.code}: ${datas.name}`,
  }));

  const resources = { orderTypeFilter, orderType };
  dispatch({ type: 'SO_RESOURCES', data: resources });
};

export const getDisposition = async ({ dispatch, client }) => {
  const { data } = await axios.get(`${endpoints.getDisposition}?client=${client || ''}`);
  const dispositionData = [];
  data.forEach((c) => {
    if (c.code.length > 0 && c.code !== ' ') dispositionData.push({ value: c.code, label: c.code });
  });
  dispatch({ type: 'CREATE_PO_DISPOSITION', data: dispositionData });
};

export const getSupplier = async ({ client, site, setSupplier }) => {
  const { data } = await axios.get(`${endpoints.getSupplier}?client=${client || ''}&site=${site || ''}`);
  const supplierData = data.map((d) => ({ value: d.supplier_no, label: `${d.supplier_no}: ${d.name}` }));
  setSupplier(supplierData);
};

export const getProduct = async ({ client, val, setIsLoading, setIsProduct }) => {
  const staticClient = client.split(':')
  const url = `${endpoints.getProduct}?client=${staticClient.length > 1 ? staticClient[0].replace(' ', '') : client || ''}&search=${val.toUpperCase()}`;

  let productData = [];
  await axios
    .get(url)
    .then((res) => {
      const data = res.data;
      productData = data.map((data, i) => ({ value: data.code, label: `${data.name}`, data, i }));
    })
    .catch((error) => {
      console.log(error);
    });
  setIsLoading(false);

  setIsProduct(productData);
};

export const getUOM = async ({ client, product }) => {
  const url = `${endpoints.getUom}?client=${client || ''}&product=${product || ''}`;
  const { data } = await axios.get(url);
  return data;
};

export const getCustomer = async ({ client, setCustomerData }) => {
  if (!client) {
    return;
  }
  const { data } = await axios.get(`${endpoints.getCustomer}?client=${client || ''}`);
  const customerData = data.map((d) => ({ value: d.code, label: `${d.code}: ${d.name}`, data: d }));
  setCustomerData(customerData);
};

// export const getFilterDetailSP = async ({ field, dispatch }) => {
//   const data = await axios.get(`${endpoints.getFilterDetailSP}`)
//   // console.log(data);
//   // dispatch({ type: 'CREATE_PO_DISPOSITION', data: dispositionData });
// }
