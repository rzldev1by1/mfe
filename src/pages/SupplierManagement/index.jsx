/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Breadcrumb from '../../Component/Breadcrumb';
import Search from './Search';
import TableMaster from '../../Component/TableMaster';
import { getSummaryData } from '../../apiService';
import { schemaColumn } from './service';
import './style.scss';

const SupplierManagement = (props) => {
  const showDetails = (item) => {
    props.history.push(`/supplier-management/${item.order_no}`);
  };

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const spSummaryData = useSelector((state) => state.spSummaryData);
  const paginationSp = useSelector((state) => state.paginationSp);
  const stateChangeHeader = useSelector((state) => state.changeHeader);
  const module = 'SupplierManagement';

  // dimension
  const [dimension, setDimension] = useState({
    height: window.innerHeight - 257,
    width: window.innerWidth,
  });
  const { width, height } = dimension;
  useEffect(() => {
    const handleResize = () => {
      setDimension({
        height: window.innerHeight - 253,
        width: window.innerWidth,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  useEffect(() => {
    getSummaryData({ dispatch, active: paginationSp?.active, module });
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
        if (data.title === 'Supplier Management') {
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
        if (data.title === 'Supplier Management') {
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
  
  return (
    <div className="supplierManagement">
      <Breadcrumb breadcrumb={[{ to: '/supplier-management', label: 'Supplier Management', active: true }]} userInfo user={user} />
      <div>
        <Search placeholder="Enter purchase order no." module={module} btnSearch inputTag />
      </div>
      <div>
        <TableMaster
          onClick={showDetails}
          schemaColumn={schemaColumn}
          data={spSummaryData}
          style={{ minHeight: height, maxHeight: height, maxWidth: width }}
          module={module}
          noDataText
          pagination={paginationSp}
          goto={(e) => {
            dispatch({ type: 'PAGING_SP', data: { ...paginationSp, active: e } });
          }}
          user={user}
          columnHidden={columnHidden}
          title="Supplier Management"
          splitModule="supplier-management"
          exportBtn={false}
        />
      </div>
    </div>
  );
};

export default SupplierManagement;
