import React from 'react'

const Home = React.lazy(() => import('./views/Home'))
const DefiLaunchPadInfo = React.lazy(() => import('./views/DefiLaunchPadInfo'))
const AddAdditionalInfo = React.lazy(() => import('./views/AddAdditionalInfo'))
const Review = React.lazy(() => import('./views/Review'))

const routes = [
  { path: '/', exact: true, name: 'Home', component: Home },
  { path: '/home', name: 'Home', component: Home },
  { path: '/defi_launch_pad_info', name: 'DefiLaunchPadInfo', component: DefiLaunchPadInfo },
  { path: '/add_additional_info', name: 'AddAdditionalInfo', component: AddAdditionalInfo},
  { path: '/review', name: 'Review', component: Review}
]

export default routes
