import numeral from 'numeral';
import { checkOrderNo, submitPurchaseOrder } from '../../../apiService';

export const cleanOrderDetails = {
  site: null,
  orderType: null,
  supplier: null,
  customerOrderRef: null,
  client: null,
  orderNo: null,
  orderDate: null,
  vendorOrderRef: null,
  validation_site: false,
  validation_orderType: false,
  validation_client: false,
  validation_orderNo: false,
  validation_orderDate: false,
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
          }
          return d;
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
        if (integer.length >= 4) {
          const idxSepr1 = integer.slice(0, integer.length - 3);
          const idxSepr2 = integer.slice(integer.length - 3);
          number = `${idxSepr1},${idxSepr2}.${decimal}`;
        } else number = `${integer}.${decimal}`;
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
      if (number && number[0] === ',') delete number[0];
      number = number?.join('');
      return number;
    }
    numeral(newVal).format('0,0');
  } else if (name === 'qty' && newVal) numeral(newVal).format('0,0')
  return value;
};

export const cleanOrderLines = {
  product: '',
  desc: '',
  qty: '',
  weight: '',
  uom: '',
  batch: '',
  ref3: '',
  ref4: '',
  disposition: '',
  rotaDate: '',
  productDesc: '',
  validation: false,
  validation_product: false,
  validation_uom: false,
  validation_qty: false,
};

export const validation = async ({ orderDetails, orderLines, setActiveTab, setOrderLines }) => {
  // initial
  let statusValidate = true;
  const orderDetailsValidation = [
    'validation_site',
    'validation_orderType',
    'validation_client',
    'validation_orderNo',
    'validation_orderDate',
  ];
  const orderDetaillinessValidation = ['validation_product', 'validation_uom', 'validation_qty'];

  // validasi order details
  orderDetailsValidation.forEach((key) => {
    if (orderDetails[key] !== true) statusValidate = false;
  });

  // validasi orderLines
  orderLines.map((data) => {
    data.validation = true;
    orderDetaillinessValidation.forEach((key) => {
      if (data[key] !== true) statusValidate = false;
    });
    return false;
  });
  const newOrderLines = [...orderLines];
  setOrderLines(newOrderLines);

  if (orderLines.length < 1) {
    statusValidate = false;
  }

  if (statusValidate) {
    setActiveTab('review');
  } else {
    setActiveTab('details');
  }
};

export const validationOrderLines = async ({ orderLines, setOrderLines }) => {
  // initial
  let statusValidate = true;
  const orderDetaillinessValidation = ['validation_product', 'validation_uom', 'validation_qty'];

  // validasi orderLines
  orderLines.forEach((data) => {
    data.validation = true;
    orderDetaillinessValidation.forEach((key) => {
      if (data[key] !== true) statusValidate = false;
    });
  });

  // set
  const newOrderLines = [...orderLines];
  setOrderLines(newOrderLines);
  return statusValidate;
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

export const changeClient = async ({ value, orderDetails, setOrderDetails, setOrderLines }) => {
  const od = { ...orderDetails };
  // if(value || !value){
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

  setOrderLines(resetOrderLines)
  // }

  od.client = value;
  od.validation_client = !!value;
  od.supplier = null;
  setOrderDetails(od);
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
  // set data
  const newOrderLines = [...orderLines];
  newOrderLines[index][column] = val;
  newOrderLines[index][`validation_${column}`] = !!val;
  setOrderLines(newOrderLines);
};

export const productHandler = async ({ val, index, orderLines, setIsUom, setOrderLines }) => {
  // set data
  const newOrderLines = [...orderLines];
  newOrderLines[index].product = val;
  newOrderLines[index].validation_product = !!val;
  newOrderLines[index].productDesc = val?.orginLabel || '';
  newOrderLines[index].uom = '';
  newOrderLines[index].validation_uom = false;
  setOrderLines(newOrderLines);

  // get uom
  const stringUOM = val?.uom;
  if (stringUOM) {
    const uomDataArr = stringUOM.split(',');
    const uomData = uomDataArr.map((c) => ({ value: c, label: c }));
    setIsUom(uomData);
  } else {
    setIsUom([]);
  }
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

  let formatted = value;
  formatted = decimalFormatter(name, value);

  const tes = [...newOrderLine.orderLine];
  tes[i][name] = formatted;

  newOrderLine.orderLine = tes;
  setLine(newOrderLine);
};

export const numberCheck = (e) => {
  if (!/^[0-9]+$/.test(e.key)) e.preventDefault();
};

export const submit = async ({
  orderDetails,
  orderLinesData,
  user,
  setIsSubmitReturn,
  setActiveTab,
  setIsSubmitStatus,
}) => {
  const newOrderDetails = {
    site: orderDetails?.site?.value || '',
    client: orderDetails?.client?.value || '',
    orderNo: orderDetails?.orderNo || '',
    orderType: orderDetails?.orderType?.value || '',
    orderDate: orderDetails?.orderDate || '',
    customerOrderRef: orderDetails?.customerOrderRef || '',
    supplier: orderDetails?.supplier || '',
    vendorOrderRef: orderDetails?.vendorOrderRef || '',
    web_user: user.webUser,
  };
  const newOrderLines = [];
  orderLinesData.forEach((item) => {
    const tmp = {
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

  // check return
  const status = ret?.data?.status;
  const message = ret?.data?.message;
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
