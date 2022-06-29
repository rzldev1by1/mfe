/* eslint-disable no-param-reassign */
import numeral from 'numeral';
import { checkOrderNo, submitSalesOrder } from '../../../apiService';

export const cleanOrderDetails = {
  site: null,
  orderType: null,
  customerOrderRef: null,
  deliveryDate: null,
  client: null,
  orderNo: null,
  vendorOrderRef: null,
  deliveryInstructions: null,
  validation_site: false,
  validation_orderType: false,
  validation_client: false,
  validation_orderNo: false,
  validation_deliveryDate: false,
};

export const cleanCustomerDetails = {
  customer: null,
  address1: null,
  address2: null,
  address3: null,
  address4: null,
  address5: null,
  suburb: null,
  postcode: null,
  state: null,
  country: null,
  validation_customer: false,
  validation_address1: false,
  validation_postcode: false,
  validation_state: false,
};

export const cleanOrderLines = {
  product: '',
  qty: '',
  weight: '',
  uom: '',
  batch: '',
  ref3: '',
  ref4: '',
  disposition: '',
  packId: '',
  rotaDate: '',
  validation: false,
  validation_product: false,
  validation_uom: false,
  validation_qty: false,
};

export const resetCreate = (dispatch) => {
  const orderDetails = {
    site: { value: null, required: true, text: 'Site' },
    orderType: { value: null, required: true, text: 'Order Type' },
    customerOrderRef: { value: null, required: false, text: 'Customer Order Ref' },
    deliveryDate: { value: null, required: true, text: 'Delivery Date' },
    client: { value: null, required: true, text: 'Client' },
    orderNo: { value: null, required: true, minLength: 4, text: 'Order No' },
    vendorOrderRef: { value: null, required: false, text: 'Vendor Order Ref' },
    deliveryInstructions: { value: null, required: false, text: 'Delivery Instructions' },
  };

  const customerDetails = {
    customer: { value: null, required: false, text: 'Customer' },
    address1: { value: null, required: true, text: 'Address 1' },
    address2: { value: null, required: false, text: 'Address 2' },
    address3: { value: null, required: false, text: 'Address 3' },
    address4: { value: null, required: false, text: 'Address 4' },
    address5: { value: null, required: false, text: 'Address 5' },
    suburb: { value: null, required: false, text: 'Suburb' },
    postcode: { value: null, required: true, text: 'Postcode' },
    state: { value: null, required: true, minLength: 4, text: 'State' },
    country: { value: null, required: false, text: 'Country' },
  };

  const orderLines = {
    product: { required: true, text: 'Product' },
    description: { required: false, text: 'Description' },
    qty: { required: true, text: 'Qty' },
    weight: { required: false, text: 'Weight' },
    uom: { required: true, text: 'UOM' },
    batch: { required: false, text: 'Batch' },
    ref3: { required: false, text: 'Ref3' },
    ref4: { required: false, text: 'Ref4' },
    disposition: { required: false, text: 'Disposition' },
    packId: { required: false, text: 'Pack ID' },
    rotaDate: { required: false, text: 'Rotadate' },
  };

  const orderLinesData = [
    {
      product: null,
      qty: null,
      weight: null,
      uom: null,
      batch: null,
      ref3: null,
      ref4: null,
      disposition: null,
      packId: null,
      rotaDate: null,
    },
  ];

  dispatch({ type: 'RESET_ORDER_DETAIL', data: orderDetails });
  dispatch({ type: 'RESET_CUSTOMER_DETAIL', data: customerDetails });
  dispatch({ type: 'RESET_ORDER_LINES', data: orderLines });
  dispatch({ type: 'RESET_ORDER_LINES_DATA', data: orderLinesData });
};

export const changeOrderDetails = ({ column, value, orderDetails, setOrderDetails }) => {
  const od = { ...orderDetails };
  od[column] = value;
  od[`validation_${column}`] = !!value;

  setOrderDetails(od);
};

export const changeOrderDetailSiteAndClient = ({ valClient, valSite, setOrderDetails, orderDetails }) => {
  const od = { ...orderDetails };

  if (valClient) {
    od.client = valClient;
    od.validation_client = !!valClient;
  }

  if (valSite) {
    od.site = valSite;
    od.validation_site = !!valSite;
  }
  setOrderDetails(od);
};

export const changeClient = async ({
  value,
  orderDetails,
  setOrderDetails,
  setCustomerDetails,
  setOrderLines
}) => {
  const od = { ...orderDetails };
  const resetOrderLines = [
    {
      batch: "",
      disposition: "",
      packId: "",
      product: "",
      qty: "",
      ref3: "",
      ref4: "",
      rotaDate: "",
      uom: "",
      productDesc: "",
      validation: false,
      validation_product: false,
      validation_qty: false,
      validation_uom: false,
      weight: ""
    }
  ];

  const resetCustomerDetails = {
    address1: "",
    address2: "",
    address3: "",
    address4: "",
    address5: "",
    country: "",
    customer: "",
    postcode: "",
    state: "",
    suburb: "",
    validation_address1: true,
    validation_customer: true,
    validation_postcode: true,
    validation_state: true
  }

  setOrderLines(resetOrderLines)
  setCustomerDetails(resetCustomerDetails);

  od.client = value;
  od.validation_client = !!value;
  setOrderDetails(od);
};

export const changeCustomerDetails = ({ column, value, customerDetails, setCustomerDetails }) => {
  let cd = { ...customerDetails };
  cd[column] = value;
  cd = !!value;
  if (!value) {
    cd.address1 = ""
    cd.address2 = ""
    cd.address3 = ""
    cd.address4 = ""
    cd.address5 = ""
    cd.country = ""
    cd.customer = null
    cd.postcode = ""
    cd.state = ""
    cd.suburb = ""
  }
  setCustomerDetails(cd);
};

export const changeOrderNo = async ({ orderNo, client, setCheckingOrderNo, setOrderDetails, orderDetails }) => {
  if (!client) {
    setOrderDetails({ ...orderDetails, validation_orderNo: false });
    setCheckingOrderNo({ status: false, message: 'Please select client' });
    return;
  }

  if ((orderNo && orderNo.length < 4) || !orderNo) {
    setOrderDetails({ ...orderDetails, validation_orderNo: false });
    setCheckingOrderNo({ status: false, message: 'Order No must have min 4 characters' });
    return;
  }

  setCheckingOrderNo({ status: false, message: 'verifying...' });
  setOrderDetails({ ...orderDetails, validation_orderNo: false });
  const ret = await checkOrderNo({ client, orderNo, module: 'purchase-orders' });

  const val = document.getElementById('orderNo').value;
  if (val !== orderNo) {
    return;
  }

  if (ret.status) {
    setCheckingOrderNo({ status: true, message: '' });
    setOrderDetails({ ...orderDetails, orderNo, validation_orderNo: true });
  } else {
    setCheckingOrderNo({ status: ret.status, message: ret.message });
    setOrderDetails({ ...orderDetails, validation_orderNo: false });
  }
};

export const changeOrderLines = ({ val, column, index, orderLines, setOrderLines }) => {
  const newOrderLines = [...orderLines];
  newOrderLines[index][column] = val;
  newOrderLines[index][`validation_${column}`] = !!val
  setOrderLines(newOrderLines);
};

export const addOrderLines = ({ orderLines, setOrderLines }) => {
  const newCleanOrderLines = Object.assign(JSON.parse(JSON.stringify(cleanOrderLines)));
  const newOrderLines = [...orderLines];

  newOrderLines.push(newCleanOrderLines);
  setOrderLines(newOrderLines);
};

export const deleteOrderLines = ({ orderLines, setOrderLines, index }) => {
  const newOrderLines = [...orderLines];
  newOrderLines.splice(index, 1);
  setOrderLines(newOrderLines);
};

export const removeLine = ({ i, line, setLine }) => {
  const newOrderLine = { ...line };
  if (newOrderLine.orderLine.length > 1) {
    const tes = Object.assign([], newOrderLine.orderLine);
    tes.splice(i, 1);
    newOrderLine.orderLine = tes;
    setLine(newOrderLine);
  }
};

export const lineChange = (i, e, line, setLine) => {
  const newOrderLine = { ...line };
  const { name, value } = e.target;
  const tes = [...newOrderLine.orderLine];
  tes[i][name] = this.decimalFormatter(name, value);

  newOrderLine.orderLine = tes;
  setLine(newOrderLine);
};

export const productHandler = async ({ val, index, orderLines, setIsUom, setOrderLines }) => {
  const newOrderLines = [...orderLines];
  newOrderLines[index].product = val;
  newOrderLines[index].validation_product = !!val;
  newOrderLines[index].uom = '';
  newOrderLines[index].validation_uom = false;
  newOrderLines[index].productDesc = val?.orginLabel || '';
  setOrderLines(newOrderLines);

  const stringUOM = val?.uom;
  if (stringUOM) {
    const uomDataArr = stringUOM.split(',');
    const uomData = uomDataArr.map(c => ({ value: c, label: c }));
    setIsUom(uomData);
  } else {
    setIsUom([]);
  }
};

export const numberCheck = (e) => {
  if (!/^[0-9]+$/.test(e.key)) e.preventDefault();
};

export const decimalFormatter = (name, value) => {
  let newVal = value;
  if (name === 'weight') {
    if (newVal.length > 11)
      newVal = newVal
        .split('')
        .filter((d) => (d !== ',' ? d : null))
        .map((d, i) => {
          if (i > 10 && !newVal.includes('.')) return null;
          return d
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
      const decimal = newVal
        .slice(dot + 1, dot + 4)
        .split('')
        .filter((d) => d !== '.' && d !== ',')
        .join('');
      const integer = newVal
        .slice(0, dot)
        .split('')
        .filter((d) => d !== ',')
        .join('');
      if (integer.length <= 6) {
        number = `${integer}.${decimal}`;
        if (integer.length >= 4) {
          const idxSepr1 = integer.slice(0, integer.length - 3);
          const idxSepr2 = integer.slice(integer.length - 3);
          number = `${idxSepr1},${idxSepr2}.${decimal}`;
        }
      }
      if (integer.length > 6 && integer.length <= 9) {
        const idxSepr1 = integer.slice(0, integer.length - 6);
        const idxSepr2 = integer.slice(idxSepr1.length, integer.length - 3);
        const idxSepr3 = integer.slice(integer.length - 3);
        number = `${idxSepr1},${idxSepr2},${idxSepr3}.${decimal}`;
      }
      if (integer.length > 9 && integer.length <= 8) {
        const idxSepr1 = integer.slice(0, integer.length - 9);
        const idxSepr2 = integer.slice(idxSepr1.length, integer.length - 6);
        const idxSepr3 = integer.slice(idxSepr1.length + idxSepr2.length, idxSepr1.length + idxSepr2.length + 3);
        const idxSepr4 = integer.slice(integer.length - 3);
        number = `${idxSepr1},${idxSepr2},${idxSepr3},${idxSepr4}.${decimal}`;
      }

      number = number?.split('');
      if (!number && number[0] === ',') number = number?.join('');
      return number;
    }
    return numeral(newVal).format('0,0');
  }
  if (name === 'qty') return newVal ? numeral(newVal).format('0,0') : newVal
  return value;
};

export const validation = async ({ orderDetails, orderLines, customerDetails, setActiveTab, setOrderLines }) => {
  let statusValidate = true;
  const orderDetailsValidation = [
    'validation_site',
    'validation_orderType',
    'validation_client',
    'validation_orderNo',
    'validation_deliveryDate',
  ];
  const customerValidation = ['validation_address1', 'validation_postcode', 'validation_state'];
  const orderDetaillinessValidation = ['validation_product', 'validation_uom', 'validation_qty'];

  orderDetailsValidation.forEach(key => {
    if (orderDetails[key] !== true) statusValidate = false;
  });

  customerValidation.forEach(key => {
    if (customerDetails[key] !== true) statusValidate = false;
  });

  orderLines.forEach(data => {
    data.validation = true;
    orderDetaillinessValidation.forEach(key => {
      if (data[key] !== true) statusValidate = false;
    });
  });

  const newOrderLines = [...orderLines];
  setOrderLines(newOrderLines);

  if (orderLines.length < 1) statusValidate = false;

  if (statusValidate) setActiveTab('review');
  else setActiveTab('details');
};

export const validationOrderLines = async ({ orderLines, setOrderLines }) => {
  let statusValidate = true;
  const orderDetaillinessValidation = ['validation_product', 'validation_uom', 'validation_qty'];

  orderLines.forEach(data => {
    data.validation = true;
    orderDetaillinessValidation.forEach(key => {
      if (data[key] !== true) statusValidate = false;
    });
  });

  const newOrderLines = [...orderLines];
  setOrderLines(newOrderLines);
  return statusValidate;
};

export const submit = async ({
  orderDetails,
  customerDetails,
  orderLines,
  user,
  setIsSubmitReturn,
  setActiveTab,
  setIsSubmitStatus,
}) => {
  const header = {
    site: orderDetails?.site?.value || '',
    client: orderDetails?.client?.value || '',
    orderId: orderDetails?.orderNo || '',
    orderType: orderDetails?.orderType?.value || '',
    deliveryDate: orderDetails?.deliveryDate || '',
    deliveryInstruction: orderDetails?.deliveryInstructions || '',
    vendorOrderRef: orderDetails?.vendorOrderRef || '',
    customerOrderRef: orderDetails?.customerOrderRef || '',
    web_user: user.webUser,
    customer: customerDetails?.customer || '',
    shipToAddress1: customerDetails?.address1 || '',
    shipToAddress2: customerDetails?.address2 || '',
    shipToAddress3: customerDetails?.address3 || '',
    shipToAddress4: customerDetails?.address4 || '',
    shipToAddress5: customerDetails?.address5 || '',
    city: customerDetails?.suburb || '',
    country: customerDetails?.country || '',
    postCode: customerDetails?.postcode || '',
    state: customerDetails?.state || '',
  };

  const newOrderLines = [];
  orderLines.forEach(item => {
    const tmp = {
      productVal: item?.product?.value || '',
      qty: item?.qty || '',
      uom: item?.uom?.value || '',
      ref3: item?.ref3 || '',
      ref4: item?.ref4 || '',
      rotaDate: item?.rotaDate || '',
      dispositionVal: item?.disposition?.value || '',
      batch: item?.batch || '',
      packId: item?.packId || '',
      weight: item?.weight || '',
    };
    newOrderLines.push(tmp);
  });

  const ret = await submitSalesOrder({ header, lineDetail: newOrderLines });

  const status = ret?.data?.status;
  const message = ret?.data;
  const submitReturn = { status, message, orderNo: orderDetails?.orderNo };
  await setIsSubmitReturn(submitReturn);

  await setActiveTab('message');
  setIsSubmitStatus('done');
};

export const formatDate = (dateStr) => {
  if (!dateStr) {
    return null;
  }

  const dArr = dateStr.split('-');
  return `${dArr[2]}/${dArr[1]}/${dArr[0]}`;
};

export const getCustomerDetail = async ({ client, customer, setCustomerDetails }) => {
  if (!client || !customer) {
    return;
  }

  // set customer Details
  const identity = customer.data;
  const customerDetails = {
    customer,
    address1: identity?.address_1 || '',
    address2: identity?.address_2 || '',
    address3: identity?.address_3 || '',
    address4: identity?.address_4 || '',
    address5: identity?.address_5 || '',
    suburb: identity?.city || '',
    postcode: identity?.postcode || '',
    state: identity?.state || '',
    country: identity?.country || '',
    validation_customer: !!customer,
    validation_address1: !!identity?.address_1,
    validation_postcode: !!identity?.postcode,
    validation_state: !!identity?.state
  };
  setCustomerDetails(customerDetails);
};
