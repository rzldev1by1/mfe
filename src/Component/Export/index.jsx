import React, { useState, useEffect } from 'react';
import ExportExl from 'react-html-table-to-excel';
import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import PopUpExport from '../Modal/PopUpExport';
import { exportPDF, exportXLS, ExportName } from './services';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import './style.scss';
import 'jspdf-autotable';
import loading from '../../assets/icons/loading/LOADING-MLS.gif';

const Export = ({
  exportPdf = true,
  exportExcel = true,
  schemaColumn,
  filename,
  getExportData,
  secondTable = false,
  customExportXls,
  customExportPdf,
}) => {
  const dispatch = useDispatch();
  const exportData = useSelector((state) => state.exportData);
  const pagination = useSelector((state) => state.pagination);
  const totalData = pagination?.total || 0;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [exportStatus, setExportStatus] = useState('ready');
  const [notifExport, setNotifExport] = useState(false);
  const [runExport, setRunExport] = useState(null);
  const [startExport, setStartExport] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  let styleButton = {};
  if (exportStatus === 'wait') {
    styleButton = { pointerEvents: 'none' };
  }

  useEffect(() => {
    if (!runExport) {
      return;
    }

    //if use custom function for export, example stockmovement
    if (customExportXls || customExportPdf) {
      if (runExport == 'PDF') {
        customExportPdf();
      } else if (runExport == 'XLS') {
        exportXLS();
      }
      setRunExport(null);
      return;
    }

    //cleaning data export
    dispatch({ type: 'EXPORT_DATA', data: null });

    if (totalData > 75000) {
      setModalShow(true);
      setRunExport(null);
      return;
    }

    setExportStatus('wait');
    async function getData() {
      await getExportData();
      setStartExport(1);
    }
    getData();
  }, [runExport]);

  useEffect(() => {
    if (!startExport || !exportData) {
      return;
    }

    if (runExport == 'PDF') {
      exportPDF({ filename, exportData, schemaColumn });
    } else if (runExport == 'XLS') {
      exportXLS();
    }
    setExportStatus('ready');
    setRunExport(null);
    setStartExport(null);
  }, [startExport, exportData]);

  const columnHiddenCharacter = [
    'customer',
    'customername',
    'address1',
    'orderno',
    'order_no',
    'product',
    'batch',
    'pack_id',
    'on_hand_wgt',
    'customer_no',
  ];
  const columnRightCharacter = [
    'qty',
    'qty_processed',
    'weight',
    'weight_processed',
    'quantity',
  ];
  return (
    <div>
      <ButtonDropdown
        direction="up"
        style={styleButton}
        style={{ height: "40px !important" }}
        className=" d-flex float-right align-items-center"
        isOpen={dropdownOpen}
        toggle={() => {
          setDropdownOpen(!dropdownOpen);
        }}
      >
        <DropdownToggle color="primary" className="Dropdown-toggel align-items-center">
          <div style={{ fontSize: '0.875rem', letterSpacing: '1px' }}>
            {exportStatus === 'ready' ? (
              'EXPORT'
            ) : (
              <img src={loading} className="mt-min-5" width="45" height="45" alt="" />
            )}
          </div>
        </DropdownToggle>
        <DropdownMenu
          className={`no-shadow ${exportPdf === false || exportExcel === false ? ' dropdown-single only-pdf' : ' Dropdown-menu ex-pdf'
            }`}
        >
          {!exportPdf ? (
            ''
          ) : (
            <DropdownItem className="export-pdf px-1 d-flex justify-content-center" onClick={() => setRunExport('PDF')}>
              <span className="exp-PDF" style={{ paddingRight: '0.28rem' }} />
              EXPORT TO PDF
            </DropdownItem>
          )}
          {!exportExcel ? (
            ''
          ) : (
            <div>
              <DropdownItem
                className={`export-excel so-export px-1 d-flex justify-content-center
                  ${exportPdf === false ? ' radius-top-export' : ''}`}
                onClick={() => setRunExport('XLS')}>
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
      {schemaColumn && exportData ? (
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
                    let dataReturn = data[column.accessor] == null ? '-' : data[column.accessor];
                    if (columnHiddenCharacter.includes(column.accessor)) {
                      return <td key={columnIdx}>{dataReturn}‎‎‎</td>;
                    }
                    if (columnRightCharacter.includes(column.accessor)) {
                      return <td style={{ textAlign: 'right' }} key={columnIdx}>{dataReturn}‎‎‎</td>;
                    }
                    return <td key={columnIdx}>{dataReturn}</td>;
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      ) : null}

      {/* End Excel Export */}

      {/* Popup */}
      <PopUpExport modalShow={modalShow} setModalShow={setModalShow} />
      {/* End Pop Up */}
    </div>
  );
};

export default Export;
