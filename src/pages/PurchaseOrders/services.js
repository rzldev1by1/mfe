/* eslint-disable consistent-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-const */
import React from 'react';
import axios from 'axios';

export const schemaColumn = [
  {
    Header: 'Site',
    accessor: 'site',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    width: 100,
  },
  {
    Header: 'Client',
    accessor: 'client',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    width: 100,
  },
  {
    Header: 'Order NO',
    accessor: 'order_no',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    Cell: (props) => <span>{props.value ? props.value : '-'}</span>,
    width: 200,
  },
  {
    Header: 'Order Type',
    accessor: 'order_type',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    Cell: (props) => <span>{props.value ? props.value : '-'}</span>,
    width: 100,
  },
  {
    Header: 'Task',
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
    accessor: 'supplier_no',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    Cell: (props) => <span>{props.value ? props.value : '-'}</span>,
    width: 200,
  },
  {
    Header: 'Supplier Name',
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
    accessor: 'status',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    width: 200,
    Cell: (row) => {
      switch (row.original.status) {
        case '0: Not Available':
          return <div className="status-unavailable ">UNAVAILABLE</div>;
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
          
      }
    },
  },
  {
    Header: 'Order Date',
    accessor: 'delivery_date',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    Cell: (props) => <span>{props.value ? props.value : '-'}</span>,
    width: 200,
  },
  {
    Header: 'Date Received',
    accessor: 'date_received',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    Cell: (props) => <span>{props.value ? props.value : '-'}</span>,
    width: 200,
  },
  {
    Header: 'Date Released',
    accessor: 'date_released',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    Cell: (props) => <span>{props.value ? props.value : '-'}</span>,
    width: 200,
  },
  {
    Header: 'Date Completed',
    accessor: 'date_completed',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    Cell: (props) => <span>{props.value ? props.value : '-'}</span>,
    width: 200,
  },
];

export const exportColumns = [
  { accessor: 'site', Header: 'Site', width: 30 },
  { accessor: 'client', Header: 'Client', width: null },
  { accessor: 'order_no', Header: 'Order No', width: 130 },
  { accessor: 'order_type', Header: 'Order Type', width: null },
  { accessor: 'isis_task', Header: 'Task', width: null },
  { accessor: 'supplier_no', Header: 'Supplier No', width: null },
  { accessor: 'supplier_name', Header: 'Supplier Name', width: 290 },
  { accessor: 'status', Header: 'Status', width: 140 },
  { accessor: 'delivery_date', Header: 'Order Date', width: null },
  { accessor: 'date_received', Header: 'Date Received', width: null },
  { accessor: 'date_released', Header: 'Date Released', width: null },
  { accessor: 'date_completed', Header: 'Date Completed', width: null },
];

export const getDetail = async ({ dispatch, props }) => {
  const { orderdetail, client, site } = props.match.params;
  const url = `/purchaseOrder?searchParam=${orderdetail}&client=${client}&site=${site}`;
  const { data } = await axios.get(url);
  if (data.data) {
    dispatch({ type: 'GET_PO_DETAIL', data: data.data.data[0] });
  }
};
export const getProductsTable = async ({
  export_ = 'false',
  readyDocument = 'false',
  page,
  setPage,
  dispatch,
  active,
  props,
}) => {
  const newPage = { ...page };
  const { orderdetail, client, site } = props.match.params;
  const url = `/purchaseOrder/${site}/${client}/${orderdetail}?page=${newPage.goPage}&export=${export_}`;
  const newData = await axios.get(url);
  if (newData?.data?.data) {
    let modifiedData = newData.data.data.data;
    if (export_ === 'true') {
      newPage.exportData = modifiedData;
    } else {
      const pagination = {
        active: active || newData.data.data.current_page,
        show: newData.data.data.per_page,
        total: newData.data.data.total,
        last_page: newData.data.data.last_page,
        from: newData.data.data.from,
        to: newData.data.data.to,
      };
      const paging = pagination;
      newPage.data = modifiedData;
      dispatch({ type: 'GET_PO_DETAIL_TABLE', data: modifiedData });
      dispatch({ type: 'PAGING', data: paging });
    }

    if (modifiedData.length < 1) {
      newPage.tableStatus = 'noData';
    }
  } else {
    dispatch({ type: 'GET_PO_DETAIL_TABLE', data: [] });
    newPage.data = [];
  }

  if (readyDocument === 'false' && export_ === 'false') {
    newPage.data = [];
    newPage.tableStatus = 'waiting';
  }
  setPage(newPage);
};
