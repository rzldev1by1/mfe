export const category = [
    {
        label: 'VEGETABLES',
        value: '1',
    }, {
        label: 'FRUIT',
        value: '2',
    },
    {
        label: 'MEAT',
        value: '3',
    }
]

export const simpleData = [
    { col1: 'data1', col2: 'data1', col3: 'data', col4: 'data' },
    { col1: 'data2', col2: 'data2', col3: 'data', col4: 'data' },
    { col1: 'data3', col2: 'data3', col3: 'data', col4: 'data' },
    { col1: 'data4', col2: 'data4', col3: 'data', col4: 'data' },
    { col1: 'data5', col2: 'data5', col3: 'data', col4: 'data' },
    { col1: 'data6', col2: 'data6', col3: 'data', col4: 'data' },
    { col1: 'data7', col2: 'data7', col3: 'data', col4: 'data' },
]

export const simpleSchema = [
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
        width: 500
    },
    {
        Header: 'Column 3',
        accessor: 'col3',
        headerStyle: { textAlign: 'left' },
        style: { textAlign: 'left', paddingLeft: '15px' },
        headerClassName: 'borderBottom noPaddingTop',
        sortable: true,
        width: 800
    },
    {
        Header: 'Column 4',
        accessor: 'col4',
        headerStyle: { textAlign: 'left' },
        style: { textAlign: 'left', paddingLeft: '15px' },
        headerClassName: 'borderBottom noPaddingTop',
        sortable: true,
        width: 800
    }
]