/* eslint-disable prefer-const */
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import React from 'react';
import moment from 'moment';
import logo_export from '../../assets/img/logo_export2.png';

export const simpleData = [
  { col1: 'data1', col2: 'data1', col3: 'data', col4: 'data' },
  { col1: 'data2', col2: 'data2', col3: 'data', col4: 'data' },
  { col1: 'data3', col2: 'data3', col3: 'data', col4: 'data' },
  { col1: 'data4', col2: 'data4', col3: 'data', col4: 'data' },
  { col1: 'data5', col2: 'data5', col3: 'data', col4: 'data' },
  { col1: 'data6', col2: 'data6', col3: 'data', col4: 'data' },
  { col1: 'data7', col2: 'data7', col3: 'data', col4: 'data' },
];

export const schemaColumn = [
  {
    Header: 'Column 1',
    accessor: 'col1',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px' },
    headerClassName: 'borderRight noPaddingTop',
    className: 'borderRight',
    fixed: 'left',
    width: 300,
    // sortable: false,
  },
  {
    Header: 'Column 2',
    accessor: 'col2',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    width: 500,
  },
  {
    Header: 'Column 3',
    accessor: 'col3',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    width: 800,
  },
  {
    Header: 'Column 4',
    accessor: 'col4',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left', paddingLeft: '15px' },
    headerClassName: 'borderBottom noPaddingTop',
    sortable: true,
    width: 800,
  },
];

const getColumnWidth = (rows, accessor, headerText, minWidth) => {
  if (accessor !== 'product') {
    return minWidth;
  }
  const maxWidth = 400;
  const magicSpacing = 11;
  const cellLength = Math.max(...rows.map((row) => (`${row[accessor]}` || '').length), headerText.length);
  const width = Math.min(maxWidth, cellLength * magicSpacing);
  if (minWidth > width) {
    return minWidth;
  }
  return width;
};

export const customSchema = async ({ data, schemaColumn, setHeader }) => {
  let newSchema = [];
  await schemaColumn.forEach(async (h, index) => {
    if (index < 1) {
      let newColumns = [];
      await h.columns.forEach(async (d, i) => {
        d.width = await getColumnWidth(data, d.accessor, d.Header, d.width || '75px');
        newColumns.push(d);
      });
      h.columns = newColumns;
    }
    newSchema.push(h);
  });
  setHeader(newSchema);
};

const setHeader = (schemaColumn) => {
  let data = schemaColumn.map((data, idx) => {
    return data.Header;
  });
  return data;
};

const setBody = (exportData, schemaColumn) => {
  let dataAll = [];
  let isDate = function (input) {
    if (Object.prototype.toString.call(input) === '[object Date]') return true;
    return false;
  };

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

const ExportName = (filename) => {
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

export const setupPdf = ({ data, dateHeader, header, period, setDataPDF, setRowSpan }) => {
  let newData = [];
  //make array to 2 parts
  let indexPart1 = Math.ceil(dateHeader.length / 2) - 1;
  setRowSpan(indexPart1);

  //set data for Pdf
  dateHeader.map((dt, idx) => {});

  let dataPdf = [];
  data.forEach((data, index) => {
    let pdfData = {
      site: data.site,
      client: data.client,
      uom: data.uom,
      product: data.product,
      product_name: data.product_name,
      rowspan: indexPart1 + 1,
      date: [],
    };
    dateHeader.forEach((d, idx) => {
      //first/second column in pdf
      let column = 1;
      let obj = {};
      if (idx <= indexPart1) {
        //kolom date pertama
        obj['date_' + column] = d.datePdf;
        obj['sa_plus_' + column] = data['sa_plus_' + d.dateAccessor] || '-';
        obj['sa_minus_' + column] = data['sa_minus_' + d.dateAccessor] || '-';
        obj['rec_' + column] = data['rec_' + d.dateAccessor] || '-';
        obj['send_' + column] = data['send_' + d.dateAccessor] || '-';
        pdfData.date.push(obj);
      } else {
        //kolom date kedua
        column = 2;
        let idxx = idx - indexPart1 - 1;
        pdfData.date[idxx]['date_' + column] = d.datePdf;
        pdfData.date[idxx]['sa_plus_' + column] = data['sa_plus_' + d.dateAccessor] || '-';
        pdfData.date[idxx]['sa_minus_' + column] = data['sa_minus_' + d.dateAccessor] || '-';
        pdfData.date[idxx]['rec_' + column] = data['rec_' + d.dateAccessor] || '-';
        pdfData.date[idxx]['send_' + column] = data['send_' + d.dateAccessor] || '-';
      }
    });
    dataPdf.push(pdfData);
  });

  //fix bugs
  let newDataPdf = [];
  let restRow = 20;
  dataPdf.forEach((data, index) => {
    let date_tmp = [[]];
    let i = 0;
    let j = 0;

    let restRow2 = 20;
    if (index > 0) {
      restRow2 = restRow;
    }
    data.date.map((d, idx) => {
      if (j > 19 || j == restRow2) {
        date_tmp.push([]);
        i++;
        j = 0;
        restRow = 20;
        restRow2 = 20;
      }
      date_tmp[i].push(d);
      j++;
      restRow--;
    });
    date_tmp.forEach((d, idx) => {
      let obj = {
        site: data.site,
        client: data.client,
        uom: data.uom,
        product: data.product,
        product_name: data.product_name,
        rowspan: d.length,
        date: d,
      };
      newDataPdf.push(obj);
    });
  });
  setDataPDF(newDataPdf);
};

export const setupExcel = ({ data, dateHeader, header, setDataExcel, setHeaderExcel }) => {
  //set Header
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

  //set data for excel
  let dataExcel = data?.map((data, index) => {
    data.column = [];
    dateHeader.forEach((d) => {
      let temp = {
        sa_plus: data['sa_plus_' + d.dateAccessor] || '-',
        sa_min: data['sa_minus_' + d.dateAccessor] || '-',
        rec: data['rec_' + d.dateAccessor] || '-',
        send: data['send_' + d.dateAccessor] || '-',
      };
      data.column.push(temp);
    });
    return data;
  });
  setDataExcel(dataExcel);
};

export const headerPdf = [
  {
    Header: 'Site',
    accessor: 'site',
    style: { textAlign: 'left', paddingLeft: '15px' },
    width: 70,
  },
  {
    Header: 'Client',
    accessor: 'client',
    style: { textAlign: 'left' },
    width: 90,
  },
  {
    Header: 'Product',
    accessor: 'product',
    style: { textAlign: 'left' },
    width: 180,
  },
  {
    Header: 'Description',
    accessor: 'product_name',
    style: { textAlign: 'left' },
    width: 200,
  },
  {
    Header: 'UOM',
    accessor: 'uom',
    style: { textAlign: 'left' },
    width: 70,
  },
  {
    Header: 'Date',
    accessor: 'date_1',
    style: { textAlign: 'left' },
    width: 100,
  },
  {
    Header: 'SA+',
    accessor: 'sa_plus_1',
    style: { textAlign: 'left' },
    width: 60,
  },
  {
    Header: 'SA-',
    accessor: 'sa_minus_1',
    style: { textAlign: 'left' },
    width: 60,
  },
  {
    Header: 'Rec',
    accessor: 'rec_1',
    style: { textAlign: 'left' },
    width: 60,
  },
  {
    Header: 'Send',
    accessor: 'send_1',
    style: { textAlign: 'left' },
    width: 60,
  },
  {
    Header: 'Date',
    accessor: 'date_2',
    style: { textAlign: 'left' },
    width: 100,
  },
  {
    Header: 'SA+',
    accessor: 'sa_plus_2',
    style: { textAlign: 'left' },
    width: 60,
  },
  {
    Header: 'SA-',
    accessor: 'sa_minus_2',
    style: { textAlign: 'left' },
    width: 60,
  },
  {
    Header: 'Rec',
    accessor: 'rec_2',
    style: { textAlign: 'left' },
    width: 60,
  },
  {
    Header: 'Send',
    accessor: 'send_2',
    style: { textAlign: 'left' },
    width: 60,
  },
];

export const demoPDF = ({ filename, rowSpan }) => {
  const dateFormate= process.env.REACT_APP_API_URL_FORMATE;
  const unit = 'pt';
  const size = 'A4'; // Use A1, A2, A3 or A4
  const orientation = 'landscape'; // portrait or landscape
  const pdf = new jsPDF(orientation, unit, size);
  let title = ExportName(filename);
  let originDate = Dates();
  let date = moment(originDate).format(dateFormate);
  let colour = 1;
  let i = 2;
  var finalY = pdf.previousAutoTable.finalY || 10;
  const img = new Image();
  img.src = logo_export;
  pdf.setFontSize(15);
  pdf.autoTable({
    html: '#tablePdf',
    // theme: 'plain',
    // pageBreak: 'avoid',
    margin: {
      left: 15,
      right: 15,
      bottom: 5,
    },
    startY: finalY + 30,
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
    // didParseCell: function (data) {
    //   let index = data.row.index;
    // },
    willDrawCell: function (data) {
      let section = data.row.section;
      let index = data.row.index;
      let dataKey = data.column.dataKey;
      if (section == 'head') {
        return;
      }

      //set align
      let rightAlign = [6,7,8,9,11,12,13,14];
      if (rightAlign.includes(dataKey)) {
          data.cell.styles.halign = "right"
      }

      if (index <= rowSpan) {
        colour = 1;
      } else if (index > rowSpan && index <= rowSpan * i + i - 1) {
        if (i % 2) {
          colour = 1;
        } else {
          colour = 2;
        }
      } else {
        i++;
        if (i % 2) {
          colour = 1;
        } else {
          colour = 2;
        }
      }

      if (colour == 1) {
        pdf.setFillColor(240, 239, 242);
      } else {
        pdf.setFillColor(217, 213, 221);
      }
    },
    didDrawPage: function (data) {
      pdf.text(title + ' Data Microlistics  ' + date, 15, finalY + 15);
      pdf.addImage(img, 'PNG', 785, 5, 45, 40, 'a', 'FAST');
    },
  });

  pdf.save(title + '.pdf');
};
