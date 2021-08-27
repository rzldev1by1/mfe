/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Search from './Search';
import Breadcrumb from 'Component/Breadcrumb';
import TableFixedColumn from 'Component/TableFixedColumn';
import { customSchema, setupExcel, setupPdf, exportPDF, headerPdf, demoPDF } from './services';
import './style.scss';

const StockMovement = (props) => {
  const dispatch = useDispatch();
  const module = 'stockMovement';
  const smData = useSelector((state) => state.smSummaryData);
  const pagination = useSelector((state) => state.pagination);

  const [header, setHeader] = useState([]);
  const [dateHeader, setdateHeader] = useState([]);
  const [tableStatus, setTableStatus] = useState('waiting');

  //header Export Excel
  const [headerExcel, setHeaderExcel] = useState([]);
  const [dataExcel, setDataExcel] = useState([]);
  const [firstHeader, setFirstHeader] = useState(['Site', 'Client', 'Product', 'Description', 'UOM']);

  //header Export PDF
  const [rowSpan, setRowSpan] = useState([]);
  const [dataPDF, setDataPDF] = useState([]);

  //dimension
  const [dimension, setDimension] = useState({
    height: window.innerHeight - 333,
    width: window.innerWidth,
  });
  const { width, height } = dimension;
  useEffect(() => {
    const handleResize = () => {
      setDimension({
        height: window.innerHeight - 333,
        width: window.innerWidth,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  useEffect(() => {
    let dataLength = smData?.length;
    if (dataLength !== undefined && dataLength < 1) {
      setTableStatus('noData');
    } else {
      setTableStatus('waiting');
    }

    //renew Schema
    if (smData && header.length > 0) {
      customSchema({ data: smData, schemaColumn: header, setHeader });
      setupExcel({ data: smData, dateHeader, header, setDataExcel, setHeaderExcel });
      setupPdf({ data: smData, dateHeader, header, setDataPDF, setRowSpan });
    }
  }, [smData]);

  return (
    <div className="stockMovement">
      <Breadcrumb breadcrumb={[{ to: '/purchase-order', label: 'Stock Movement', active: true }]} />
      <div>
        <div>
          <Search module={module} setHeader={setHeader} setdateHeader={setdateHeader} btnSearch inputTag />
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
            {headerExcel.map((d, i) => {
              if (firstHeader.includes(d)) {
                return <th> {d} </th>;
              } else {
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
              }
            })}
          </tr>
        </thead>
        <tbody>
          {dataExcel &&
            dataExcel.map((data, index) => [
              <tr>
                <td> ‎{data.site}</td>
                <td> ‎{data.client}</td>
                <td> ‎{data.product}</td>
                <td> ‎{data.product_name}</td>
                <td> ‎{data.uom}</td>
                {data.column.map((d, i) => {
                  return (
                    <td>
                      <table>
                        <td style={{ textAlign: 'right' }}> {d.sa_plus}</td>
                        <td style={{ textAlign: 'right' }}> {d.sa_min}</td>
                        <td style={{ textAlign: 'right' }}> {d.rec}</td>
                        <td style={{ textAlign: 'right' }}> {d.send}</td>
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
            <th>Date</th>
            <th>SA+</th>
            <th>SA-</th>
            <th>Rec</th>
            <th>Send</th>
            <th>Date</th>
            <th>SA+</th>
            <th>SA-</th>
            <th>Rec</th>
            <th>Send</th>
          </tr>
        </thead>
        <tbody>
          {dataPDF &&
            dataPDF.map((data, index) => {
              return data.date.map((d, idx) => {
                if (idx < 1) {
                  return (
                    <tr>
                      <td rowSpan={data.rowspan}>{data.site}</td>
                      <td rowSpan={data.rowspan}>{data.client}</td>
                      <td rowSpan={data.rowspan}>{data.product}</td>
                      <td rowSpan={data.rowspan}>{data.product_name}</td>
                      <td rowSpan={data.rowspan}>{data.uom}</td>
                      <td>{d.date_1}</td>
                      <td>{d.sa_plus_1}</td>
                      <td>{d.sa_minus_1}</td>
                      <td>{d.rec_1}</td>
                      <td>{d.send_1}</td>
                      <td>{d.date_2}</td>
                      <td>{d.sa_plus_2}</td>
                      <td>{d.sa_minus_2}</td>
                      <td>{d.rec_2}</td>
                      <td>{d.send_2}</td>
                    </tr>
                  );
                } else {
                  return (
                    <tr>
                      <td>{d.date_1}</td>
                      <td>{d.sa_plus_1}</td>
                      <td>{d.sa_minus_1}</td>
                      <td>{d.rec_1}</td>
                      <td>{d.send_1}</td>
                      <td>{d.date_2}</td>
                      <td>{d.sa_plus_2}</td>
                      <td>{d.sa_minus_2}</td>
                      <td>{d.rec_2}</td>
                      <td>{d.send_2}</td>
                    </tr>
                  );
                }
              });
            })}
        </tbody>
      </table>
    </div>
  );
};

export default StockMovement;
