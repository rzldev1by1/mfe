/* eslint-disable react/destructuring-assignment */
/* eslint-disable radix */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Nav,
  NavItem,
  NavLink,
  TabPane,
  TabContent,
} from 'reactstrap';
import { CRow } from '@coreui/react';
import TableMaster from '../../../Component/TableMaster';
import DetailHeader from '../../../Component/DetailHeader';
import Breadcrumb from '../../../Component/Breadcrumb/index';
import { getDetailData, getDetailHeader, getForescast } from '../../../apiService';
import { setExportData, siteCheck, clientCheck, schemaColumnDetailPO, schameColumnForesCast} from './services';
import './index.scss';

const StockHoldingDetail = (props) => {
  const dispatch = useDispatch();
  const shDetail = useSelector((state) => state.shDetail);
  const shDetailTable = useSelector((state) => state.shDetailTable);
  const shDetailForescast = useSelector((state) => state.shDetailForescast);
  const pagination = useSelector((state) => state.pagination);
  const siteData = useSelector((state) => state.siteData);
  const clientData = useSelector((state) => state.clientData);
  const [active, setActive] = useState(1);
  const user = useSelector((state) => state.user);
  const module = "stockHolding"
  const [activeTab, setActiveTab] = useState('1');
  const [page, setPage] = useState({
    // Paging
    notifPaging: false,
    goPage: 1,
    // table
    data: [],
  });
  const newPage = { ...page };

  useEffect(() => {}, [page]);
  useEffect(() => {
    getDetailHeader({ dispatch, props, module });
  }, []);
  useEffect(() => {
    getDetailData({ dispatch, props, page, active, setPage, module });
  }, [active]);
  useEffect(() => {
    getForescast({ dispatch, props, page, active, setPage});
  }, [active]);

  const height = window.innerHeight - 378;
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
          // title Center
          titleCenter
          titleCenterOne="Site"
          titleCenterTwo="Client"
          titleCenterThree="Product"
          titleCenterFour="Description"
          titleCenterFive="UOM"
          // Valeu Center
          valeuCenterOne={siteCheck({val:shDetail?.site, site:siteData}) || '-'}
          valeuCenterTwo={clientCheck({val:shDetail?.client, client:clientData}) || '-'}
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
          valeuLeftOne={shDetail?.stock_on_hand || '-'}
          valeuLeftTwo={shDetail?.projected_available_qty || '-'}
          valeuLeftThree={shDetail?.expected_in_qty || '-'}
          valeuLeftFour={shDetail?.expected_out_qty || '-'}
          valeuLeftFive={shDetail?.rotadate_type || '-'}
        />
      </div>

      <CRow className='align-items-center mx-0' style={{ width: 'max-content' }}>
        <div className='stockDetails col-12 col-lg-12 col-md-12 col-sm-12 pl-0 pr-0'>
          <Nav tabs className='mx-0'>
            <div className='input-group'>
              <NavItem className={`p-0 ${activeTab === '2' ? 'bg-tabNonActive' : 'n'}`}>
                <NavLink active={activeTab === '1'} onClick={() => setActiveTab('1')} style={{marginLeft:'0px'}}>
                  <div className={`row rowTabCustom align-items-center tabColumn mx-0 ${activeTab === '1' ? ' tab-custom' : 'tab-nonActive'}`}>
                    <span className='number-number-1 tabTitleText' />
                    {activeTab === '1'}
                    Stock Details
                  </div> 
                </NavLink>
              </NavItem>

              { parseInt(shDetail?.expected_in_qty) === 0 && 
                  parseInt(shDetail?.expected_out_qty) === 0 && 
                  ( parseInt(shDetail?.stock_on_hand ) + 
                    parseInt(shDetail?.expected_in_qty ) >= shDetail?.expected_out_qty) 
                  ? '' : (
                    <NavItem className={`p-0 ml-2 ${activeTab === '1' ? 'bg-tabNonActive' : 'sss'}`}>
                      <NavLink active={activeTab === '2'} onClick={() => setActiveTab('2')}>
                        <div className={`row rowTabCustom align-items-center tabColumn mx-0 ${activeTab === '2' ? ' tab-custom' : 'tab-nonActive'}`}>
                          <span className='number-number-2 tabTitleText' />
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
        {activeTab === '1' ?(
          <TabPane tabId='1' style={{background: "#e9eced"}}>
            <TableMaster
              schemaColumn={schemaColumnDetailPO}
              classNamePaging="display-paging"
              classNameTable="table-detail "
              data={shDetailTable}
              style={{ minHeight: height, maxHeight: height, minWidht: widht, maxWidht: widht }}
              module="Stock Holding Detail"
              noDataText
              pagination={pagination}
              goto={(e) => {
                  setActive(e);
                }}
              getExportData={() => setExportData({ dispatch, data: shDetailTable })}
              page={page}
              setPage={setPage}
              user={user}
              title="Stock Holding Details"
              filename="Microlistics_StockHoldingDetails."
              editColumn='false'
            />
          </TabPane>
          )
         : ''}
        {activeTab === '2' ? (
          <TabPane tabId='2' style={{background: "#e9eced"}}>
            <TableMaster
              schemaColumn={schameColumnForesCast}
              classNamePaging="display-paging"
              classNameTable="table-detail "
              data={shDetailForescast}
              style={{ minHeight: height, maxHeight: height, minWidht: widht, maxWidht: widht }}
              module="Stock Holding Forecast"
              noDataText
              tableStatus={newPage.tableStatus}
              pagination={pagination}
              goto={(e) => {
                  setActive(e);
                }}
              getExportData={() => setExportData({ dispatch, data: shDetailForescast })}
              page={page}
              setPage={setPage}
              user={user}
              title="Stock Holding Forecast"
              filename="Microlistics_StockHoldingForecast."
              editColumn='false'
            />
          </TabPane>
      ) :''}
        
      </TabContent>
    </div>
  );
};

export default StockHoldingDetail;
