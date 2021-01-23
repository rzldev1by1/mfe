/* eslint-disable consistent-return */
import React from 'react';

export const schemaColumnDetailPO = [
  {
    accessor: 'batch',
    placeholder: 'Batch',
    Header: 'Batch',
    width: 200,
    Cell: (props) => props.value || '-',
  },
  { 
    accessor: 'rotadate', 
    placeholder: 'Rotadate', 
    Header: 'Rotadate', 
    sortable: true, 
    width: 100 ,
    style: { textAlign: 'left' }, 
    Cell: (props) => props.value || '-',
  },
  {
    accessor: 'ref3',
    placeholder: 'Ref3',
    Header: 'Ref3',
    width: 100,
    Cell: (props) => props.value || '-',
  },
  {
    accessor: 'ref4',
    placeholder: 'Ref4',
    Header: 'Ref4',
    width: 100,
    Cell: (props) => props.value || '-',
  },
  {
    accessor: 'disposition',
    placeholder: 'Disposition',
    Header: 'Disposition',
    width: 100,
    sortType: 'float',
    Cell: (props) => props.value || '-',
  },
  {
    accessor: 'qty', 
    placeholder: 'QTY', 
    Header: 'Qty', 
    className: 'align-right',
    width: 60,
    Cell: (props) => props.value || '-',
    headerStyle: { textAlign: 'right' },
  },
  {
    accessor: 'weight', 
    placeholder: 'Wght', 
    Header: 'Wght', 
    className: 'align-right',
    width: 80,
    sortType: 'float',
    Cell: (props) => props.value || '-',
  },
  {
    accessor: 'pallet', 
    placeholder: 'Pallet', 
    Header: 'Pallet',
    width: 70,
    className: 'align-right',
    sortType: 'float',
    Cell: (props) => props.value || '-',
  },
  {
    accessor: 'price', 
    placeholder: 'Prince', 
    Header: 'Price',
    width: 70,
    className: 'align-right',
    sortType: 'float',
    Cell: (props) => props.value || '-',
  },
  {
    accessor: 'pack_id', 
    placeholder: 'Pack ID', 
    Header: 'Pack ID', 
    width: 170,
    headerStyle: { textAlign: 'left' },
    sortType: 'float',
    Cell: (props) => props.value || '-',
  },
];

export const schameColumnForesCast = [
  {
    accessor: 'customerID',
    placeholder: 'Customer No',
    Header: 'Customer No',
    sortable: false,
    width: 400,
  },
  { accessor: 'orderNo', placeholder: 'Order No', Header: 'Order No', sortable: false, width: 170 },
  {
    accessor: 'orderDate',
    placeholder: 'Order Date',
    Header: 'Order Date',
    sortable: false,
    width: 150,
  },
  {
    accessor: 'in',
    Cell: row => (<div className="alg-right">{row.value ? row.value : '-'}</div>),
    placeholder: 'Expected In',
    Header: 'Expected In',
    className: 'align-right',
    sortable: false,
    width: 150,
  },
  {
    accessor: 'out',
    Cell: row => (<div className="alg-right">{row.value ? row.value : '-'}</div>),
    placeholder: 'Expected Out',
    Header: 'Expected Out',
    className: 'align-right',
    sortable: false,
    width: 150,
  },
  {
    accessor: 'balance',
    Cell: row => (<div className="alg-right">{row.value ? row.value : '-'}</div>),
    placeholder: 'Balance',
    Header: 'Balance',
    className: 'align-right',
    sortable: false,
    width: 140,
  },
]

export const setExportData = async ({ dispatch, data }) => {
  await dispatch({ type: 'EXPORT_DATA', data });
};

export const siteCheck = ({val, site}) =>{
  let ret = null;
  site.map((data) =>{
     if(data?.value !== val){
       return 0;
     }
     ret = data.label
  }) 
  return ret;
}

export const clientCheck = ({val, client}) => {
  let ret = null;
  client.map((data) =>{
     if(data?.value !== val){
       return 0;
     }
     ret = data.label
  }) 
  return ret;
};
