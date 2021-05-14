import React from 'react';
import moment from 'moment';

export const formatDate = (date) => {
  if (date) {
    return moment(date).format('DD/MM/YYYY') || false;
  }
};

export const schemaColumnDetailSP = [
  {
    accessor: 'line',
    placeholder: 'Line No',
    Header: 'Line No',
    width: 100,
    Cell: (props) => props.value || '-',
  },
  {
    accessor: 'style',
    placeholder: 'Style',
    Header: 'Style',
    width: 180,
    Cell: (props) => props.value || '-',
  },
  {
    accessor: 'style_desc',
    placeholder: 'Style Desc.',
    Header: 'Style Desc.',
    width: 150,
    Cell: (props) => props.value || '-',
  },
  {
    accessor: 'color',
    placeholder: 'Color',
    Header: 'Color',
    width: 60,
    Cell: (props) => props.value || '-',
  },
  {
    accessor: 'dimension',
    placeholder: 'Dimension',
    Header: 'Dimension',
    width: 80,
    Cell: (props) => props.value || '-',
    headerStyle: { textAlign: 'right' },
  },
  {
    accessor: 'size',
    placeholder: 'Size',
    Header: 'Size',
    style: { justifyContent: 'flex-end', display: 'flex' },
    className: 'align-right',
    width: 130,
    sortType: 'float',
    Cell: (props) => props.value || '-',
    textAlign: "right"
  },
  {
    accessor: 'carton_qty',
    placeholder: 'Carton Qty',
    Header: 'Carton Qty',
    width: 100,
    style: { justifyContent: 'flex-end', display: 'flex' },
    className: 'align-right',
    sortType: 'float',
    Cell: (props) => props.value || '-',
    textAlign: "right"
  },
  {
    accessor: 'order_qty',
    placeholder: 'Order Qty',
    Header: 'Order Qty',
    width: 140,
    style: { justifyContent: 'flex-end', display: 'flex' },
    className: 'align-right',
    sortType: 'float',
    Cell: (props) => props.value || '-',
    textAlign: "right"
  },
  {
    accessor: 'no_of_carton',
    placeholder: 'No. of Carton',
    Header: 'No. of Carton',
    width: 100,
    Cell: (props) => props.value || '-',
  },
  {
    accessor: 'printed_qty',
    placeholder: 'Printed Qty',
    Header: 'Printed Qty',
    width: 100,
    Cell: (props) => props.value || '-',
  },
  {
    accessor: 'printed_cartons',
    placeholder: 'Printed Cartons',
    Header: 'Printed Cartons',
    width: 100,
    Cell: (row) => (
      <i className={`${row.original.released === 'Y' ? 'iconU-checked text-success' : 'iconU-close text-danger'}`} />
    ),
  },
  {
    accessor: 'edit_qty',
    placeholder: 'Edit Qty',
    Header: 'Edit Qty',
    width: 350,
    headerStyle: { textAlign: 'left' },
    Cell: (props) => props.value || '-',
  },
  {
    accessor: 'edit_cartons',
    placeholder: 'Edit Cartons',
    Header: 'Edit Cartons',
    width: 100,
    Cell: (props) => formatDate(props.value) || '-',
  },
];
