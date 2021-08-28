/* eslint-disable react/destructuring-assignment */
/* eslint-disable radix */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Nav, NavItem, NavLink, TabPane, TabContent } from 'reactstrap';
import { CRow } from '@coreui/react';
import numeral from 'numeral';
import TableMaster from '../../../Component/TableMaster';
import DetailHeader from '../../../Component/DetailHeader';
import Breadcrumb from '../../../Component/Breadcrumb/index';
import { getDetailData, getDetailHeader, getForescast } from '../../../apiService';
import { setExportData, siteCheck, clientCheck, schemaColumnDetailPO, schameColumnForesCast } from './services';
import './index.scss';

const StockHoldingDetail = (props) => {
  const dispatch = useDispatch();
  const shDetail = useSelector((state) => state.shDetail);
  const shDetailTable = useSelector((state) => state.shDetailTable);
  const shDetailForescast = useSelector((state) => state.shDetailForescast);
  const paginationShDetail = useSelector((state) => state.paginationShDetail);
  const paginationShForecast = useSelector((state) => state.paginationShForecast);
  const siteData = useSelector((state) => state.siteData);
  const clientData = useSelector((state) => state.clientData);
  const user = useSelector((state) => state.user);
  const module = 'stockHolding';
  const [activeTab, setActiveTab] = useState('1');
  useEffect(() => {
    getDetailHeader({ dispatch, props, module });
    getDetailData({ dispatch, props, active: paginationShDetail?.active || 1, module });
    getForescast({ dispatch, props, active: paginationShForecast?.active || 1 });
  }, []);

  // useEffect(() => {
  //   if (!shDetailTable) {
  //     getDetailData({ dispatch, props, active: paginationShDetail?.active || 1, module });
  //   }
  // }, []);
  // useEffect(() => {
  //   if (!shDetailForescast) {
  //     getForescast({ dispatch, props, active: paginationShForecast?.active || 1 });
  //   }
  // }, []);

  const height = window.innerHeight - 450;
  const widht = window.innerWidth;
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
          module={module}
          // title Center
          titleCenter
          titleCenterOne="Site"
          titleCenterTwo="Client"
          titleCenterThree="Product"
          titleCenterFour="Description"
          titleCenterFive="UOM"
          // Valeu Center
          valeuCenterOne={siteCheck({ val: shDetail?.site, site: siteData }) || '-'}
          valeuCenterTwo={clientCheck({ val: shDetail?.client, client: clientData }) || '-'}
          valeuCenterThree={shDetail?.product || '-'}
          valeuCenterFour={shDetail?.description || '-'}
          valeuCenterFive={shDetail?.uom || '-'}
          // title Left
          titleLeft
          titleLeftOne="Pickable Stock On Hand"
          titleLeftTwo="Projected Available Qty"
          titleLeftThree="Expected In Qty"
          titleLeftFour="Expected Out Qty"
          titleLeftFive="Rotadate Type"
          // Valeu Left
          valeuLeftOne={numeral(shDetail?.stock_on_hand).format('0,0') || '-'}
          valeuLeftTwo={numeral(shDetail?.projected_available_qty).format('0,0') || '-'}
          valeuLeftThree={numeral(shDetail?.expected_in_qty).format('0,0') || '-'}
          valeuLeftFour={numeral(shDetail?.expected_out_qty).format('0,0') || '-'}
          valeuLeftFive={shDetail?.rotadate_type || '-'}
        />
      </div>

      <CRow className="align-items-center mx-0" style={{ width: 'max-content' }}>
        <div className="stockDetails col-12 col-lg-12 col-md-12 col-sm-12 pl-0 pr-0">
          <Nav tabs className="mx-0">
            <div className="d-flex">
              <NavItem className={`p-0 ${activeTab === '2' ? 'bg-tabNonActive' : 'n'}`}>
                <NavLink
                  className="d-flex align-items-center pl-0"
                  active={activeTab === '1'}
                  onClick={() => setActiveTab('1')}
                  style={{ marginLeft: '0px' }}
                >
                  <div
                    className={`row rowTabCustom align-items-center tabColumn mx-0 ${activeTab === '1' ? ' tab-custom' : 'tab-nonActive'
                      }`}
                  >
                    <span className="newIcon-stock_details tabTitleText" />
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
                <NavItem className={`p-0 ml-2 ${activeTab === '1' ? 'bg-tabNonActive' : 'sss'}`}>
                  <NavLink
                    className="d-flex align-items-center pl-0"
                    active={activeTab === '2'}
                    onClick={() => setActiveTab('2')}
                  >
                    <div
                      className={`row rowTabCustom align-items-center tabColumn mx-0 ${activeTab === '2' ? ' tab-custom' : 'tab-nonActive'
                        }`}
                    >
                      <span className="newIcon-stock_balance tabTitleText" />
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
              style={{ minHeight: height, maxHeight: height, minWidht: widht, maxWidht: widht }}
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
        {activeTab === '2' ? (
          <TabPane tabId="2" style={{ background: '#e9eced' }}>
            <TableMaster
              schemaColumn={schameColumnForesCast}
              classNamePaging="display-paging"
              classNameTable="table-detail stock-detail"
              data={shDetailForescast}
              style={{ minHeight: height, maxHeight: height, minWidht: widht, maxWidht: widht }}
              module="StockHoldingForecast"
              noDataText
              pagination={paginationShForecast}
              goto={(e) => {
                dispatch({ type: 'PAGING_SH_FORECAST', data: { ...paginationShForecast, active: e } });
              }}
              getExportData={() => setExportData({ dispatch, data: shDetailForescast })}
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
