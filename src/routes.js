import React from 'react';
// import Loadable from 'react-loadable';
// import DefaultLayout from 'shared/DefaultLayout';

// function Loading() {
// 	return <div>Loading...</div>;
// }

// const Breadcrumbs = React.lazy(() => import('./pages/Base/Breadcrumbs'));
const Welcome = React.lazy(() => import('./pages/Welcome/Welcome'));
const SalesOrder = React.lazy(() => import('./pages/SalesOrder/SalesOrder'));
const SalesOrderDetail = React.lazy(() => import('./pages/SalesOrder/SalesOrderDetail'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
	{ path: '/', exact: true, name: 'Microlistics', component: Welcome },
	// { path: '/stockholding', exact: true, name: 'Stock Holding', component: StockHolding },
	// { path: '/stockholding/:productId/:client/:site', exact: true, name: 'Stock Holding Details', component: StockHoldingDetails },
	// { path: '/stockmovement', exact: true, name: 'Stock Movement', component: StockMovement },
	// { path: '/stockageprofile', exact: true, name: 'Stock Age Profile', component: StockAgeProfile },

	// { path: '/purchaseorder', exact: true, name: 'Purchase Order', component: PurchaseOrder },
	// { path: '/purchaseorder/:client/:orderdetail', exact: true, name: 'Purchase Order Detail', component: PurchaseOrderDetail },
	// { path: '/icons', exact: true, name: 'Sales Order', component: SalesOrder },

	// { path: '/users-management', exact: true, name: 'User Management', component: UsersManagement },
	// { path: '/users-management/:id/detail', exact: true, name: 'User Management', component: UsersManagementDetail },
	// { path: '/users-management/create', exact: true, name: 'User Management', component: UsersManagementCreate },
	{ path: '/sales-orders/:client/:site/:orderno', exact: true, name: 'Sales Order Detail', component: SalesOrderDetail },
	{ path: '/sales-orders', exact: true, name: 'Sales Orders', component: SalesOrder },
];

export default routes;
