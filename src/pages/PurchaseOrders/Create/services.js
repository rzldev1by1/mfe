import axios from 'axios';
import endpoints from 'helpers/endpoints';
import numeral from 'numeral';

export const getResources = async ({ user, dispatch }) => {
  //get site and order type
  const { data } = await axios.get(`${endpoints.getPOResources}?company=${user.company}&client=${user.client}`);
  const orderTypeFilterData = data.orderTypeFilter.map((data, i) => ({
    value: data.code,
    label: `${data.code}: ${data.description}`,
  }));
  const site = data.site.map((data) => ({ value: data.site, label: `${data.site}: ${data.name}` }));
  const orderTypeData = data.orderType.map((data, i) => ({
    value: data.code,
    label: `${data.code}: ${data.description}`,
  }));

  //get client
  let resources = { site: site, orderType: orderTypeData };
  dispatch({ type: 'PO_RESOURCES', data: resources });
};

const validateOrderDetails = (data) => {};

export const validation = async ({ dispatch, data, setActiveTab }) => {
  //initial
  let statusValidate = true;

  //validate Order Details
  let orderDetails = data.orderDetails;
  for (var key in orderDetails) {
    if (!orderDetails[key]['required']) {
      continue;
    }

    let values = orderDetails[key]['value'];
    let text = orderDetails[key]['text'];
    let status = true;
    let message = null;
    if (key === 'orderNo') {
      if (values && values.length < 4) {
        statusValidate = false;
      }
    }

    if (!values) {
      statusValidate = false;
    }
  }

  //validate orderlines
  let orderLines = data.orderLines;
  orderLines.map((item, index) => {
    if (!item.qty.value) {
      statusValidate = false;
    }
    if (!item.uom.value) {
      statusValidate = false;
    }
    if (!item.product.value) {
      statusValidate = false;
    }
  });

  console.log(statusValidate);
  if (statusValidate) {
    setActiveTab('review');
  } else {
    setActiveTab('details');
  }
};

export const resetCreate = (dispatch) => {
  const orderDetails = {
    site: { value: null, required: true, text: 'Site' },
    orderType: { value: null, required: true, text: 'Order Type' },
    supplier: { value: null, required: false, text: 'Supplier' },
    customerOrderRef: { value: null, required: false, text: 'Customer Order Ref' },
    client: { value: null, required: true, text: 'Client' },
    orderNo: { value: null, required: true, minLength: 4, text: 'Order no.' },
    orderDate: { value: null, required: true, text: 'Order Date' },
    vendorOrderRef: { value: null, required: false, text: 'Vendor Order Ref' },
  };

  const orderLines = [
    {
      product: { value: null, required: true, text: 'Product' },
      desc: { value: null, required: false, text: 'Desc' },
      qty: { value: null, required: true, text: 'Qty' },
      weight: { value: null, required: false, text: 'Weight' },
      uom: { value: null, required: true, text: 'UOM' },
      batch: { value: null, required: false, text: 'Batch' },
      ref3: { value: null, required: false, text: 'Ref3' },
      ref4: { value: null, required: false, text: 'Ref4' },
      disposition: { value: null, required: false, text: 'Disposition' },
      rotaDate: { value: null, required: false, text: 'Rotadate' },
    },
  ];

  const tmp = {
    orderDetails: orderDetails,
    orderLines: orderLines,
  };
  dispatch({ type: 'CREATE_PO', data: tmp });
};

export const changeOrderDetails = ({ type, column, value, dispatch }) => {
  if (value) {
    dispatch({ type: 'CREATE_PO_DETAILS', data: value, column });
  }
};

export const changeOrderLines = ({ val, column, index, dispatch }) => {
  //use formatter
  const formaterColumn = ['weight', 'qty'];
  let newVal = val;
  if (formaterColumn.includes(column)) {
    newVal = decimalFormatter(column, val);
  }

  //set redux
  let tmp_column = { column: column, index: index };
  dispatch({ type: 'CREATE_PO_LINES', data: val, column: tmp_column });
};

export const addOrderLines = ({ dispatch }) => {
  const orderLines = {
    product: { value: null, required: true },
    desc: { value: null, required: false },
    qty: { value: null, required: true },
    weight: { value: null, required: false },
    uom: { value: null, required: true },
    batch: { value: null, required: false },
    ref3: { value: null, required: false },
    ref4: { value: null, required: false },
    disposition: { value: null, required: false },
    rotaDate: { value: null, required: false },
  };
  dispatch({ type: 'ADD_PO_LINES', data: orderLines });
};

export const deleteOrderLines = ({ index, dispatch }) => {
  dispatch({ type: 'DELETE_PO_LINES', data: index });
};

export const removeLine = ({ i, line, setLine }) => {
  const newOrderLine = { ...line };
  if (newOrderLine.orderLine.length > 1) {
    const tes = Object.assign([], newOrderLine.orderLine);
    tes.splice(i, 1);
    newOrderLine.orderLine = tes;
    setLine(newOrderLine);
    console.log(newOrderLine.orderLine);
  }
};

export const lineChange = (i, e, line, setLine) => {
  const newOrderLine = { ...line };
  const { name, value } = e.target;

  let formatted = value;
  formatted = this.decimalFormatter(name, value);

  const tes = [...newOrderLine.orderLine];
  tes[i][name] = formatted;

  newOrderLine.orderLine = tes;
  setLine(newOrderLine);
  console.log(newOrderLine.orderLine);
};

export const getDisposition = async ({ dispatch }) => {
  const url = `${endpoints.getDisposition}`;
  const { data } = await axios.get(url);
  const dispositionData = [];
  data.code.map((c, i) => {
    if (c.length > 0 && c != ' ') dispositionData.push({ value: c, label: c, i });
  });
  dispatch({ type: 'CREATE_PO_DISPOSITION', data: dispositionData });
};

export const getSupplier = async ({ createPO, setSupplier }) => {
  let site = createPO?.orderDetails?.site?.value?.value;
  let client = createPO?.orderDetails?.client?.value?.value;
  const { data } = await axios.get(`${endpoints.getSupplier}?client=${client || ''}&site=${site || ''}`);
  const supplierData = data.map((d) => ({ value: d.supplier_no, label: `${d.supplier_no}: ${d.name}` }));
  setSupplier(supplierData);
};

export const getProduct = async ({ orderDetails, val, setIsLoading, setIsProduct }) => {
  const client = orderDetails?.client?.value?.value;
  const url = `${endpoints.getProduct}?client=${client || ''}&param=${val.toUpperCase()}`;
  // const orderLine = this.state.orderLine;
  // orderLine[i].productIsLoad = true;
  const { data } = await axios.get(url);
  const productData = data.map((data, i) => ({ value: data.code, label: `${data.name}`, i }));
  setIsLoading(false);
  setIsProduct(productData);
};

export const productHandler = async ({ val, column, index, dispatch, orderDetails, setIsUom }) => {
  //set redux
  let tmp_column = { column: column, index: index };
  dispatch({ type: 'CREATE_PO_LINES', data: val, column: tmp_column });

  //get uom
  const client = orderDetails?.client?.value?.value;
  const product = val?.value;
  const url = `${endpoints.getUom}?client=${client || ''}&product=${product || ''}`;
  const { data } = await axios.get(url);
  const uomData = data.uom.map((c, i) => ({ value: c, label: c }));
  setIsUom(uomData);
};

export const numberCheck = (e) => {
  if (!/^[0-9]+$/.test(e.key)) e.preventDefault();
};

const decimalFormatter = (name, value) => {
  let newVal = value;
  if (name === 'weight') {
    if (newVal.length > 11)
      newVal = newVal
        .split('')
        .filter((d) => (d !== ',' ? d : null))
        .map((d, i) => {
          if (i > 10 && !newVal.includes('.')) {
            return null;
          } else return d;
        })
        .join('');
    const dot = newVal.indexOf('.');

    if (dot === -1 && newVal.length === 11) {
      newVal = newVal
        .slice(0, dot)
        .split('')
        .filter((d) => d !== ',')
        .join('');
    }
    if (dot !== -1 && newVal.length) {
      let number;
      let decimal = newVal
        .slice(dot + 1, dot + 4)
        .split('')
        .filter((d) => d !== '.' && d !== ',')
        .join('');
      let integer = newVal
        .slice(0, dot)
        .split('')
        .filter((d) => d !== ',')
        .join('');
      if (integer.length <= 6) {
        if (integer.length >= 4) {
          let idxSepr1 = integer.slice(0, integer.length - 3);
          let idxSepr2 = integer.slice(integer.length - 3);
          number = `${idxSepr1},${idxSepr2}.${decimal}`;
        } else number = `${integer}.${decimal}`;
      }
      if (integer.length > 6 && integer.length <= 9) {
        let idxSepr1 = integer.slice(0, integer.length - 6);
        let idxSepr2 = integer.slice(idxSepr1.length, integer.length - 3);
        let idxSepr3 = integer.slice(integer.length - 3);
        number = `${idxSepr1},${idxSepr2},${idxSepr3}.${decimal}`;
      }
      if (integer.length > 9 && integer.length <= 8) {
        let idxSepr1 = integer.slice(0, integer.length - 9);
        let idxSepr2 = integer.slice(idxSepr1.length, integer.length - 6);
        let idxSepr3 = integer.slice(idxSepr1.length + idxSepr2.length, idxSepr1.length + idxSepr2.length + 3);
        let idxSepr4 = integer.slice(integer.length - 3);
        number = `${idxSepr1},${idxSepr2},${idxSepr3},${idxSepr4}.${decimal}`;
      }

      number = number?.split('');
      if (number && number[0] === ',') delete number[0];
      number = number?.join('');
      return number;
    } else return numeral(newVal).format('0,0');
  } else if (name == 'qty') return newVal ? numeral(newVal).format('0,0') : newVal;
  return value;
};

export const submit = async ({ data, setIsSubmitStatus }) => {
  console.log(data);

  //validate Order Details
  let orderDetails = [
    {
      site: data?.orderDetails?.site?.value?.value || '',
      client: data?.orderDetails?.client?.value?.value || '',
      orderNo: data?.orderDetails?.orderNo?.value || '',
      orderType: data?.orderDetails?.orderType?.value?.value || '',
      orderDate: data?.orderDetails?.client?.value || '',
      web_user: '99998',
    },
  ];

  //validate orderlines
  let orderLines = data.orderLines;
  let newOrderLines = [];
  orderLines.map((item, index) => {
    let tmp = {
      product: item?.product?.value?.value || '',
      qty: item?.qty?.value || '',
      uom: item?.uom?.value?.value || '',
      ref3: item?.ref3?.value || '',
      ref4: item?.ref4?.value || '',
      rotaDate: item?.rotaDate?.value || '',
      disposition: item?.disposition?.value?.value || '',
      batch: item?.batch?.value || '',
      weight: item?.weight?.value || '',
    };
    newOrderLines.push(tmp);
  });

  let payload = { orderDetails, lineDetails: newOrderLines };
  const { ret } = await axios.post(endpoints.purchaseOrderCreate, { orderDetails, lineDetails: newOrderLines });

  //reset
  setIsSubmitStatus('success');
};
