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


const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const context = useWeb3Context()

  useEffect(() => {
    context.setFirstValidConnector(['MetaMask'])

    const checkWalletConnect = () => {
      if (!context.active && !context.error) {
        //loading...
        setWalletConnectState('loading')
        console.log('=== Header Wallet Connect Loading ===')
      } else if (context.error) {
        setWalletConnectState('error')
        console.log('=== Header Wallet Connect Error ===')
        console.log(console.error)
      } else {
        // success
        setWalletConnectState('success')
        console.log('=== Header Wallet Connect Success ===')
      }
    }
    
    checkWalletConnect()
  }, [context])

  const [walletConnectState, setWalletConnectState] = useState('')

  

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="ms-3">
          {
            walletConnectState !== 'success' ? (
              <button className='connect_btn'>Connect</button>
            ) : (
              <button className='connected_btn'>{context.account}</button>
            )
          }
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
