/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

export const schemaColumn = [
  {
    Header: 'PO No.',
    placeholder: 'PO No.',
    accessor: 'order_no',
    headerStyle: { textAlign: 'left', paddingLeft: '8px' },
    style: { textAlign: 'left', paddingLeft: '15px' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    width: 150,
  },
  {
    Header: 'PO Date',
    placeholder: 'PO Date',
    accessor: 'po_date',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    width: 100,
  },
  {
    Header: 'Total No. Of Lines',
    placeholder: 'Total No. Of Lines',
    accessor: 'total_line',
    className:'align-right',
    headerStyle: { textAlign: 'right' },
    style: { textAlign: 'right', paddingLeft: '15px', justifyContent: 'flex-end', display: 'flex' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    Cell: (props) => <span>{props.value ? props.value : '-'}</span>,
    width: 200,
  },
  {
    Header: 'Total Order Qty',
    placeholder: 'Total Order Qty',
    accessor: 'total_order',
    className:'align-right',
    headerStyle: { textAlign: 'right' },
    style: { textAlign: 'right', paddingLeft: '15px', justifyContent: 'flex-end', display: 'flex' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    Cell: (props) => <span>{props.value ? props.value : '-'}</span>,
    width: 200,
  },
  {
    Header: 'Total Qty Shipped',
    placeholder: 'Total Qty Shipped',
    accessor: 'total_shipped',
    className: 'align-right',
    headerStyle: { textAlign: 'right' },
    style: { textAlign: 'right', paddingLeft: '15px', justifyContent: 'flex-end', display: 'flex' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    Cell: (props) => <span>{props.value ? props.value : '-'}</span>,
    width: 160,
  },
  {
    Header: 'Total Printed Qty',
    placeholder: 'Total Printed Qty',
    accessor: 'total_printed_qty',
    className: 'align-right',
    headerStyle: { textAlign: 'right' },
    style: { textAlign: 'right', paddingLeft: '15px', justifyContent: 'flex-end', display: 'flex' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    Cell: (props) => <span>{props.value ? props.value : '-'}</span>,
    width: 160,
  },
  {
    Header: 'Total Printed Cartons',
    placeholder: 'Total Printed Cartons',
    accessor: 'total_printed_cartons',
    className: 'align-right',
    headerStyle: { textAlign: 'right' },
    style: { textAlign: 'right', paddingLeft: '15px', justifyContent: 'flex-end', display: 'flex' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    Cell: (props) => <span>{props.value ? props.value : '-'}</span>,
    width: 160,
  },
];