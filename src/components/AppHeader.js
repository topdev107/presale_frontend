// import { cilMenu } from '@coreui/icons'
// import CIcon from '@coreui/icons-react'
// import {
//   CContainer,
//   CHeader,
//   CHeaderBrand, CHeaderNav,
//   CHeaderToggler
// } from '@coreui/react'
// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { logo } from 'src/assets/brand/logo'
// import { useWeb3Context } from 'web3-react'
// import { AppHeaderDropdown } from './header/index'
// import { set } from '../state/SideBarState'


// const AppHeader = () => {
//   const dispatch = useDispatch()
//   const sidebarShow = useSelector((state) => state.sideBarState.isSidebarShow)

//   const context = useWeb3Context()
//   const [currentAccount, setCurrentAccount] = useState(null);

//   // useEffect(() => {
//   //   context.setFirstValidConnector(['MetaMask'])

//   //   const checkWalletConnect = () => {
//   //     if (!context.active && !context.error) {
//   //       //loading...        
//   //       setCurrentAccount(null)
//   //       console.log('=== Header Wallet Connect Loading ===')
//   //     } else if (context.error) {
//   //       setCurrentAccount(null)
//   //       console.log('=== Header Wallet Connect Error ===')
//   //       console.log(console.error)
//   //     } else {
//   //       // success        
//   //       setCurrentAccount(context.account)        
//   //       console.log('=== Header Wallet Connect Success ===')
//   //       console.log(context)
//   //     }
//   //   }

//   //   checkWalletConnect()
//   // }, [context])

//   // const connectWalletHandler = async () => {
//   //   const { ethereum } = window;

//   //   if (!ethereum) {
//   //     alert("Please install Metamask")
//   //   }

//   //   try {
//   //     const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
//   //     console.log("Found an account! Address: ", accounts[0])
//   //     setCurrentAccount(accounts[0])
//   //   } catch (err) {
//   //     console.log(err)
//   //     setCurrentAccount(null)
//   //   }
//   // }

//   // const disconnectWalletHandler = () => {
//   //   setCurrentAccount(null)
//   // }
//   async function loadWallet() {
//     try {
//       const provider = window.ethereum;
//       if (!provider) {
//           alert("Metamask is not installed, please install!");
//       }

//       const chainId = await provider.request({ method: 'eth_chainId' });
//       const binanceTestChainId = '0x61'
//       if (chainId === binanceTestChainId) {
//           console.log("Bravo!, you are on the correct network");
//       } else {
//           try {
//               await provider.request({
//                   method: 'wallet_switchEthereumChain',
//                   params: [{ chainId: '0x38' }],
//               });
//               console.log("You have succefully switched to Binance Test network")
//           } catch (switchError) {
//               // This error code indicates that the chain has not been added to MetaMask.
//               if (switchError.code === 4902) {
//                   try {
//                       await provider.request({
//                           method: 'wallet_addEthereumChain',
//                           params: [
//                               {
//                                   chainId: '0x38',
//                                   chainName: 'Binance Smart Chain',
//                                   rpcUrls: ['https://bsc-dataseed.binance.org/'],
//                                   blockExplorerUrls: ['https://bscscan.com/'],
//                                   nativeCurrency: {
//                                       symbol: 'BNB',
//                                       decimals: 18,
//                                   }
//                               }
//                           ]
//                       });
//                   } catch (addError) {
//                       console.log(addError);
//                       // alert(addError);
//                   }
//               }
//               // alert("Failed to switch to the network")
//               return;
//           }
//       }
//       const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
//       console.log("Found an account! Address: ", accounts[0])
//       setCurrentAccount(accounts[0])
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   useEffect(() => {
//     loadWallet();
//   }, [currentAccount])

//   const connectWalletHandler = async () => {
//     try {
//       loadWallet();
//     } catch (e) {
//       console.log(e)
//     }
//   }

//   return (
//     <CHeader position="sticky" className="mb-4">
//       <CContainer fluid>
//         <CHeaderToggler
//           className="ps-1"
//           // onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
//           onClick={() => {
//             dispatch(set(!sidebarShow))
//           }}
//         >
//           <CIcon icon={cilMenu} size="lg" />
//         </CHeaderToggler>
//         <CHeaderBrand className="mx-auto d-md-none" to="/">
//           <CIcon icon={logo} height={48} alt="Logo" />
//         </CHeaderBrand>
//         <CHeaderNav className="ms-3">
//           <AppHeaderDropdown
//             currentAccount={currentAccount}
//             onConnect={connectWalletHandler}
// //            onLogout={disconnectWalletHandler}
//           />
//         </CHeaderNav>
//       </CContainer>
//     </CHeader>
//   )
// }

// export default AppHeader

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
import { setMetamask } from '../state/MetamaskState'


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
        dispatch(setMetamask(context.account))
        console.log('=== Header Wallet Connect Success ===')
        console.log(context.account)
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
      setMetamask(accounts[0])
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
