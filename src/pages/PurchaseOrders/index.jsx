import React from 'react'
import { CButton } from '@coreui/react'
import Search from '../../Component/Search'
import Breadcrumb from '../../Component/Breadcrumb'

const PurchaseOrders = () => {

    return(
      <div className='purchase-orders'>
        <Breadcrumb
          breadcrumb={[
            { to: '/purchase-order', label: 'Purchase Order', active: true}
          ]}
          button={
            (
              <CButton className="btn btn-primary btn-create float-right">
                CREATE PURCHASE ORDER
              </CButton>
            )
          }
        />
        <div>
          <Search
            placeholder='Enter an Order No'
            filter
          />
        </div>
        
      </div>
    )
}

export default PurchaseOrders;