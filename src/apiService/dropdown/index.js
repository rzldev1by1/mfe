/* eslint-disable array-callback-return */
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

export const getOrderType = async ({ dispatch, company, client }) => {
  // if (client) {
  const { data } = await axios.get(`${endpoints.getPOResources}?company=${company}&client=${client}`);
  const orderTypeFilterData = data.orderTypeFilter.map((dataIndex) => ({
    value: dataIndex.code,
    label: `${dataIndex.code}: ${dataIndex.description}`,
  }));
  //   const orderTypeData = data.orderType.map((data, i) => ({ value: data.code, label: `${data.code}: ${data.description}` }))
  //   const site = data.site.map(data => ({ value: data.site, label: `${data.site}: ${data.name}` }))
  const orderType = { value: 'all', label: 'All' };
  orderTypeFilterData.splice(0, 0, orderType);
  dispatch({ type: 'ORDER_TYPE_DATA', data: orderTypeFilterData });
  // }
};

export const getTask = async ({ dispatch, client, site }) => {
  const clientParam = client?.value ? client.value : client;
  const siteParam = site?.value ? site.value : site;
  // if (client && site) {
  const { data } = await axios.get(`${endpoints.getIsisTask}?client=${clientParam}&site=${siteParam}&order=po`);
  const taskData = data.code.map((c, i) => ({ value: c, label: `${data.name[i]}` }));
  const task = { value: 'all', label: 'All Task' };
  taskData.splice(0, 0, task);
  dispatch({ type: 'TASK_DATA', data: taskData });
  // }
};

export const siteCheck = (siteData, site) => {
  let l = null;
  if (site)
    if (siteData) {
      siteData.map((data) => {
        if (data.value === site) l = data.label;
      });
    }
  return l;
};

export const clientCheck = (clientData, client) => {
  let l = null;
  if (client)
    if (clientData) {
      clientData.map((data) => {
        if (data.value === client) l = data.label;
      });
    }
  return l;
};

export const getPOResources = async ({ user, dispatch }) => {
  let { data } = await axios.get(
    `${endpoints.getPOResources}?company=${user.company || ''}&client=${user.client || 'all'}`,
  );
  let site = data.site.map((data) => ({ value: data.site, label: `${data.site}: ${data.name}` }));
  let orderTypeData = data.orderType.map((data, i) => ({
    value: data.code,
    label: `${data.code}: ${data.description}`,
  }));

  let resources = { site: site, orderType: orderTypeData };
  dispatch({ type: 'PO_RESOURCES', data: resources });
};

export const getSOResources = async ({ user, dispatch }) => {
  let { data } = await axios.get(
    `${endpoints.getSoResources}?company=${user.company || ''}&client=${user.client || 'all'}`,
  );

  //get Site
  let siteDescription = data.site.name;
  let site = data.site.code.map((data, idx) => ({ value: data, label: `${siteDescription[idx]}` }));

  //get Order Type
  let orderTypeDescription = data.orderType.description;
  let orderType = data.orderType.code.map((data, idx) => ({ value: data, label: `${orderTypeDescription[idx]}` }));

  let resources = { site, orderType };
  dispatch({ type: 'SO_RESOURCES', data: resources });
};

export const getDisposition = async ({ dispatch }) => {
  const { data } = await axios.get(`${endpoints.getDisposition}`);
  const dispositionData = [];
  data.code.map((c, i) => {
    if (c.length > 0 && c != ' ') dispositionData.push({ value: c, label: c, i });
  });
  dispatch({ type: 'CREATE_PO_DISPOSITION', data: dispositionData });
};

export const getSupplier = async ({ orderDetails, client, site, setSupplier }) => {
  if (orderDetails) {
    site = orderDetails?.site?.value?.value;
    client = orderDetails?.client?.value?.value;
  }

  const { data } = await axios.get(`${endpoints.getSupplier}?client=${client || ''}&site=${site || ''}`);
  const supplierData = data.map((d) => ({ value: d.supplier_no, label: `${d.supplier_no}: ${d.name}` }));
  setSupplier(supplierData);
};

export const getProduct = async ({ client, val, setIsLoading, setIsProduct }) => {
  const url = `${endpoints.getProduct}?client=${client || ''}&param=${val.toUpperCase()}`;
  const { data } = await axios.get(url);
  const productData = data.map((data, i) => ({ value: data.code, label: `${data.name}`, i }));
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
  client = client?.value?.value;
  const { data } = await axios.get(`${endpoints.getCustomer}?client=${client || ''}`);
  const customerData = data.map((d) => ({ value: d.supplier_no, label: `${d.supplier_no}: ${d.name}` }));
  setCustomerData(customerData);
};
