/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable prefer-const */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
      getSummaryData({ dispatch, active: paginationSh?.active, module });
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
        if (data.title === 'Stock Holding Summary') {
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
      getSummaryData({ dispatch, active: paginationSh?.active, Export, module });
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
          />
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrders;
