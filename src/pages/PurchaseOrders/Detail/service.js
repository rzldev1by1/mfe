/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import axios from 'axios'
import endpoints from '../../../helpers/endpoints'

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
    let newPage = {...page}
    let { 
        pagination, 
        data,
        exportData, 
        tableStatus } = newPage
    
        if (readyDocument === 'false' && export_ === 'false') {
            data = []
            tableStatus = 'waiting'
            setPage(newPage)
        }
    
    const { orderdetail, client,site} = props.match.params
    const url = `/purchaseOrder/${site}/${client}/${orderdetail}?page=${newPage.goPage}&export=${export_}`
    const  newData  = await axios.get(url)
        console.log(newData.data.data.data)
    if (newData?.data?.data) {
        let modifiedData = newData.data.data.data
        if ( export_ === 'true' ) {
              exportData = modifiedData
              setPage(newPage)
        } else {
          pagination = {
                          active: active || newData.data.data.current_page,
                          show: newData.data.data.per_page,
                          total: newData.data.data.total,
                          last_page: newData.data.data.last_page,
                          from: newData.data.data.from,
                          to: newData.data.data.to
            }
          let paging = pagination
            newPage.data = modifiedData
            dispatch({type:'GET_PO_DETAIL_TABLE', data:modifiedData})
            dispatch({type:'PAGING', data:paging})
            setPage(newPage)
        }
  
        if (modifiedData.length < 1) {
          tableStatus = 'noData'
          setPage(newPage)
        }
      } else {
        dispatch({type:'GET_PO_DETAIL_TABLE', data:[]})
        data = []
        setPage(newPage)
      }
  }