/* eslint-disable array-callback-return */
import axios from "axios";
import endpoints from '../../helpers/endpoints'

const getSite = async ({dispatch}) => {
    const { data } = await axios.get(endpoints.getSite)
    const siteData = data.map(d => ({ value: d.site, label: `${d.site}: ${d.name}` }))
    const site = { value: 'all', label: 'All Site' }
    siteData.splice(0, 0, site)
    dispatch({ type: 'SITE_DATA', data: siteData })
}

const getClient = async ({dispatch}) => {
    const { data } = await axios.get(endpoints.getClient)
    const clientData = data.map(d => ({ value: d.code, label: `${d.code}: ${d.name}` }))
    const client = { value: 'all', label: 'All Client' }
    clientData.splice(0, 0, client)
    dispatch({ type: 'CLIENT_DATA', data: clientData })
}

const getStatus = async ({dispatch}) => {
    const statusData = [
      { value: "open", label: 'All Open' },
      { value: 'all', label: 'All Status' },
      { value: "unavailable", label: '0: Unavailable' },
      { value: "available", label: '1: Available' },
      { value: "released", label: '2: Released' },
      { value: "part_released", label: '3: Part Released' },
      { value: "completed", label: '4: Completed' },
    ];
    dispatch({type: 'STATUS_DATA', data: statusData})
}

const getOrderType = async ({dispatch, company, client}) => {
    // if (client) {
      const { data } = await axios.get(`${endpoints.getPOResources}?company=${company}&client=${client}`)
      const orderTypeFilterData = data.orderTypeFilter.map((dataIndex) => ({ value: dataIndex.code, label: `${dataIndex.code}: ${dataIndex.description}` }))
    //   const orderTypeData = data.orderType.map((data, i) => ({ value: data.code, label: `${data.code}: ${data.description}` }))
    //   const site = data.site.map(data => ({ value: data.site, label: `${data.site}: ${data.name}` }))
      const orderType = { value: 'all', label: 'All' }
      orderTypeFilterData.splice(0, 0, orderType)
      dispatch({ type: 'ORDER_TYPE_DATA', data: orderTypeFilterData })
    // }
}

const getTask = async ({dispatch, client, site}) => {
    const clientParam = client?.value ? client.value : client
    const siteParam = site?.value ? site.value : site
    // if (client && site) {
      const { data } = await axios.get(`${endpoints.getIsisTask}?client=${clientParam}&site=${siteParam}&order=po`)
      const taskData = data.code.map((c, i) => ({ value: c, label: `${data.name[i]}` }))
      const task = { value: 'all', label: 'All Task' }
      taskData.splice(0, 0, task)
      dispatch({ type: 'TASK_DATA', data: taskData })
    // }
  }

  const siteCheck = (siteData, site) => {
    let l = null
    if (site)
    if(siteData){
      siteData.map(data => {
        if (data.value === site) l = data.label
      })
    }
    return l
  }

  const clientCheck = (clientData, client) => {
    let l = null
    if (client)
    if(clientData){
      clientData.map(data => {
        if (data.value === client) l = data.label
      })
    }
    return l
  }

export {getSite, getClient, getStatus, getOrderType, getTask,  siteCheck, clientCheck } 