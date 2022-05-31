import { createSlice } from "@reduxjs/toolkit";

export const createFairLaunchSlice = createSlice({
    name: 'createFairLaunchState',
    initialState: {
        basicSymbol: '',
        currentAddr: '',
        tokenAddress: '',
        needTokenAmount: 0,
        tokenName: '',
        tokenSymbol: '',
        tokenDecimals: '',
        tokenTotalSupply: 0,
        total_selling_amount: 0,
        softcap: 0,
        router: 'PancakeSwap',
        liquidity: 0,
        startDate: 0,
        endDate: 0,
        lockup: 0,
        usingTeamVesting: false,
        totalTeamVestingTokens: 0,
        tFirstReleaseTime: 0,
        tFirstReleasePercent: 0,
        tVestingPeriod: 0,
        tEachReleasePercent: 0,
        logoURL: '',
        website: '',
        facebook: '',
        twitter: '',
        github: '',
        telegram: '',
        instagram: '',
        discord: '',
        reddit: '',
        desc: ''
    },
    reducers: {
        saveBasicSymbol: (state, action) => {
            state.basicSymbol = action.payload
        },
        saveCurrentAddr: (state, action) => {
            state.currentAddr = action.payload
        },
        saveTokenAddr: (state, action) => {
            state.tokenAddress = action.payload
        },
        saveTokenName: (state, action) => {
            state.tokenName = action.payload
        },
        saveTokenSymbol: (state, action) => {
            state.tokenSymbol = action.payload
        },
        saveTokenDecimals: (state, action) => {
            state.tokenDecimals = action.payload
        },
        saveTokenTotalSupply: (state, action) => {
            state.tokenTotalSupply = action.payload
        },
        saveNeedTokenAmount: (state, action) => {
            state.needTokenAmount = action.payload
        },
        saveTotalSellingAmount: (state, action) => {
            state.total_selling_amount = action.payload
        },
        saveSoftcap: (state, action) => {
            state.softcap = action.payload
        },
        saveRouter: (state, action) => {
            state.router = action.payload
        },
        saveLiquidity: (state, action) => {
            state.liquidity = action.payload
        },
        saveStart: (state, action) => {
            state.startDate = action.payload
        },
        saveEnd: (state, action) => {
            state.endDate = action.payload
        },
        saveLockup: (state, action) => {
            state.lockup = action.payload
        },
        saveUsingTeamVesting: (state, action) => {
            state.usingTeamVesting = action.payload
        },
        saveTotalTeamVestingTokens: (state, action) => {
            state.totalTeamVestingTokens = action.payload
        },
        saveTFirstReleaseTime: (state, action) => {
            state.tFirstReleaseTime = action.payload
        },
        saveTFirstReleasePercent: (state, action) => {
            state.tFirstReleasePercent = action.payload
        },
        saveTVestingPeriod: (state, action) => {
            state.tVestingPeriod = action.payload
        },
        saveTEachReleasePercent: (state, action) => {
            state.tEachReleasePercent = action.payload
        },
        saveLogoURL: (state, action) => {
            state.logoURL = action.payload
        },
        saveWebsite: (state, action) => {
            state.website = action.payload
        },
        saveFacebook: (state, action) => {
            state.facebook = action.payload
        },
        saveTwitter: (state, action) => {
            state.twitter = action.payload
        },
        saveGithub: (state, action) => {
            state.github = action.payload
        },
        saveTelegram: (state, action) => {
            state.telegram = action.payload
        },
        saveInstagram: (state, action) => {
            state.instagram = action.payload
        },
        saveDiscord: (state, action) => {
            state.discord = action.payload
        },
        saveReddit: (state, action) => {
            state.reddit = action.payload
        },
        saveDesc: (state, action) => {
            state.desc = action.payload
        }
    }
})

export const {
    saveBasicSymbol,
    saveCurrentAddr,
    saveTokenAddr,
    saveTokenName,
    saveTokenSymbol,
    saveTokenDecimals,
    saveTokenTotalSupply,
    saveNeedTokenAmount,
    saveTotalSellingAmount,
    saveSoftcap,
    saveRouter,
    saveLiquidity,
    saveStart,
    saveEnd,
    saveLockup,
    saveTotalTeamVestingTokens,
    saveTFirstReleaseTime,
    saveTFirstReleasePercent,
    saveTVestingPeriod,
    saveTEachReleasePercent,
    saveLogoURL,
    saveWebsite,
    saveFacebook,
    saveTwitter,
    saveGithub,
    saveTelegram,
    saveInstagram,
    saveDiscord,
    saveReddit,
    saveDesc,
    saveUsingTeamVesting,
} = createFairLaunchSlice.actions

export default createFairLaunchSlice.reducer