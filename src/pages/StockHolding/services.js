import React from 'react';

export const schemaColumn = [
  {
    Header: 'Site',
    placeholder: 'Site',
    accessor: 'site',
    headerStyle: { textAlign: 'left', paddingLeft: '8px' },
    style: { textAlign: 'left', paddingLeft: '15px' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    width: 100,
  },
  {
    Header: 'Client',
    placeholder: 'Client',
    accessor: 'client',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    width: 100,
  },
  {
    Header: 'Product',
    placeholder: 'Product',
    accessor: 'product',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    Cell: (props) => {
      const { value } = props
      return <span>{value || '-'}</span>
    },
    width: 100,
  },
  {
    Header: 'Description',
    placeholder: 'Description',
    accessor: 'product_name',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    Cell: (props) => {
      const { value } = props
      return <span>{value || '-'}</span>
    },
    width: 200,
  },
  {
    Header: 'UOM',
    placeholder: 'UOM',
    accessor: 'packdesc_1',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    Cell: (props) => {
      const { value } = props
      return <span>{value || '-'}</span>
    },
    width: 100,
  },
  {
    Header: 'Status',
    placeholder: 'Status',
    accessor: 'status',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    width: 100,
    Cell: (row) => {
      const { original } = row
      switch (original.status) {
        case 'OK':
          return (
            <span id="OK" className="status-ok">
              OK
            </span>
          );
        case 'SHORTAGE':
          return (
            <span id="SHORTAGE" className="status-shortage">
              SHORTAGE
            </span>
          );
        default:
          break;
      }
      return false
    },
  },
  {
    Header: 'Pickable Stock On Hand',
    placeholder: 'Pickable Stock On Hand',
    accessor: 'on_hand_qty',
    className: 'align-right',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px', justifyContent: 'flex-end', display: 'flex' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    textAlign: 'right',
    Cell: (props) => {
      const { value } = props
      return <span>{value || '-'}</span>
    },
    width: 190,
  },
  {
    Header: 'On Hand Wght',
    placeholder: 'On Hand Wght',
    accessor: 'weight',
    className: 'align-right',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px', justifyContent: 'flex-end', display: 'flex' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    textAlign: 'right',
    Cell: (props) => {
      const { value } = props
      return <span>{value || '-'}</span>
    },
    width: 130,
  },
  {
    Header: 'Expected In Qty',
    placeholder: 'Expected In Qty',
    accessor: 'expected_in_qty',
    className: 'align-right',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px', justifyContent: 'flex-end', display: 'flex' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    textAlign: 'right',
    Cell: (props) => {
      const { value } = props
      return <span>{value || '-'}</span>
    },
    width: 140,
  },
  {
    Header: 'Expected In Wght',
    placeholder: 'Expected In Wght',
    accessor: 'expected_in_wgt',
    className: 'align-right',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px', justifyContent: 'flex-end', display: 'flex' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    textAlign: 'right',
    Cell: (props) => {
      const { value } = props
      return <span>{value || '-'}</span>
    },
    width: 140,
  },
  {
    Header: 'Expected Out Qty',
    placeholder: 'Expected Out Qty',
    accessor: 'expected_out_qty',
    className: 'align-right',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px', justifyContent: 'flex-end', display: 'flex' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    textAlign: 'right',
    Cell: (props) => {
      const { value } = props
      return <span>{value || '-'}</span>
    },
    width: 152,
  },
  {
    Header: 'Price',
    placeholder: 'Price',
    accessor: 'price',
    className: 'align-right',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px', justifyContent: 'flex-end', display: 'flex' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    textAlign: 'right',
    Cell: (props) => {
      const { value } = props
      return <span>{value || '-'}</span>
    },
    width: 70,
  },
  {
    Header: 'Pallets',
    placeholder: 'Pallets',
    accessor: 'pallets',
    className: 'align-right',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px', justifyContent: 'flex-end', display: 'flex' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    textAlign: 'right',
    Cell: (props) => {
      const { value } = props
      return <span>{value || '-'}</span>
    },
    width: 80,
  },
];

export const statusDataSH = [
  { value: 'all', label: 'All Status' },
  { value: 'ok', label: 'Ok' },
  { value: 'shortage', label: 'Shortage' },
];

export const schemaColumnDetailPO = [
  {
    accessor: 'batch',
    placeholder: 'Batch',
    Header: 'Batch',
    width: 200,
    sortable: true,
    Cell: (props) => {
      const { value } = props
      return <span>{value || '-'}</span>
    },
  },
  {
    accessor: 'rotadate',
    placeholder: 'Rotadate',
    Header: 'Rotadate',
    sortable: true,
    width: 100,
    style: { textAlign: 'left' },
    Cell: (props) => {
      const { value } = props
      return <span>{value || '-'}</span>
    },
  },
  {
    accessor: 'ref3',
    placeholder: 'Ref3',
    Header: 'Ref3',
    sortable: true,
    width: 100,
    Cell: (props) => {
      const { value } = props
      return <span>{value || '-'}</span>
    },
  },
  {
    accessor: 'ref4',
    placeholder: 'Ref4',
    Header: 'Ref4',
    sortable: true,
    width: 100,
    Cell: (props) => {
      const { value } = props
      return <span>{value || '-'}</span>
    },
  },
  {
    accessor: 'disposition',
    placeholder: 'Disposition',
    Header: 'Disposition',
    sortable: true,
    width: 100,
    sortType: 'float',
    Cell: (props) => {
      const { value } = props
      return <span>{value || '-'}</span>
    },
  },
  {
    accessor: 'qty',
    placeholder: 'QTY',
    Header: 'Qty',
    className: 'align-right',
    width: 60,
    sortable: true,
    Cell: (props) => {
      const { value } = props
      return <span>{value || '-'}</span>
    },
    headerStyle: { textAlign: 'right' },
    textAlign: "right"
  },
  {
    accessor: 'weight',
    placeholder: 'Wght',
    Header: 'Wght',
    className: 'align-right',
    width: 80,
    sortable: true,
    sortType: 'float',
    Cell: (props) => {
      const { value } = props
      return <span>{value || '-'}</span>
    },
    textAlign: "right"
  },
  {
    accessor: 'pallet',
    placeholder: 'Pallet',
    Header: 'Pallet',
    width: 70,
    sortable: true,
    className: 'align-right',
    sortType: 'float',
    Cell: (props) => {
      const { value } = props
      return <span>{value || '-'}</span>
    },
    textAlign: "right"
  },
  {
    accessor: 'price',
    placeholder: 'Prince',
    Header: 'Price',
    width: 70,
    sortable: true,
    className: 'align-right',
    sortType: 'float',
    Cell: (props) => {
      const { value } = props
      return <span>{value || '-'}</span>
    },
    textAlign: "right"
  },
  {
    accessor: 'pack_id',
    placeholder: 'Pack ID',
    Header: 'Pack ID',
    sortable: true,
    width: 170,
    headerStyle: { textAlign: 'left' },
    sortType: 'float',
    Cell: (props) => {
      const { value } = props
      return <span>{value || '-'}</span>
    },
  },
];


export const schameColumnForesCast = [
  {
    accessor: 'customerID',
    placeholder: 'Customer No',
    Header: 'Customer No',
    sortable: false,
    width: 400,
  },
  { accessor: 'orderNo', placeholder: 'Order No', Header: 'Order No', sortable: false, width: 170 },
  {
    accessor: 'orderDate',
    placeholder: 'Order Date',
    Header: 'Order Date',
    sortable: false,
    width: 150,
    Cell: (props) => props.value || '-',
  },
  {
    accessor: 'in',
    Cell: (row) => {
      const { value } = row
      return value === '-' ? <div className="alg-right">-</div> : value
    },
    placeholder: 'Expected In',
    Header: 'Expected In',
    className: 'align-right',
    sortable: false,
    width: 150,
    textAlign: "right"
  },
  {
    accessor: 'out',
    Cell: (row) => {
      const { value } = row
      return value === '-' ? <div className="alg-right">-</div> : value
    },
    placeholder: 'Expected Out',
    Header: 'Expected Out',
    className: 'align-right',
    sortable: false,
    width: 150,
    textAlign: "right"
  },
  {
    accessor: 'balance',
    Cell: (row) => {
      const { value } = row
      return value === '-' ? <div className="alg-right">-</div> : value
    },
    placeholder: 'Balance',
    Header: 'Balance',
    className: 'align-right',
    sortable: false,
    width: 140,
    textAlign: "right"
  },
]

export const setExportData = async ({ dispatch, data }) => {
  await dispatch({ type: 'EXPORT_DATA', data });
};

export const headerDetailCenter = [
  { accessor: 'site', Header: 'Site' },
  { accessor: 'client', Header: 'Client' },
  { accessor: 'product', Header: 'Product' },
  { accessor: 'description', Header: 'Description' },
  { accessor: 'uom', Header: 'UOM' },
]

export const headerDetailLeft = [
  { accessor: 'stock_on_hand', Header: 'Pickable Stock On Hand' },
  { accessor: 'projected_available_qty', Header: 'Projected Available Qty' },
  { accessor: 'expected_in_qty', Header: 'Expected In Qty' },
  { accessor: 'expected_out_qty', Header: 'Expected Out Qty' },
  { accessor: 'rotadate_type', Header: 'Rotadate Type' },
]

export const filterSummaryDefault = [
  { name: 'Site', accessor: 'site', hiddenFilter: false },
  { name: 'Client', accessor: 'client', hiddenFilter: false },
  { name: 'status', accessor: 'status', hiddenFilter: false },
]
