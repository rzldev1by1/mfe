/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Breadcrumb from 'Component/Breadcrumb';
import DetailHeader from 'Component/DetailHeader';
import TableMaster from 'Component/TableMaster';
import { getDetail, getProductsTable } from '../services';
import {  setExportData,
          siteCheck,
          clientCheck,
          schemaColumnDetailPO } from './services';
import './index.scss';

const PurchaseOrdersDetail = (props) => {
  const dispatch = useDispatch();
  const poDetail = useSelector((state) => state.poDetail);
  const poDetailTable = useSelector((state) => state.poDetailTable);
  const pagination = useSelector((state) => state.pagination);
  const [active, setActive] = useState(1);
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

  useEffect(() => {}, [page]);
  useEffect(() => {
    getDetail({ dispatch, props });
  }, []);
  useEffect(() => {
    getProductsTable({ dispatch, props, page, active, setPage });
  }, [active]);

  const height = window.innerHeight - 370;
  const widht = window.innerWidth;
  return (
    <div>
      <Breadcrumb
        breadcrumb={[
          { to: '/purchase-order', label: 'Purchase Order' },
          { to: '', label: props.match.params.orderdetail, active: true },
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
          titleRightSix="Status"
          // Valeu Right
          valeuRightOne={siteCheck(poDetail?.site) || '-'}
          valeuRightTwo={clientCheck(poDetail?.client ) || '-'}
          valeuRightThree={poDetail?.order_no || '-'}
          valeuRightFour={poDetail?.order_type || '-'}
          valeuRightFive={poDetail?.isis_task || '-'}
          valeuRightSix={poDetail?.status || '-'}
          // title Center
          titleCenter
          titleCenterOne="Supplier No"
          titleCenterTwo="Supplier Name"
          titleCenterThree="Customer Order Ref"
          titleCenterFour="Vendor Order Ref"
          // Valeu Center
          valeuCenterOne={poDetail?.supplier_no || '-'}
          valeuCenterTwo={poDetail?.supplier_name || '-'}
          valeuCenterThree={poDetail?.customer_order_ref || '-'}
          valeuCenterFour={poDetail?.vendor_oreder_ref || '-'}
          // title Left
          titleLeft
          titleLeftOne="Order Date"
          titleLeftTwo="Date Received"
          titleLeftThree="Date Released"
          titleLeftFour="Date Completed"
          // Valeu Left
          valeuLeftOne={poDetail?.delivery_date || '-'}
          valeuLeftTwo={poDetail?.date_received || '-'}
          valeuLeftThree={poDetail?.date_released || '-'}
          valeuLeftFour={poDetail?.date_completed || '-'}
        />
      </div>
      <TableMaster
        schemaColumn={schemaColumnDetailPO}
        classNamePaging='display-paging'
        classNameTable='table-detail '
        data={poDetailTable}
        style={{ minHeight: height, maxHeight: height, minWidht: widht, maxWidht: widht }}
        module="Purchase Orders"
        noDataText
        tableStatus={newPage.tableStatus}
        pagination={pagination}
        goto={(e) => {
          setActive(e);
        }}
        getExportData={() => setExportData({ dispatch, data: poDetailTable })}
        page={page}
        setPage={setPage}
        title="Purchase Order Details"
        filename="Microlistics_PurchaseOrderDetails."
      />
    </div>
  );
};

export default PurchaseOrdersDetail;
