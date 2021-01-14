import React from 'react';

// Component
const Component = React.lazy(() => import('../src/pages/Component'));
const PurchaseOrders = React.lazy(() => import('../src/pages/PurchaseOrders'));
const PurchaseOrdersDetail = React.lazy(() => import('./pages/PurchaseOrders/Detail'));
const SalesOrder = React.lazy(() => import('./pages/SalesOrders/'));
const SalesOrderDetail = React.lazy(() => import('./pages/SalesOrders/Detail'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  // Component Start --------------------------------------------------------
  {
    path: '/component',
    exact: true,
    name: 'Component',
    component: Component,
  },
  // Purchase Order --------------------------------------------------------
  {
    path: '/purchase-order',
    exact: true,
    name: 'Purchase Order',
    component: PurchaseOrders,
  },
  {
    path: '/purchase-order/:site/:client/:orderdetail',
    exact: true,
    name: 'Purchase Order Detail',
    component: PurchaseOrdersDetail,
  },
  // Sales Order --------------------------------------------------------
  { 
    path: '/sales-order', 
    exact: true, 
    name: 'Sales Orders', 
    component: SalesOrder 
  },
  { 
    path: '/sales-order/:client/:site/:orderno', 
    exact: true, 
    name: 'Sales Order Detail', 
    component: SalesOrderDetail },
  // Component End -----------------------------------------------------------
];

export default routes;
