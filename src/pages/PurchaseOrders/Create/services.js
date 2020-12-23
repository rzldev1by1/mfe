import axios from 'axios';
import endpoints from 'helpers/endpoints';

export const getResources = async ({ user, dispatch }) => {
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
  const orderType = { value: 'all', label: 'All' };
  orderTypeFilterData.splice(0, 0, orderType);
  let resources = { site: site, orderType: orderTypeFilterData };
  dispatch({ type: 'PO_RESOURCES', data: resources });
};

export const  addLine = ({line, setLine}) => {
  const newOrderLine = { ...line}
  if ( newOrderLine.orderLine.length < 10) {
    newOrderLine.orderLine = [...newOrderLine.orderLine, {}]
    setLine(newOrderLine)
    console.log(newOrderLine.orderLine )
  }
};

export const removeLine = ({ i, line, setLine}) => {
  const newOrderLine = { ...line}
  if ( newOrderLine.orderLine.length > 1){
  const tes  = Object.assign([], newOrderLine.orderLine);
      tes.splice(i, 1);
      newOrderLine.orderLine = tes
      setLine(newOrderLine)
      console.log(newOrderLine.orderLine )
  }
};

export const  lineChange = (i, e, line, setLine) => {
  const newOrderLine = { ...line}
  const { name, value } = e.target;

  let formatted = value;
  formatted = this.decimalFormatter(name, value);

  const tes = [...newOrderLine.orderLine];
  tes[i][name] = formatted;

  newOrderLine.orderLine = tes
  setLine(newOrderLine)
  console.log(newOrderLine.orderLine )
};