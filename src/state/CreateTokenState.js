import { createSlice } from "@reduxjs/toolkit";

export const createTokenSlice = createSlice({
    name: 'createTokenState',
    initialState: {
        tokenAddress: '',
        tokenType: '',
        tokenName: '',
        tokenSymbol: '',
        tokenDecimals: 0,
        tokenTotalSupply: 0,
        useAntiBot: false,

        router: 'Pancakeswap',
        transfeeYield: 0,
        transfeeLiquidity: 0,
        charityAddress: '',
        charityPercent: 0,

        rewardToken: '',
        minimumTokenBalance: 0,
        tokenRewardfee: 0,
        autoAddLiquidity: 0,
        marketingFee: 0,
        marketingWallet: 0,

        liquidityFee: 0,
        buyBackFee: 0,
        reflectionFee: 0,
    },
    reducers: {
        saveTokenAddress: (state, action) => {
            state.tokenAddress = action.payload
        },
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
        },
        saveRouter: (state, action) => {
            state.router = action.payload
        },
        saveTransfeeYield: (state, action) => {
            state.transfeeYield = action.payload
        },
        saveTransfeeLiquidity: (state, action) => {
            state.transfeeLiquidity = action.payload
        },
        saveCharityAddress: (state, action) => {
            state.charityAddress = action.payload
        },
        saveCharityPercent: (state, action) => {
            state.charityPercent = action.payload
        },
        saveRewardToken: (state, action) => {
            state.rewardToken = action.payload
        },
        saveMinimumTokenBalance: (state, action) => {
            state.minimumTokenBalance = action.payload
        },
        saveTokenRewardFee: (state, action) => {
            state.tokenRewardfee = action.payload
        },
        saveAutoAddLiquidity: (state, action) => {
            state.autoAddLiquidity = action.payload
        },
        saveMarketingFee: (state, action) => {
            state.marketingFee = action.payload
        },
        saveMarketingWallet: (state, action) => {
            state.marketingWallet = action.payload
        },
        saveLiquidityFee: (state, action) => {
            state.liquidityFee = action.payload
        },
        saveBuyBackFee: (state, action) => {
            state.buyBackFee = action.payload
        },
        saveRefelctionFee: (state, action) => {
            state.reflectionFee = action.payload
        }
    }
})

export const {
    saveTokenAddress,
    saveTokenType,
    saveTokenName,
    saveTokenSymbol,
    saveTokenDecimal,
    saveTokenTotalSupply,
    saveUseAntiBot,
    saveRouter,
    saveTransfeeYield,
    saveTransfeeLiquidity,
    saveCharityAddress,
    saveCharityPercent,
    saveRewardToken,
    saveMinimumTokenBalance,
    saveTokenRewardFee,
    saveAutoAddLiquidity,
    saveMarketingFee,
    saveMarketingWallet,
    saveBuyBackFee,
    saveRefelctionFee,
    saveLiquidityFee,
    
} = createTokenSlice.actions

export default createTokenSlice.reducer