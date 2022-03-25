import { createStore } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import sideBarStateReducer from './state/SideBarState'
import createLaunchPadStateReducer from './state/CreateLaunchPadState'

export default configureStore ({
  reducer: {
    sideBarState: sideBarStateReducer,
    createLaunchPadState: createLaunchPadStateReducer
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
