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
    accessor: 'type',
    placeholder: 'Type',
    Header: 'Type',
    sortable: false,
    width: 400,
    Cell: row => {
      return (
        <div>
          <span className="class-for-name">{row.original.openingbalancetext}</span>
          <span className="class-for-name overflow-visible z-index-20">{row.original.newstockexpirydate}</span>
          <span className="class-for-name">{row.original.closingbalancetext}</span>
        </div>
      )
    }
  },
  {
    accessor: 'company',
    placeholder: 'Customer No',
    Header: 'Customer No',
    sortable: false,
    width: 140,
    
  },
  { accessor: 'orderno', placeholder: 'Order No', Header: 'Order No', sortable: false, width: 170 },
  {
    accessor: 'effectivedate',
    placeholder: 'Order Date',
    Header: 'Order Date',
    sortable: false,
    width: 150,
    Cell: row => {
      return (
        <div>
          <span className="class-for-name">{moment(row.original.effectivedate).format('DD/MM/YYYY')}</span>
        </div>
      )
    }
  },
  {
    accessor: 'qtyexpected',
    placeholder: 'Expected In',
    Header: 'Expected In',
    sortable: false,
    width: 150,
    Cell: row => {
      return (
        <div>
          <span className="class-for-name alg-right">{row.original.qtyexpected ? numeral(row.original.qtyexpected).format('0,0') : row.original.qtyexpected}</span>
          <span className="class-for-name alg-right">{row.original.qty ? 0 : null}</span>
        </div>
      )
    }
  },
  {
    accessor: 'qtycommitted',
    placeholder: 'Expected Out',
    Header: 'Expected Out',
    sortable: false,
    width: 150,
    Cell: row => {
      return (
        <div>
          <span className="class-for-name alg-right">{row.original.qtycommitted ? numeral(row.original.qtycommitted).format('0,0') : row.original.qtycommitted}</span>
          <span className="class-for-name alg-right">{row.original.qty ? numeral(row.original.qty).format('0,0') : row.original.qty}</span>
        </div>
      )
    }
  },
  {
    accessor: 'closingbalance',
    placeholder: 'Balance',
    Header: 'Balance',
    sortable: false,
    width: 140,
    Cell: row => {
      return (
        <div>
          <span className="class-for-name alg-right">{row.original.startbalance ? numeral(row.original.startbalance).format('0,0') : row.original.startbalance}</span>
          <span className="class-for-name alg-right">{row.original.closingbalance ? numeral(row.original.closingbalance).format('0,0') : row.original.closingbalance}</span>
          <span className="class-for-name alg-right">{row.original.closingstock ? numeral(row.original.closingstock).format('0,0') : row.original.closingstock}</span>
          <span className="class-for-name alg-right">{row.original.totalbalance ? numeral(row.original.totalbalance).format('0,0') : row.original.totalbalance}</span>
        </div>
      )
    }
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
