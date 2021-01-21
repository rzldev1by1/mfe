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
  const pagination = useSelector((state) => state.pagination);
  const siteData = useSelector((state) => state.siteData);
  const clientData = useSelector((state) => state.clientData);
  const [active, setActive] = useState(1);
  const user = useSelector((state) => state.user);
  const module = "salesOrder"
  const [page, setPage] = useState({
    // Paging
    notifPaging: false,
    goPage: 1,
    // table
    data: [],
    tableStatus: 'waiting',
    status: null,
    search: '',
    active: {},
  });
  const newPage = { ...page };

  useEffect(() => { }, [page]);
  useEffect(() => {
    getDetailHeader({ dispatch, props, module });
  }, []);
  useEffect(() => {
    getDetailData({ dispatch, props, page, active, setPage, module });
  }, [active]);

  const height = window.innerHeight - 490;
  const widht = window.innerWidth;


  const indexCustomerName = soDetail?.customername.split(":")
  return (
    <div>
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
          valeuRightOne={siteCheck({val:soDetail?.site, site:siteData}) || '-'}
          valeuRightTwo={clientCheck({val:soDetail?.client, client:clientData}) || '-'}
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
          valeuLeftOne={(soDetail?.status && soDetail?.status.includes("0:") ? "0: Unavailable" : soDetail?.status) || '-'}
          valeuLeftTwo={soDetail?.consignmentno || '-'}
          valeuLeftThree={soDetail?.deliverydate || '-'}
          valeuLeftFour={soDetail?.datereceived || '-'}
          valeuLeftFive={formatDate(soDetail?.datereleased) || '-'}
          valeuLeftSix={formatDate(soDetail?.datecompleted) || '-'}
          valeuLeftSeven={soDetail?.loadnumber || '-'}
          valeuLeftEight={formatDate(soDetail?.loadoutstart) || '-'}
          valeuLeftNine={formatDate(soDetail?.loadoutfinish) || '-'}
          valeuLeftTen={soDetail?.freightcharge || '-'}
        />
      </div>
      <TableMaster
        schemaColumn={schemaColumnDetailPO}
        classNamePaging="display-paging"
        classNameTable="table-detail "
        data={soDetailTable}
        style={{ minHeight: height, maxHeight: height, minWidht: widht, maxWidht: widht }}
        module="Sales Orders Detail"
        noDataText
        tableStatus={newPage.tableStatus}
        pagination={pagination}
        goto={(e) => {
          setActive(e);
        }}
        getExportData={() => setExportData({ dispatch, data: soDetailTable })}
        page={page}
        setPage={setPage}
        user={user}
        title="Sales Order Details"
        filename="Microlistics_SalesOrderDetails."
        exportPdf={false}
      />
    </div>
  );
};

export default SalesOrdersDetail;
