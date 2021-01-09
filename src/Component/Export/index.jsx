import React, { useState, useEffect } from 'react';
import ExportExl from 'react-html-table-to-excel';
import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { exportPDF, exportXLS, ExportName, Dates, setHeader } from './services';
import { useSelector } from 'react-redux';
import './style.scss';
import loading from '../../assets/icons/loading/LOADING-MLS.gif';
import PopUpExport from 'Component/Modal/PopUpExport';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo_export from 'assets/img/logo_export2.png';
import moment from 'moment';

const Export = ({ exportPdf, exportExcel, schemaColumn, filename, module, getExportData, secondTable = false }) => {
  const exportData = useSelector((state) => state.exportData);
  const pagination = useSelector((state) => state.pagination);
  const totalData = pagination?.total || 0;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [exportStatus, setExportStatus] = useState('ready');
  const [notifExport, setNotifExport] = useState(false);
  const [runExport, setRunExport] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  let styleButton = {};
  if (exportStatus === 'wait') {
    styleButton = { pointerEvents: 'none' };
  }

  useEffect(() => {
    if (!runExport) {
      return;
    }

    if (totalData > 75000) {
      setModalShow(true);
      setRunExport(null);
      return;
    }

    setExportStatus('wait');
    async function getData() {
      await getExportData();
    }
    getData();
    console.log('exportData', exportData);
  }, [runExport]);

  useEffect(() => {
    console.log('exportData', exportData);
    if (!exportData) {
      return;
    }
    if (runExport == 'PDF') {
      exportPDF({ filename, exportData, schemaColumn });
    } else if (runExport == 'XLS') {
      exportXLS();
    }
    setExportStatus('ready');
    setRunExport(null);
  }, [exportData, runExport]);

  const columnHiddenCharacter = [
    'customer',
    'customername',
    'address1',
    'orderno',
    'order_no',
    'product',
    'batch',
    'pack_id',
  ];
  return (
    <div>
      <ButtonDropdown
        direction="up"
        style={styleButton}
        className=" d-flex float-right align-items-center"
        isOpen={dropdownOpen}
        toggle={() => {
          setDropdownOpen(!dropdownOpen);
        }}
      >
        <DropdownToggle className="Dropdown-toggel btn-primary align-items-center">
          <div style={{ fontSize: '0.875rem', letterSpacing: '1px' }}>
            {exportStatus === 'ready' ? (
              'EXPORT'
            ) : (
              <img src={loading} className="mt-min-5" width="45" height="45" alt="" />
            )}
          </div>
        </DropdownToggle>
        <DropdownMenu
          className={`no-shadow ${
            exportPdf === 'false' || exportExcel === 'false' ? ' dropdown-single only-pdf' : ' Dropdown-menu ex-pdf'
          }`}
        >
          {exportPdf === 'false' ? (
            ''
          ) : (
            <DropdownItem className="export-pdf px-3" onClick={() => setRunExport('PDF')}>
              <span className="exp-PDF" style={{ paddingRight: '0.28rem' }} /> EXPORT TO PDF
            </DropdownItem>
          )}
          {exportExcel === 'false' ? (
            ''
          ) : (
            <div>
              <DropdownItem className="export-excel so-export" onClick={() => setRunExport('XLS')}>
                <span className="exp-XLS" style={{ paddingRight: '0.3rem' }} />
                EXPORT TO XLS
              </DropdownItem>
              <div style={{ display: 'none' }}>
                <ExportExl
                  className="Excel-bottom"
                  table={secondTable ? 'excel2' : 'excel'}
                  filename={ExportName(filename)}
                  sheet="sheet 1"
                  buttonText="EXPORT TO XLS"
                />
              </div>
            </div>
          )}
        </DropdownMenu>
      </ButtonDropdown>

      {/* Excel Export */}
      <table className="d-none" id="excel">
        <thead>
          <tr>
            {schemaColumn?.map((data, idx) => {
              return (
                <th key={idx} id={data.accessor}>
                  {data.Header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {!exportData ? (
            <div> No data available </div>
          ) : (
            exportData?.map((data, i) => (
              <tr key={i}>
                {schemaColumn.map((column, columnIdx) => {
                  if (columnHiddenCharacter.includes(column.accessor)) {
                    return <td key={columnIdx}>{data[column.accessor]}‎</td>;
                  } else {
                    return <td key={columnIdx}>{data[column.accessor]}</td>;
                  }
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* End Excel Export */}

      {/* Popup */}
      <PopUpExport modalShow={modalShow} setModalShow={setModalShow} />
      {/* End Pop Up */}
    </div>
  );
};

export default Export;
