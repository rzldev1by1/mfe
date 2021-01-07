import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CButton } from '@coreui/react';
import Search from '../../Component/Search';
import Breadcrumb from '../../Component/Breadcrumb';
import TableMaster from '../../Component/TableMaster';
import { schemaColumn } from './services';
import { searchPurchaseOrder } from '../../apiService';
import Create from './Create';

const PurchaseOrders = () => {
  const dispatch = useDispatch();
  const poSummaryData = useSelector((state) => state.poSummaryData);
  const pagination = useSelector((state) => state.pagination);
  const stateChangeHeader = useSelector((state) => state.changeHeader); 
  const [page, setPage] = useState({
    // Paging
    notifPaging: false,
    goPage: 1,
    // table
    data: [],
    tableStatus: 'waiting',
    status: null,
    search: '',
    active: '',
  });
  const user = useSelector((state) => state.user);
  const item = user;
  const [active, setActive] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const height = window.innerHeight - 257;
  const widht = window.innerWidth;
  useEffect(() => {}, [page]);

  useEffect(() => {
    searchPurchaseOrder({ dispatch, page, active, setPage });
  }, [active]);

  const [columnHidden, setColumnHidden] = useState(null);  
  const [state2, setState2] = useState(null);  

  if(!columnHidden || stateChangeHeader){
    setColumnHidden(localStorage.getItem("tableColumns") ? JSON.parse(localStorage.getItem("tableColumns")) : []) 
    setState2(true)
  }
  
  useEffect(() => {
    if(state2){ 
      let x = columnHidden?.map((data,idx) => {
        if(data.title==="Purchase Order Summary"){
          setColumnHidden(data.columns);
        }
      }) 
      setState2(false)
      dispatch({type:'CHANGE_HEADER', data:false})
    }
  }, [state2]);  
  

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
          <Search filterSite filterClient filterStatus filterOrderType filterTask placeholder="Enter SKU" filter />
        </div>
        <div>
          <TableMaster
            schemaColumn={schemaColumn}
            data={poSummaryData}
            style={{ minHeight: height, maxHeight: height, minWidht: widht, maxWidht: widht }}
            module="Purchase Orders"
            onClick={`/purchase-order/${item.site}/${item.client}/${item.order_no}`}
            noDataText
            tableStatus
            pagination={pagination}
            goto={(e) => {
              setActive(e);
            }}
            exportData
            page={page}
            setPage={setPage}
            user={user}
            title="Purchase Order Summary"
            columnHidden={columnHidden}
          />
        </div>
      </div>
      <Create show={showModal} setShow={setShowModal} />
    </div>
  );
};

export default PurchaseOrders;
