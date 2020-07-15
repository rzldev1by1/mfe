import React from 'react';
// import Loadable from 'react-loadable';
// import DefaultLayout from 'shared/DefaultLayout';

// function Loading() {
// 	return <div>Loading...</div>;
// }

// const Breadcrumbs = React.lazy(() => import('./pages/Base/Breadcrumbs'));
const Welcome = React.lazy(() => import('./pages/Welcome/Welcome'));
const StockHolding = React.lazy(() => import('./pages/StockHolding/StockHolding'));
const StockHoldingDetail = React.lazy(() => import('./pages/StockHolding/StockHoldingDetail'));
const SalesOrder = React.lazy(() => import('./pages/SalesOrder/SalesOrder'));
const SalesOrderDetail = React.lazy(() => import('./pages/SalesOrder/SalesOrderDetail'));
const PurchaseOrders = React.lazy(() => import('./pages/PurchaseOrders/PurchaseOrders'));
const PurchaseOrdersDetail = React.lazy(() => import('./pages/PurchaseOrders/PurchaseOrdersDetail'));
const StockMovement = React.lazy(() => import('./pages/StockMovement/StockMovement'));
const StockAgeProfile = React.lazy(() => import('./pages/StockAgeProfile/StockAgeProfile'));
const UsersManagement = React.lazy(() => import('./pages/UserManagement/UserManagement'));
const UsersManagementDetail = React.lazy(() => import('./pages/UserManagement/UserManagementDetail'));
// const StockAgeProfile = React.lazy(() => import('./pages/StockAgeProfile/StockAgeProfile'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
	{ path: '/', exact: true, name: 'Microlistics', component: Welcome },
	{ path: '/stock-holding', exact: true, name: 'Stock Holding', component: StockHolding },
	{ path: '/stock-holding:product/:client/:site', exact: true, name: 'Stock Holding Detail', component: StockHoldingDetail },
	// { path: '/stockmovement', exact: true, name: 'Stock Movement', component: StockMovement },
	{ path: '/stockageprofile', exact: true, name: 'Stock Age Profile', component: StockAgeProfile },

	{ path: '/purchase-order', exact: true, name: 'Purchase Order', component: PurchaseOrders },
	{ path: '/purchase-order/:client/:orderdetail', exact: true, name: 'Purchase Order Detail', component: PurchaseOrdersDetail },
	// { path: '/icons', exact: true, name: 'Sales Order', component: SalesOrder },

	{ path: '/users-management', exact: true, name: 'User Management', component: UsersManagement },
	{ path: '/stock-age-profile', exact: true, name: 'Stock Age Profile', component: StockAgeProfile },
	{ path: '/users-management/:id/detail', exact: true, name: 'User Management', component: UsersManagementDetail },
	// { path: '/users-management/create', exact: true, name: 'User Management', component: UsersManagementCreate },
	{ path: '/sales-orders/:client/:site/:orderno', exact: true, name: 'Sales Order Detail', component: SalesOrderDetail },
	{ path: '/sales-orders', exact: true, name: 'Sales Orders', component: SalesOrder },
	{ path: '/stock-movement', exact: true, name: 'Stock Movement', component: StockMovement },
];

export default routes;
