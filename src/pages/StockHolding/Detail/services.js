/* eslint-disable consistent-return */
import React from 'react';
import moment from 'moment';
import numeral from 'numeral';

export const schemaColumnDetailPO = [
  {
    accessor: 'batch',
    placeholder: 'Batch',
    Header: 'batch',
    width: 200,
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
    width: 80,
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
    accessor: 'weight',
    placeholder: 'Wght',
    Header: 'Wght',
    width: 100,
    className: 'align-right',
    sortType: 'float',
    Cell: (props) => props.value || '-',
  },
  {
    accessor: 'pallet', 
    placeholder: 'Pallet', 
    Header: 'Pallet',
    width: 80,
    className: 'align-right',
    sortType: 'float',
    Cell: (props) => props.value || '-',
  },
  {
    accessor: 'price', 
    placeholder: 'Prince', 
    Header: 'Price',
    width: 80,
    className: 'align-right',
    sortType: 'float',
    Cell: (props) => props.value || '-',
  },
  {
    accessor: 'released',
    placeholder: 'Released',
    Header: 'Released',
    width: 100,
    className: 'align-right',
    sortType: 'float',
    Cell: (props) => props.value || '-',
  },
  {
    accessor: 'pack_id', 
    placeholder: 'Pack ID', 
    Header: 'Pack ID', 
    width: 170,
    className: 'align-right',
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
    sortable: false,
    width: 150,
  },
  {
    accessor: 'out',
    Cell: row => (<div className="alg-right">{row.value ? row.value : '-'}</div>),
    placeholder: 'Expected Out',
    Header: 'Expected Out',
    sortable: false,
    width: 150,
  },
  {
    accessor: 'balance',
    Cell: row => (<div className="alg-right">{row.value ? row.value : '-'}</div>),
    placeholder: 'Balance',
    Header: 'Balance',
    sortable: false,
    width: 140,
  },
]

export const setExportData = async ({ dispatch, data }) => {
  await dispatch({ type: 'EXPORT_DATA', data });
};

export const siteCheck = (siteVal) => {
  if (siteVal === 'A') return 'A: Australia A';
  if (siteVal === 'B') return 'B: Australia B';
  if (siteVal === 'E') return 'E: TT Logistics (ECK)';
  if (siteVal === 'L') return 'L: TT Logistics (LAV)';
};

export const clientCheck = (clientVal) => {
  if (clientVal === 'AESOP') return 'AESOP: Aesop';
  if (clientVal === 'ANTEC') return 'ANTEC: Antec';
  if (clientVal === 'BEGA') return 'BEGA: BEGA';
  if (clientVal === 'CLUTCH') return 'CLUTCH: Clutch Industries';
  if (clientVal === 'EXQUIRA') return 'EXQUIRA: Exquira';
  if (clientVal === 'LEDVANCE') return 'LEDVANCE: Ledvance Australia';
  if (clientVal === 'ONESTOP') return 'ONESTOP: Onestop';
  if (clientVal === 'STARTRACK') return 'STARTRACK: Carrier';
  if (clientVal === 'TATURA') return 'TATURA: TATURA LTD';
  if (clientVal === 'TTL') return 'TTL: TT Logistics';
  if (clientVal === 'TATURA') return 'TATURA: TATURA LTD';
  if (clientVal === 'TTLCHEM') return 'TTLCHEM: TTLChem';
};
