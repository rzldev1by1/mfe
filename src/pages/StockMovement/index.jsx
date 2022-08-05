import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Search from './Search';
import Breadcrumb from '../../Component/Breadcrumb';
import TableFixedColumn from '../../Component/TableFixedColumn';
import { customSchema, setupExcel, setupPdf, demoPDF, filterSummaryDefault } from './services';
import './style.scss';
// import { AiOutlineConsoleSql } from 'react-icons/ai';

const StockMovement = () => {
  const module = 'stockMovement';
  const smData = useSelector((state) => state.smSummaryData);
  const pagination = useSelector((state) => state.pagination);

  const dispatch = useDispatch();
  const [header, setHeader] = useState([]);
  const [dateHeader, setDateHeader] = useState([]);
  const [tableStatus, setTableStatus] = useState('waiting');
  const [headerExcel, setHeaderExcel] = useState([]);
  const [dataExcel, setDataExcel] = useState([]);
  const [firstHeader] = useState(['Site', 'Client', 'Product', 'Description', 'UOM']);
  const stateChangeFilter = useSelector((state) => state.changeFilter);
  const [rowSpan, setRowSpan] = useState([]);
  const [dataPDF, setDataPDF] = useState([]);
  const [dimension, setDimension] = useState({
    height: window.innerHeight - 272,
    width: window.innerWidth,
  });
  const filterHiddenData = JSON.parse(localStorage.getItem(`filterHidden_${module}`));
  const { width, height } = dimension;
  useEffect(() => {
    const handleResize = () => {
      setDimension({
        height: window.innerHeight - 272,
        width: window.innerWidth,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  useEffect(() => {
    if (stateChangeFilter) {
      dispatch({ type: 'CHANGE_FILTER', data: false });
    }
  }, [stateChangeFilter]);

  useEffect(() => {
    const dataLength = smData?.length;
    if (dataLength !== undefined && dataLength < 1) {
      setTableStatus('noData');
    } else {
      setTableStatus('waiting');
    }

    if (smData && header.length > 0) {
      customSchema({ data: smData, schemaColumns: header, setHeader });
      setupExcel({ data: smData, dateHeader, header, setDataExcel, setHeaderExcel });
      setupPdf({ data: smData, dateHeader, header, setDataPDF, setRowSpan });
    }
  }, [smData]);

  const DateDataList = ({ dateData }) => {
    return (
      <>
        <th style={{ width: '20px' }}>{dateData?.date_1}</th>
        <th>{dateData?.sa_plus_1}</th>
        <th>{dateData?.sa_minus_1}</th>
        <th>{dateData?.rec_1}</th>
        <th>{dateData?.send_1}</th>
        <th style={{ width: '20px' }}>{dateData?.date_2}</th>
        <th>{dateData?.sa_plus_2}</th>
        <th>{dateData?.sa_minus_2}</th>
        <th>{dateData?.rec_2}</th>
        <th>{dateData?.send_2}</th>
      </>
    );
  };

  return (
    <div className="stockMovement">
      <Breadcrumb breadcrumb={[{ to: '/purchase-order', label: 'Stock Movement', active: true }]} />
      <div>
        <div>
          <Search
            module={module}
            filterHidden={filterHiddenData || filterSummaryDefault}
            setHeader={setHeader}
            setDateHeader={setDateHeader}
            btnSearch
            inputTag
          />
        </div>
        <div>
          <TableFixedColumn
            schemaColumn={header}
            data={smData}
            style={{ minHeight: height, maxHeight: height, maxWidth: width }}
            module="Stock Movement"
            exportPdf={false}
            tableStatus={tableStatus}
            pagination={pagination}
            filename="Microlistics_StockMovement."
            customExportPdf={() => {
              demoPDF({ filename: 'Microlistics_StockMovement.', rowSpan });
            }}
          />
        </div>
      </div>

      <table id="excel" className="d-none">
        <thead>
          <tr>
            {headerExcel.map((d) => {
              if (firstHeader.includes(d)) {
                return <th>{d}</th>;
              }
              return (
                <th>
                  <table>
                    <tr>
                      <th colSpan="4">{d}</th>
                    </tr>
                    <tr>
                      <th width="25%">SA+</th>
                      <th width="25%">SA-</th>
                      <th width="25%">Rec</th>
                      <th width="25%">Send</th>
                    </tr>
                  </table>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {dataExcel &&
            dataExcel.map((data) => [
              <tr>
                <td>‎{data.site}</td>
                <td>‎{data.client}</td>
                <td>‎{data.product}</td>
                <td>‎{data.product_name}</td>
                <td>‎{data.uom}</td>
                {data.column.map((d) => {
                  return (
                    <td>
                      <table>
                        <td style={{ textAlign: 'right' }}>{d.sa_plus}</td>
                        <td style={{ textAlign: 'right' }}>{d.sa_min}</td>
                        <td style={{ textAlign: 'right' }}>{d.rec}</td>
                        <td style={{ textAlign: 'right' }}>{d.send}</td>
                      </table>
                    </td>
                  );
                })}
              </tr>,
            ])}
        </tbody>
      </table>
      <table id="tablePdf" border="1" className="d-none">
        <thead>
          <tr>
            <th>Site</th>
            <th>Client</th>
            <th>Product</th>
            <th>Description</th>
            <th>UOM</th>
            <th style={{ width: '20px' }}>Date</th>
            <th>SA+</th>
            <th>SA-</th>
            <th>Rec</th>
            <th>Send</th>
            {dataPDF && dataPDF[0] && dataPDF[0].date[0].date_2 === undefined ? (
              ''
            ) : (
              <>
                <th style={{ width: '20px' }}>Date</th>
                <th>SA+</th>
                <th>SA-</th>
                <th>Rec</th>
                <th>Send</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {dataPDF &&
            dataPDF.map((data) => {
              return (
                <>
                  <tr key={data.product}>
                    <td rowSpan={data.rowspan}>{data.site}</td>
                    <td rowSpan={data.rowspan}>{data.client}</td>
                    <td rowSpan={data.rowspan}>{data.product}</td>
                    <td rowSpan={data.rowspan}>{data.product_name}</td>
                    <td rowSpan={data.rowspan}>{data.uom}</td>
                    <DateDataList dateData={data.date[0]} />
                  </tr>
                  {data.date.map((item, index) => {
                    return (
                      item !== [] &&
                      index !== 0 && (
                        <tr key={item.date_1}>
                          <DateDataList dateData={item} />
                        </tr>
                      )
                    );
                  })}
                </>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default StockMovement;
