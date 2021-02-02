/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CButton } from '@coreui/react';
import Search from '../../Component/Search';
import Breadcrumb from '../../Component/Breadcrumb';
import TableMaster from '../../Component/TableMaster';
import { schemaColumn } from './services';
import { getSummaryData } from '../../apiService';
import Create from './Create';
import './index.scss';

const PurchaseOrders = (props) => {
  const showDetails = (item) => {
    props.history.push(`/purchase-order/${item.site}/${item.client}/${item.order_no}`);
  };

  const dispatch = useDispatch();
  const poSummaryData = useSelector((state) => state.poSummaryData);
  const paginationPo = useSelector((state) => state.paginationPo);
  const stateChangeHeader = useSelector((state) => state.changeHeader);
  const user = useSelector((state) => state.user);
  const exportData = useSelector((state) => state.exportData);
  const [showModal, setShowModal] = useState(false);
  const [Export, setExport] = useState(false);
  const module = 'purchaseOrder';

  // dimension
  const [dimension, setDimension] = useState({
    height: window.innerHeight - 257,
    width: window.innerWidth,
  });
  const { width, height } = dimension;

  useEffect(() => {
    const handleResize = () => {
      setDimension({
        height: window.innerHeight - 257,
        width: window.innerWidth,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
  useEffect(() => {
    getSummaryData({ dispatch, active: paginationPo?.active, module });
  }, []);

  const [columnHidden, setColumnHidden] = useState(null);
  const [state2, setState2] = useState(null);
  if (!columnHidden) {
    setColumnHidden(localStorage.getItem('tableColumns') ? JSON.parse(localStorage.getItem('tableColumns')) : []);
    setState2(true);
  }

  const UrlHeader = () => {
    return `/getPurchaseOrderColumn?client=ALL`;
  };

  useEffect(() => {
    if (stateChangeHeader) {
      setColumnHidden(localStorage.getItem('tableColumns') ? JSON.parse(localStorage.getItem('tableColumns')) : []);
      setState2(true);
    }
  }, [stateChangeHeader]);

  useEffect(() => {
    if (state2) {
      let x = columnHidden?.map((data, idx) => {
        if (data.title === 'Purchase Order Summary') {
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
      getSummaryData({ dispatch, active: paginationPo?.active, Export, module });
    }
  }, [Export]);
  return (
    <div>
      <Breadcrumb
        breadcrumb={[{ to: '/purchase-order', label: 'Purchase Order', active: true }]}
        button={
          <CButton onClick={() => setShowModal(true)} className="btn btn-primary btn-create float-right">
            CREATE PURCHASE ORDER
          </CButton>
        }
      />
      <div>
        <div>
          <Search
            module={module}
            filterSite
            filterClient
            filterStatus
            filterOrderType
            filterTask
            placeholder="Enter an Order No"
            filter
            onChangeGetTask
          />
        </div>
        <div>
          <TableMaster
            onClick={showDetails}
            schemaColumn={schemaColumn}
            data={poSummaryData}
            style={{ minHeight: height, maxHeight: height, maxWidth: width }}
            module={module}
            noDataText
            pagination={paginationPo}
            goto={(e) => {
              dispatch({ type: 'PAGING_PO', data: { ...paginationPo, active: e } });
            }}
            exportData={exportData}
            user={user}
            columnHidden={columnHidden}
            title="Purchase Order Summary"
            filename="Microlistics_PurchaseOrder."
            font="9"
            getExportData={async () => {
              setExport(true);
            }}
            splitModule="PurchaseOrder"
          />
        </div>
      </div>
      <Create show={showModal} setShow={setShowModal} />
    </div>
  );
};

export default PurchaseOrders;
