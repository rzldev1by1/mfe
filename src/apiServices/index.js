import axios from "axios";
import endpoints from '../helpers/endpoints'

// get Purchase Orders Data
const searchPurchaseOrder = async (export_ = 'false', readyDocument = 'false') => {

    const { search, site, client, orderType, task, pagination, status } = this.state
    const urls = []

    // reset table
    if (readyDocument === 'false' && export_ === 'false') {
      this.setState({
        data: [],
        tableStatus: 'waiting'
      })
    }

    urls.push(`searchParam=${  search || ''}`)
    urls.push(`site=${  site?.value ? site.value : 'all'}`)
    urls.push(`client=${  client?.value ? client.value : 'all'}`)
    urls.push(`orderType=${  orderType ? orderType.value : 'all'}`)
    urls.push(`status=${  status ? status.value : 'all'}`)
    if (task && task.value !== 'all') urls.push(`task=${  task.value}`)
    urls.push(`page=${  pagination.active || 1}`)
    if (export_ === 'true') { urls.push('export=true') }
    const { data } = await axios.get(`${endpoints.purchaseOrder}?${urls.join('&')}`)
    if (data?.data?.data) {
      const modifiedData = data.data.data.map(m => {
        return m
      })
      if (export_ === 'true') {
        this.setState({
          exportData: modifiedData
        })
      } else {
        this.setState({
          pagination: {
            active: pagination.active || data.data.current_page,
            show: data.data.per_page,
            total: data.data.total,
            last_page: data.data.last_page,
            from: data.data.from,
            to: data.data.to
          },
          data: modifiedData
        })
      }

      if (modifiedData.length < 1) {

        this.setState({ tableStatus: 'noData' })
      }
    } else {
      this.setState({ data: [] })
    }
  }

  export default searchPurchaseOrder;