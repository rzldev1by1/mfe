import React from 'react'
import Search from '../../Component/Search'
import Dropdown from '../../Component/Dropdown'
import Breadcrumb from '../../Component/Breadcrumb'

const PurchaseOrders = () => {
  const filterSite = (
    <Dropdown
      showTitle={false}
      show
      placeholder='Site'
    />
  )
  const filterClient = (
    <Dropdown
      showTitle={false}
      show
      placeholder='Client'
    />
  )
  const filterStatus = (
    <Dropdown
      showTitle={false}
      show
      placeholder='Status'
    />
  )
  const filterOrderType = (
    <Dropdown
      showTitle={false}
      show
      placeholder='Order Type'
    />
  )
  const filterTask = (
    <Dropdown
      showTitle={false}
      show
      placeholder='Task'
    />
  )
    return(
      <div>
        <Breadcrumb breadcrumb={[
          { to: '/purchase-order', label: 'Purchase Order', active: true},
          ]}
        />
        <div>
          <Search
            filterSite={filterSite}
            filterClient={filterClient}
            filterStatus={filterStatus}
            filterOrderType={filterOrderType}
            filterTask={filterTask}
            placeholder='Enter SKU'
            filter
          />
        </div>
      </div>
    )
}

export default PurchaseOrders;