import { cilMenu } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CContainer,
  CHeader,
  CHeaderBrand, CHeaderNav,
  CHeaderToggler,
  CButton,
  CModal, CModalHeader, CModalBody, CModalTitle,
  CCardImage,
  CRow, CCol,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logo } from 'src/assets/brand/logo'
import { useWeb3Context } from 'web3-react'
import { AppHeaderDropdown } from './header/index'
import { set } from '../state/SideBarState'
import { setMetamask } from '../state/MetamaskState'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sideBarState.isSidebarShow)

  const [modalVisible, setModalVisible] = useState(false);
  const [networkId, setNetworkId] = useState('')
  const chainInformation = [
    [56, 'Binance Smart Chain', 'https://bsc-dataseed.binance.org/', 'https://bscscan.com/', {symbol: 'BNB', decimals: 18}], 
    [25, 'Cronos', 'https://evm.cronos.org', 'https://cronoscan.com/', {symbol: 'CRO', decimals: 18}],
    [97, 'BSC Testnet', 'https://data-seed-prebsc-1-s1.binance.org:8545/', 'https://testnet.bscscan.com', {symbol: 'tBNB', decimals: 18}], 
    [338, 'Cronos-testnet', 'https://evm-t3.cronos.org/', 'https://testnet.cronoscan.com/', {symbol: 'tCRO', decimals: 18}]
  ]
  const [currentAccount, setCurrentAccount] = useState(null);

  // const disconnectWalletHandler = () => {
  //   setCurrentAccount(null)
  // }
  async function loadWallet() {
    try {
      const provider = window.ethereum;
      if (!provider) {
          alert("Metamask is not installed, please install!");
      }

      const chainId = await provider.request({ method: 'eth_chainId' });
      if (chainId === '0x61' ||
          chainId === '0x38' ||
          chainId === '0x19' || 
          chainId === '0x152') {
          console.log("Bravo!, you are on the correct network");
      } else {
          try {
              await provider.request({
                  method: 'wallet_switchEthereumChain',
                  params: [{ chainId: '0x61' }],
              });
              console.log("You have succefully switched to Binance Test network")
          } catch (switchError) {
              // This error code indicates that the chain has not been added to MetaMask.
              if (switchError.code === 4902) {
                  try {
                      await provider.request({
                          method: 'wallet_addEthereumChain',
                          params: [
                              {
                                  chainId: '0x61',
                                  chainName: 'Binance Smart Chain',
                                  rpcUrls: ['https://bsc-dataseed.binance.org/'],
                                  blockExplorerUrls: ['https://bscscan.com/'],
                                  nativeCurrency: {
                                      symbol: 'BNB',
                                      decimals: 18,
                                  }
                              }
                          ]
                      });
                  } catch (addError) {
                      console.log(addError);
                      // alert(addError);
                  }
              }
              // alert("Failed to switch to the network")
              return;
          }
      }
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      console.log("Found an account! Address: ", accounts[0])
      dispatch(setMetamask(accounts[0]))
      if (chainId === '0x61'){
        setNetworkId('BSC TESTNET')
      } else if (chainId === '0x38') {
        setNetworkId('BSC MAINNET')
      } else if (chainId === '0x19') {
        setNetworkId('Cronos MAINNET')
      } else if (chainId === '0x152') {
        setNetworkId('Cronos TESTNET')
      }
      
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadWallet();
  }, [])

  const connectWalletHandler = async () => {
    try {
      loadWallet();
    } catch (e) {
      console.log(e)
    }
  }

  const changeNetwork = async (id) => {
    const provider = window.ethereum;
    const chain = chainInformation[id][0], chainName = chainInformation[id][1],
      rpcURL = chainInformation[id][2], blockExplorer = chainInformation[id][3], native = chainInformation[id][4]
    var currentChain;
    if(networkId == 'BSC MAINNET') {
      currentChain = 56
    } else if(networkId == 'Cronos MAINNET') {
      currentChain = 25
    } else if(networkId == 'BSC TESTNET') {
      currentChain = 97
    } else if(networkId == 'Cronos TESTNET') {
      currentChain = 338
    }
    if(currentChain != chain) {
      try {
        await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${chain.toString(16)}` }],
        });
        console.log(`You have succefully switched to ${networkId} network`)
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
            try {
                await provider.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: `0x${chain.toString(16)}`,
                            chainName: chainName,
                            rpcUrls: [rpcURL],
                            blockExplorerUrls: [blockExplorer],
                            nativeCurrency: native,
                        }
                    ]
                });
            } catch (addError) {
                console.log(addError);
                // alert(addError);
            }
        }
        // alert("Failed to switch to the network")
        return;
      } 
    }
    setModalVisible(false)
  }

  window.ethereum.on('accountsChanged', function (accounts) {
    setCurrentAccount(accounts[0])
    dispatch(setMetamask(accounts[0]))
  })
  window.ethereum.on('networkChanged', function (networkid) {
    // Time to reload your interface with the new networkId
    // 56 - bsc mainnet
    // 25 - cronos mainnet
    // 97 - bsc testnet
    // 338 - cronos testnet
    console.log(networkid)
    if(networkid == 56 ) {
      setNetworkId('BSC MAINNET')
    } else if(networkid == 25) {
      setNetworkId('Cronos MAINNET')
    } else if(networkid == 97) {
      setNetworkId('BSC TESTNET')
    } else if(networkid == 338) {
      setNetworkId('Cronos TESTNET')
    } else {
      setNetworkId('Not support')
    }
  })

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          // onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          onClick={() => {
            dispatch(set(!sidebarShow))
          }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="ms-3">
          <CButton color="warning" variant="outline" shape="rounded-pill" style={{color: 'white', fontWeight: 'bold'}} onClick={() => setModalVisible(!modalVisible)}>{networkId}</CButton>
            <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
              <CModalHeader onClose={() => setModalVisible(false)}>
                <CModalTitle>Choose network</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <p className='text-white-color'> MAINNET</p>
                <CRow xs={12} className="display-block">
                  <CCol xs={6} className="d-grid width-100">
                    <CButton color="dark" onClick={() => changeNetwork(0)}>  
                      <CCardImage orientation="top" src="/logo_BNB.png" style={{width: '40px', height: '40px'}}/>&nbsp;
                      BNB Smart Chain
                    </CButton>
                  </CCol>
                  <CCol xs={6} className="d-grid width-100 mt-3">
                    <CButton  color="dark" onClick={() => changeNetwork(1)}>
                      <CCardImage orientation="top" src="/logo_CRON.svg" style={{width: '40px', height: '40px'}}/>&nbsp;
                      Cronos
                    </CButton>
                  </CCol>
                </CRow>
                <br/>
                <p className='text-white-color'>TESTNET</p>
                <CRow xs={12} className="display-block">
                  <CCol xs={6} className="d-grid width-100">
                    <CButton color="dark" onClick={() => changeNetwork(2)}>
                      <CCardImage orientation="top" src="/logo_BNB.png" style={{width: '40px', height: '40px'}}/>&nbsp;
                      BNB Smart Chain
                    </CButton>
                  </CCol>
                  <CCol xs={6} className="d-grid width-100 mt-3">
                    <CButton  color="dark" onClick={() => changeNetwork(3)}>
                      <CCardImage orientation="top" src="/logo_CRON.svg" style={{width: '40px', height: '40px'}}/>&nbsp;
                      Cronos
                    </CButton>
                  </CCol>
                </CRow>
              </CModalBody>
            </CModal>
            <AppHeaderDropdown
              currentAccount={currentAccount}
              onConnect={connectWalletHandler}
  //            onLogout={disconnectWalletHandler}
            />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader