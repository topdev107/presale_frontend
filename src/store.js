import { createStore } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import sideBarStateReducer from './state/SideBarState'
import createLaunchPadStateReducer from './state/CreateLaunchPadState'
import createFairLaunchStateReducer from './state/CreateFairLaunchState'
import createTokenStateReducer from './state/CreateTokenState'
import metamaskReducer from './state/MetamaskState'

export default configureStore ({
  reducer: {
    sideBarState: sideBarStateReducer,
    createLaunchPadState: createLaunchPadStateReducer,
    createFairLaunchState: createFairLaunchStateReducer,
    createTokenState: createTokenStateReducer,
    metamaskState: metamaskReducer,
  },
})

// const initialState = {
//   sidebarShow: true,
// }

// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case 'set':
//       return { ...state, ...rest }
//     default:
//       return state
//   }
// }

// const store = createStore(changeState)
// export default store
