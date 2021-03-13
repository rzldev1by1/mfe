/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Breadcrumb from 'Component/Breadcrumb';
import DetailHeader from 'Component/DetailHeader';
import TableMaster from 'Component/TableMaster';
import { getDetailData, getDetailHeader } from '../../../apiService';
import { setExportData, siteCheck, clientCheck, schemaColumnDetailPO, formatDate } from './services';
import './index.scss';

const SalesOrdersDetail = (props) => {
  const dispatch = useDispatch();
  const soDetail = useSelector((state) => state.soDetail);
  const soDetailTable = useSelector((state) => state.soDetailTable);
  const paginationSoDetail = useSelector((state) => state.paginationSoDetail);
  const siteData = useSelector((state) => state.siteData);
  const clientData = useSelector((state) => state.clientData);
  const stateChangeHeader = useSelector((state) => state.changeHeader);
  const user = useSelector((state) => state.user);
  const exportData = useSelector((state) => state.exportData);
  const [Export, setExport] = useState(false);
  const module = 'salesOrder';

  // dimension
  const [dimension, setDimension] = useState({
    height: window.innerHeight - 450,
    width: window.innerWidth,
  });
  const { width, height } = dimension;

  useEffect(() => {
    const handleResize = () => {
      setDimension({
        height: window.innerHeight - 450,
        width: window.innerWidth,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  useEffect(() => {
    getDetailHeader({ dispatch, props, module });
  }, []);

  useEffect(() => {
    getDetailData({ dispatch, props, active: paginationSoDetail?.active, module });
  }, []);

  const [columnHidden, setColumnHidden] = useState(null);
  const [state2, setState2] = useState(null);
  if (!columnHidden) {
    setColumnHidden(localStorage.getItem('tableColumns') ? JSON.parse(localStorage.getItem('tableColumns')) : []);
    setState2(true);
  }

  useEffect(() => {
    if (stateChangeHeader) {
      let columnHidden = localStorage.getItem('tableColumns') ? JSON.parse(localStorage.getItem('tableColumns')) : [];
      let x = columnHidden?.map((data, idx) => {
        if (data.title === 'Sales Order Details') {
          setColumnHidden(data.columns);
        }
      });
      dispatch({ type: 'CHANGE_HEADER', data: false });
    }
  }, [stateChangeHeader]);

  useEffect(() => {
    if (state2) {
      let columnHidden = localStorage.getItem('tableColumns') ? JSON.parse(localStorage.getItem('tableColumns')) : [];
      let tmp = null;
      let x = columnHidden?.map((data, idx) => {
        if (data.title === 'Sales Order Details') {
          tmp = data.columns;
        }
      });
      if (tmp) {
        setColumnHidden(tmp);
      } else {
        setColumnHidden([]);
      }
      setState2(false);
      dispatch({ type: 'CHANGE_HEADER', data: false });
    }
  }, [state2]);

  useEffect(() => {
    if (Export === true) {
      setExport(false);
      getDetailData({ dispatch, active: paginationSoDetail?.active, Export, module });
    }
  }, [Export]);

  let indexCustomerName = soDetail?.customername ? soDetail?.customername.split(':') : [];
  if (indexCustomerName !== undefined) indexCustomerName = indexCustomerName[1];
  return (
    <div className="so-detail">
      <Breadcrumb
        breadcrumb={[
          { to: '/sales-order', label: 'Sales Order' },
          { to: '', label: props.match.params.orderno, active: true },
        ]}
      />
      <div className="pb-3">
        <DetailHeader
          // title Right
          titleRight
          titleRightOne="Site"
          titleRightTwo="Client"
          titleRightThree="Order No"
          titleRightFour="Order Type"
          titleRightFive="Task"
          titleRightSix="Customer No"
          titleRightSeven="Customer Name"
          titleRightEight="Customer Order Ref"
          titleRightNine="Vendor Order Ref"
          titleRightEleven="Delivery Instructions"
          // Valeu Right
          valeuRightOne={siteCheck({ val: soDetail?.site, site: siteData }) || '-'}
          valeuRightTwo={clientCheck({ val: soDetail?.client, client: clientData }) || '-'}
          valeuRightThree={soDetail?.orderno || '-'}
          valeuRightFour={soDetail?.ordertype || '-'}
          valeuRightFive={soDetail?.isistask || '-'}
          valeuRightSix={soDetail?.customer || '-'}
          valeuRightSeven={indexCustomerName || '-'}
          valeuRightEight={soDetail?.customerpono || '-'}
          valeuRightNine={soDetail?.vendororderno || '-'}
          valeuRightEleven={soDetail?.deliverydescription || '-'}
          // title Center
          titleCenter
          titleCenterOne="Address 1"
          titleCenterTwo="Address 2"
          titleCenterThree="Address 3"
          titleCenterFour="Address 4"
          titleCenterFive="Address 5"
          titleCenterSix="Suburb"
          titleCenterSeven="Postcode"
          titleCenterEight="State"
          titleCenterNine="Country"
          // Valeu Center
          valeuCenterOne={soDetail?.address1 || '-'}
          valeuCenterTwo={soDetail?.address2 || '-'}
          valeuCenterThree={soDetail?.address3 || '-'}
          valeuCenterFour={soDetail?.address4 || '-'}
          valeuCenterFive={soDetail?.address5 || '-'}
          valeuCenterSix={soDetail?.suburb || '-'}
          valeuCenterSeven={soDetail?.postcode || '-'}
          valeuCenterEight={soDetail?.state || '-'}
          valeuCenterNine={soDetail?.country || '-'}
          // title Left
          titleLeft
          titleLeftOne="Status"
          titleLeftTwo="Delivery Date"
          titleLeftThree="Date Received"
          titleLeftFour="Date Released"
          titleLeftFive="Date Completed"
          titleLeftSix="Load Number"
          titleLeftSeven="Loadout Start"
          titleLeftEight="Loadout Finish"
          titleLeftNine="Consignment No"
          titleLeftTen="Freight Charge"
          // Valeu Left
          valeuLeftOne={
            (soDetail?.status && soDetail?.status.includes('0:') ? '0: Unavailable' : soDetail?.status) || '-'
          }
          valeuLeftTwo={formatDate(soDetail?.deliverydate) || '-'}
          valeuLeftThree={formatDate(soDetail?.datereceived) || '-'}
          valeuLeftFour={formatDate(soDetail?.datereleased) || '-'}
          valeuLeftFive={formatDate(soDetail?.datecompleted) || '-'}
          valeuLeftSix={soDetail?.loadnumber || '-'}
          valeuLeftSeven={formatDate(soDetail?.loadoutstart) || '-'}
          valeuLeftEight={formatDate(soDetail?.loadoutfinish) || '-'}
          valeuLeftNine={soDetail?.consignmentno || '-'}
          valeuLeftTen={soDetail?.freightcharge || '-'}
        />
      </div>
      <TableMaster
        schemaColumn={schemaColumnDetailPO}
        classNamePaging="display-paging"
        classNameTable="table-detail "
        data={soDetailTable}
        style={{ minHeight: height, maxHeight: height, minWidht: width, maxWidht: width }}
        module="SalesOrdersDetail"
        noDataText
        exportData={exportData}
        columnHidden={columnHidden}
        pagination={paginationSoDetail}
        goto={(e) => {
          dispatch({ type: 'PAGING_SO_DETAIL', data: { ...paginationSoDetail, active: e } });
        }}
        getExportData={() => setExportData({ dispatch, data: soDetailTable })}
        user={user}
        title="Sales Order Details"
        filename="Microlistics_SalesOrderDetails."
        isDisplay={false}
        splitModule="sales-order-detail"
      />
    </div>
  );
};

export default SalesOrdersDetail;
