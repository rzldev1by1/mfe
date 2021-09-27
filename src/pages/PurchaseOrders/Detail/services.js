/* eslint-disable consistent-return */
import React from 'react';
// https://github.com/tannerlinsley/react-table/issues/94

// const getColumnWidth = (data, accessor, headerText) => {
//   if (typeof accessor === 'string' || accessor instanceof String) {
//     accessor = d => d[accessor]; // eslint-disable-line no-param-reassign
//   }
//   const maxWidth = 600;
//   const magicSpacing = 10;
//   const cellLength = Math.max(
//     ...data.map(row => (`${accessor(row)}` || '').length),
//     headerText.length,
//   );
//   return Math.min(maxWidth, cellLength * magicSpacing);
// };

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
    Cell: (row) => (
      <span className={`${row.original.completed === 'Yes' ? 'iconU-checked text-success' : 'icon-group_4696 text-danger'}`} />
    ),
  },
  {
    accessor: 'released',
    placeholder: 'Released',
    Header: 'Released',
    width: 100,
    Cell: (row) => (
      <span className={`${row.original.released === 'Yes' ? 'iconU-checked text-success' : 'icon-group_4696 text-danger'}`} />
    ),
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

export const setExportData = async ({ dispatch, data }) => {
  await dispatch({ type: 'EXPORT_DATA', data });
};

export const siteCheck = ({ val, site }) => {
  let ret = null;
  site.map((data) => {
    if (data?.value !== val) {
      return 0;
    }
    ret = data.label;
  });
  return ret;
};

export const clientCheck = ({ val, client }) => {
  let ret = null;
  client.map((data) => {
    if (data?.value !== val) {
      return 0;
    }
    ret = data.label;
  });
  return ret;
};
