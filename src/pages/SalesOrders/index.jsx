/* eslint-disable array-callback-return */
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

const SalesOrders = (props) => {
  const showDetails = (item) => {
    props.history.push(`/sales-order/${item.client}/${item.site}/${item.orderno}`);
  };

  const createBtn = process.env.REACT_APP_API_URL_CREATE;

  const dispatch = useDispatch();
  const soSummaryData = useSelector((state) => state.soSummaryData);
  const paginationSo = useSelector((state) => state.paginationSo);
  const stateChangeHeader = useSelector((state) => state.changeHeader);
  const user = useSelector((state) => state.user);
  const exportData = useSelector((state) => state.exportData);
  const [showModal, setShowModal] = useState(false);
  const [Export, setExport] = useState(false);
  const module = 'salesOrder';

  const [dimension, setDimension] = useState({
    height: window.innerHeight - 330,
    width: window.innerWidth,
  });
  const { width, height } = dimension;
  useEffect(() => {
    const handleResize = () => {
      setDimension({
        height: window.innerHeight - 330,
        width: window.innerWidth,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  useEffect(() => {
    getSummaryData({ dispatch, active: paginationSo?.active, module, siteVal: user.site, clientVal: user.client });
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
        if (data.title === 'Sales Order Summary') {
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
        if (data.title === 'Sales Order Summary') {
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
      // getSummaryData({ dispatch, active: paginationSo?.active, Export, module });
    }
  }, [Export]);
  return (
    <div>
      <Breadcrumb
        breadcrumb={[{ to: '/sales-order', label: 'Sales Order', active: true }]}
        button={(
          <CButton onClick={() => setShowModal(true)} className={`btn btn-primary btn-create float-right ${createBtn === 'true' ? '' : 'd-none'}`}>
            CREATE SALES ORDER
          </CButton>
        )}
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
            Export={Export}
            btnSearch
            inputTag
          />
        </div>
        <div>
          <TableMaster
            onClick={showDetails}
            schemaColumn={schemaColumn}
            data={soSummaryData}
            style={{ minHeight: height, maxHeight: height, minWidht: width, maxWidht: width }}
            module={module}
            noDataText
            pagination={paginationSo}
            goto={(e) => {
              dispatch({ type: 'PAGING_SO', data: { ...paginationSo, active: e } });
            }}
            exportData={exportData}
            user={user}
            columnHidden={columnHidden}
            title="Sales Order Summary"
            filename="Microlistics_SalesOrder."
            font="9"
            getExportData={async () => {
              setExport(true);
            }}
            splitModule="sales-order"
            exportPdf
          />
        </div>
      </div>
      <Create show={showModal} setShow={setShowModal} />
    </div>
  );
};

export default SalesOrders;
