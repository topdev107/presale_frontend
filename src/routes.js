import React from 'react'

const Home = React.lazy(() => import('./views/Home'))

const routes = [
  { path: '/', exact: true, name: 'Home', component: Home },
  { path: '/home', name: 'Home', component: Home }
]

export default routes
