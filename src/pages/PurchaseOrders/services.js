import React from 'react';

// PO index
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
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? '-' : value}</span>
    },
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
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? '-' : value}</span>
    },
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
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? '-' : value}</span>
    },
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
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? '-' : value}</span>
    },
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
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? '-' : value}</span>
    },
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
      const { original } = row
      switch (original.status) {
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
      return false
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
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? '-' : value}</span>
    },
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
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? '-' : value}</span>
    },
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
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? '-' : value}</span>
    },
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
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? '-' : value}</span>
    },
    width: 150,
  },
];

// detail PO
export const schemaColumnDetailPO = [
  {
    accessor: 'rn',
    placeholder: 'Line No',
    Header: 'Line No',
    width: 100,
    sortable: true,
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? '-' : value}</span>
    },
  },
  {
    accessor: 'product',
    placeholder: 'Product',
    Header: 'Product',
    width: 180,
    sortable: true,
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? '-' : value}</span>
    },
  },
  {
    accessor: 'product_name',
    placeholder: 'Description',
    Header: 'Description',
    width: 150,
    sortable: true,
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? '-' : value}</span>
    },
  },
  {
    accessor: 'quantity',
    placeholder: 'Qty',
    Header: 'Qty',
    width: 60,
    style: { justifyContent: 'flex-end', display: 'flex' },
    className: 'align-right',
    sortType: 'float',
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? '-' : value}</span>
    },
    textAlign: 'right',
    sortable: true,
  },
  {
    accessor: 'packdesc_1',
    placeholder: 'UOM',
    Header: 'UOM',
    width: 80,
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? '-' : value}</span>
    },
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
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? '-' : value}</span>
    },
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
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? '-' : value}</span>
    },
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
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? '-' : value}</span>
    },
    textAlign: 'right',
    sortable: true,
  },
  {
    accessor: 'completed',
    placeholder: 'Completed',
    Header: 'Completed',
    width: 100,
    sortable: true,
    Cell: ({ original }) => (
      <i className={`${original.completed === 'Yes' ? 'iconU-checked text-success' : 'iconU-close text-danger'}`} />
    ),
  },
  {
    accessor: 'released',
    placeholder: 'Released',
    Header: 'Released',
    width: 100,
    Cell: ({ original }) => (
      <i className={`${original.released === 'Yes' ? 'iconU-checked text-success' : 'iconU-close text-danger'}`} />
    ),
  },
  {
    accessor: 'batch',
    placeholder: 'Batch',
    Header: 'Batch',
    headerStyle: { textAlign: 'left' },
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? '-' : value}</span>
    },
    width: 130,
    sortable: true,
  },
  {
    accessor: 'rotadate',
    placeholder: 'Rotadate',
    Header: 'Rotadate',
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? '-' : value}</span>
    },
    width: 130,
    sortable: true,
  },
  {
    accessor: 'ref3',
    placeholder: 'Ref3',
    Header: 'Ref3',
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? '-' : value}</span>
    },
    sortable: true,
  },
  {
    accessor: 'ref4',
    placeholder: 'Ref4',
    Header: 'Ref4',
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? '-' : value}</span>
    },
    width: 120,
    sortable: true,
  },
  {
    accessor: 'disposition',
    placeholder: 'Disposition',
    Header: 'Disposition',
    width: 120,
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? '-' : value}</span>
    },
    sortable: true,
  },
];

export const filterSummaryDefault = [
  { name: 'Site', accessor: 'site', hiddenFilter: false },
  { name: 'Client', accessor: 'client', hiddenFilter: false },
  { name: 'Status', accessor: 'status', hiddenFilter: false },
  { name: 'Order Type', accessor: 'orderType', hiddenFilter: false },
  { name: 'Task', accessor: 'task', hiddenFilter: false },
  { name: 'Order Date', accessor: 'deliveryDate', hiddenFilter: false },
  { name: 'Date Received', accessor: 'dateReceived', hiddenFilter: false },
  { name: 'Date Released', accessor: 'dateReleased', hiddenFilter: false },
  { name: 'Date Completed', accessor: 'dateCompleted', hiddenFilter: false },
]