import React, { useEffect, useState } from 'react'
import { CRow, CCol } from '@coreui/react'
import Dropdown from 'Component/Dropdown'
import InputNumber from 'Component/InputNumber'
import Breadcrumb from 'Component/Breadcrumb'
import Search from 'Component/Search'
import DetailHeader from 'Component/DetailHeader'

export const category = [
    {
        label: 'VEGETABLES',
        value: '1',
    }, {
        label: 'FRUIT',
        value: '2',
    },
    {
        label: 'MEAT',
        value: '3',
    }
]

const Component = () => {
    
    const filterSite = (
        <Dropdown
            showTitle={false}
            show={true}
            options={category}
            placeholder='site'
        />
    )
    const filterClient = (
        <Dropdown
            showTitle={false}
            show={true}
            options={category}
            placeholder='Client'
        />
    )
    const filterStatus = (
        <Dropdown showTitle={false}
            show={true}
            options={category}
            placeholder='Status'
        />
    )
    const filterOrderType = (
        <Dropdown showTitle={false}
            show={true}
            options={category}
            placeholder='Order Type'
        />
    )
    const filterTask = (
        <Dropdown showTitle={false}
            show={true}
            options={category}
            placeholder='Task'
        />
    )
  
    return (
        <div className="inventory-data">
            <div>
                <Breadcrumb breadcrumb={[
                    { to: '/sales-orders', label: 'Tes Component' },
                    { to: '/purchase-order', label: 'wadidau', },
                    { to: '', label: 20, active: true },
                ]} />
            </div>
            <div >
                <Search
                    filterSite={filterSite}
                    filterClient={filterClient}
                    filterStatus={filterStatus}
                    filterOrderType={filterOrderType}
                    filterTask={filterTask}
                    placeholder={'Enter SKU'}
                    filter={true}
                />
            </div>
            <CRow className='pl-3'>
                <CCol lg={2} className="px-0 pb-3">
                    <Dropdown
                        showTitle={false}
                        show={true}
                        options={category}
                        placeholder='Tes Dropdown'
                    />
                </CCol>
            </CRow>
            <CRow>
                <CCol lg={2}>
                    <InputNumber
                        name="qty"
                        autoComplete="off"
                        type="text"
                        min="0"
                        className="form-control c-150"
                        placeholder="Qty"
                        maxLength="11"
                    />
                </CCol>
            </CRow>
            <CRow className='pl-3 pr-3 pt-3'>
                <CCol lg={12} className="px-0">
                    <DetailHeader
                        //titleRight
                        titleRight={true}
                        titleRightOne={'site'} titleRightTwo={'site'} titleRightThree={'site'} titleRightFour={'site'} titleRightFive={'site'}
                        titleRightSix={'site'} titleRightSeven={'site'} titleRightEight={'site'} titleRightNine={'site'} titleRightTen={'site'}
                        //titleRight
                        valeuRightOne={'site'} valeuRightTwo={'site'} valeuRightThree={'site'} valeuRightFour={'site'} valeuRightFive={'site'}
                        valeuRightSix={'site'} valeuRightSeven={'site'} valeuRightEight={'site'} valeuRightNine={'site'} valeuRightTen={'site'}
                        //titleCenter
                        titleCenter={true}
                        titleCenterOne={'site'} titleCenterTwo={'site'} titleCenterThree={'site'} titleCenterFour={'site'} titleCenterFive={'site'}
                        titleCenterSix={'site'} titleCenterSeven={'site'} titleCenterEight={'site'} titleCenterNine={'site'} titleCenterTen={'site'}
                        //titleCenter
                        valeuCenterOne={'site'} valeuCenterTwo={'site'} valeuCenterThree={'site'} valeuCenterFour={'site'} valeuCenterFive={'site'}
                        valeuCenterSix={'site'} valeuCenterSeven={'site'} valeuCenterEight={'site'} valeuCenterNine={'site'} valeuCenterTen={''}
                        //titleLeft
                        titleLeft={true}
                        titleLeftOne={'site'} titleLeftTwo={'site'} titleLeftThree={'site'} titleLeftFour={'site'} titleLeftFive={'site'}
                        titleLeftSix={'site'} titleLeftSeven={'site'} titleLeftEight={'site'} titleLeftNine={'site'} titleLeftTen={'site'}
                        //titleLeft
                        valeuLeftOne={'site'} valeuLeftTwo={'site'} valeuLeftThree={'site'} valeuLeftFour={'site'} valeuLeftFive={'site'}
                        valeuLeftSix={'site'} valeuLeftSeven={'site'} valeuLeftEight={'site'} valeuLeftNine={'site'} valeuLeftTen={''} />
                </CCol>
            </CRow>
        </div>
    )
}

export default Component