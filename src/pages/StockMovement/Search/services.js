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
          width: 100,
        },
        {
          Header: 'Client',
          accessor: 'client',
          headerStyle: { textAlign: 'left' },
          style: { textAlign: 'left' },
          sortable: true,
          width: 120,
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
          accessor: 'uom',
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
  const minDate = '2021-01-01';
  const maxDate = '2021-01-31';
  setDefaultDate({ minDate, maxDate });
};

export const setValues = ({ dropdownValue, setDropdownValue, column, selected }) => {
  const newDropdownValue = dropdownValue;
  newDropdownValue[column] = selected;
  setDropdownValue(newDropdownValue);
};

export const setHeaderSummary = ({ dropdownValue, setHeader, setDateHeader }) => {
  const { fromDate, toDate } = dropdownValue;
  let { period } = dropdownValue;
  let tmpHeader = null;
  const tmpDateHeader = [];
  tmpHeader = getHeaders();
  const startDate = moment(fromDate);
  const endDate = moment(toDate);
  period = period.value;

  while (startDate <= endDate) {
    let newDate = startDate.format('DD MMMM YYYY');
    const dateAccessor = startDate.format('YYYY_MM_DD');

    if (period === 'day') {
      startDate.add('days', 1);
    } else if (period === 'week') {
      const dates2 = moment(newDate).add('days', 6).format('DD MMMM YYYY');
      const dates1 = moment(newDate).format('DD MMMM YYYY');
      newDate = `${dates1}-${dates2}`;
      startDate.add('days', 7);
    } else if (period === 'month') {
      newDate = startDate.format('MMMM YYYY');
      startDate.add(1, 'M');
    }

    let datePdf = null;
    if (period === 'week') {
      const newDate2 = startDate.format('DD MMMM YYYY');
      const dates2 = moment(newDate2).add('days', 6).format('DD MMM YYYY');
      const dates1 = moment(newDate2).format('DD MMM YYYY');
      datePdf = `${dates1}-${dates2}`;
    } else {
      datePdf = newDate;
    }

    tmpDateHeader.push({ dateAccessor, dateText: newDate, datePdf });
    const tmpHeaderDate = {
      Header: newDate,
      headerStyle: { backgroundColor: 'white' },
      headerClassName: 'borderRight text-center noBorderBottom ',
      columns: [
        {
          Header: 'SA+',
          accessor: `sa_plus_${dateAccessor}`,
          className: 'text-right',
          headerClassName: 'borderBottom blueColor text-center ',
          Cell: '-',
          sortable: false,
          width: 75,
        },
        {
          Header: 'SA-',
          accessor: `sa_minus_${dateAccessor}`,
          className: 'text-right',
          headerClassName: 'borderBottom blueColor text-center',
          Cell: '-',
          sortable: false,
          width: 75,
        },
        {
          Header: 'Rec',
          accessor: `rec_${dateAccessor}`,
          Cell: '-',
          className: 'text-right',
          headerClassName: 'borderBottom blueColor text-center',
          sortable: false,
          width: 75,
        },
        {
          Header: 'Send',
          accessor: `send_${dateAccessor}`,
          className: 'borderRight text-right',
          headerClassName: 'borderRight borderBottom blueColor text-center',
          Cell: '-',
          sortable: false,
          width: 75,
        },
      ],
    };
    tmpHeader.push(tmpHeaderDate);
  }
  setHeader(tmpHeader);
  setDateHeader(tmpDateHeader);
};

export const showFilter = ({ item, columnFilter, setColumnFilter, setValidResetFilter }) => {
  columnFilter.forEach(data => {
    if (data.accessor === item.accessor) data.hiddenFilter = !item.hiddenFilter
  });
  setValidResetFilter(false)
  setColumnFilter(columnFilter)
}

export const resetFilter = ({ module, filterHidden, dispatch, setShowModal, setColumnFilter, columnFilter }) => {
  columnFilter.forEach(data => { data.hiddenFilter = false })
  filterHidden.forEach(data => { data.hiddenFilter = false })
  localStorage.setItem(`filterHidden_${module}`, JSON.stringify(filterHidden));
  setColumnFilter(columnFilter)
  dispatch({ type: 'CHANGE_FILTER', data: true });
  setShowModal(false)
}

export const saveFilterSearch = ({ module, dispatch, columnFilter }) => {
  localStorage.setItem(`filterHidden_${module}`, JSON.stringify(columnFilter));
  dispatch({ type: 'CHANGE_FILTER', data: true });
}

export const closeModalFilter = ({ setColumnFilter, module, setShowModal, setChangeFilter, showModal, setValidResetFilter }) => {
  const dataDefault = JSON.parse(localStorage.getItem(`filterHidden_${module}`));
  setColumnFilter(dataDefault);
  setShowModal(!showModal);
  setChangeFilter(true);
  setValidResetFilter(true)
}
