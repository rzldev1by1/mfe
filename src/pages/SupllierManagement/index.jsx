/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Breadcrumb from '../../Component/Breadcrumb';
import Search from './Search';
import TableMaster from '../../Component/TableMaster';
import { getSummaryData } from '../../apiService';
import { schemaColumn } from './service';
import './style.scss';

const SupllierManagement = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const spSummaryData = useSelector((state) => state.spSummaryData);
  const paginationSp = useSelector((state) => state.paginationSp);

  const module = 'SupplierManagement';

  // dimension
  const [dimension, setDimension] = useState({
    height: window.innerHeight - 257,
    width: window.innerWidth,
  });
  const { width, height } = dimension;

  useEffect(() => {
    getSummaryData({ dispatch, active: paginationSp?.active, module });
  }, []);
  console.log(spSummaryData);
  return (
    <div className="supllierManagement">
      <Breadcrumb breadcrumb={[{ to: '/supplier-management', label: 'Supplier Management', active: true }]} userInfo user={user} />
      <div>
        <Search placeholder="Enter purchase order no." />
      </div>
      <div>
        <TableMaster
          // onClick={showDetails}
          schemaColumn={schemaColumn}
          data={spSummaryData}
          style={{ minHeight: height, maxHeight: height, maxWidth: width }}
          module={module}
          noDataText
          pagination={paginationSp}
          // goto={(e) => {
          //   dispatch({ type: 'PAGING_SH', data: { ...paginationSh, active: e } });
          // }}
          user={user}
          // columnHidden={columnHidden}
          title="Supplier Management"
          splitModule="supplier-management"
          exportBtn={false}
        />
      </div>
    </div>
  );
};

export default SupllierManagement;
