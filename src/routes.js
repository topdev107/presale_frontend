import React from 'react'

const Home = React.lazy(() => import('./views/Home'))
const DefiLaunchPadInfo = React.lazy(() => import('./views/DefiLaunchPadInfo'))

const routes = [
  { path: '/', exact: true, name: 'Home', component: Home },
  { path: '/home', name: 'Home', component: Home },
  { path: '/defi_launch_pad_info', name: 'DefiLaunchPadInfo', component: DefiLaunchPadInfo }
]

export default routes
