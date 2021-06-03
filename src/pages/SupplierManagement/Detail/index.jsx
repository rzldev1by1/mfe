import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TableMaster from '../Table/TableMaster';
import Breadcrumb from '../../../Component/Breadcrumb';
import Search from '../../../Component/Search';
import { getDetailData } from '../../../apiService';

import { schemaColumnDetailSP } from './service';

const SupplierManagementDetail = (props) => {
  const dispatch = useDispatch();
  const spDetailTable = useSelector((state) => state.spDetailTable);
  const [columnHidden, setColumnHidden] = useState(null);
  const paginationSpDetail = useSelector((state) => state.paginationSpDetail);
  const user = useSelector((state) => state.user);
  const paginationSoDetail = useSelector((state) => state.paginationSoDetail);

  const module = 'supplierManagement';

  const spDataOnChange = async ({ dispatch, e, props, spDetailTable }) => {
    const idx = props.index
    const id = props.column.id  
    let newSpDetailTable = [...spDetailTable]

    //edit qty validation
    if(id === 'edit_qty'){
      if(newSpDetailTable[idx]?.order_qty?.replace(/,/g, '') < e.target.value?.replace(/,/g, '')) newSpDetailTable[idx].isInvalidOrderQty = true
      else newSpDetailTable[idx].isInvalidOrderQty = false
    } 

    //edit carton validation
    if(id === 'edit_carton'){
      if(newSpDetailTable[idx]?.no_of_carton < e.target.value?.replace(/,/g, '')) newSpDetailTable[idx].isInvalidOrderCarton = true
      else newSpDetailTable[idx].isInvalidOrderCarton = false
    } 

    newSpDetailTable[idx][id] = e?.target?.value
    
    await dispatch({type:'GET_SP_DETAIL_TABLE', data:newSpDetailTable})
    console.log(spDetailTable);
  }

  const markRow = async ({ dispatch, e, props, spDetailTable }) => {
    const idx = props.index
    let newSpDetailTable = [...spDetailTable]
    newSpDetailTable[idx].isMarked = !newSpDetailTable[idx].isMarked

    await dispatch({type:'GET_SP_DETAIL_TABLE', data:newSpDetailTable})

  }
  // dimension
  const [dimension, setDimension] = useState({
    height: window.innerHeight - 259,
    width: window.innerWidth,
  });
  const { width, height } = dimension;

  useEffect(() => {
    getDetailData({ dispatch, props, active: paginationSoDetail?.active, module });
  }, []);
  
    return (
      <div>
        <Breadcrumb
          breadcrumb={[
            { to: '/supplier-management', label: 'Supplier Management' },
            { to: '', label: props.match.params.product, active: true },
          ]}
        />
        <div>
          <div>
            <Search
              module={module}
              filterStyle
              filterStyleDesc
              filterColor
              filterDimensions
              filterSize
              inputTag={false}
              btnClear
              btnFulfill
              btnSearch={false}
              paginationSoDetail={paginationSoDetail}
              props={props}
              spDetailTable={spDetailTable}
            />
          </div>
          <div>
            <TableMaster
              onClick={(e, props) => markRow({dispatch, e, props, spDetailTable})}
              onChange={(e, props) => spDataOnChange({e,props,spDetailTable, dispatch})}
              schemaColumn={schemaColumnDetailSP}
              classNamePaging="display-paging"
              classNameTable="table-detail bg-mark"
              data={spDetailTable}
              style={{ minHeight: height, maxHeight: height, minWidht: width, maxWidht: width }}
              module="SupplierManagementDetail"
              noDataText
              columnHidden={columnHidden}
              pagination={paginationSpDetail}
              goto={(e) => {
                dispatch({ type: 'PAGING_SP_DETAIL', data: { ...paginationSpDetail, active: e } });
              }}
              user={user}
              title="Supplier Management Details"
              isDisplay={false}
              splitModule="supplier-management/detail"
              printBtn
              editOrderQty
              editCarton
            />
          </div>
        </div>
        
      </div>
    )
}

export default SupplierManagementDetail;