import React from 'react';
export const schemaColumnDetailPO = [
  {
    accessor: 'line',
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
    accessor: 'product_description',
    placeholder: 'Description',
    Header: 'Description',
    width: 150,
    sortable: true,
    Cell: (props) => props.value || '-',
  },
  {
    accessor: 'qty',
    placeholder: 'Qty',
    Header: 'Qty',
    width: 60,
    style: { justifyContent: 'flex-end', display: 'flex' },
    className: 'align-right',
    sortType: 'float',
    sortable: true,
    Cell: (props) => props.value || '-',
    textAlign: "right"
  },
  {
    accessor: 'uom',
    placeholder: 'UOM',
    Header: 'UOM',
    width: 80,
    sortable: true,
    Cell: (props) => props.value || '-',
    headerStyle: { textAlign: 'right' },
  },
  {
    accessor: 'qty_processed',
    placeholder: 'Qty Processed',
    Header: 'Qty Processed',
    style: { justifyContent: 'flex-end', display: 'flex' },
    className: 'align-right',
    width: 130,
    sortable: true,
    sortType: 'float',
    Cell: (props) => props.value || '-',
    textAlign: "right"
  },
  {
    accessor: 'weight',
    placeholder: 'Wght',
    Header: 'Wght',
    width: 100,
    style: { justifyContent: 'flex-end', display: 'flex' },
    className: 'align-right',
    sortType: 'float',
    sortable: true,
    Cell: (props) => props.value || '-',
    textAlign: "right"
  },
  {
    accessor: 'weight_processed',
    placeholder: 'Wght Processed',
    Header: 'Wght Processed',
    width: 140,
    style: { justifyContent: 'flex-end', display: 'flex' },
    className: 'align-right',
    sortType: 'float',
    sortable: true,
    Cell: (props) => props.value || '-',
    textAlign: "right"
  },
  {
    accessor: 'completed',
    placeholder: 'Completed',
    Header: 'Completed',
    width: 100,
    sortable: true,
    Cell: (row) => (
      <i className={`${row.original.completed === 'Y' ? 'ri-check-line text-success' : 'icon-group_4696 text-danger'}`} />
    ),
  },
  {
    accessor: 'oos',
    placeholder: 'OOS',
    Header: 'OOS',
    width: 100,
    sortable: true,
    Cell: (row) => (
      <i className={`${row.original.released === 'Y' ? 'ri-check-line text-success' : 'icon-group_4696 text-danger'}`} />
    ),
  },
  {
    accessor: 'released',
    placeholder: 'Released',
    Header: 'Released',
    width: 100,
    sortable: true,
    Cell: (row) => (
      <i className={`${row.original.released === 'Y' ? 'ri-check-line text-success' : 'icon-group_4696 text-danger'}`} />
    ),
  },
  {
    accessor: 'batch',
    placeholder: 'Batch',
    Header: 'Batch',
    width: 350,
    sortable: true,
    headerStyle: { textAlign: 'left' },
    Cell: (props) => props.value || '-',
  },
  {
    accessor: 'rotadate',
    placeholder: 'Rotadate',
    Header: 'Rotadate',
    width: 350,
    sortable: true,
    headerStyle: { textAlign: 'left' },
    Cell: (props) => props.value || '-',
  },
  {
    accessor: 'ref3',
    placeholder: 'Ref3',
    Header: 'Ref3',
    width: 350,
    sortable: true,
    Cell: (props) => props.value || '-',
  },
  {
    accessor: 'ref4',
    placeholder: 'Ref4',
    Header: 'Ref4',
    width: 350,
    sortable: true,
    Cell: (props) => props.value || '-',
  },
  {
    accessor: 'disposition',
    placeholder: 'Disposition',
    Header: 'Disposition',
    width: 200,
    sortable: true,
    Cell: (props) => props.value || '-',
  },
  {
    accessor: 'pack_id',
    placeholder: 'Pack ID',
    Header: 'Pack ID',
    width: 200,
    sortable: true,
    Cell: (props) => props.value || '-',
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
    ret = data.label
  })
  return ret;
}

export const clientCheck = ({ val, client }) => {
  let ret = null;
  client.map((data) => {
    if (data?.value !== val) {
      return 0;
    }
    ret = data.label
  })
  return ret;
};
