import React from 'react';
import moment from 'moment';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export const formatDate = (date) => {
  if (date) {
    return moment(date).format('DD/MM/YYYY') || false;
  }
};


const changeColor = ({e, props, column}) => {   
  console.log(props); 
    if (column === 'order_qty' && e.target.value > props?.original.order_qty){
      document.getElementById(`order_qty_${props?.row._index}`).style.color = 'red';
    } else {
      document.getElementById(`packfactor_1_${props?.row._index}`).style.color = 'orange';
      document.getElementById(`order_qty_${props?.row._index}`).style.color = 'orange';
    }
    if (column === 'packfactor_1'){
      if( e.target.value > props?.original.packfactor_1){
        document.getElementById(`packfactor_1_${props?.row._index}`).style.color = 'red';
      }else{
        document.getElementById(`packfactor_1_${props?.row._index}`).style.color = 'orange';
        document.getElementById(`order_qty_${props?.row._index}`).style.color = 'orange';
      }
    }
}



const blurColor = ({props}) => {
  document.getElementById(`order_qty_${props?.row._index}`).style.color = 'black';
  document.getElementById(`packfactor_1_${props?.row._index}`).style.color = 'black';
}

const renderTooltipRename = ({field, props}) => (
  <Tooltip id='edit-qty-tooltip' onClickCapture={() => false}>
    Remaining qty: 
    {' '}
    <span>{field === 'edit_qty' ? props?.original.order_qty : props?.original.packfactor_1 }</span>
  </Tooltip>
);

export const schemaColumnDetailSP = [
  {
    accessor: 'rn',
    placeholder: 'Line No',
    Header: 'Line No',
    width: 100,
    Cell: (props) => props.value || '-',
  },
  {
    accessor: 'style',
    placeholder: 'Style',
    Header: 'Style',
    width: 100,
    Cell: (props) => props.value || '-',
  },
  {
    accessor: 'style_desc',
    placeholder: 'Style Desc.',
    Header: 'Style Desc.',
    width: 200,
    Cell: (props) => props.value || '-',
  },
  {
    accessor: 'color',
    placeholder: 'Color',
    Header: 'Color',
    width: 100,
    Cell: (props) => props.value || '-',
  },
  {
    accessor: 'dimension',
    placeholder: 'Dimension',
    Header: 'Dimension',
    width: 130,
    Cell: (props) => props.value || '-',
    headerStyle: { textAlign: 'right' },
  },
  {
    accessor: 'packsize',
    placeholder: 'Size',
    Header: 'Size',
    style: { justifyContent: 'flex-end', display: 'flex' },
    className: 'align-right',
    width: 100,
    sortType: 'float',
    Cell: (props) => props.value || '-',
    textAlign: "right"
  },
  {
    accessor: 'packfactor_1',
    placeholder: 'Carton Qty',
    Header: 'Carton Qty',
    width: 130,
    style: { justifyContent: 'flex-end', display: 'flex' },
    className: 'align-right',
    sortType: 'float',
    Cell: (props) => (
      <span id={`packfactor_1_${props?.row._index}`}>
        {props?.value || 0}
      </span>
),
    textAlign: "right"
  },
  {
    accessor: 'order_qty',
    placeholder: 'Order Qty',
    Header: 'Order Qty',
    width: 120,
    style: { justifyContent: 'flex-end', display: 'flex' },
    className: 'align-right',
    sortType: 'float',
    Cell: (props) => (
      <span id={`order_qty_${props?.row._index}`}>
        {props?.value || '-'}
      </span>
    ),
    textAlign: "right"
  },
  {
    accessor: 'no_of_carton',
    placeholder: 'No. of Carton',
    Header: 'No. of Carton',
    width: 145,
    className: 'align-right',
    Cell: (props) => props.value || 0,
  },
  {
    accessor: 'qty',
    placeholder: 'Printed Qty',
    Header: 'Printed Qty',
    width: 140,
    className: 'align-right',
    Cell: (props) => props.value || '-',
  },
  {
    accessor: 'qty',
    placeholder: 'Printed Cartons',
    Header: 'Printed Cartons',
    width: 180,
    className: 'align-right',
    Cell: (props) => props.value || '-',
  },
  // {
  //   accessor: 'edit_qty',
  //   placeholder: 'Edit Qty',
  //   Header: 'Edit Qty',
  //   width: 130,
  //   headerStyle: { textAlign: 'left', marginLeft: '1rem' },
  //   sortable:false,
  //   Cell: (props) => (
  //     <OverlayTrigger
  //       placement="bottom"
  //       delay={{ show: 250, hide: 400 }}
  //       overlay={renderTooltipRename({field:'edit_qty', props})}
  //     >
  //       <input id={`edit_qty_${props?.row._index}`} className='input-in-table' style={{width:'100px', marginLeft: '1rem'}} onFocusCapture={(e) => changeColor({e, props, column: 'order_qty'})} onBlur={() => blurColor({props})} onChange={(e) => changeColor({e, props, column:'order_qty'})} />
  //     </OverlayTrigger>
  //   )
  //   ,
  // }
];
