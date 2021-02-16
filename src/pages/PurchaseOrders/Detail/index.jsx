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

const PurchaseOrdersDetail = (props) => {
  const dispatch = useDispatch();
  const poDetail = useSelector((state) => state.poDetail);
  const poDetailTable = useSelector((state) => state.poDetailTable);
  const paginationPoDetail = useSelector((state) => state.paginationPoDetail);
  const siteData = useSelector((state) => state.siteData);
  const stateChangeHeader = useSelector((state) => state.changeHeader);
  const clientData = useSelector((state) => state.clientData);
  const user = useSelector((state) => state.user);
  const exportData = useSelector((state) => state.exportData);
  const [Export, setExport] = useState(false);
  const module = 'purchaseOrder';

    // dimension
    const [dimension, setDimension] = useState({
      height: window.innerHeight - 355,
      width: window.innerWidth,
    });
    const { width, height } = dimension;
  
    useEffect(() => {
      const handleResize = () => {
        setDimension({
          height: window.innerHeight - 355,
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
    getDetailData({ dispatch, props, active: paginationPoDetail?.active, module });
  }, []);

  const [columnHidden, setColumnHidden] = useState(null);
  const [state2, setState2] = useState(null);
  if (!columnHidden) {
    setColumnHidden(localStorage.getItem('tableColumns') ? JSON.parse(localStorage.getItem('tableColumns')) : []);
    setState2(true);
  }

  useEffect(() => {
    if (stateChangeHeader) {
      setColumnHidden(localStorage.getItem('tableColumns') ? JSON.parse(localStorage.getItem('tableColumns')) : []);
      setState2(true);
    }
  }, [stateChangeHeader]);

  useEffect(() => {
    if (state2) {
      let x = columnHidden?.map((data, idx) => {
        if (data.title === 'Purchase Order Details') {
          setColumnHidden(data.columns);
        }
      });
      setState2(false);
      dispatch({ type: 'CHANGE_HEADER', data: false });
    }
  }, [state2]);

  useEffect(() => {
    if (Export === true) {
      setExport(false);
      getDetailData({ dispatch, active: paginationPoDetail?.active, Export, module });
    }
  }, [Export]);
  
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
          valeuRightOne={siteCheck({ val: poDetail?.site, site: siteData }) || '-'}
          valeuRightTwo={clientCheck({ val: poDetail?.client, client: clientData }) || '-'}
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
          valeuLeftOne={formatDate(poDetail?.delivery_date) || '-'}
          valeuLeftTwo={formatDate(poDetail?.date_received) || '-'}
          valeuLeftThree={formatDate(poDetail?.date_released) || '-'}
          valeuLeftFour={formatDate(poDetail?.date_completed) || '-'}
        />
      </div>
      <TableMaster
        schemaColumn={schemaColumnDetailPO}
        classNamePaging="display-paging"
        classNameTable="table-detail "
        data={poDetailTable}
        style={{ minHeight: height, maxHeight: height, minWidht: width, maxWidht: width }}
        module="PurchaseOrdersDetail"
        noDataText
        exportData={exportData}
        columnHidden={columnHidden}
        pagination={paginationPoDetail}
        goto={(e) => {
          dispatch({ type: 'PAGING_PO_DETAIL', data: { ...paginationPoDetail, active: e } });
        }}
        getExportData={() => setExportData({ dispatch, data: poDetailTable })}
        user={user}
        title="Purchase Order Details"
        filename="Microlistics_PurchaseOrderDetails."
        isDisplay={false}
        splitModule="purchase-order-detail"
      />
    </div>
  );
};

export default PurchaseOrdersDetail;
