/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CButton } from '@coreui/react';
import Search from '../../Component/Search';
import Breadcrumb from '../../Component/Breadcrumb';
import TableMaster from '../../Component/TableMaster';
import { schemaColumn, statusDataSH } from './services';
import { getSummaryData } from '../../apiService';
import './index.scss';

const PurchaseOrders = (props) => {
  const showDetails = (item) => {
    props.history.push(`/stock-holding${item.product}/${item.client}/${item.site}`);
  };

  const dispatch = useDispatch();
  const shSummaryData = useSelector((state) => state.shSummaryData);
  const pagination = useSelector((state) => state.pagination);
  const stateChangeHeader = useSelector((state) => state.changeHeader); 
  const user = useSelector((state) => state.user);
  const exportData = useSelector((state) => state.exportData);
  const item = user;
  const [active, setActive] = useState(1);
  const [Export, setExport] = useState(false);
  const module = 'StockHolding';

  //dimension
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
  const newPage = { ...page };
  useEffect(() => {}, [page]);
  useEffect(() => {
    getSummaryData({ dispatch, page, active, setPage, module });
  }, [active]);
  
  const [columnHidden, setColumnHidden] = useState(null);  
  const [state2, setState2] = useState(null);   
  if(!columnHidden){
    setColumnHidden(localStorage.getItem("tableColumns") ? JSON.parse(localStorage.getItem("tableColumns")) : []) 
    setState2(true)
  }

  const UrlHeader = () => {
    return `/getPurchaseOrderColumn?client=ALL`
  }
  
  useEffect(() => {
    if(stateChangeHeader){ 
      setColumnHidden(localStorage.getItem("tableColumns") ? JSON.parse(localStorage.getItem("tableColumns")) : [])  
      setState2(true) 
    }
  }, [stateChangeHeader]);  
  
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

  useEffect(() => {
    if (Export === true) {
      setExport(false);
      getSummaryData({ dispatch, page, active, setPage, Export, module });
    }
  }, [Export]);
  return (
    <div>
      <Breadcrumb
        breadcrumb={[{ to: '/stock-holding', label: 'Stock Holding', active: true }]}
      />
      <div>
        <div>
          <Search
            page={page}
            setPage={setPage}
            module={module}
            filterSite
            filterClient
            filterStatus
            placeholder="Enter an Order No"
            filter
            onChangeGetTask
            statusDataSH={statusDataSH}
          />
        </div>
        <div>
          <TableMaster
            onClick={showDetails}
            schemaColumn={schemaColumn}
            data={shSummaryData}
            style={{ minHeight: height, maxHeight: height, maxWidth: width }}
            module="Purchase Orders"
            noDataText
            tableStatus={newPage.tableStatus}
            pagination={pagination}
            goto={(e) => {
              setActive(e);
            }}
            exportData={exportData}
            page={page}
            setPage={setPage}
            user={user}
            columnHidden={columnHidden}
            title="Purchase Order Summary"
            filename="Microlistics_PurchaseOrder."
            font="9"
            getExportData={async () => {
              setExport(true);
            }}
            UrlHeader={UrlHeader}
          />
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrders;
