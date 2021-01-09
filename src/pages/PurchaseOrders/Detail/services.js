/* eslint-disable consistent-return */
import moment from 'moment'
import React from 'react';


const formatDate = (date) =>{
  return moment(date).format('DD/MM/YYYY') || false
}

// https://github.com/tannerlinsley/react-table/issues/94

// const getColumnWidth = (data, accessor, headerText) => {
//   if (typeof accessor === 'string' || accessor instanceof String) {
//     accessor = d => d[accessor]; // eslint-disable-line no-param-reassign
//   }
//   const maxWidth = 600;
//   const magicSpacing = 10;
//   const cellLength = Math.max(
//     ...data.map(row => (`${accessor(row)}` || '').length),
//     headerText.length,
//   );
//   return Math.min(maxWidth, cellLength * magicSpacing);
// };

export const schemaColumnDetailPO = [
  {
    accessor: 'rn',
    placeholder: 'Line Nooo',
    Header: 'Line No',
    Cell:(props) =>  props.value || '-'
  },
  {
    accessor: 'product',
    placeholder: 'Product',
    Header: 'Product',
    Cell:(props) =>  props.value || '-'
   
  },
  {
    accessor: 'product_name',
    placeholder: 'Description',
    Header: 'Description',
    Cell:(props) =>  props.value || '-'
   
  },
  {
    accessor: 'quantity',
    placeholder: 'Qty',
    Header: 'Qty',
    className: 'align-right',
    sortType: 'float',
    Cell:(props) =>  props.value || '-'   
  },
  {
    accessor: 'packdesc_1',
    placeholder: 'UOM',
    Header: 'UOM',
    Cell:(props) =>  props.value || '-',
    headerStyle: {textAlign: 'right'},
  },
  {
    accessor: 'qty_processed',
    placeholder: 'Qty Processed',
    Header: 'Qty Processed',
    className: 'align-right',
    sortType: 'float',
    Cell:(props) =>  props.value || '-'
  },
  {
    accessor: 'weight',
    placeholder: 'Wght',
    Header: 'Wght',
    className: 'align-right',
    sortType: 'float',
    Cell:(props) =>  props.value || '-'
  },
  {
    accessor: 'weight_processed',
    placeholder: 'Wght Processed',
    Header: 'Wght Processed',
    className: 'align-right',
    sortType: 'float',
    Cell:(props) =>  props.value || '-'
  },
  {
    accessor: 'completed',
    placeholder: 'Completed',
    Header: 'Completed',
    Cell: (row) => (
      <i className={`${row.original.completed === 'Y' ? 'iconU-checked text-success' : 'iconU-close text-danger'}`} />
    ),
  },
  {
    accessor: 'released',
    placeholder: 'Released',
    Header: 'Released',
    Cell: (row) => (
      <i className={`${row.original.released === 'Y' ? 'iconU-checked text-success' : 'iconU-close text-danger'}`} />
    ),
  },
  {
    accessor: 'batch',
    placeholder: 'Batch',
    Header: 'Batch', 
    headerStyle: {textAlign: 'left'},
    Cell:(props) =>  props.value || '-'
  },
  {
    accessor: 'rotadate',
    placeholder: 'Rotadate',
    Header: 'Rotadate',
    Cell:(props) => formatDate(props.value) || '-'
   
  },
  {
    accessor: 'ref3',
    placeholder: 'Ref3',
    Header: 'Ref3',
    className: 'align-right',
    Cell:(props) =>  props.value || '-'
   
  },
  {
    accessor: 'ref4',
    placeholder: 'Ref4',
    Header: 'Ref4',
    className: 'align-right',
    Cell:(props) =>  props.value || '-'
   
  },
  {
    accessor: 'disposition',
    placeholder: 'Disposition',
    Header: 'Disposition',
    className: 'align-right',
    Cell:(props) =>  props.value || '-'
   
  },
];
export const setExportData = async ({ dispatch, data }) => {
  await dispatch({ type: 'EXPORT_DATA', data });
};

export const siteCheck = (siteVal) => {
  if(siteVal === "A")return "A: Australia A"
  if(siteVal === "B")return "B: Australia B"
  if(siteVal === "E")return "E: TT Logistics (ECK)"
  if(siteVal === "L")return "L: TT Logistics (LAV)"
}

export const clientCheck = (clientVal) => {
  if(clientVal === "AESOP")return "AESOP: Aesop"
  if(clientVal === "ANTEC")return "ANTEC: Antec"
  if(clientVal === "BEGA")return "BEGA: BEGA"
  if(clientVal === "CLUTCH")return "CLUTCH: Clutch Industries"
  if(clientVal === "EXQUIRA")return "EXQUIRA: Exquira"
  if(clientVal === "LEDVANCE")return "LEDVANCE: Ledvance Australia"
  if(clientVal === "ONESTOP")return "ONESTOP: Onestop"
  if(clientVal === "STARTRACK")return "STARTRACK: Carrier"
  if(clientVal === "TATURA")return "TATURA: TATURA LTD"
  if(clientVal === "TTL")return "TTL: TT Logistics"
  if(clientVal === "TATURA")return "TATURA: TATURA LTD"
  if(clientVal === "TTLCHEM")return "TTLCHEM: TTLChem"
}
