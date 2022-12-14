/* eslint-disable react/destructuring-assignment */
/* eslint-disable radix */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Nav, NavItem, NavLink, TabPane, TabContent } from 'reactstrap';
import { CRow } from '@coreui/react';
import TableMaster from '../../../Component/TableMaster';
import DetailHeader from '../../../Component/DetailHeader';
import Breadcrumb from '../../../Component/Breadcrumb/index';
import { getDetailData, getDetailHeader, getForecast } from '../../../apiService';
import { setExportData, schemaColumnDetailPO, schameColumnForesCast, headerDetailCenter, headerDetailLeft } from '../services';
import './index.scss';

const StockHoldingDetail = (props) => {
  const dispatch = useDispatch();
  const shDetail = useSelector((state) => state.shDetail);
  const shDetailTable = useSelector((state) => state.shDetailTable);
  const shDetailForecast = useSelector((state) => state.shDetailForescast);
  const paginationShDetail = useSelector((state) => state.paginationShDetail);
  const paginationShForecast = useSelector((state) => state.paginationShForecast);
  const user = useSelector((state) => state.user);
  const module = 'StockHoldingDetail';
  const [activeTab, setActiveTab] = useState('1');

  useEffect(() => {
    getDetailHeader({ dispatch, props, module });
    getDetailData({ dispatch, props, active: paginationShDetail?.active || 1, module });
    getForecast({ dispatch, props, active: paginationShForecast?.active || 1 });
  }, [])

  const height = window.innerHeight - 378;

  const navDetailsCss = activeTab === '2' ? 'bg-tabNonActive' : ''
  const navForeCastCss = activeTab === '1' ? 'bg-tabNonActive' : ''
  const tabDetailsCss = activeTab === '1' ? ' tab-custom' : 'tab-nonActive'
  const tabForeCastCss = activeTab === '2' ? ' tab-custom' : 'tab-nonActive'
  return (
    <div>
      <Breadcrumb
        breadcrumb={[
          { to: '/stock-holding', label: 'Stock Holding' },
          { to: '', label: props.match.params.product, active: true },
        ]}
      />
      <div className="pb-3">
        <DetailHeader
          headerDetailCenter={headerDetailCenter}
          headerDetailLeft={headerDetailLeft}
          data={shDetail}
          module={module}
        />
      </div>

      <CRow className="align-items-center mx-0" style={{ width: 'max-content' }}>
        <div className="stockDetails col-12 col-lg-12 col-md-12 col-sm-12 pl-0 pr-0">
          <Nav tabs className="mx-0">
            <div className="d-flex">
              <NavItem className={`p-0 ${navDetailsCss}`}>
                <NavLink
                  className="d-flex align-items-center pl-0"
                  active={activeTab === '1'}
                  onClick={() => setActiveTab('1')}
                  style={{ marginLeft: '0px' }}
                >
                  <div className={`row rowTabCustom align-items-center tabColumn mx-0 ${tabDetailsCss}`}>
                    <span className="newIcon-stock_details tabTitleText w-auto" />
                    {activeTab === '1'}
                    Stock Details
                  </div>
                </NavLink>
              </NavItem>

              {parseInt(shDetail?.expected_in_qty) === 0 &&
                parseInt(shDetail?.expected_out_qty) === 0 &&
                parseInt(shDetail?.stock_on_hand) + parseInt(shDetail?.expected_in_qty) >= shDetail?.expected_out_qty ? (
                ''
              ) : (
                <NavItem className={`p-0 ml-2 ${navForeCastCss}`}>
                  <NavLink
                    className="d-flex align-items-center pl-0"
                    active={activeTab === '2'}
                    onClick={() => setActiveTab('2')}
                  >
                    <div className={`row rowTabCustom align-items-center tabColumn mx-0 ${tabForeCastCss}`}>
                      <span className="newIcon-stock_balance tabTitleText w-auto" />
                      {activeTab === '2'}
                      Stock Balance Forecast
                    </div>
                  </NavLink>
                </NavItem>
              )}
            </div>
          </Nav>
        </div>
      </CRow>

      <TabContent activeTab={activeTab}>
        {activeTab === '1' ? (
          <TabPane tabId="1" style={{ background: '#e9eced' }}>
            <TableMaster
              schemaColumn={schemaColumnDetailPO}
              classNamePaging="display-paging"
              classNameTable="table-detail stock-detail "
              data={shDetailTable}
              style={{ minHeight: height, maxHeight: height }}
              module="StockHoldingDetail"
              noDataText
              pagination={paginationShDetail}
              goto={(e) => {
                dispatch({ type: 'PAGING_SH_DETAIL', data: { ...paginationShDetail, active: e } });
              }}
              getExportData={() => setExportData({ dispatch, data: shDetailTable })}
              user={user}
              title="Stock Holding Details"
              filename="Microlistics_StockHoldingDetails."
              editColumn="false"
              props={props}
            />
          </TabPane>
        ) : (
          ''
        )}
        {activeTab === '2' && shDetailForecast ? (
          <TabPane tabId="2" style={{ background: '#e9eced' }}>
            <TableMaster
              schemaColumn={schameColumnForesCast}
              classNamePaging="display-paging"
              classNameTable="table-detail stock-detail"
              data={shDetailForecast}
              style={{ minHeight: height, maxHeight: height }}
              module="StockHoldingForecast"
              noDataText
              pagination={paginationShForecast}
              goto={(e) => {
                dispatch({ type: 'PAGING_SH_FORECAST', data: { ...paginationShForecast, active: e } });
              }}
              getExportData={() => setExportData({ dispatch, data: shDetailForecast })}
              user={user}
              title="Stock Holding Forecast"
              filename="Microlistics_StockHoldingForecast."
              editColumn="false"
              props={props}
              exportBtn
            />
          </TabPane>
        ) : (
          ''
        )}
      </TabContent>
    </div>
  );
};

export default StockHoldingDetail;
