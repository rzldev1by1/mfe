/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/destructuring-assignment */
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
    Cell: (props) => <span>{props.value ? props.value : '-'}</span>,
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
    Cell: (props) => <span>{props.value ? props.value : '-'}</span>,
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
    Cell: (props) => <span>{props.value ? props.value : '-'}</span>,
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
      switch (row.original.status) {
        case 'OK':
          return (
            <a id="OK" className="status-ok">
              OK
            </a>
          );
        case 'SHORTAGE':
          return (
            <a id="SHORTAGE" className="status-shortage">
              SHORTAGE
            </a>
          );
        default:
          break;
      }
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
    Cell: (props) => <span>{props.value ? props.value : '-'}</span>,
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
    Cell: (props) => <span>{props.value ? props.value : '-'}</span>,
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
    Cell: (props) => <span>{props.value ? props.value : '-'}</span>,
    width: 140,
  },
  {
    Header: 'Expected Out Wght',
    placeholder: 'Expected Out Wght',
    accessor: 'expected_in_wgt',
    className: 'align-right',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px', justifyContent: 'flex-end', display: 'flex' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    Cell: (props) => <span>{props.value ? props.value : '-'}</span>,
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
    Cell: (props) => <span>{props.value ? props.value : '-'}</span>,
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
    Cell: (props) => <span>{props.value ? props.value : '-'}</span>,
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
    Cell: (props) => <span>{props.value ? props.value : '-'}</span>,
    width: 80,
  },
];

export const statusDataSH = [
  { value: 'all', label: 'All Status' },
  { value: 'ok', label: 'Ok' },
  { value: 'shortage', label: 'Shortage' },
];
