import React from 'react';

// const Breadcrumbs = React.lazy(() => import('./pages/Base/Breadcrumbs'));
const Welcome = React.lazy(() => import('./pages/Welcome/Welcome'));
const TesComponent= React.lazy(() => import('./pages/TesComponent/TesComponent'));
const StockHolding = React.lazy(() => import('./pages/StockHolding/StockHolding'));
const StockHoldingDetail = React.lazy(() => import('./pages/StockHolding/StockHoldingDetail'));
const SalesOrder = React.lazy(() => import('./pages/SalesOrder/SalesOrder'));
const SalesOrderDetail = React.lazy(() => import('./pages/SalesOrder/SalesOrderDetail'));
const PurchaseOrders = React.lazy(() => import('./pages/PurchaseOrders/PurchaseOrders'));
const PurchaseOrdersDetail = React.lazy(() => import('./pages/PurchaseOrders/PurchaseOrdersDetail'));
const StockMovement = React.lazy(() => import('./pages/StockMovement/StockMovement'));
// const StockAgeProfile = React.lazy(() => import('./pages/StockAgeProfile/StockAgeProfile'));
const UsersManagement = React.lazy(() => import('./pages/UserManagement/UserManagement'));
const UsersManagementDetail = React.lazy(() => import('./pages/UserManagement/UserManagementDetail'));

// REFACTOR - component
const Component = React.lazy(() => import('./pages/Component'));


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
	{ path: '/', exact: true, name: 'Microlistics', component: Welcome },
	{ path: '/tes-component', exact: true, name: 'Tes Component', component: TesComponent },
	{ path: '/stock-holding', exact: true, name: 'Stock Holding', component: StockHolding },
	{ path: '/stock-holding:product/:client/:site', exact: true, name: 'Stock Holding Detail', component: StockHoldingDetail },	
	{ path: '/purchase-order', exact: true, name: 'Purchase Order', component: PurchaseOrders },
	{ path: '/purchase-order/:site/:client/:orderdetail', exact: true, name: 'Purchase Order Detail', component: PurchaseOrdersDetail },	
	{ path: '/users-management', exact: true, name: 'User Management', component: UsersManagement },
	// { path: '/stock-age-profile', exact: true, name: 'Stock Age Profile', component: StockAgeProfile },
	{ path: '/users-management/:id/detail', exact: true, name: 'User Management', component: UsersManagementDetail },	
	{ path: '/sales-orders/:client/:site/:orderno', exact: true, name: 'Sales Order Detail', component: SalesOrderDetail },
	{ path: '/sales-orders', exact: true, name: 'Sales Orders', component: SalesOrder },
	{ path: '/stock-movement', exact: true, name: 'Stock Movement', component: StockMovement },

	// REFACTOR - component Start ----------------------------------------------------------------------------------------------
	{ 
		path: '/component',
		exact: true,
		name: 'Component',
		component: Component
	},
	// REFACTOR - component End ----------------------------------------------------------------------------------------------
];

export default routes;
