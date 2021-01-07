import React from 'react';

// Component
const Welcome = React.lazy(() => import('./pages/Welcome/Welcome'));
const Component = React.lazy(() => import('../src/pages/Component'));
const PurchaseOrders = React.lazy(() => import('../src/pages/PurchaseOrders'));
// const PurchaseOrdersDetail = React.lazy(() => import('../src/pages/PurchaseOrders/Detail'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [

	// Component Start --------------------------------------------------------
	{ 
		path: '/', 
		exact: true, 
		name: 'Microlistics', 
		component: Welcome 
	},
	{ 
		path: '/component',
		exact: true,
		name: 'Component',
		component: Component
	},
	{ 
		path: '/purchase-order',
		exact: true,
		name: 'Purchase Order', 
		component: PurchaseOrders
	},
	// { 
	// 	path: '/purchase-order/:site/:client/:orderdetail',
	// 	exact: true,
	// 	name: 'Purchase Order Detail', 
	// 	component: PurchaseOrdersDetail
	// },
	// Component End -----------------------------------------------------------
];

export default routes;
