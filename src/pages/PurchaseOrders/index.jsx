import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CButton } from '@coreui/react';
import Search from '../../Component/Search';
import Breadcrumb from '../../Component/Breadcrumb';
import TableMaster from '../../Component/TableMaster';
import { schemaColumn } from './services';
import { getSummaryData } from '../../apiService';
import Create from './Create';
import endpoints from '../../helpers/endpoints';

const PurchaseOrders = (props) => {
  const {history} = props
  const showDetails = (item) => {
    history.push(`/purchase-order/${item.site}/${item.client}/${item.order_no}`);
  };

  const createBtn = endpoints.env.REACT_APP_API_URL_CREATE;

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
    getSummaryData({
      dispatch,
      active: paginationPo?.active,
      module,
      siteVal: user.site,
      clientVal: user.client,
      user,
    });
  }, []);

  const [columnHidden, setColumnHidden] = useState(null);
  const [state2, setState2] = useState(null);
  if (!columnHidden) {
    setColumnHidden(localStorage.getItem('tableColumns') ? JSON.parse(localStorage.getItem('tableColumns')) : []);
    setState2(true);
  }
  console.log(columnHidden);
  useEffect(() => {
    if (stateChangeHeader) {
      const reqColumnHidden = localStorage.getItem('tableColumns')
        ? JSON.parse(localStorage.getItem('tableColumns'))
        : [];
      reqColumnHidden?.forEach((data) => {
        if (data.title === 'Purchase Order Summary') {
          setColumnHidden(data.columns);
        }
      });
      dispatch({ type: 'CHANGE_HEADER', data: false });
    }
  }, [stateChangeHeader]);

  useEffect(() => {
    if (state2) {
      const reqColumnHidden = localStorage.getItem('tableColumns')
        ? JSON.parse(localStorage.getItem('tableColumns'))
        : [];
      let tmp = null;
      reqColumnHidden?.forEach((data) => {
        if (data.title === 'Purchase Order Summary') {
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
      // getSummaryData({ dispatch, active: paginationPo?.active, Export, module });
    }
  }, [Export]);
  return (
    <div>
      <Breadcrumb
        breadcrumb={[{ to: '/purchase-order', label: 'Purchase Order', active: true }]}
        button={(
          <CButton
            onClick={() => setShowModal(true)}
            className={`btn btn-primary btn-create float-right ${createBtn === 'true' ? '' : 'd-none'}`}
          >
            CREATE PURCHASE ORDER
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
            splitModule="purchase-order"
            exportBtn
          />
        </div>
      </div>
      <Create show={showModal} setShow={setShowModal} />
    </div>
  );
};

export default PurchaseOrders;
