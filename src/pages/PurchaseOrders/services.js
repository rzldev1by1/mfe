/* eslint-disable prefer-const */
import React from 'react'
import axios from 'axios'

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
        width: 100
    },
    {
        Header: 'Order NO',
        accessor: 'order_no',
        headerStyle: { textAlign: 'left' },
        style: { textAlign: 'left', paddingLeft: '15px' },
        headerClassName: 'borderBottom noPaddingTop',
        sortable: true,
        Cell: props => <span>{props.value ? props.value : '-'}</span>,
        width: 200
    },
    {
        Header: 'Order Type',
        accessor: 'order_type',
        headerStyle: { textAlign: 'left' },
        style: { textAlign: 'left', paddingLeft: '15px' },
        headerClassName: 'borderBottom noPaddingTop',
        sortable: true,
        Cell: props => <span>{props.value ? props.value : '-'}</span>,
        width: 100
    },
    {
        Header: 'Task',
        accessor: 'isis_task',
        headerStyle: { textAlign: 'left' },
        style: { textAlign: 'left', paddingLeft: '15px' },
        headerClassName: 'borderBottom noPaddingTop',
        sortable: true,
        Cell: props => <span>{props.value ? props.value : '-'}</span>,
        width: 100
    },
    {
        Header: 'Supplier No',
        accessor: 'supplier_no',
        headerStyle: { textAlign: 'left' },
        style: { textAlign: 'left', paddingLeft: '15px' },
        headerClassName: 'borderBottom noPaddingTop',
        sortable: true,
        Cell: props => <span>{props.value ? props.value : '-'}</span>,
        width: 200
    },
    {
        Header: 'Supplier Name',
        accessor: 'supplier_name',
        headerStyle: { textAlign: 'left' },
        style: { textAlign: 'left', paddingLeft: '15px' },
        headerClassName: 'borderBottom noPaddingTop',
        sortable: true,
        Cell: props => <span>{props.value ? props.value : '-'}</span>,
        width: 200
    },
    {
        Header: 'Status',
        accessor: 'status',
        headerStyle: { textAlign: 'left' },
        style: { textAlign: 'left', paddingLeft: '15px' },
        headerClassName: 'borderBottom noPaddingTop',
        sortable: true,
        width: 200,
        Cell: row => {
            switch (row.original.status) {
              case '0: Unavailable':
                return <a className="status-Unavailable">UNAVAILABLE</a>
                break;
              case '1: Available':
                return <a className="status-available">AVAILABLE</a>
                break;
              case '2: Released':
                return <a className="status-Release">RELEASED</a>
                break;
              case '3: Part Released':
                return <a className="status-partRelease">PART RELEASED</a>
                break;
              case '4: Completed':
                return <a className="status-complete">COMPLETED</a>
                break;
              case 'All Open':
                return <a className="status-ok">ALL OPEN</a>
                break;
              default:
                break;
            }
          }
        
    },
    {
        Header: 'Order Date',
        accessor: 'delivery_date',
        headerStyle: { textAlign: 'left' },
        style: { textAlign: 'left', paddingLeft: '15px' },
        headerClassName: 'borderBottom noPaddingTop',
        sortable: true,
        Cell: props => <span>{props.value ? props.value : '-'}</span>,
        width: 200
    },
    {
        Header: 'Date Received',
        accessor: 'date_received',
        headerStyle: { textAlign: 'left' },
        style: { textAlign: 'left', paddingLeft: '15px' },
        headerClassName: 'borderBottom noPaddingTop',
        sortable: true,
        Cell: props => <span>{props.value ? props.value : '-'}</span>,
        width: 200
    },
    {
        Header: 'Date Released',
        accessor: 'date_released',
        headerStyle: { textAlign: 'left' },
        style: { textAlign: 'left', paddingLeft: '15px' },
        headerClassName: 'borderBottom noPaddingTop',
        sortable: true,
        Cell: props => <span>{props.value ? props.value : '-'}</span>,
        width: 200
    },
    {
        Header: 'Date Completed',
        accessor: 'date_completed',
        headerStyle: { textAlign: 'left' },
        style: { textAlign: 'left', paddingLeft: '15px' },
        headerClassName: 'borderBottom noPaddingTop',
        sortable: true,
        Cell: props => <span>{props.value ? props.value : '-'}</span>,
        width: 200
    },
]

export const getDetail = async ({dispatch, props}) => {
    const { orderdetail, client,site } = props.match.params
    const url = `/purchaseOrder?searchParam=${orderdetail}&client=${client}&site=${site}`
    const { data } = await axios.get(url)
    if (data.data) {
      dispatch({type:'GET_PO_DETAIL', data: data.data.data[0]})
    }
  }
  export const  getProductsTable = async ({
    export_ = 'false', 
    readyDocument = 'false', 
    page, 
    setPage,
    dispatch, 
    active,
    props
    }) => {
    const newPage = {...page}    
    const { orderdetail, client,site} = props.match.params
    const url = `/purchaseOrder/${site}/${client}/${orderdetail}?page=${newPage.goPage}&export=${export_}`
    const  newData  = await axios.get(url)
    if (newData?.data?.data) {
        let modifiedData = newData.data.data.data
        if ( export_ === 'true' ) {
            newPage.exportData = modifiedData
        } else {
          const pagination = {
                          active: active || newData.data.data.current_page,
                          show: newData.data.data.per_page,
                          total: newData.data.data.total,
                          last_page: newData.data.data.last_page,
                          from: newData.data.data.from,
                          to: newData.data.data.to
            }
          const paging = pagination
            newPage.data = modifiedData
            dispatch({type:'GET_PO_DETAIL_TABLE', data:modifiedData})
            dispatch({type:'PAGING', data:paging})
        }
  
        if (modifiedData.length < 1) {
            newPage.tableStatus = 'noData'
        }
      } else {
        dispatch({type:'GET_PO_DETAIL_TABLE', data:[]})
        newPage.data = []
      }

      if (readyDocument === 'false' && export_ === 'false') {
        newPage.data = []
        newPage.tableStatus = 'waiting'
        
    }
    setPage(newPage)
  }