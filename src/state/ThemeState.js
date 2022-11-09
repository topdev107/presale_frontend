import { createSlice } from "@reduxjs/toolkit";

export const themeStateSlice = createSlice({
    name: 'themeState',
    initialState: {
        mode: 'light',
    },
    reducers: {
        setMode: (state, action) => {
            state.mode = action.payload
        }
    }
})

export const {setMode} = themeStateSlice.actions

export default themeStateSlice.reducer