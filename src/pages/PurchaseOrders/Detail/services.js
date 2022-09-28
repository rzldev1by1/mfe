import React from 'react';

export const schemaColumnDetailPO = [
  {
    accessor: 'rn',
    placeholder: 'Line No',
    Header: 'Line No',
    width: 100,
    sortable: true,
    Cell: (props) => props.value || '-',
  },
  {
    accessor: 'product',
    placeholder: 'Product',
    Header: 'Product',
    width: 180,
    sortable: true,
    Cell: (props) => props.value || '-',
  },
  {
    accessor: 'product_name',
    placeholder: 'Description',
    Header: 'Description',
    width: 150,
    sortable: true,
    Cell: (props) => props.value || '-',
  },
  {
    accessor: 'quantity',
    placeholder: 'Qty',
    Header: 'Qty',
    width: 60,
    style: { justifyContent: 'flex-end', display: 'flex' },
    className: 'align-right',
    sortType: 'float',
    Cell: (props) => props.value || '-',
    textAlign: 'right',
    sortable: true,
  },
  {
    accessor: 'packdesc_1',
    placeholder: 'UOM',
    Header: 'UOM',
    width: 80,
    Cell: (props) => props.value || '-',
    headerStyle: { textAlign: 'right' },
    sortable: true,
  },
  {
    accessor: 'qty_processed',
    placeholder: 'Qty Processed',
    Header: 'Qty Processed',
    style: { justifyContent: 'flex-end', display: 'flex' },
    className: 'align-right',
    width: 130,
    sortType: 'float',
    Cell: (props) => props.value || '-',
    textAlign: 'right',
    sortable: true,
  },
  {
    accessor: 'weight',
    placeholder: 'Wght',
    Header: 'Wght',
    width: 100,
    style: { justifyContent: 'flex-end', display: 'flex' },
    className: 'align-right',
    sortType: 'float',
    Cell: (props) => props.value || '-',
    textAlign: 'right',
    sortable: true,
  },
  {
    accessor: 'weight_processed',
    placeholder: 'Wght Processed',
    Header: 'Wght Processed',
    width: 140,
    style: { justifyContent: 'flex-end', display: 'flex' },
    className: 'align-right',
    sortType: 'float',
    Cell: (props) => props.value || '-',
    textAlign: 'right',
    sortable: true,
  },
  {
    accessor: 'completed',
    placeholder: 'Completed',
    Header: 'Completed',
    width: 100,
    sortable: true,
    Cell: (row) => {
      const { original } = row
      return <i className={`${original.completed === 'Yes' ? 'iconU-checked text-success' : 'iconU-close text-danger'}`} />
    },
  },
  {
    accessor: 'released',
    placeholder: 'Released',
    Header: 'Released',
    width: 100,
    Cell: (row) => {
      const { original } = row
      return <i className={`${original.released === 'Yes' ? 'iconU-checked text-success' : 'iconU-close text-danger'}`} />
    },
  },
  {
    accessor: 'batch',
    placeholder: 'Batch',
    Header: 'Batch',
    headerStyle: { textAlign: 'left' },
    Cell: (props) => props.value || '-',
    width: 130,
    sortable: true,
  },
  {
    accessor: 'rotadate',
    placeholder: 'Rotadate',
    Header: 'Rotadate',
    Cell: (props) => props.value || '-',
    width: 130,
    sortable: true,
  },
  {
    accessor: 'ref3',
    placeholder: 'Ref3',
    Header: 'Ref3',
    Cell: (props) => props.value || '-',
    sortable: true,
  },
  {
    accessor: 'ref4',
    placeholder: 'Ref4',
    Header: 'Ref4',
    Cell: (props) => props.value || '-',
    width: 120,
    sortable: true,
  },
  {
    accessor: 'disposition',
    placeholder: 'Disposition',
    Header: 'Disposition',
    width: 120,
    Cell: (props) => props.value || '-',
    sortable: true,
  },
];

export const headerDetailRight = [
  { accessor: 'site', Header: 'Site' },
  { accessor: 'client', Header: 'Client' },
  { accessor: 'order_no', Header: 'Order No' },
  { accessor: 'order_type', Header: 'Order Type' },
  { accessor: 'isis_task', Header: 'Task' },
  { accessor: 'status', Header: 'Status' },
]

export const headerDetailCenter = [
  { accessor: 'supplier_no', Header: 'Supplier No' },
  { accessor: 'supplier_name', Header: 'Supplier Name' },
  { accessor: 'customer_order_ref', Header: 'Customer Order Ref' },
  { accessor: 'vendor_ord_ref', Header: 'Vendor Order Ref' },
]

export const headerDetailLeft = [
  { accessor: 'delivery_date', Header: 'Order Date' },
  { accessor: 'date_received', Header: 'Date Received' },
  { accessor: 'date_released', Header: 'Date Released' },
  { accessor: 'date_completed', Header: 'Date Completed' },
]

export const setExportData = async ({ dispatch, data }) => {
  await dispatch({ type: 'EXPORT_DATA', data });
};
