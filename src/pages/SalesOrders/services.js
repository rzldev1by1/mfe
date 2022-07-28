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
  },
  {
    Header: 'Client',
    placeholder: 'Client',
    accessor: 'client',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    width: 130,
  },
  {
    Header: 'Order No',
    placeholder: 'Order No',
    accessor: 'orderno',
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
    accessor: 'ordertype',
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
    accessor: 'isistask',
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
    Header: 'Customer No',
    placeholder: 'Customer No',
    accessor: 'customer',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? '-' : value}</span>
    },
    width: 125,
  },
  {
    Header: 'Customer Name',
    placeholder: 'Customer Name',
    accessor: 'customername',
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
    Header: 'Delivery Date',
    placeholder: 'Delivery Date',
    accessor: 'deliverydate',
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
    accessor: 'datereceived',
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
    accessor: 'datereleased',
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
    accessor: 'datecompleted',
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
  {
    Header: 'Customer Order Ref',
    placeholder: 'Customer Order Ref',
    accessor: 'customerpono',
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
  {
    Header: 'Vendor Order Ref',
    placeholder: 'Vendor Order Ref',
    accessor: 'vendororderno',
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
  {
    Header: 'Address1',
    placeholder: 'Address1',
    accessor: 'address1',
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
    Header: 'Address2',
    placeholder: 'Address2',
    accessor: 'address2',
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
    Header: 'Address3',
    placeholder: 'Address3',
    accessor: 'address3',
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
    Header: 'Address4',
    placeholder: 'Address4',
    accessor: 'address4',
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
    Header: 'Address5',
    placeholder: 'Address5',
    accessor: 'address5',
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
    Header: 'Ship To Name',
    placeholder: 'Ship To Name',
    accessor: 'ship_to_name',
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
    Header: 'Suburb',
    placeholder: 'Suburb',
    accessor: 'suburb',
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
    Header: 'Postcode',
    placeholder: 'Postcode',
    accessor: 'postcode',
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
    Header: 'State',
    placeholder: 'State',
    accessor: 'state',
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
  {
    Header: 'Country',
    placeholder: 'Country',
    accessor: 'country',
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
    Header: 'Load Number',
    placeholder: 'Load Number',
    accessor: 'loadnumber',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px', justifyContent: 'flex-end', display: 'flex' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? '-' : value}</span>
    },
    width: 140,
  },
  {
    Header: 'Loadout Start',
    placeholder: 'Loadout Start',
    accessor: 'loadoutstart',
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
    Header: 'Loadout Finish',
    placeholder: 'Loadout Finish',
    accessor: 'loadoutfinish',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? '-' : value}</span>
    },
    width: 140,
  },
  {
    Header: 'Consignment No',
    placeholder: 'Consignment No',
    accessor: 'consignmentno',
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
  {
    Header: 'Freight Charge',
    placeholder: 'Freight Charge',
    accessor: 'freightcharge',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px', justifyContent: 'flex-end', display: 'flex' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? '-' : value}</span>
    },
    width: 150,
  },
];

export const schemaColumnDetailPO = [
  {
    accessor: 'line',
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
    accessor: 'product_description',
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
    accessor: 'qty',
    placeholder: 'Qty',
    Header: 'Qty',
    width: 60,
    style: { justifyContent: 'flex-end', display: 'flex' },
    className: 'align-right',
    sortType: 'float',
    sortable: true,
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? '-' : value}</span>
    },
    textAlign: "right"
  },
  {
    accessor: 'uom',
    placeholder: 'UOM',
    Header: 'UOM',
    width: 80,
    sortable: true,
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? '-' : value}</span>
    },
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
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? '-' : value}</span>
    },
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
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? '-' : value}</span>
    },
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
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? '-' : value}</span>
    },
    textAlign: "right"
  },
  {
    accessor: 'completed',
    placeholder: 'Completed',
    Header: 'Completed',
    width: 100,
    sortable: true,
    Cell: (row) => {
      const { original } = row
      return <i className={`${original.completed === 'Y' ? 'iconU-checked text-success' : 'iconU-close text-danger'}`} />
    },
  },
  {
    accessor: 'oos',
    placeholder: 'OOS',
    Header: 'OOS',
    width: 100,
    sortable: true,
    Cell: (row) => {
      const { original } = row
      return <i className={`${original.released === 'Y' ? 'iconU-checked text-success' : 'iconU-close text-danger'}`} />
    },
  },
  {
    accessor: 'released',
    placeholder: 'Released',
    Header: 'Released',
    width: 100,
    sortable: true,
    Cell: (row) => {
      const { original } = row
      return <i className={`${original.released === 'Y' ? 'iconU-checked text-success' : 'iconU-close text-danger'}`} />
    },
  },
  {
    accessor: 'batch',
    placeholder: 'Batch',
    Header: 'Batch',
    width: 350,
    sortable: true,
    headerStyle: { textAlign: 'left' },
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? '-' : value}</span>
    },
  },
  {
    accessor: 'rotadate',
    placeholder: 'Rotadate',
    Header: 'Rotadate',
    width: 350,
    sortable: true,
    headerStyle: { textAlign: 'left' },
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? '-' : value}</span>
    },
  },
  {
    accessor: 'ref3',
    placeholder: 'Ref3',
    Header: 'Ref3',
    width: 350,
    sortable: true,
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? '-' : value}</span>
    },
  },
  {
    accessor: 'ref4',
    placeholder: 'Ref4',
    Header: 'Ref4',
    width: 350,
    sortable: true,
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? '-' : value}</span>
    },
  },
  {
    accessor: 'disposition',
    placeholder: 'Disposition',
    Header: 'Disposition',
    width: 200,
    sortable: true,
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? '-' : value}</span>
    },
  },
  {
    accessor: 'pack_id',
    placeholder: 'Pack ID',
    Header: 'Pack ID',
    width: 200,
    sortable: true,
    Cell: (props) => {
      const { value } = props
      return <span>{!value ? '-' : value}</span>
    },
  },
];

export const headerDetailRight = [
  { accessor: 'site', Header: 'Site' },
  { accessor: 'client', Header: 'Client' },
  { accessor: 'orderno', Header: 'Order No' },
  { accessor: 'ordertype', Header: 'Order Type' },
  { accessor: 'isistask', Header: 'Task' },
  { accessor: 'customer', Header: 'Customer No' },
  { accessor: 'customername', Header: 'Customer Name' },
  { accessor: 'customerpono', Header: 'Customer Order Ref' },
  { accessor: 'vendororderno', Header: 'Vendor Order Ref' },
  { accessor: 'deliverydescription', Header: 'Delivery Instructions' }
]

export const headerDetailCenter = [
  { accessor: 'address1', Header: 'Address 1' },
  { accessor: 'address2', Header: 'Address 2' },
  { accessor: 'address3', Header: 'Address 3' },
  { accessor: 'address4', Header: 'Address 4' },
  { accessor: 'address5', Header: 'Address 5' },
  { accessor: 'ship_to_name', Header: 'Ship To Name' },
  { accessor: 'suburb', Header: 'Suburb' },
  { accessor: 'postcode', Header: 'Postcode' },
  { accessor: 'state', Header: 'State' },
  { accessor: 'country', Header: 'Country' }
]

export const headerDetailLeft = [
  { accessor: 'status', Header: 'Status' },
  { accessor: 'deliverydate', Header: 'Delivery Date' },
  { accessor: 'datereceived', Header: 'Date Received' },
  { accessor: 'datereleased', Header: 'Date Released' },
  { accessor: 'datecompleted', Header: 'Date Completed' },
  { accessor: 'loadnumber', Header: 'Load Number' },
  { accessor: 'loadoutstart', Header: 'Loadout Start' },
  { accessor: 'loadoutfinish', Header: 'Loadout Finish' },
  { accessor: 'consignmentno', Header: 'Consignment No' },
  { accessor: 'freightcharge', Header: 'Freight Charge' },
]
export const filterSummaryDefault = [
  { name: 'Site', accessor: 'site', hiddenFilter: false },
  { name: 'Client', accessor: 'client', hiddenFilter: false },
  { name: 'Status', accessor: 'status', hiddenFilter: false },
  { name: 'Order Type', accessor: 'orderType', hiddenFilter: false },
  { name: 'Task', accessor: 'task', hiddenFilter: false },
  { name: 'Delivery Date', accessor: 'deliveryDate', hiddenFilter: false },
  { name: 'Date Received', accessor: 'dateReceived', hiddenFilter: false },
  { name: 'Date Released', accessor: 'dateReleased', hiddenFilter: false },
  { name: 'Date Completed', accessor: 'dateCompleted', hiddenFilter: false },
]

export const setExportData = async ({ dispatch, data }) => {
  await dispatch({ type: 'EXPORT_DATA', data });
};

