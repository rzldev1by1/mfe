import React, {useState} from 'react';
import ExportExl from 'react-html-table-to-excel'
import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import {exportPDF, exportXLS, ExportName} from './services'
import './style.scss'
import loading from '../../assets/icons/loading/LOADING-MLS.gif'

const Export = ({
    exportPdf,
    exportExcel,
    secondTable,
    filename,
    pagination,
    module,
    exportApi
}) => {
    const [dropdownOpen, setDropdownOpen] = useState(new Array(19).fill(false));
    const [exportStatus, setExportStatus] = useState('ready')
    const [notifExport, setNotifExport] = useState(false)
    let styleButton = {}
    if (exportStatus === 'wait') {
      styleButton = { pointerEvents: 'none' }
    }

    function toggle(i) {
        const newArray = dropdownOpen.map((element, index) => { return (index === i ? !element : false); });
        setDropdownOpen(newArray)
    }
   
    const changeExportStatus = (status) => {
        setExportStatus(status)
    }

    const getExportData = async () => {
        if (exportApi) {
          await exportApi()
        } else {
          console.log("Not Paginate API")
          return 0
        }
      }
    return (
      <div>
        <ButtonDropdown direction="up" style={styleButton} className=" d-flex float-right align-items-center" isOpen={dropdownOpen[13]} toggle={() => { toggle(13) }}>
          <DropdownToggle className="Dropdown-toggel btn-primary align-items-center">
            {/* <span className='export-export' style={{paddingRight:"6px"}}/> */}
            <div style={{ fontSize: "0.875rem", letterSpacing: "1px" }}>
              {exportStatus === 'ready' ? 'EXPORT' : <img src={loading} className='mt-min-5' width='45' height='45' alt='' />}
            </div>
          </DropdownToggle>
          <DropdownMenu className={`no-shadow ${  (exportPdf === 'false' || exportExcel === 'false') ? ' dropdown-single only-pdf' : ' Dropdown-menu ex-pdf'}`}>
            {(exportPdf === 'false') ? '' : (
              <DropdownItem className="export-pdf px-3" onClick={() => exportPDF({changeExportStatus, pagination, setNotifExport, getExportData, module })}>
                <span className="exp-PDF" style={{ paddingRight: "0.28rem" }} />
                {' '}
                EXPORT TO PDF
              </DropdownItem>
            )}
            {(exportExcel === 'false') ? '' : (
              <div>
                <DropdownItem className="export-excel so-export" onClick={() => exportXLS()}>
                  <span className="exp-XLS" style={{ paddingRight: "0.3rem" }} />
                  EXPORT TO XLS
                </DropdownItem>
                <div style={{ display: 'none' }}>
                  <ExportExl
                    className="Excel-bottom"
                    table={secondTable === 'true' ? "excel2" : "excel"}
                    filename={ExportName(filename)}
                    sheet="sheet 1"
                    buttonText="EXPORT TO XLS"
                  />
                </div>
              </div>
            )}
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    );
  };
  
  export default Export;