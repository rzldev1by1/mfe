import moment from 'moment';

const getHeaders = () => {
  return [
    {
      Header: '',
      headerStyle: { backgroundColor: 'white', textAlign: 'left' },
      headerClassName: 'borderRight noBorderBottom ',
      fixed: 'left',
      columns: [
        {
          Header: 'Site',
          accessor: 'site',
          headerStyle: { textAlign: 'left' },
          style: { textAlign: 'left', paddingLeft: '15px' },
          headerClassName: 'borderBottom noPaddingTop',
          sortable: true,
          width: 70,
        },
        {
          Header: 'Client',
          accessor: 'client',
          headerStyle: { textAlign: 'left' },
          style: { textAlign: 'left' },
          sortable: true,
          width: 90,
          className: 'wrap-text',
          headerClassName: 'borderBottom noPaddingTop',
        },
        {
          Header: 'Product',
          accessor: 'product',
          headerStyle: { textAlign: 'left' },
          style: { textAlign: 'left' },
          sortable: true,
          width: 180,
          className: 'wrap-all',
          headerClassName: 'borderBottom noPaddingTop',
        },
        {
          Header: 'Description',
          accessor: 'product_name',
          headerStyle: { textAlign: 'left' },
          style: { textAlign: 'left' },
          sortable: true,
          width: 200,
          className: 'word-warp',
          headerClassName: 'borderBottom noPaddingTop',
        },
        {
          Header: 'UOM',
          accessor: 'packdesc',
          headerStyle: { textAlign: 'left' },
          style: { textAlign: 'left' },
          sortable: true,
          className: 'borderRight',
          headerClassName: 'borderRight borderBottom noPaddingTop',
          width: 100,
        },
      ],
    },
  ];
};

export const getDefaultDate = ({ setDefaultDate }) => {
  let minDate = '2021-01-01';
  let maxDate = '2021-01-31';
  setDefaultDate({ minDate, maxDate });
};

export const setValues = ({ dropdownValue, setDropdownValue, column, selected }) => {
  let newDropdownValue = dropdownValue;
  newDropdownValue[column] = selected;
  setDropdownValue(newDropdownValue);
};

export const setHeaderSummary = ({ dropdownValue, setHeader, setdateHeader }) => {
  let { fromDate, toDate, period } = dropdownValue;
  let tmp_header = null;
  let tmp_date_header = [];
  let x = getHeaders();
  tmp_header = x;
  let startDate = moment(fromDate);
  let endDate = moment(toDate);
  period = period.value;

  while (startDate <= endDate) {
    let newDate = startDate.format('DD MMMM YYYY');
    let dateAccessor = startDate.format('YYYY_MM_DD');
    tmp_date_header.push(dateAccessor);

    if (period === 'day') {
      startDate.add('days', 1);
    } else if (period === 'week') {
      let dates2 = moment(newDate).add('days', 6).format('DD MMMM YYYY');
      let dates1 = moment(newDate).format('DD MMMM YYYY');
      newDate = dates1 + ' - ' + dates2;
      startDate.add('days', 7);
    } else if (period === 'month') {
      startDate.add(1, 'M');
    }

    //set header
    let date = startDate;
    let tmp_header_date = {
      Header: newDate,
      headerStyle: { backgroundColor: 'white' },
      headerClassName: 'borderRight text-center noBorderBottom ',
      columns: [
        {
          Header: 'SA+',
          accessor: 'sa_plus_' + dateAccessor,
          className: 'text-right',
          headerClassName: 'borderBottom blueColor text-center ',
          Cell: '-',
          sortable: false,
          width: 75,
        },
        {
          Header: 'SA-',
          accessor: 'sa_minus_' + dateAccessor,
          className: 'text-right',
          headerClassName: 'borderBottom blueColor text-center',
          Cell: '-',
          sortable: false,
          width: 75,
        },
        {
          Header: 'Rec',
          accessor: 'rec_' + dateAccessor,
          Cell: '-',
          className: 'text-right',
          headerClassName: 'borderBottom blueColor text-center',
          sortable: false,
          width: 75,
        },
        {
          Header: 'Send',
          accessor: 'send_' + dateAccessor,
          className: 'borderRight text-right blueColor',
          headerClassName: 'borderRight borderBottom blueColor text-center',
          Cell: '-',
          sortable: false,
          width: 75,
        },
      ],
    };
    tmp_header.push(tmp_header_date);
  }
  console.log('tmp_header', tmp_header);
  console.log('tmp_date_header', tmp_date_header);
  setHeader(tmp_header);
  setdateHeader(tmp_date_header);
};
