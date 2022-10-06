import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Breadcrumb from '../../../Component/Breadcrumb';
import DetailHeader from '../../../Component/DetailHeader';
import TableMaster from '../../../Component/TableMaster';
import { getDetailData, getDetailHeader } from '../../../apiService';
import { setExportData, schemaColumnDetailSO, headerDetailCenter, headerDetailRight, headerDetailLeft } from '../services'

const SalesOrdersDetail = (props) => {
  const { match } = props
  const dispatch = useDispatch();
  const soDetail = useSelector((state) => state.soDetail);
  const soDetailTable = useSelector((state) => state.soDetailTable);
  const paginationSoDetail = useSelector((state) => state.paginationSoDetail);
  const stateChangeHeader = useSelector((state) => state.changeHeader);
  const user = useSelector((state) => state.user);
  const exportData = useSelector((state) => state.exportData);
  const [Export, setExport] = useState(false);
  const module = 'SalesOrdersDetail';

  // dimension
  const [dimension, setDimension] = useState({
    height: window.innerHeight - 540,
    width: window.innerWidth,
  });
  const { width, height } = dimension;

  useEffect(() => {
    const handleResize = () => {
      setDimension({
        height: window.innerHeight - 540,
        width: window.innerWidth,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  useEffect(() => {
    getDetailHeader({ dispatch, props, module });
  }, []);

  useEffect(() => {
    getDetailData({ dispatch, props, active: paginationSoDetail?.active, module });
  }, []);

  const [columnHidden, setColumnHidden] = useState(null);
  const [state2, setState2] = useState(null);
  if (!columnHidden) {
    setColumnHidden(localStorage.getItem('tableColumns') ? JSON.parse(localStorage.getItem('tableColumns')) : []);
    setState2(true);
  }

  useEffect(() => {
    if (stateChangeHeader) {
      const reqColumHidden = localStorage.getItem('tableColumns') ? JSON.parse(localStorage.getItem('tableColumns')) : [];
      if (reqColumHidden) {
        reqColumHidden.forEach(data => {
          if (data.title === 'Sales Order Details') {
            setColumnHidden(data.columns);
          }
        });
      }
      dispatch({ type: 'CHANGE_HEADER', data: false });
    }
  }, [stateChangeHeader]);

  useEffect(() => {
    if (state2) {
      const reqColumHidden = localStorage.getItem('tableColumns') ? JSON.parse(localStorage.getItem('tableColumns')) : [];
      let tmp = null;
      if (reqColumHidden) {
        reqColumHidden.forEach(data => {
          if (data.title === 'Sales Order Details') {
            tmp = data.columns;
          }
        });
      }
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
      getDetailData({ dispatch, active: paginationSoDetail?.active, Export, module });
    }
  }, [Export]);

  console.log(schemaColumnDetailSO)

  return (
    <div className="so-detail">
      <Breadcrumb
        breadcrumb={[
          { to: '/sales-order', label: 'Sales Order' },
          { to: '', label: match.params.orderno, active: true },
        ]}
      />
      <div className="pb-3">
        <DetailHeader
          headerDetailCenter={headerDetailCenter}
          headerDetailRight={headerDetailRight}
          headerDetailLeft={headerDetailLeft}
          data={soDetail}
          valueModal={soDetail?.deliverydescription || '-'}
        />
      </div>
      <TableMaster
        props={props}
        schemaColumn={schemaColumnDetailSO}
        classNamePaging="display-paging"
        classNameTable="table-detail "
        data={soDetailTable}
        style={{ minHeight: height, maxHeight: height, minWidht: width, maxWidht: width }}
        module="SalesOrdersDetail"
        noDataText
        exportData={exportData}
        columnHidden={columnHidden}
        pagination={paginationSoDetail}
        goto={(e) => {
          dispatch({ type: 'PAGING_SO_DETAIL', data: { ...paginationSoDetail, active: e } });
        }}
        getExportData={() => setExportData({ dispatch, data: soDetailTable })}
        user={user}
        title="Sales Order Details"
        filename="Microlistics_SalesOrderDetails."
        isDisplay={false}
        splitModule="sales-order/detail"
        exportBtn
        editColumn="false"
      />
    </div>
  );
};

export default SalesOrdersDetail;
