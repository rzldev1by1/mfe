/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Search from '../../Component/Search';
import Breadcrumb from '../../Component/Breadcrumb';
import TableMaster from '../../Component/TableMaster';
import { schemaColumn, statusDataSH } from './services';
import { getSummaryData } from '../../apiService';

const PurchaseOrders = (props) => {
  const { history } = props
  const showDetails = (item) => {
    history.push(`/stock-holding${item.product}/${item.client}/${item.site}`);
  };

  const dispatch = useDispatch();
  const shSummaryData = useSelector((state) => state.shSummaryData);
  const paginationSh = useSelector((state) => state.paginationSh);
  const stateChangeHeader = useSelector((state) => state.changeHeader);
  const user = useSelector((state) => state.user);
  const exportData = useSelector((state) => state.exportData);
  const [Export, setExport] = useState(false);
  const module = 'StockHolding';

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
    getSummaryData({ dispatch, active: paginationSh?.active, module, user });
  }, []);

  const [columnHidden, setColumnHidden] = useState(null);
  const [state2, setState2] = useState(null);
  if (!columnHidden) {
    setColumnHidden(localStorage.getItem('tableColumns') ? JSON.parse(localStorage.getItem('tableColumns')) : []);
    setState2(true);
  }

  useEffect(() => {
    if (stateChangeHeader) {
      const reqColumnHidden = localStorage.getItem('tableColumns')
        ? JSON.parse(localStorage.getItem('tableColumns'))
        : [];
      if (reqColumnHidden) {
        reqColumnHidden.map(data => {
          if (data.title === 'Stock Holding Summary') {
            setColumnHidden(data.columns);
          }
          return data;
        });
      }
      dispatch({ type: 'CHANGE_HEADER', data: false });
    }
  }, [stateChangeHeader]);

  useEffect(() => {
    if (state2) {
      const reqColumnHidden = localStorage.getItem('tableColumns')
        ? JSON.parse(localStorage.getItem('tableColumns'))
        : [];
      let tmp = null;
      if (reqColumnHidden) {
        reqColumnHidden.map((data, idx) => {
          if (data.title === 'Stock Holding Summary') {
            tmp = data.columns;
          }
          return data;
        });
      }
      if (tmp) setColumnHidden(tmp);
      else setColumnHidden([]);
      setState2(false);
      dispatch({ type: 'CHANGE_HEADER', data: false });
    }
  }, [state2]);

  useEffect(() => {
    if (Export === true) {
      setExport(false);
    }
  }, [Export]);
  return (
    <div>
      <Breadcrumb breadcrumb={[{ to: '/stock-holding', label: 'Stock Holding', active: true }]} />
      <div>
        <div>
          <Search
            module={module}
            filterSite
            filterClient
            filterStatus
            placeholder="Enter a Product"
            filter
            onChangeGetTask
            statusDataSH={statusDataSH}
            Export={Export}
            btnSearch
            inputTag
          />
        </div>
        <div>
          <TableMaster
            onClick={showDetails}
            schemaColumn={schemaColumn}
            data={shSummaryData}
            style={{ minHeight: height, maxHeight: height, maxWidth: width }}
            module={module}
            noDataText
            pagination={paginationSh}
            goto={(e) => {
              dispatch({ type: 'PAGING_SH', data: { ...paginationSh, active: e } });
            }}
            exportData={exportData}
            user={user}
            columnHidden={columnHidden}
            title="Stock Holding Summary"
            filename="Microlistics_StockHolding."
            font="9"
            getExportData={async () => {
              setExport(true);
            }}
            splitModule="stock-holding"
            exportBtn
          />
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrders;
