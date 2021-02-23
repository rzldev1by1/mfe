import axios from 'axios';
import endpoints from 'helpers/endpoints';
import numeral from 'numeral';
import { checkOrderNo, submitSalesOrder } from 'apiService';
import { getUOM } from 'apiService/dropdown';

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
  let od = { ...orderDetails };
  od[column] = value;
  od['validation_' + column] = value ? true : false;
  setOrderDetails(od);
  console.log(od);
};

export const changeClient = ({
  value,
  orderDetails,
  setOrderDetails,
  setCustomerData,
  customerDetails,
  setCustomerDetails,
}) => {
  let od = { ...orderDetails };
  od['client'] = value;
  od['validation_client'] = value ? true : false;
  setOrderDetails(od);

  let cd = { ...customerDetails };
  cd['customer'] = '';
  cd['validation_customer'] = false;
  setCustomerDetails(od);
};

export const changeCustomerDetails = ({ column, value, customerDetails, setCustomerDetails }) => {
  let cd = { ...customerDetails };
  cd[column] = value;
  cd['validation_' + column] = value ? true : false;
  setCustomerDetails(cd);
  console.log(cd);
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
  let ret = await checkOrderNo({ client, orderNo, module: 'purchase-orders' });

  let val = document.getElementById('orderNo').value;
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

export const changeOrderLines = ({ val, column, index, dispatch }) => {
  //set redux
  let tmp_column = { column, index };
  dispatch({ type: 'SET_ORDER_LINES_DATA', data: val, column: tmp_column });
};

export const addOrderLines = ({ dispatch }) => {
  const orderLines = {
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
  };
  dispatch({ type: 'ADD_ORDER_LINES_DATA', data: orderLines });
};

export const deleteOrderLines = ({ index, dispatch }) => {
  dispatch({ type: 'DELETE_ORDER_LINES_DATA', data: index });
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

  let formatted = value;
  formatted = this.decimalFormatter(name, value);

  const tes = [...newOrderLine.orderLine];
  tes[i][name] = formatted;

  newOrderLine.orderLine = tes;
  setLine(newOrderLine);
};

export const productHandler = async ({ val, column, index, dispatch, orderDetails, setIsUom }) => {
  //set redux
  let tmp_column = { column: column, index: index };
  dispatch({ type: 'SET_ORDER_LINES_DATA', data: val, column: tmp_column });

  //get uom
  const stringUOM = val?.data?.uom;
  if (stringUOM) {
    const uomDataArr = stringUOM.split(',');
    const uomData = uomDataArr.map((c, i) => ({ value: c, label: c }));
    setIsUom(uomData);
  } else {
    setIsUom([]);
  }
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

export const validation = async ({ data, setActiveTab }) => {
  //initial
  let statusValidate = true;
  const { orderDetails, customerDetails, orderLinesData } = data;

  //validate Order Details
  for (var key in orderDetails) {
    if (!orderDetails[key]['required']) {
      continue;
    }
    let values = orderDetails[key]['value'];
    if (key === 'orderNo') {
      if (values && values.length < 4) {
        statusValidate = false;
      }
    }

    if (!values) {
      statusValidate = false;
    }
  }

  //validate customer Details
  for (var key in customerDetails) {
    if (!customerDetails[key]['required']) {
      continue;
    }
    let values = customerDetails[key]['value'];
    if (!values) {
      statusValidate = false;
    }
  }

  //validate orderlines
  let tmp = orderLinesData?.map((item, index) => {
    if (!item.qty || item.qty < 1) {
      statusValidate = false;
    }
    if (!item.uom) {
      statusValidate = false;
    }
    if (!item.product) {
      statusValidate = false;
    }
  });

  if (statusValidate) {
    setActiveTab('review');
  } else {
    setActiveTab('details');
  }
};

export const submit = async ({ data, user, setIsSubmitReturn, setActiveTab, setIsSubmitStatus }) => {
  const { orderDetails, customerDetails, orderLinesData } = data;
  let header = {
    site: orderDetails?.site?.value?.value || '',
    client: orderDetails?.client?.value?.value || '',
    orderId: orderDetails?.orderNo?.value || '',
    orderType: orderDetails?.orderType?.value?.value || '',
    deliveryDate: orderDetails?.deliveryDate?.value || '',
    deliveryInstruction: orderDetails?.deliveryInstructions?.value || '',
    vendorOrderRef: orderDetails?.vendorOrderRef?.value || '',
    customerOrderRef: orderDetails?.customerOrderRef?.value || '',
    web_user: user.webUser,
    customer: customerDetails?.customer?.value || '',
    shipToAddress1: customerDetails?.address1?.value || '',
    shipToAddress2: customerDetails?.address2?.value || '',
    shipToAddress3: customerDetails?.address3?.value || '',
    shipToAddress4: customerDetails?.address4?.value || '',
    shipToAddress5: customerDetails?.address5?.value || '',
    city: customerDetails?.city?.value || '',
    country: customerDetails?.country?.value || '',
    postCode: customerDetails?.postCode?.value || '',
    state: customerDetails?.state?.value || '',
  };

  let newOrderLines = [];
  orderLinesData.map((item, index) => {
    let tmp = {
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

  //check return
  let status = ret?.data?.status;
  let message = ret?.data;
  let submitReturn = { status: status, message: message, orderNo: orderDetails?.orderNo?.value };
  await setIsSubmitReturn(submitReturn);

  await setActiveTab('message');
  setIsSubmitStatus('done');
};

export const formatDate = (dateStr) => {
  if (!dateStr) {
    return null;
  }

  let dArr = dateStr.split('-');
  return dArr[2] + '/' + dArr[1] + '/' + dArr[0];
};

export const getCustomerDetail = async ({ client, customer, setCustomerDetails }) => {
  if (!client || !customer) {
    return;
  }

  // set customer Details
  const identity = customer.data;
  let customerDetails = {
    customer: customer,
    address1: identity?.address_1 || '',
    address2: identity?.address_2 || '',
    address3: identity?.address_3 || '',
    address4: identity?.address_4 || '',
    address5: identity?.address_5 || '',
    suburb: identity?.city || '',
    postcode: identity?.postcode || '',
    state: identity?.state || '',
    country: identity?.country || '',
  };
  setCustomerDetails(customerDetails);
};
