import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CDropdownDivider } from '@coreui/react';
import { exportPrintLabel } from './services'

const PrintLabel = ({
    getPrintLabelData,
    filename
}) => {
    const dispatch = useDispatch();
    const printLabelData = useSelector((state) => state.printLabelData);
    const [runPrintLabel, setRunPrintLabel] = useState(null);
    const [startExport, setStartExport] = useState(null);
    const [exportStatus, setExportStatus] = useState('ready');

    let styleButton = {};
    if (exportStatus === 'wait') {
        styleButton = { pointerEvents: 'none' };
    }

    const element = () => {
        return (
          <div><img id='itf' /></div>
        )
    }

    useEffect(() => {
        if (!runPrintLabel) {
          return;
        }
    
        // cleaning data Print Label
        dispatch({ type: 'PRINT_LABEL_DATA', data: null });
    
        async function getData() {
          await getPrintLabelData();
          setStartExport(1);
        }
        getData();
      }, [runPrintLabel]);

    useEffect(() => {
        if (!startExport || !printLabelData) {
          return;
        }
    
        console.log(runPrintLabel);

        if (runPrintLabel === 'PDF') {
            console.log('masuk');
            exportPrintLabel({ filename, printLabelData, element });
        } 

        setExportStatus('ready');
        setRunPrintLabel(null);
        setStartExport(null);
      }, [startExport, printLabelData]);

      console.log(printLabelData);

    return (
      <CDropdown className="btn-group print-lables">
        <CDropdownToggle id='print-labels' color="primary"> 
          PRINT LABELS
        </CDropdownToggle>
        <CDropdownMenu className="mb-2 shadow-none border">
          <CDropdownItem>PAGE BREAK</CDropdownItem>
          <CDropdownDivider />
          <CDropdownItem onClick={()=> setRunPrintLabel('PDF')}>ONE PAGE</CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    )
}

export default PrintLabel