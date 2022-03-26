import { createSlice } from "@reduxjs/toolkit";

export const createLaunchPadSlice = createSlice({
    name: 'createLaunchPadState',
    initialState: {
        tokenAddress: '',
        needTokenAmount: 0,
        tokenName: '',
        tokenSymbol: '',
        tokenDecimals: '',
        presaleRate: 0,
        isWhitelist: false,
        softcap: 0,
        hardcap: 0,
        minBuy: 0,
        maxBuy: 0,
        returnType: 'Burn',
        router: 'PancakeSwap',
        liquidity: 0,
        listingRate: 0,
        start: 0,
        end: 0,
        lockup: 0,
        cFirstReleasePercent: 0,
        cVestingPeriod: 0,
        cEachReleasePercent: 0,
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
        saveNeedTokenAmount: (state, action) => {
            state.needTokenAmount = action.payload
        },
        savePresaleRate: (state, action) => {
            state.presaleRate = action.payload
        },
        saveIsWhitelist: (state, action) => {
            state.isWhitelist = action.payload
        },
        saveSoftcap: (state, action) => {
            state.softcap = action.payload
        },
        saveHardcap: (state, action) => {
            state.hardcap = action.payload
        },
        saveMinBuy: (state, action) => {
            state.minBuy = action.payload
        },
        saveMaxBuy: (state, action) => {
            state.maxBuy = action.payload
        },
        saveReturnType: (state, action) => {
            state.returnType = action.payload
        },
        saveRouter: (state, action) => {
            state.router = action.payload
        },
        saveLiquidity: (state, action) => {
            state.liquidity = action.payload
        },
        saveListingRate: (state, action) => {
            state.listingRate = action.payload
        },
        saveStart: (state, action) => {
            state.start = action.payload
        },
        saveEnd: (state, action) => {
            state.end = action.payload
        },
        saveLockup: (state, action) => {
            state.lockup = action.payload
        },
        saveCFirstReleasePercent: (state, action) => {
            state.cFirstReleasePercent = action.payload
        },
        saveCVestingPeriod: (state, action) => {
            state.cVestingPeriod = action.payload
        },
        saveCEachReleasePercent: (state, action) => {
            state.cEachReleasePercent = action.payload
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
    saveTokenAddr,
    saveTokenName,
    saveTokenSymbol,
    saveTokenDecimals,
    saveNeedTokenAmount,
    savePresaleRate,
    saveIsWhitelist,
    saveSoftcap,
    saveHardcap,
    saveMinBuy,
    saveMaxBuy,
    saveReturnType,
    saveRouter,
    saveLiquidity,
    saveListingRate,
    saveStart,
    saveEnd,
    saveLockup,
    saveCFirstReleasePercent,
    saveCVestingPeriod,
    saveCEachReleasePercent,
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
} = createLaunchPadSlice.actions

export default createLaunchPadSlice.reducer