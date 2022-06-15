import { formatDate } from 'apiService';
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
    width: 80,
  },
  {
    Header: 'Client',
    placeholder: 'Client',
    accessor: 'client',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    width: 80,
  },
  {
    Header: 'Order No',
    placeholder: 'Order No',
    accessor: 'order_no',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    Cell: (props) => <span>{props.value ? props.value : '-'}</span>,
    width: 130,
  },
  {
    Header: 'Order Type',
    placeholder: 'Order Type',
    accessor: 'order_type',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    Cell: (props) => <span>{props.value ? props.value : '-'}</span>,
    width: 130,
  },
  {
    Header: 'Task',
    placeholder: 'Task',
    accessor: 'isis_task',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    Cell: (props) => <span>{props.value ? props.value : '-'}</span>,
    width: 100,
  },
  {
    Header: 'Supplier No',
    placeholder: 'Supplier No',
    accessor: 'supplier_no',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    Cell: (props) => <span>{props.value ? props.value : '-'}</span>,
    width: 130,
  },
  {
    Header: 'Supplier Name',
    placeholder: 'Supplier Name',
    accessor: 'supplier_name',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    Cell: (props) => <span>{props.value ? props.value : '-'}</span>,
    width: 200,
  },
  {
    Header: 'Status',
    placeholder: 'Status',
    accessor: 'status',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    width: 130,
    Cell: (row) => {
      switch (row.original.status) {
        case '0: Not Available':
          return <div className="status-unavailable">UNAVAILABLE</div>;
        case '1: Available':
          return <div className="status-available">AVAILABLE</div>;
        case '2: Released':
          return <div className="status-Release">RELEASED</div>;
        case '3: Part Released':
          return <div className="status-partRelease">PART RELEASED</div>;
        case '4: Completed':
          return <div className="status-complete">COMPLETED</div>;
        case 'All Open':
          return <div className="status-ok">ALL OPEN</div>;
        default:
          break;
      }
    },
  },
  {
    Header: 'Order Date',
    placeholder: 'Order Date',
    accessor: 'delivery_date',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    Cell: (props) => <span>{props.value ? formatDate(props.value) : '-'}</span>,
    width: 130,
  },
  {
    Header: 'Date Received',
    placeholder: 'Date Received',
    accessor: 'date_received',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    Cell: (props) => <span>{props.value ? formatDate(props.value) : '-'}</span>,
    width: 130,
  },
  {
    Header: 'Date Released',
    placeholder: 'Date Released',
    accessor: 'date_released',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    Cell: (props) => <span>{props.value ? formatDate(props.value) : '-'}</span>,
    width: 130,
  },
  {
    Header: 'Date Completed',
    placeholder: 'Date Completed',
    accessor: 'date_completed',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    Cell: (props) => <span>{props.value ? formatDate(props.value) : '-'}</span>,
    width: 150,
  },
];
