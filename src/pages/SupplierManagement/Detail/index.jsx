import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TableMaster from '../../../Component/TableMaster';
import Breadcrumb from '../../../Component/Breadcrumb';
import Search from '../../../Component/Search';
import { schemaColumnDetailSP } from './service';

const SupplierManagementDetail = (props) => {
  const dispatch = useDispatch();
  const spDetailTable = useSelector((state) => state.spDetailTable);
  const [columnHidden, setColumnHidden] = useState(null);
  const paginationSpDetail = useSelector((state) => state.paginationSpDetail);
  const user = useSelector((state) => state.user);

  const module = 'SupplierManagement';

  // dimension
  const [dimension, setDimension] = useState({
    height: window.innerHeight - 259,
    width: window.innerWidth,
  });
  const { width, height } = dimension;

    return (
      <div>
        <Breadcrumb
          breadcrumb={[
            { to: '/supplier-mamangement', label: 'Supplier Management' },
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
            />
          </div>
          <div>
            <TableMaster
              schemaColumn={schemaColumnDetailSP}
              classNamePaging="display-paging"
              classNameTable="table-detail "
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
            />
          </div>
        </div>
        
      </div>
    )
}

export default SupplierManagementDetail;