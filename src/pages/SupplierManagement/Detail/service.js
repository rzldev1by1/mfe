import React from 'react';

export const schemaColumnDetailSP = [
  {
    accessor: 'line_number',
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
    placeholder: 'Style Desc',
    Header: 'Style Desc',
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
    accessor: 'carton_qty',
    placeholder: 'Carton Qty',
    Header: 'Carton Qty',
    width: 130,
    style: { justifyContent: 'flex-end', display: 'flex' },
    className: 'align-right',
    sortType: 'float',
    Cell: (props) => props?.value || 0,
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
      <span className={props.original.isInvalidOrderQty ? 'color-max-qty': ''}>
        {props?.value || 0}
      </span>
    ),
    textAlign: "right"
  },
  {
    accessor: 'no_of_carton',
    placeholder: 'No. Of Cartons',
    Header: 'No. Of Cartons',
    width: 145,
    style: { justifyContent: 'flex-end', display: 'flex' },
    className: 'align-right',
    Cell: (props) =>  (
      <span className={props.original.isInvalidOrderCarton ? 'color-max-qty': ''}>
        {props?.value || 0}
      </span>
),
  },
  {
    accessor: 'qty',
    placeholder: 'Printed Qty',
    Header: 'Printed Qty',
    width: 140,
    style: { justifyContent: 'flex-end', display: 'flex' },
    className: 'align-right',
    Cell: (props) => props.value || '-',
  },
  {
    accessor: 'qty',
    placeholder: 'Printed Cartons',
    Header: 'Printed Cartons',
    width: 180,
    style: { justifyContent: 'flex-end', display: 'flex' },
    className: 'align-right',
    Cell: (props) => props.value || '-',
  },
];

export const getPrintLabelData = async ({ dispatch, data }) => {
  await dispatch({ type: 'PRINT_LABEL_DATA', data });
};