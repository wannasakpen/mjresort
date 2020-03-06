import React from 'react';
 
const Dashboard = React.lazy(() => import('./views/Dashboard')); 
const Bookroom = React.lazy(() => import('./views/Book/Bookroom')); 

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard }, 
  { path: '/bookroom', name: 'Bookroom', component: Bookroom }, 
];

export default routes;
