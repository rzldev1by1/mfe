import axios from 'axios';
import endpoints from 'helpers/endpoints';
import numeral from 'numeral';
import { checkOrderNo, submitPurchaseOrder } from 'apiService';
import { getUOM } from 'apiService/dropdown';

export const validation = async ({ dispatch, data, setActiveTab }) => {
  //initial
  let statusValidate = true;
  const { orderDetails, orderLinesData } = data;

  //validate Order Details
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
  orderLinesData.map((item, index) => {
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

  if (orderLinesData.length < 1) {
    statusValidate = false;
  }

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

  const orderLines = {
    product: { required: true, text: 'Product' },
    desc: { required: false, text: 'Desc' },
    qty: { required: true, text: 'Qty' },
    weight: { required: false, text: 'Weight' },
    uom: { required: true, text: 'UOM' },
    batch: { required: false, text: 'Batch' },
    ref3: { required: false, text: 'Ref3' },
    ref4: { required: false, text: 'Ref4' },
    disposition: { required: false, text: 'Disposition' },
    rotaDate: { required: false, text: 'Rotadate' },
  };

  const orderLinesData = [
    {
      product: null,
      desc: null,
      qty: null,
      weight: null,
      uom: null,
      batch: null,
      ref3: null,
      ref4: null,
      disposition: null,
      rotaDate: null,
    },
  ];

  dispatch({ type: 'RESET_ORDER_DETAIL', data: orderDetails });
  dispatch({ type: 'RESET_ORDER_LINES', data: orderLines });
  dispatch({ type: 'RESET_ORDER_LINES_DATA', data: orderLinesData });
};

export const changeOrderDetails = ({ column, value, dispatch }) => {
  dispatch({ type: 'SET_ORDER_DETAIL', data: value, column });
};

export const changeOrderNo = async ({ orderNo, client, setCheckingOrderNo, dispatch }) => {
  if (!client) {
    setCheckingOrderNo({ status: false, message: 'Please select client' });
    return;
  }

  if (orderNo && orderNo.length < 4) {
    setCheckingOrderNo({ status: false, message: 'Order No must have min 4 characters' });
    return;
  } else {
    setCheckingOrderNo({ status: true, message: '' });
  }

  let ret = await checkOrderNo({ client, orderNo, module: 'purchase-orders' });
  if (ret.status) {
    changeOrderDetails({ column: 'orderNo', value: orderNo, dispatch });
  } else {
    setCheckingOrderNo({ status: ret.status, message: ret.message });
  }
};

export const changeOrderLines = ({ val, column, index, dispatch }) => {
  //use formatter

  //set redux
  let tmp_column = { column: column, index: index };
  dispatch({ type: 'SET_ORDER_LINES_DATA', data: val, column: tmp_column });
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

export const submit = async ({ data, user, setIsSubmitReturn, setActiveTab, setIsSubmitStatus }) => {
  const { orderDetails, orderLinesData } = data;
  let newOrderDetails = {
    site: orderDetails?.site?.value?.value || '',
    client: orderDetails?.client?.value?.value || '',
    orderNo: orderDetails?.orderNo?.value || '',
    orderType: orderDetails?.orderType?.value?.value || '',
    orderDate: orderDetails?.orderDate?.value || '',
    web_user: user.webUser,
  };
  let newOrderLines = [];
  orderLinesData.map((item, index) => {
    let tmp = {
      product: item?.product?.value || '',
      qty: item?.qty || '',
      uom: item?.uom?.value || '',
      ref3: item?.ref3 || '',
      ref4: item?.ref4 || '',
      rotaDate: item?.rotaDate || '',
      disposition: item?.disposition?.value || '',
      batch: item?.batch || '',
      weight: item?.weight || '',
    };
    newOrderLines.push(tmp);
  });

  const ret = await submitPurchaseOrder({ orderDetail: newOrderDetails, lineDetails: newOrderLines });

  //check return
  let status = ret?.status;
  let message = ret?.data?.message;
  let submitReturn = { status: status, message: message, orderNo: data?.orderDetails?.orderNo?.value };
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
