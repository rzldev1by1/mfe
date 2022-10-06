export default {
    stockMovementFilterSearch: [
        { name: 'Site', accessor: 'site', hiddenFilter: false },
        { name: 'Client', accessor: 'client', hiddenFilter: false },
        { name: 'Product', accessor: 'product', hiddenFilter: false },
    ],
    salesOrderFilterSearch: [
        { name: 'Site', accessor: 'site', hiddenFilter: false },
        { name: 'Client', accessor: 'client', hiddenFilter: false },
        { name: 'Status', accessor: 'status', hiddenFilter: false },
        { name: 'Order Type', accessor: 'orderType', hiddenFilter: false },
        { name: 'Task', accessor: 'task', hiddenFilter: false },
        { name: 'Customer Order Ref', accessor: 'customerpono', hiddenFilter: false },
        { name: 'Vendor Order Ref', accessor: 'vendororderno', hiddenFilter: false },
        { name: 'Delivery Date', accessor: 'deliveryDate', hiddenFilter: false },
        { name: 'Date Received', accessor: 'dateReceived', hiddenFilter: false },
        { name: 'Date Released', accessor: 'dateReleased', hiddenFilter: false },
        { name: 'Date Completed', accessor: 'dateCompleted', hiddenFilter: false },
    ],
    purchaseOrderFilterSearch: [
        { name: 'Site', accessor: 'site', hiddenFilter: false },
        { name: 'Client', accessor: 'client', hiddenFilter: false },
        { name: 'Status', accessor: 'status', hiddenFilter: false },
        { name: 'Order Type', accessor: 'orderType', hiddenFilter: false },
        { name: 'Task', accessor: 'task', hiddenFilter: false },
        { name: 'Order Date', accessor: 'deliveryDate', hiddenFilter: false },
        { name: 'Date Received', accessor: 'dateReceived', hiddenFilter: false },
        { name: 'Date Released', accessor: 'dateReleased', hiddenFilter: false },
        { name: 'Date Completed', accessor: 'dateCompleted', hiddenFilter: false },
    ],
    StockHoldingFilterSearch: [
        { name: 'Site', accessor: 'site', hiddenFilter: false },
        { name: 'Client', accessor: 'client', hiddenFilter: false },
        { name: 'Status', accessor: 'status', hiddenFilter: false },
    ]

};


