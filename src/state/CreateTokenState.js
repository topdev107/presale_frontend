import { createSlice } from "@reduxjs/toolkit";

export const createTokenSlice = createSlice({
    name: 'createTokenState',
    initialState: {
        tokenType: '',
        tokenName: '',
        tokenSymbol: '',
        tokenDecimals: 0,
        tokenTotalSupply: 0,
        useAntiBot: false,
    },
    reducers: {
        saveTokenType: (state, action) => {
            state.tokenType = action.payload
        },
        saveTokenName: (state, action) => {
            state.tokenName = action.payload
        },
        saveTokenSymbol: (state, action) => {
            state.tokenSymbol = action.payload
        },
        saveTokenDecimal: (state, action) => {
            console.log('Set Decimal')
            state.tokenDecimals = action.payload
            console.log(state.tokenDecimals)
        },
        saveTokenTotalSupply: (state, action) => {
            state.tokenTotalSupply = action.payload
        },
        saveUseAntiBot: (state, action) => {
            state.useAntiBot = action.payload
        }
    }
})

export const {
    saveTokenType,
    saveTokenName,
    saveTokenSymbol,
    saveTokenDecimal,
    saveTokenTotalSupply,
    saveUseAntiBot,
} = createTokenSlice.actions

export default createTokenSlice.reducer