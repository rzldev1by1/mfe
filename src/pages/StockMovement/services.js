/* eslint-disable prefer-const */
import JsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';
import endpoints from '../../helpers/endpoints';
import logoExport from '../../assets/img/logo_export2.png';

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

export const customSchema = async ({ data, schemaColumns, setHeader }) => {
  let newSchema = [];
  await schemaColumns.forEach(async (h, index) => {
    if (index < 1) {
      let newColumns = [];
      await h.columns.forEach(async (d) => {
        d.width = await getColumnWidth(data, d.accessor, d.Header, d.width || '75px');
        newColumns.push(d);
      });
      h.columns = newColumns;
    }
    newSchema.push(h);
  });
  setHeader(newSchema);
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
  let arrMonth2 = [
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
  let date1 = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  return `${date1}-${arrMonth2[month]}-${year}`;
};

export const setupPdf = ({ data, dateHeader, setDataPDF, setRowSpan }) => {
  let indexPart1 = Math.ceil(dateHeader.length / 2) - 1;
  setRowSpan(indexPart1);

  let dataPdf = [];
  data.forEach((dataTable) => {
    let pdfData = {
      site: dataTable.site,
      client: dataTable.client,
      uom: dataTable.uom,
      product: dataTable.product,
      product_name: dataTable.product_name,
      rowspan: indexPart1 + 1,
      date: [],
    };
    dateHeader.forEach((d, idx) => {
      let column = 1;
      let obj = {};
      if (idx <= indexPart1) {
        obj[`date_${column}`] = d.datePdf;
        obj[`sa_plus_${column}`] = dataTable[`sa_plus_${d.dateAccessor}`] || `-`;
        obj[`sa_minus_${column}`] = dataTable[`sa_minus_${d.dateAccessor}`] || '-';
        obj[`rec_${column}`] = dataTable[`rec_${d.dateAccessor}`] || '-';
        obj[`send_${column}`] = dataTable[`send_${d.dateAccessor}`] || '-';
        pdfData.date.push(obj);
      } else {
        column = 2;
        let idxx = idx - indexPart1 - 1;
        pdfData.date[idxx][`date_${column}`] = d.datePdf;
        pdfData.date[idxx][`sa_plus_${column}`] = dataTable[`sa_plus_${d.dateAccessor}`] || '-';
        pdfData.date[idxx][`sa_minus_${column}`] = dataTable[`sa_minus_${d.dateAccessor}`] || '-';
        pdfData.date[idxx][`rec_${column}`] = dataTable[`rec_${d.dateAccessor}`] || '-';
        pdfData.date[idxx][`send_${column}`] = dataTable[`send_${d.dateAccessor}`] || '-';
      }
    });
    dataPdf.push(pdfData);
  });

  let newDataPdf = [];
  let restRow = 20;
  dataPdf.forEach((dataPdfArray, index) => {
    let dateTmp = [[]];
    let i = 0;
    let j = 0;

    let restRow2 = 20;
    if (index > 0) {
      restRow2 = restRow;
    }
    dataPdfArray.date.forEach((d) => {
      if (j > 19 || j === restRow2) {
        dateTmp.push([]);
        i += 1;
        j = 0;
        restRow = 20;
        restRow2 = 20;
      }
      dateTmp[i].push(d);
      j += 1;
      restRow -= 1;
    });

    dateTmp.forEach((d) => {
      let obj = {
        site: dataPdfArray.site,
        client: dataPdfArray.client,
        uom: dataPdfArray.uom,
        product: dataPdfArray.product,
        product_name: dataPdfArray.product_name,
        rowspan: d.length,
        date: d,
      };
      if (obj.date.length !== 0) {
        newDataPdf.push(obj);
      }
    });
  });
  setDataPDF(newDataPdf);
};

export const setupExcel = ({ data, dateHeader, header, setDataExcel, setHeaderExcel }) => {
  let newHeader = [];
  header.forEach((dataHeader, index) => {
    if (index > 0) {
      newHeader.push(dataHeader.Header);
    } else {
      dataHeader.columns.forEach((d) => {
        newHeader.push(d.Header);
      });
    }
  });
  setHeaderExcel(newHeader);

  let dataExcel = data?.map((dataArrayExcel) => {
    dataArrayExcel.column = [];
    dateHeader.forEach((d) => {
      let temp = {
        sa_plus: dataArrayExcel[`sa_plus_${d.dateAccessor}`] || '-',
        sa_min: dataArrayExcel[`sa_minus_${d.dateAccessor}`] || '-',
        rec: dataArrayExcel[`rec_${d.dateAccessor}`] || '-',
        send: dataArrayExcel[`send_${d.dateAccessor}`] || '-',
      };
      dataArrayExcel.column.push(temp);
    });
    return dataArrayExcel;
  });
  setDataExcel(dataExcel);
};

export const demoPDF = ({ filename, rowSpan }) => {
  const dateFormate = endpoints.env.REACT_APP_API_URL_FORMATE;
  const unit = 'pt';
  const size = 'A4';
  const orientation = 'landscape';
  const pdf = new JsPDF(orientation, unit, size);
  let title = ExportName(filename);
  let originDate = Dates();
  let date = moment(originDate).format(dateFormate);
  let color = 1;
  let i = 2;
  const finalY = pdf.previousAutoTable.finalY || 10;
  const img = new Image();
  img.src = logoExport;
  pdf.setFontSize(15);
  pdf.autoTable({
    html: '#tablePdf',
    margin: {
      left: 15,
      right: 15,
      bottom: 5,
    },
    startY: finalY + 30,
    styles: {
      minCellHeight: 10,
      cellPadding: {
        top: 5,
        right: 4,
        bottom: 5,
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
      halign: 'left',
      fillColor: [94, 68, 232],
      textColor: [255, 255, 255],
      rowHeight: 22,
    },
    columnStyles: {
      1: {
        columnWidth: 40,
      },
      2: {
        columnWidth: 80,
      },
      3: {
        columnWidth: 180,
      },
    },
    willDrawCell: (data) => {
      const section = data?.row?.section;
      const index = data?.row?.index;
      const dataKey = data?.column?.dataKey;
      if (section === 'head') {
        return;
      }

      let rightAlign = [6, 7, 8, 9, 11, 12, 13, 14];
      if (rightAlign.includes(dataKey)) {
        data.cell.styles.halign = 'right';
      }

      if (index <= rowSpan) {
        color = 1;
      } else if (index > rowSpan && index <= rowSpan * i + i - 1) {
        if (i % 2) color = 1;
        else color = 2;
      } else {
        i += 1;
        if (i % 2) color = 1;
        else color = 2;
      }

      if (color === 1) pdf.setFillColor(240, 239, 242);
      else pdf.setFillColor(217, 213, 221);
    },
    didDrawPage: () => {
      pdf.text(`${title} Data Microlistics ${date}`, 15, finalY + 15);
      pdf.addImage(img, 'PNG', 785, 5, 45, 40, 'a', 'FAST');
    },
  });

  pdf.save(`${title}.pdf`);
};

export const filterSummaryDefault = [
  { name: 'Site', accessor: 'site', hiddenFilter: false },
  { name: 'Client', accessor: 'client', hiddenFilter: false },
  { name: 'Product', accessor: 'product', hiddenFilter: false },
];
