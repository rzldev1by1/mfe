/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CButton } from '@coreui/react';
import Search from '../../Component/Search';
import Breadcrumb from '../../Component/Breadcrumb';
import TableMaster from '../../Component/TableMaster';
import { schemaColumn, exportColumns } from './services';
import { searchPurchaseOrder } from '../../apiService';
import Create from './Create';

const PurchaseOrders = (props) => {
  const showDetails = (item) => {
    props.history.push(`/purchase-order/${item.site}/${item.client}/${item.order_no}`);
  };

  const dispatch = useDispatch();
  const poSummaryData = useSelector((state) => state.poSummaryData);
  const pagination = useSelector((state) => state.pagination);
  const user = useSelector((state) => state.user);
  const exportData = useSelector((state) => state.exportData);
  const item = user;
  const [active, setActive] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [Export, setExport] = useState(false);
  const height = window.innerHeight - 257;

  const [page, setPage] = useState({
    // Paging
    notifPaging: false,
    goPage: 1,
    // table
    data: [],
    tableStatus: 'lol',
    status: null,
    search: '',
    active: '',
  });
  const widht = window.innerWidth;
  const newPage = { ...page };
  useEffect(() => {}, [page]);
  useEffect(() => {
    searchPurchaseOrder({ dispatch, page, active, setPage });
  }, [active]);

  useEffect(() => {
    if (Export === true) {
      setExport(false);
      searchPurchaseOrder({ dispatch, page, active, setPage, Export });
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
            page={page}
            setPage={setPage}
            filterSite
            filterClient
            filterStatus
            filterOrderType
            filterTask
            placeholder="Enter an Order No"
            filter
          />
        </div>
        <div>
          <TableMaster
            onClick={showDetails}
            schemaColumn={schemaColumn}
            data={poSummaryData}
            style={{ minHeight: height, maxHeight: height, minWidht: widht, maxWidht: widht }}
            module="Purchase Orders"
            noDataText
            tableStatus={newPage.tableStatus}
            pagination={pagination}
            goto={(e) => {
              setActive(e);
            }}
            exportColumns={exportColumns}
            exportData={exportData}
            page={page}
            setPage={setPage}
            title="Purchase Order Summary"
            filename="Microlistics_PurchaseOrder."
            font="9"
            getExportData={async () => {
              setExport(true);
            }}
          />
        </div>
      </div>
      <Create show={showModal} setShow={setShowModal} />
    </div>
  );
};

export default PurchaseOrders;
