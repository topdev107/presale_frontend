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
import { useWeb3Context } from 'web3-react'
import { AppHeaderDropdown } from './header/index'
import { set } from '../state/SideBarState'
import { setMetamask } from '../state/MetamaskState'
import { headerNet } from '../assets/brand/header-net'

const AppHeader = () => {

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sideBarState.isSidebarShow)
  const currentTheme = useSelector((state) => state.themeState.mode);

  const [modalVisible, setModalVisible] = useState(false);
  const [networkId, setNetworkId] = useState('BSC MAINNET')
  const chainInformation = [
    [56, 'Binance Smart Chain', 'https://bsc-dataseed.binance.org/', 'https://bscscan.com/', { symbol: 'BNB', decimals: 18 }],
    [25, 'Cronos', 'https://evm.cronos.org', 'https://cronoscan.com/', { symbol: 'CRO', decimals: 18 }],
    [97, 'BSC Testnet', 'https://data-seed-prebsc-1-s1.binance.org:8545/', 'https://testnet.bscscan.com', { symbol: 'tBNB', decimals: 18 }],
    [338, 'Cronos-testnet', 'https://evm-t3.cronos.org/', 'https://testnet.cronoscan.com/', { symbol: 'tCRO', decimals: 18 }]
  ]
  const [currentAccount, setCurrentAccount] = useState(null);

  const disconnectWalletHandler = async () => {
    setCurrentAccount(null)
    dispatch(setMetamask(''))
    localStorage.setItem('isConnect', 'false');
  }
  async function loadWallet() {
    console.log('connect wallet...')
    try {      
      const provider = window.ethereum;
      console.log('provider: ', provider);
      if (!provider) {
        alert("Metamask is not installed, please install!");
      }

      const chainId = await provider.request({ method: 'eth_chainId' });
      console.log('chainId: ', chainId);
      if (chainId === '0x61' ||
        chainId === '0x38' ||
        chainId === '0x19' ||
        chainId === '0x152') {
        console.log("Bravo!, you are on the correct network");
      } else {
        console.log('wrong network')
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
      localStorage.setItem('isConnect', 'true');
      console.log("Found an account! Address: ", accounts[0])
      dispatch(setMetamask(accounts[0]))
      if (chainId === '0x61') {
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
    if (!provider) {
      console.log("please install metamask")
      return
    }
    const chain = chainInformation[id][0], chainName = chainInformation[id][1],
      rpcURL = chainInformation[id][2], blockExplorer = chainInformation[id][3], native = chainInformation[id][4]
    var currentChain;
    if (networkId == 'BSC MAINNET') {
      currentChain = 56
    } else if (networkId == 'Cronos MAINNET') {
      currentChain = 25
    } else if (networkId == 'BSC TESTNET') {
      currentChain = 97
    } else if (networkId == 'Cronos TESTNET') {
      currentChain = 338
    }
    if (currentChain != chain) {
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

  window.ethereum && window.ethereum.on('accountsChanged', function (accounts) {
    setCurrentAccount(accounts[0])
    dispatch(setMetamask(accounts[0]))
  })
  window.ethereum && window.ethereum.on('networkChanged', function (networkid) {
    // Time to reload your interface with the new networkId
    // 56 - bsc mainnet
    // 25 - cronos mainnet
    // 97 - bsc testnet
    // 338 - cronos testnet
    console.log(networkid)
    if (networkid == 56) {
      setNetworkId('BSC MAINNET')
    } else if (networkid == 25) {
      setNetworkId('Cronos MAINNET')
    } else if (networkid == 97) {
      setNetworkId('BSC TESTNET')
    } else if (networkid == 338) {
      setNetworkId('Cronos TESTNET')
    } else {
      setNetworkId('Not support')
    }
  })

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid className='justify-content-md-end'>
        <div className='d-md-none' style={{ width: '66%' }}>
          <CHeaderToggler
            // style={!sidebarShow ? {color: '#222'} : {color: '#222'}}
            // onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
            onClick={() => {
              dispatch(set(!sidebarShow))
            }}
          >
            <CIcon className="toggle-icon" icon={cilMenu} size="lg" />
          </CHeaderToggler>
          <CHeaderBrand className="logo_mobile" to="/">
            <img src={`/assets/logo-${currentTheme}.png`} alt="logo" className='logo' style={{ width: '70%' }} />
          </CHeaderBrand>
        </div>
        <CHeaderNav className="ms-3">
          {/* <CButton color="warning" shape="rounded-pill" style={{border: 'none', color: '#222', fontWeight: 'bold', backgroundColor: '#ddd'}} onClick={() => setModalVisible(!modalVisible)}>{networkId}</CButton> */}
          {/* <button type="button" className="network_btn_mobile" style={{width: 'auto', paddingTop: '0px'}} onClick={() => setModalVisible(!modalVisible)} >
            {
              networkId === 'BSC MAINNET' || networkId === 'BSC TESTNET' ?
                <img src="https://flash-launch.com/logo_BNB.png" style={{width: '36px'}}/>
              : networkId === 'Cronos MAINNET' || networkId === 'Cronos TESTNET' ?
                <img src="https://flash-launch.com/logo_CRON.svg" style={{width: '36px'}}/>
              : <></>
            }
          </button> */}
          <button type="button" className="btn btn-outline-primary header-button d-flex gap-2 align-items-center py-0" onClick={() => setModalVisible(!modalVisible)} >
            <CIcon icon={headerNet} customClassName='d-md-none' width={25} />
            <img src={networkId.indexOf('BSC') != -1 ? 'https://flash-launch.com/logo_BNB.png' : 'https://flash-launch.com/logo_CRON.svg'} className='d-none d-md-block' width={networkId.indexOf('BSC') != -1 ? 30 : 25} />
            {/* <CIcon icon="https://flash-launch.com/logo_BNB.png" customClassName='d-none d-md-block' width={25}/>     */}
            <span className='d-none d-md-block'>{networkId}</span>
          </button>

          <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
            <CModalHeader onClose={() => setModalVisible(false)}>
              <CModalTitle>Choose network</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <div className='text-red-color'> MAINNET</div>
              <CRow className="display-block">
                <CCol xs={12} md={6} className="d-grid width-100 mt-3">
                  <CButton color="outline-primary" onClick={() => changeNetwork(0)}>
                    <CCardImage orientation="top" src="https://flash-launch.com/logo_BNB.png" style={{ width: '40px', height: '40px' }} />&nbsp;
                    BNB Smart Chain
                  </CButton>
                </CCol>
                <CCol xs={12} md={6} className="d-grid width-100 mt-3">
                  <CButton color="outline-primary" onClick={() => changeNetwork(1)}>
                    <CCardImage orientation="top" src="https://flash-launch.com/logo_CRON.svg" style={{ width: '40px', height: '40px' }} />&nbsp;
                    Cronos
                  </CButton>
                </CCol>
              </CRow>
              <br />
              <div className='text-red-color'>TESTNET</div>
              <CRow className="display-block">
                <CCol xs={12} md={6} className="d-grid width-100 mt-3">
                  <CButton color="outline-primary" onClick={() => changeNetwork(2)}>
                    <CCardImage orientation="top" src="https://flash-launch.com/logo_BNB.png" style={{ width: '40px', height: '40px' }} />&nbsp;
                    BNB Smart Chain
                  </CButton>
                </CCol>
                <CCol xs={12} md={6} className="d-grid width-100 mt-3">
                  <CButton color="outline-primary" onClick={() => changeNetwork(3)}>
                    <CCardImage orientation="top" src="https://flash-launch.com/logo_CRON.svg" style={{ width: '40px', height: '40px' }} />&nbsp;
                    Cronos
                  </CButton>
                </CCol>
              </CRow>
            </CModalBody>
          </CModal>
          <AppHeaderDropdown
            currentAccount={currentAccount}
            onConnect={connectWalletHandler}
            onLogout={disconnectWalletHandler}
          />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader