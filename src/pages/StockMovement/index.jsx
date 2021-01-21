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
  const pagination = useSelector((state) => state.pagination);

  //dimension
  const [dimension, setDimension] = useState({
    height: window.innerHeight - 257,
    width: window.innerWidth,
  });
  const { width, height } = dimension;

  const [header, setHeader] = useState([]);
  const [dateHeader, setdateHeader] = useState([]);
  const [headerExcel, setHeaderExcel] = useState([]);
  const [dataExcel, setDataExcel] = useState([]);
  const [tableStatus, setTableStatus] = useState('waiting');
  const [firstHeader, setFirstHeader] = useState(['Site', 'Client', 'Product', 'Description', 'UOM']);

  useEffect(() => {
    const handleResize = () => {
      setDimension({
        height: window.innerHeight - 257,
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

    console.log(smData);
    //set data for excel
    let dataExcel = smData?.map((data, index) => {
      data.column = [];
      dateHeader.forEach((d) => {
        let temp = {
          sa_plus: data['sa_plus_' + d] || '-',
          sa_min: data['sa_minus_' + d] || '-',
          rec: data['rec_' + d] || '-',
          send: data['send_' + d] || '-',
        };
        data.column.push(temp);
      });
      return data;
    });
    setDataExcel(dataExcel);
  }, [smData]);
  console.log(dataExcel);
  useEffect(() => {
    //set Header Excel
    if (header.length < 1) {
      return;
    }
    let newHeader = [];
    header.map((data, index) => {
      if (index > 0) {
        newHeader.push(data.Header);
      } else {
        data.columns.map((d, i) => {
          newHeader.push(d.Header);
        });
      }
    });
    setHeaderExcel(newHeader);
  }, [header]);

  return (
    <div className="stockMovement">
      <Breadcrumb breadcrumb={[{ to: '/purchase-order', label: 'Stock Movement', active: true }]} />
      <div>
        <div>
          <Search module={module} setHeader={setHeader} setdateHeader={setdateHeader} />
        </div>
        <div>
          <TableFixedColumn
            schemaColumn={header}
            data={smData}
            style={{ minHeight: height, maxHeight: height, maxWidth: width }}
            module="Stock Movement"
            filename="Microlistics_StockMovement."
            exportPdf={false}
            tableStatus={tableStatus}
            pagination={pagination}
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
                <td> ‎{data.packdesc}</td>
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
    </div>
  );
};

export default StockMovement;
