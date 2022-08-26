import React from 'react';
import { useSelector } from 'react-redux';
import ReactTable from 'react-table-v6';
import withFixedColumns from 'react-table-hoc-fixed-columns';
import { CRow, CCol } from '@coreui/react';
import loading from '../../assets/icons/loading/LOADING-MLS-GRAY.gif';
import Export from '../Export';
import Pagination from '../Pagination/PagingMove';
import 'react-table-v6/react-table.css';
import 'react-table-hoc-fixed-columns/lib/styles.css';
import './style.scss';

const TableFixedColumn = ({ schemaColumn, data, style, tableStatus, filename, customExportPdf }) => {
  const ReactTableFixedColumns = withFixedColumns(ReactTable);
  const activePage = useSelector((state) => state.getActivePage);
  const noDataMessage = (
    <div className="caution-caution">
      <div>No Data Available</div>
    </div>
  );
  const loadingMessage = (
    <div>
      <img src={loading} width="45" height="45" alt="" />
    </div>
  );

  const total = data?.length;
  const show = 50;

  // pagination
  const startIndexVormula = (activePage - 1) * (total < show ? total : show);
  const endIndexVormula = startIndexVormula + (total < show ? total : show);
  const startIndex = total > 0 && startIndexVormula < 1 ? 1 : startIndexVormula;
  const endIndex = endIndexVormula > total ? total : endIndexVormula;

  const sliceData = activePage === 1 ? startIndex - 1 : startIndex;
  const dataAll = data?.slice(sliceData, endIndex);
  return (
    <div className="fixedColumnTable">
      <ReactTableFixedColumns
        columns={schemaColumn}
        data={dataAll}
        showPagination={false}
        defaultPageSize={50}
        style={style}
        noDataText={tableStatus === 'noData' ? noDataMessage : loadingMessage}
        minRows="0"
        getTdProps={(state, rowInfo, column) => {
          return {
            style: { textAlign: Number.isNaN(rowInfo?.original[column.id]) ? 'left' : 'right' },
          };
        }}
      />

      <CRow lg="12" className="mb-3 w-100 pagination-custom">
        <CCol lg="7" className="px-0 w-100 margin-mr">
          <Pagination startIndex={startIndex} endIndex={endIndex} total={total} activePage={activePage} show={show} />
        </CCol>
        <CCol lg="5" md="1" className="px-0 w-100 export-ml">
          {data?.length < 1 ? null : (
            <Export filename={filename} customExportXls customExportPdf={customExportPdf} module={module} />
          )}
        </CCol>
      </CRow>
    </div>
  );
};

export default TableFixedColumn;
