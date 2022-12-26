import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import WalletConnect from '@walletconnect/web3-provider'
import Web3 from 'web3'

export const providerOptions = {
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: 'Flash Launch',
      infuraId: '1e716887163b43889857f2a767573122',
    },
  },
  walletconnect: {
    package: WalletConnect,
    options: {
      infuraId: '1e716887163b43889857f2a767573122',
    },
  },
}

export const networks = {
  56: {
    display: 'BSC Mainnet',
    name: 'Binance Smart Chain Mainnet',
    rpcUrl: ['https://bscrpc.com'],
    chainId: '0x38',
    currency: {
      symbol: 'BNB',
      decimals: 18,
    },
    explorer: 'https://bscscan.com/',
  },
  97: {
    display: 'BSC Testnet',
    name: 'Binance Smart Chain Testnet',
    rpcUrl: ['https://data-seed-prebsc-1-s3.binance.org:8545'],
    chainId: '0x61',
    currency: {
      symbol: 'TBNB',
      decimals: 18,
    },
    explorer: 'https://testnet.bscscan.com/',
  },
  25: {
    display: 'Cronos Mainnet',
    name: 'Cronos Mainnet',
    rpcUrl: ['https://evm.cronos.org'],
    chainId: '0x19',
    currency: {
      symbol: 'CRO',
      decimals: 18,
    },
    explorer: 'https://cronoscan.com/',
  },
  338: {
    display: 'Cronos Testnet',
    name: 'Cronos Testnet',
    rpcUrl: ['https://evm-t3.cronos.org'],
    chainId: '0x152',
    currency: {
      symbol: 'TCRO',
      decimals: 18,
    },
    explorer: 'https://testnet.cronoscan.com/',
  },
}