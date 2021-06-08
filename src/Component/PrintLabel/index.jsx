import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CDropdownDivider } from '@coreui/react';
import { exportPrintLabel } from './services'

const PrintLabel = ({
    filename
}) => {
    const dispatch = useDispatch();
    const printLabelData = useSelector((state) => state.spDetailTable);

    return (
      <CDropdown className="btn-group print-lables" id='printlabel'>
        <CDropdownToggle id='print-labels' color="primary" disabled> 
          PRINT LABELS
        </CDropdownToggle>
        <CDropdownMenu className="mb-2 shadow-none border">
          <CDropdownItem>PAGE BREAK</CDropdownItem>
          <CDropdownDivider />
          <CDropdownItem onClick={()=> exportPrintLabel({ filename, printLabelData })}>ONE PAGE</CDropdownItem>
        </CDropdownMenu>
        <div style={{opacity: '0', display: 'none'}} id='canvasPrint'>
          <h1 style={{fontSize:'50px', fontFamily: 'Rubik'}}><b>HUSH PUPPIES GL</b></h1>
          <p>TERMINAL</p>
          <h2 style={{fontSize:'35px'}}>OFF WHITE</h2>
          <p>VEN#</p>
          <p>PO#</p>
          <p>APN</p>
        </div>
      </CDropdown>
    )
}

export default PrintLabel