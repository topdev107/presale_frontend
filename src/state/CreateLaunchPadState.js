import { createSlice } from "@reduxjs/toolkit";

export const createLaunchPadSlice = createSlice({
    name: 'createLaunchPadState',
    initialState: {
        tokenAddress: '',
        tokenSymbol: '',
        tokenDecimals: '',
    },
    reducers: {
        setToken: (state, action) => {
            state.tokenAddress = action.payload.tokenAddress
            state.tokenSymbol = action.payload.tokenSymbol
            state.tokenDecimals = action.payload.tokenDecimals
        },
        delToken: (state) => {
            state.tokenAddress = ''
            state.tokenSymbol = ''
            state.tokenDecimals = ''
        },
        setTokenAddr: (state, action) => {
            state.tokenAddress = action.payload
        }
    }
})

export const {setToken, delToken, setTokenAddr} = createLaunchPadSlice.actions

export default createLaunchPadSlice.reducer