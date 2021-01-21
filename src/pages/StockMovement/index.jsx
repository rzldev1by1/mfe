/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Search from './Search';
import Breadcrumb from 'Component/Breadcrumb';
import TableFixedColumn from 'Component/TableFixedColumn';
import { schemaColumn, simpleData, exportColumns } from './services';
import './style.scss';

const StockMovement = (props) => {
  const dispatch = useDispatch();
  const module = 'stockMovement';
  const smData = useSelector((state) => state.smSummaryData);

  //dimension
  const [dimension, setDimension] = useState({
    height: window.innerHeight - 257,
    width: window.innerWidth,
  });
  const [header, setHeader] = useState([]);
  const { width, height } = dimension;

  return (
    <div className="stockMovement">
      <Breadcrumb breadcrumb={[{ to: '/purchase-order', label: 'Stock Movement', active: true }]} />
      <div>
        <div>
          <Search module={module} setHeader={setHeader} />
        </div>
        <div>
          <TableFixedColumn
            schemaColumn={header}
            data={smData}
            style={{ minHeight: height, maxHeight: height, minWidht: width, maxWidht: width }}
            module="Stock Movement"
            filename="Microlistics_StockMovement."
            exportPdf={false}
          />
        </div>
      </div>
    </div>
  );
};

export default StockMovement;
