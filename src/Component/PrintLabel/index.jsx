import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CDropdownDivider } from '@coreui/react';
import { exportPrintLabel } from './services';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from './ComponentToPrint';

const PrintLabel = ({ filename }) => {
  const componentRef = useRef();
  const dispatch = useDispatch();
  const printLabelData = useSelector((state) => state.spDetailTable);
  const user = useSelector((state) => state.user);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <CDropdown className="btn-group print-lables" id="printlabel">
      <ComponentToPrint printLabelData={printLabelData} ref={componentRef} />

      <CDropdownToggle id="print-labels" color="primary" className="rounded">
        PRINT LABELS
      </CDropdownToggle>
      <CDropdownMenu className="mb-2 shadow-none border">
        <CDropdownItem onClick={() => exportPrintLabel({ filename, printLabelData })} disabled>
          PAGE BREAK
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem onClick={handlePrint}>ONE PAGE</CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default PrintLabel;
