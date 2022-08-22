import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TableMaster from '../../../Component/TableMaster';
import DetailHeader from '../../../Component/DetailHeader';
import Breadcrumb from '../../../Component/Breadcrumb';
import { getDetailData, getDetailHeader } from '../../../apiService';
import { setExportData, schemaColumnDetailPO, headerDetailCenter, headerDetailRight, headerDetailLeft } from './services';
import './index.scss';

const PurchaseOrdersDetail = (props) => {
  const { match } = props
  const dispatch = useDispatch();
  const poDetail = useSelector((state) => state.poDetail);
  const poDetailTable = useSelector((state) => state.poDetailTable);
  const paginationPoDetail = useSelector((state) => state.paginationPoDetail);
  const stateChangeHeader = useSelector((state) => state.changeHeader);
  const user = useSelector((state) => state.user);
  const exportData = useSelector((state) => state.exportData);
  const [Export, setExport] = useState(false);
  const module = 'PurchaseOrdersDetail';
  // dimension
  const [dimension, setDimension] = useState({
    height: window.innerHeight - 355,
    width: window.innerWidth,
  });
  const { width, height } = dimension;

  useEffect(() => {
    const handleResize = () => {
      setDimension({
        height: window.innerHeight - 355,
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
    getDetailData({ dispatch, props, active: paginationPoDetail?.active || 1, module });
  }, []);

  const [columnHidden, setColumnHidden] = useState(null);
  const [state2, setState2] = useState(null);
  if (!columnHidden) {
    setColumnHidden(localStorage.getItem('tableColumns') ? JSON.parse(localStorage.getItem('tableColumns')) : []);
    setState2(true);
  }

  useEffect(() => {
    if (stateChangeHeader) {
      const reqColumnHidden = localStorage.getItem('tableColumns') ? JSON.parse(localStorage.getItem('tableColumns')) : [];
      reqColumnHidden?.forEach((data) => {
        if (data.title === 'Purchase Order Details') {
          setColumnHidden(data.columns);
        }
      });
      dispatch({ type: 'CHANGE_HEADER', data: false });
    }
  }, [stateChangeHeader]);

  useEffect(() => {
    if (state2) {
      const reqColumnHidden = localStorage.getItem('tableColumns') ? JSON.parse(localStorage.getItem('tableColumns')) : [];
      let tmp = null;
      reqColumnHidden?.forEach((data) => {
        if (data.title === 'Purchase Order Details') {
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
      getDetailData({ dispatch, active: paginationPoDetail?.active || 1, Export, module });
    }
  }, [Export]);
  return (
    <div>
      <Breadcrumb
        breadcrumb={[
          { to: '/purchase-order', label: 'Purchase Order' },
          { to: '', label: match.params.orderdetail, active: true },
        ]}
      />
      <div className="pb-3">
        <DetailHeader
          headerDetailCenter={headerDetailCenter}
          headerDetailRight={headerDetailRight}
          headerDetailLeft={headerDetailLeft}
          data={poDetail}
        />
      </div>
      <TableMaster
        props={props}
        schemaColumn={schemaColumnDetailPO}
        classNamePaging="display-paging"
        classNameTable="table-detail"
        data={poDetailTable}
        style={{ minHeight: height, maxHeight: height, minWidht: width, maxWidht: width }}
        module="PurchaseOrdersDetail"
        noDataText
        exportData={exportData}
        columnHidden={columnHidden}
        pagination={paginationPoDetail}
        goto={(e) => {
          dispatch({ type: 'PAGING_PO_DETAIL', data: { ...paginationPoDetail, active: e } });
        }}
        getExportData={() => setExportData({ dispatch, data: poDetailTable })}
        user={user}
        title="Purchase Order Details"
        filename="Microlistics_PurchaseOrderDetails."
        isDisplay={false}
        splitModule="purchase-order/detail"
        exportBtn
      />
    </div>
  );
};

export default PurchaseOrdersDetail;
