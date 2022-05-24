import { createSlice } from "@reduxjs/toolkit";

// export const sideBarStateSlice = createSlice({
export const metamaskStateSlice = createSlice({
    name: 'metamaskState',
    initialState: {
        // isSidebarShow: true,
        metaAddress: '',
    },
    reducers: {
        setMetamask: (state, action) => {
            state.metaAddress = action.payload
        }
    }
})

export const {setMetamask} = metamaskStateSlice.actions

export default metamaskStateSlice.reducer