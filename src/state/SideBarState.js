import { createSlice } from "@reduxjs/toolkit";

export const sideBarStateSlice = createSlice({
    name: 'sideBarState',
    initialState: {
        isSidebarShow: true,
    },
    reducers: {
        set: (state, action) => {
            state.isSidebarShow = action.payload
        }
    }
})

export const {set} = sideBarStateSlice.actions

export default sideBarStateSlice.reducer