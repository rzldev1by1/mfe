/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import axios from 'axios'
import endpoints from '../../helpers/endpoints'

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
        width: 200
    },
    {
        Header: 'Order Type',
        accessor: 'order_type',
        headerStyle: { textAlign: 'left' },
        style: { textAlign: 'left', paddingLeft: '15px' },
        headerClassName: 'borderBottom noPaddingTop',
        sortable: true,
        width: 100
    },
    {
        Header: 'Task',
        accessor: 'isis_task',
        headerStyle: { textAlign: 'left' },
        style: { textAlign: 'left', paddingLeft: '15px' },
        headerClassName: 'borderBottom noPaddingTop',
        sortable: true,
        width: 100
    },
    {
        Header: 'Supplier No',
        accessor: 'supplier_no',
        headerStyle: { textAlign: 'left' },
        style: { textAlign: 'left', paddingLeft: '15px' },
        headerClassName: 'borderBottom noPaddingTop',
        sortable: true,
        width: 200
    },
    {
        Header: 'Supplier Name',
        accessor: 'supplier_name',
        headerStyle: { textAlign: 'left' },
        style: { textAlign: 'left', paddingLeft: '15px' },
        headerClassName: 'borderBottom noPaddingTop',
        sortable: true,
        width: 200
    },
    {
        Header: 'Status',
        accessor: 'status',
        headerStyle: { textAlign: 'left' },
        style: { textAlign: 'left', paddingLeft: '15px' },
        headerClassName: 'borderBottom noPaddingTop',
        sortable: true,
        width: 200
    },
    {
        Header: 'Order Date',
        accessor: 'delivery_date',
        headerStyle: { textAlign: 'left' },
        style: { textAlign: 'left', paddingLeft: '15px' },
        headerClassName: 'borderBottom noPaddingTop',
        sortable: true,
        width: 200
    },
    {
        Header: 'Date Received',
        accessor: 'date_received',
        headerStyle: { textAlign: 'left' },
        style: { textAlign: 'left', paddingLeft: '15px' },
        headerClassName: 'borderBottom noPaddingTop',
        sortable: true,
        width: 200
    },
    {
        Header: 'Date Released',
        accessor: 'date_released',
        headerStyle: { textAlign: 'left' },
        style: { textAlign: 'left', paddingLeft: '15px' },
        headerClassName: 'borderBottom noPaddingTop',
        sortable: true,
        width: 200
    },
    {
        Header: 'Date Completed',
        accessor: 'date_completed',
        headerStyle: { textAlign: 'left' },
        style: { textAlign: 'left', paddingLeft: '15px' },
        headerClassName: 'borderBottom noPaddingTop',
        sortable: true,
        width: 200
    },
]

export const  searchPurchaseOrder = async ({
    export_ = 'false', 
    readyDocument = 'false', 
    page, 
    setPage,
    dispatch
    }) => {
    let newPage = {...page}
    let { 
        search,
        site, 
        client, 
        orderType, 
        task, 
        pagination, 
        status, 
        data,
        exportData, 
        tableStatus } = newPage
    let urls = []

    // reset table
    if (readyDocument === 'false' && export_ === 'false') {
        data = []
        tableStatus = 'waiting'
        setPage(newPage)
    }

    // Url 
    urls.push(`searchParam=${  search || ''}`)
    urls.push(`site=${  site?.value ? site.value : 'all'}`)
    urls.push(`client=${  client?.value ? client.value : 'all'}`)
    urls.push(`orderType=${  orderType ? orderType.value : 'all'}`)
    urls.push(`status=${  status ? status.value : 'all'}`)
    if (task && task.value !== 'all') urls.push(`task=${  task.value}`)
    urls.push(`page=${  pagination.active || 1}`)
    if (export_ === 'true') { urls.push('export=true') }
    
    const  newData  = await axios.get(`${endpoints.purchaseOrder}?${urls.join('&')}`)
    if (newData?.data?.data) {
      let modifiedData = newData.data.data.data
      if ( export_ === 'true' ) {
            exportData = modifiedData
            setPage(newPage)
      } else {
        pagination = {
                        active: pagination.active || newData.data.data.current_page,
                        show: newData.data.data.per_page,
                        total: newData.data.data.total,
                        last_page: newData.data.data.last_page,
                        from: newData.data.data.from,
                        to: newData.data.data.to
          }
        let paging = pagination
          newPage.data = modifiedData
          dispatch({type:'GET_PO_SUMMARY', data:modifiedData})
          dispatch({type:'PAGING', data:paging})
          setPage(newPage)
      }

      if (modifiedData.length < 1) {
        tableStatus = 'noData'
        setPage(newPage)
      }
    } else {
      dispatch({type:'GET_PO_SUMMARY', data:[]})
      data = []
      setPage(newPage)
    }
  }