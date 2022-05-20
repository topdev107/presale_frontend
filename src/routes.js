import React from 'react'

const Home = React.lazy(() => import('./views/launchpad/Home'))
const DefiLaunchPadInfo = React.lazy(() => import('./views/launchpad/DefiLaunchPadInfo'))
const AddAdditionalInfo = React.lazy(() => import('./views/launchpad/AddAdditionalInfo'))
const Review = React.lazy(() => import('./views/launchpad/Review'))
const FairHome = React.lazy(() => import('./views/fairlaunch/FairHome'))
const DefiFairLaunchInfo = React.lazy(() => import('./views/fairlaunch/DefiFairLaunchInfo'))
const FairAddAdditionalInfo = React.lazy(() => import('./views/fairlaunch/FairAddAdditionalInfo'))
const FairReview = React.lazy(() => import('./views/fairlaunch/FairReview'))
const TokenHome = React.lazy(() => import('./views/token/Home'))
const TokenSuccess = React.lazy(() => import('./views/token/Success'))
const LaunchpadList = React.lazy(() => import('./views/launchpadlist/Home'))
const FairPoolView = React.lazy(() => import('./views/FairPoolView'))
const NormalPoolView = React.lazy(() => import('./views/NormalPoolView'))

const routes = [
  { path: '/', exact: true, name: 'Home', component: Home },
  { path: '/launchpad/home', name: 'Home', component: Home },
  { path: '/launchpad/defi_launch_pad_info', name: 'DefiLaunchPadInfo', component: DefiLaunchPadInfo },
  { path: '/launchpad/add_additional_info', name: 'AddAdditionalInfo', component: AddAdditionalInfo},
  { path: '/launchpad/review', name: 'Review', component: Review},
  { path: '/fairlaunch/home', name: 'FairHome',  component: FairHome },
  { path: '/fairlaunch/defi_fair_launch_info', name: 'DefiFairLaunchInfo',  component: DefiFairLaunchInfo },
  { path: '/fairlaunch/add_additional_info', name: 'FairAddAdditionalInfo',  component: FairAddAdditionalInfo },
  { path: '/fairlaunch/review', name: 'FairReview', component: FairReview },
  { path: '/createtoken/home', name: 'CreateToken', component: TokenHome },
  { path: '/createToken/success', name: 'SuccessTokenCreation', component: TokenSuccess},
  { path: '/launchpadlist', name: 'LaunchPadList', component: LaunchpadList },
  { path: '/launchviewfair', name: 'FairPoolView', component: FairPoolView},
  { path: '/launchviewnormal', name: 'NormalPoolView', component: NormalPoolView},
]

export default routes
