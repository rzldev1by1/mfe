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

  const dispatch = useDispatch();
  const soSummaryData = useSelector((state) => state.soSummaryData);
  const paginationSo = useSelector((state) => state.paginationSo);
  const user = useSelector((state) => state.user);
  const exportData = useSelector((state) => state.exportData);
  const [showModal, setShowModal] = useState(false);
  const [Export, setExport] = useState(false);
  const module = 'salesOrder';

  const height = window.innerHeight - 257;
  const width = window.innerWidth;

  useEffect(() => {
    getSummaryData({ dispatch, active: paginationSo?.active, module });
  }, []);

  const [columnHidden, setColumnHidden] = useState(null);
  const [state2, setState2] = useState(null);
  if (!columnHidden) {
    setColumnHidden(localStorage.getItem('tableColumns') ? JSON.parse(localStorage.getItem('tableColumns')) : []);
    setState2(true);
  }

  useEffect(() => {
    if (state2) {
      const x = columnHidden?.map((data, idx) => {
        if (data.title === 'Sales Order Summary') {
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
      getSummaryData({ dispatch, active: paginationSo?.active, Export, module });
    }
  }, [Export]);
  return (
    <div>
      <Breadcrumb
        breadcrumb={[{ to: '/sales-order', label: 'Sales Order', active: true }]}
        button={
          <CButton onClick={() => setShowModal(true)} className="btn btn-primary btn-create float-right">
            CREATE SALES ORDER
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
            exportPdf={false}
          />
        </div>
      </div>
      <Create show={showModal} setShow={setShowModal} />
    </div>
  );
};

export default SalesOrders;
