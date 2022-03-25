import { cilMenu } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CContainer,
  CHeader,
  CHeaderBrand, CHeaderNav,
  CHeaderToggler
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logo } from 'src/assets/brand/logo'
import { useWeb3Context } from 'web3-react'
import { AppHeaderDropdown } from './header/index'
import { set } from '../state/SideBarState'


const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sideBarState.isSidebarShow)

  const context = useWeb3Context()
  const [currentAccount, setCurrentAccount] = useState(null);

  useEffect(() => {
    context.setFirstValidConnector(['MetaMask'])

    const checkWalletConnect = () => {
      if (!context.active && !context.error) {
        //loading...        
        setCurrentAccount(null)
        console.log('=== Header Wallet Connect Loading ===')
      } else if (context.error) {
        setCurrentAccount(null)
        console.log('=== Header Wallet Connect Error ===')
        console.log(console.error)
      } else {
        // success        
        setCurrentAccount(context.account)        
        console.log('=== Header Wallet Connect Success ===')
        console.log(context)
      }
    }

    checkWalletConnect()
  }, [context])

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask")
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      console.log("Found an account! Address: ", accounts[0])
      setCurrentAccount(accounts[0])
    } catch (err) {
      console.log(err)
      setCurrentAccount(null)
    }
  }

  const disconnectWalletHandler = () => {
    setCurrentAccount(null)
  }

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
          <AppHeaderDropdown
            currentAccount={currentAccount}
            amount={context}
            onConnect={connectWalletHandler}
            onLogout={disconnectWalletHandler} />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
