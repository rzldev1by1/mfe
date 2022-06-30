import JsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';
import logoExport from '../../assets/img/logo_export2.png';
import endpoints from '../../helpers/endpoints';

const setBody = (exportData, schemaColumn) => {
  let dataAll = [];
  if (exportData) {
    dataAll = exportData.map((data) => {
      const column = schemaColumn.map((columnData) => {
        const split = [data[columnData.accessor]];
        return split;
      });
      return column;
    });
  } else {
    return ['-'];
  }
  return dataAll;
};

const getAlignRight = async (schemaColumn) => {
  const arrRightAlign = [];
  schemaColumn.forEach((data, idx) => {
    if (data.textAlign === 'right') {
      arrRightAlign.push(idx);
    }
  });
  return arrRightAlign;
};

export const setHeader = (schemaColumn) => {
  const data = schemaColumn.map((columnData) => {
    return columnData.Header;
  });
  return data;
};

export const ExportName = (filename) => {
  const arrmonth = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const date = new Date();
  const date1 = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const Seconds = date.getSeconds();
  const Minutes = date.getMinutes();
  const Hours = date.getHours();
  return `${filename + date1}-${arrmonth[month]}-${year}.${Hours}-${Minutes}-${Seconds}`;
};

export const Dates = () => {
  const arrmonth2 = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const date = new Date();
  const date1 = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear();
  return (`${date1}-${arrmonth2[month]}-${year}`);
};

const setupDocPDF = async (filename, exportData, schemaColumn) => {
  const header = await setHeader(schemaColumn);
  let body = await setBody(exportData, schemaColumn);
  const alignRight = await getAlignRight(schemaColumn);

  header.filter((data, idx) => idx <= 17);
  body = body.map((data) => {
    const newData = data.filter((dt, idx) => idx <= 17);
    const newData2 = newData.map((dt) => {
      if (dt[0] === null) {
        return ['-'];
      }
      if (dt[0] === "x") {
        return ("N");
      }
      if (dt[0] === "Yes") {
        return ("Y");
      }
      console.log(dt[0])
      return dt;
    });
    return newData2;
  });

  const unit = 'pt';
  const size = 'A4'; // Use A1, A2, A3 or A4
  const orientation = 'landscape'; // portrait or landscape
  const doc = new JsPDF(orientation, unit, size);
  const dateFormate = endpoints.env.REACT_APP_API_URL_FORMATE;

  // From Javascript
  const finalY = doc.previousAutoTable.finalY || 10;
  const title = ExportName(filename);
  const originDate = Dates();
  const date = moment(originDate).format(dateFormate);
  const img = new Image();
  img.src = logoExport;
  doc.setFontSize(15);

  doc.autoTable({
    theme: 'striped',
    margin: {
      left: 15,
      right: 15,
      bottom: 5,
    },
    startY: finalY + 30,
    head: [header],
    body,
    headerStyles: {
      cellPadding: 5,
      lineWidth: 0,
      valign: 'top',
      fontStyle: 'bold',
      halign: 'left', // 'center' or 'right'
      fillColor: [94, 68, 232],
      textColor: [255, 255, 255],
      rowHeight: 22,
    },
    styles: {
      rowHeight: 24,
      cellPadding: {
        top: 8,
        right: 4,
        bottom: 8,
        left: 4,
      },
      fontSize: 8,
      borderBottom: 0,
    },
    didDrawPage: () => {
      doc.text(`${title} Data Microlistics  ${date}`, 15, finalY + 15);
      doc.addImage(img, 'PNG', 785, 5, 45, 40, 'a', 'FAST');
    },
    willDrawCell: (data) => {
      const dataKey = data?.column?.dataKey;
      const section = data?.section;

      // set align right
      if (alignRight.includes(dataKey) && section !== 'head') {
        data.cell.styles.halign = 'right';
        return;
      }

      let dataColumns;
      switch (dataKey) {
        case 6:
          dataColumns = data?.row?.raw[6];
          switch (dataColumns) {
            case 'Suspended':
              doc.setTextColor(252, 28, 3);
              break;
            case 'Active':
              doc.setTextColor(5, 237, 245);
              break;
            default:
          }
          break;
        case 8:
          dataColumns = data?.row?.raw[8];
          switch (dataColumns) {
            case 'N':
              doc.setTextColor(252, 28, 3);
              break;
            case 'Y':
              doc.setTextColor(46, 184, 92);
              break;
            default:
          }
          break;
        case 9:
          dataColumns = data?.row?.raw[9];
          switch (dataColumns) {
            case 'N':
              doc.setTextColor(252, 28, 3);
              break;
            case 'Y':
              doc.setTextColor(46, 184, 92);
              break;
            default:
          }
          break;
        case 10:
          dataColumns = data?.row?.raw[10];
          switch (dataColumns) {
            case 'N':
              doc.setTextColor(252, 28, 3);
              break;
            case 'Y':
              doc.setTextColor(46, 184, 92);
              break;
            default:
          }
          break;
        default:
      }
    },
  });

  return doc;
};

export const exportPDF = async ({ filename, exportData, schemaColumn }) => {
  const doc = await setupDocPDF(filename, exportData, schemaColumn);
  doc.save(`${ExportName(filename)}.pdf`);
};

export const exportXLS = () => {
  document.getElementById('button-download-as-xls').click();
};