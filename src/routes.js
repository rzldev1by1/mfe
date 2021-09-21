import React from 'react';

// Component
const Welcome = React.lazy(() => import('./pages/Welcome/Welcome'));
const StockHolding = React.lazy(() => import('./pages/StockHolding'));
const StockHoldingDetail = React.lazy(() => import('./pages/StockHolding/Detail'));
const PurchaseOrders = React.lazy(() => import('../src/pages/PurchaseOrders'));
const PurchaseOrdersDetail = React.lazy(() => import('./pages/PurchaseOrders/Detail'));
const SalesOrder = React.lazy(() => import('./pages/SalesOrders/'));
const SalesOrderDetail = React.lazy(() => import('./pages/SalesOrders/Detail'));
const StockMovement = React.lazy(() => import('./pages/StockMovement'));
const UserManagement = React.lazy(() => import('./pages/UserManagement'));
const UsersManagementDetail = React.lazy(() => import('./pages/UserManagement/Detail'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  // Component Start --------------------------------------------------------
  {
    path: '/',
    exact: true,
    name: 'Welcome',
    component: Welcome,
  },

  // Stock Holding --------------------------------------------------------
  {
    path: '/stock-holding',
    exact: true,
    name: 'Stock Holding',
    component: StockHolding,
  },
  {
    path: '/stock-holding:product/:client/:site',
    exact: true,
    name: 'Stock Holding Detail',
    component: StockHoldingDetail,
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
    component: SalesOrder,
  },
  {
    path: '/sales-order/:client/:site/:orderno',
    exact: true,
    name: 'Sales Order Detail',
    component: SalesOrderDetail,
  },
  // Stock Movement --------------------------------------------------------
  {
    path: '/stock-movement',
    exact: true,
    name: 'Stock Movement',
    component: StockMovement,
  },
  // User Management --------------------------------------------------------

  {
    path: '/users-management',
    exact: true,
    name: 'User Management',
    component: UserManagement,
  },
  {
    path: '/users-management/:id/detail',
    exact: true,
    name: 'User Management',
    component: UsersManagementDetail,
  },

  // Component End -----------------------------------------------------------
];

export default routes;
