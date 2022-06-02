import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';
import logo_export from '../../assets/img/logo_export2.png';
import endpoints from 'helpers/endpoints';

const setBody = (exportData, schemaColumn) => {
  let dataAll = [];
  if (exportData) {
    dataAll = exportData.map((data, idx) => {
      let column = schemaColumn.map((column, columnIdx) => {
        let split = [data[column.accessor]];
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
  let arrRightAlign = [];
  schemaColumn.map((data, idx) => {
    if (data.textAlign == 'right') {
      arrRightAlign.push(idx);
    }
  });
  return arrRightAlign;
};

const setupDocPDF = async (filename, exportData, schemaColumn) => {
  let header = await setHeader(schemaColumn);
  let body = await setBody(exportData, schemaColumn);
  let alignRight = await getAlignRight(schemaColumn);

  header = header.filter((data, idx) => idx <= 17);
  body = body.map((data) => {
    let newData = data.filter((dt, idx) => idx <= 17);
    let newData2 = newData.map((dt, idx) => {
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
  const doc = new jsPDF(orientation, unit, size);
  const dateFormate = endpoints.env.REACT_APP_API_URL_FORMATE;

  // From Javascript
  var finalY = doc.previousAutoTable.finalY || 10;
  var title = ExportName(filename);
  var originDate = Dates();
  var date = moment(originDate).format(dateFormate);
  const img = new Image();
  img.src = logo_export;
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
    body: body,
    headerStyles: {
      cellPadding: 5,
      lineWidth: 0,
      valign: 'top',
      fontStyle: 'bold',
      halign: 'left', //'center' or 'right'
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
    didDrawPage: function (data) {
      doc.text(title + ' Data Microlistics  ' + date, 15, finalY + 15);
      doc.addImage(img, 'PNG', 785, 5, 45, 40, 'a', 'FAST');
    },
    willDrawCell: function (data) {
      const dataKey = data.column.dataKey;
      const section = data.section;

      //set align right
      if (alignRight.includes(dataKey) && section !== 'head') {
        data.cell.styles.halign = 'right';
        return;
      }

      if (dataKey === 6) {
        const dataColumns = data.row.raw[6];
        if (dataColumns === 'Suspended') {
          doc.setTextColor(252, 28, 3);
        }
        if (dataColumns === 'Active') {
          doc.setTextColor(5, 237, 245);
        }
      }
      if (dataKey === 8) {
        const dataColumns = data.row.raw[8];
        if (dataColumns.toString() === 'N') {
          doc.setTextColor(252, 28, 3);
        }
        if (dataColumns.toString() === 'Y') {
          doc.setTextColor(46, 184, 92);
        }
      }
      if (dataKey === 9) {
        const dataColumns = data.row.raw[9];
        if (!dataColumns) {
          return;
        }
        if (dataColumns.toString() === 'N') {
          doc.setTextColor(252, 28, 3);
        } else if (dataColumns.toString() === 'Y') {
          doc.setTextColor(46, 184, 92);
        }
      }
      if (dataKey === 10) {
        const dataColumns = data.row.raw[10];
        if (!dataColumns) {
          return;
        }
        if (dataColumns.toString() === 'N') {
          doc.setTextColor(252, 28, 3);
        } else if (dataColumns.toString() === 'Y') {
          doc.setTextColor(46, 184, 92);
        }
      }
    },
  });

  return doc;
};

export const exportPDF = async ({ filename, exportData, schemaColumn }) => {
  const doc = await setupDocPDF(filename, exportData, schemaColumn);
  doc.save(ExportName(filename) + '.pdf');
};

export const exportXLS = () => {
  document.getElementById('button-download-as-xls').click();
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

export const setHeader = (schemaColumn) => {
  let data = schemaColumn.map((data, idx) => {
    return data.Header;
  });
  return data;
};

export const Dates = () => {
  let dateNow = '';
  let arrmonth2 = [
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
  let date = new Date();
  let date1 = date.getDate(),
    month = date.getMonth(),
    year = date.getFullYear();
  return (dateNow = date1 + '-' + arrmonth2[month] + '-' + year);
};
