import {
    CRow, CCol,
    CCard, CCardImage, CBadge,
    CCardBody, CCardTitle, CCardText,
    CProgress, CProgressBar,
    CFormSelect,
    CButton,
    CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter,
    CFormCheck,
} from '@coreui/react'

import {
  Modal, Button
} from 'antd'
  
import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NumberInputComponent from '../components/NumberInputComponent';
import TextInputComponent from '../components/TextInputComponent';
import { HashRouter, Route, Switch, Link, useHistory } from 'react-router-dom'
import { saveTokenAddr } from '../../state/CreateLaunchPadState'

import Web3 from 'web3';
import { getWeb3 } from '../web3/getWeb3'
import abi from '../../contracts/abi.js'
import liquidityAbi from '../../contracts/liquidityFactoryAbi'
import babyAbi from '../../contracts/babytokenFactoryAbi'
import buybackAbi from '../../contracts/buybackbabyFactoryAbi'
import testToken from '../../contracts/testAbi'
import { 
  standardTokenFactory,
  liquidityTokenFactory,
  babytokenFactory,
  buybackbabyFactory,
  testRouter,
  dividends,
  testFactory,
  swapPairs
} from '../components/ContractAddress'
import TokenAbi from '../../contracts/tokenAbi'
import FactoryAbi from '../../contracts/factoryAbi'
import {saveTokenAddr as saveTokenAddr1} from '../../state/CreateLaunchPadState'
import {saveTokenAddr as saveTokenAddr2} from '../../state/CreateFairLaunchState'
import { Spinner } from 'react-bootstrap';
import { Alert } from '@coreui/coreui';
import { delZero } from 'src/utils';

export const CreateTokenModal = (props) => {
  const [standardTokenFactoryAddr, setstandardTokenFactoryAddr] = useState('')
  const [liquidityTokenFactoryAddr, setliquidityTokenFactoryAddr] = useState('')
  const [babytokenFactoryAddr, setbabytokenFactoryAddr] = useState('')
  const [buybackbabyFactoryAddr, setbuybackbabyFactoryAddr] = useState('')
  const [testRouterAddr, settestRouterAddr] = useState('')
  const [dividendsAddr, setdividendsAddr] = useState('')
  const [testFactoryAddr, settestFactoryAddr] = useState('')
  const [swapPairsAddr, setswapPairsAddr] = useState('')
  const [currentChain, setCurrentChain] = useState(0)
  const setAddresses = () => {
    standardTokenFactory()
    .then((result) => {
      setstandardTokenFactoryAddr(result)
      console.log(result)
    })  
    liquidityTokenFactory()
    .then((result) => {
      setliquidityTokenFactoryAddr(result)
      console.log(result)
    })  
    babytokenFactory()
    .then((result) => {
      setbabytokenFactoryAddr(result)
      console.log(result)
    })  
    buybackbabyFactory()
    .then((result) => {
      setbuybackbabyFactoryAddr(result)
      console.log(result)
    })  
    dividends()
    .then((result) => {
      setdividendsAddr(result)
      console.log(result)
    })  
    testRouter()
    .then((result) => {
      settestRouterAddr(result)
      console.log(result)
    })  
    testFactory()
    .then((result) => {
      settestFactoryAddr(result)
      console.log(result)
    })  
    swapPairs()
    .then((result) => {
      setswapPairsAddr(result)
      console.log(result)
    })  
  }
  
  useEffect(async () => {
    setAddresses()
    const id = await window.ethereum.request({ method: 'eth_chainId' })
    setCurrentChain(parseInt(id, 16))
  }, [])
  window.ethereum && window.ethereum.on('networkChanged', function (networkid) {
    setAddresses()
    setCurrentChain(networkid)
    clearData()
  })

  const unit = useMemo (() => {
    if (currentChain == 97 || currentChain == 56) return "BNB"
    if (currentChain == 25 || currentChain == 338 ) return "CRO"
  }, [currentChain])

  const stressValue = useMemo (() => {
    if (currentChain == 97 || currentChain == 56) return 1e16
    if (currentChain == 25 || currentChain == 338 ) return 1e20
  }, [currentChain])

	const history = useHistory()
	const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const [isTokenValid, setIsTokenValid] = useState(false)

	const [tokenType, setTokenType] = useState('Standard Token')
  const [router, setRouter] = useState('Pancakeswap')
	const [tokenName, setTokenName] = useState('')
  const [errMsgTokenName, setErrMsgTokenName] = useState('')

  const [tokenSymbol, setTokenSymbol] = useState('')
  const [errMsgTokenSymbol, setErrMsgTokenSymbol] = useState('')

  const [tokenDecimal, setTokenDecimal] = useState("0")
  const [errMsgTokenDecimal, setErrMsgTokenDecimal] = useState('')

  const [tokenTotalSupply, setTokenTotalSupply] = useState(0)
  const [errMsgTokenTotalSupply, setErrMsgTokenTotalSupply] = useState('')

  const [transfeeYield, setTransFeeYield] = useState(1)
  const [errMsgTransfeeYield, setErrMsgTransfeeYield] = useState('')

  const [transfeeLiquidity, setTransFeeLiquidity] = useState(1)
  const [errMsgTransfeeLiquidity, setErrMsgTransfeeLiquidity] = useState('')

  const [charityAddress, setCharityAddress] = useState('')
  const [errMsgCharityAddress, setErrMsgCharityAddress] = useState('')

  const [charityPercent, setCharityPercent] = useState(1)
  const [errMsgCharityPercent, setErrMsgCharityPercent] = useState('')

  const [rewardToken, setRewardToken] = useState('')
  const [errMsgRewardToken, setErrMsgRewardToken] = useState('')

  const [liquidityFee, setLiquidityFee] = useState(0)
  const [errMsgLiquidityFee, setErrMsgLiquidityFee] = useState('')

  const [minimumTokenBalance, setMinimumTokenBalance] = useState(0)
  const [errMsgMinTokenBalance, setErrMsgMinTokenBalance] = useState('')
  
  const [tokenRewardFee, setTokenRewardFee] = useState(0)
  const [errMsgTokenRewardFee, setErrMsgTokenRewardFee] = useState('')
  
  const [autoAddLiquidity, setAutoAddLiquidity] = useState(0)
  const [errMsgAutoAddLiquidity, setErrMsgAutoLiquidity] = useState('')

  const [marketingFee, setMarketingFee] = useState(0)
  const [errMsgMarketingFee, setErrMsgMarketingFee] = useState('')

  const [marketingWallet, setMarketingWallet] = useState('')
  const [errMsgMarketingWallet, setErrMsgMarketingWallet] = useState('')

  const [buyBackFee, setBuyBackFee] = useState(0)
  const [errMsgBuyBackFee, setErrMsgBuyBackFee] = useState('')
  
  const [reflectionFee, setReflectionFee] = useState(0)
  const [errMsgReflectionFee, setErrMsgReflectionFee] = useState('')


  const [isCheckedAntiBot, setIsCheckedAntiBot] = useState(false)

  const [rewardTokenName, setRewardTokenName] = useState('')
  const [rewardTokenSymbol, setRewardTokenSymbol] = useState('')
  const [rewardTokenDecimal, setRewardTokenDecimal] = useState(0)
  
  const [availableToken, setAvailableToken] = useState(false)

  const [isCreateValid, setCreateValid] = useState(false)
  const [isCreateLoad, setCreateLoad] = useState(false)
  
  const provider = () => {
    // 1. Try getting newest provider
    const { ethereum } = window
    if (ethereum) return ethereum

    // 2. Try getting legacy provider
    const { web3 } = window
    if (web3 && web3.currentProvider) return web3.currentProvider
  }


  const clearData = () => {
    setTokenName('')
    setTokenSymbol('')
    setTokenDecimal(0)
    setTokenTotalSupply(0)
    setTransFeeYield(1)
    setTransFeeLiquidity(1)
    setCharityAddress('')
    setCharityPercent(1)
    setRewardToken('')
    setLiquidityFee(0)
    setMinimumTokenBalance(0)
    setTokenRewardFee(0)
    setAutoAddLiquidity(0)
    setMarketingFee(0)
    setMarketingWallet('')
    setBuyBackFee(0)
    setReflectionFee(0)
    setRewardTokenName('')
    setRewardTokenSymbol('')
    setRewardTokenDecimal(0)
    setAvailableToken(false)
    setIsCheckedAntiBot(false)
    setCreateValid(false)
  }

  async function createStandardToken() {
    try {
      const web3 = new Web3(provider())

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];

      const standardTokenFactoryContract = new web3.eth.Contract(abi, standardTokenFactoryAddr)
      console.log("standardTokenFactoryContract starts here.......")
      console.log(standardTokenFactoryContract)

      const txResult = await standardTokenFactoryContract.methods.create(tokenName, tokenSymbol, +tokenDecimal, +tokenTotalSupply).send({ 'from': account, 'value': `0x${stressValue.toString(16)}` })

      console.log(txResult)

      const address = txResult.events.OwnershipTransferred[0].address

      console.log(address)
      
      // dispatch(saveTokenName(tokenName))
      // dispatch(saveTokenSymbol(tokenSymbol))
      // dispatch(saveTokenTotalSupply(tokenTotalSupply))
      // dispatch(saveTokenAddress(address))
      // history.push("/createToken/success")
      console.log(props.parent)
      if(props.parent === 'Normal') {
        dispatch(saveTokenAddr1(address))
        clearData()
        setVisible(false)
      } else if(props.parent === 'Fair') {
        dispatch(saveTokenAddr2(address))
        clearData()
        setVisible(false)
      }
        
    } catch (error) {
      console.log(error)
    }
  }

  async function createLiquidityToken() {
    try {
      const web3 = new Web3(provider())

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];

      const liquidityFactoryContract = new web3.eth.Contract(liquidityAbi, liquidityTokenFactoryAddr)
      console.log("standardTokenFactoryContract starts here.......")
      console.log(liquidityFactoryContract)

      const txResult = await liquidityFactoryContract.methods.create(
        tokenName, 
        tokenSymbol, 
        +tokenTotalSupply, 
        testRouterAddr, 
        charityAddress, 
        transfeeYield, 
        transfeeLiquidity, 
        charityPercent
      ).send({ 'from': account, 'value': `0x${stressValue.toString(16)}` })

      console.log(txResult)

      const address = txResult.events.OwnershipTransferred[0].address

      console.log(address)
      
      // dispatch(saveTokenName(tokenName))
      // dispatch(saveTokenSymbol(tokenSymbol))
      // dispatch(saveTokenTotalSupply(tokenTotalSupply))
      // dispatch(saveTokenAddress(address))
      // history.push("/createToken/success")
      if(props.parent === 'Normal') {
        dispatch(saveTokenAddr1(address))
        clearData()
        setVisible(false)
      } else if(props.parent === 'Fair') {
        dispatch(saveTokenAddr2(address))
        clearData()
        setVisible(false)
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  async function createBabyToken() {
    try {
      const web3 = new Web3(provider())

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];

      const standardTokenFactoryContract = new web3.eth.Contract(babyAbi, babytokenFactoryAddr)
      console.log("standardTokenFactoryContract starts here.......")
      console.log(standardTokenFactoryContract)

      const txResult = await standardTokenFactoryContract.methods.create(
        tokenName, 
        tokenSymbol, 
        +tokenTotalSupply,
        [rewardToken, testRouterAddr, marketingWallet, dividendsAddr],
        [tokenRewardFee, autoAddLiquidity, marketingFee],
        minimumTokenBalance
      ).send({ 'from': account, 'value': `0x${stressValue.toString(16)}` })

      console.log(txResult)

      const address = txResult.events.OwnershipTransferred[0].address

      console.log(address)
      
      // dispatch(saveTokenName(tokenName))
      // dispatch(saveTokenSymbol(tokenSymbol))
      // dispatch(saveTokenTotalSupply(tokenTotalSupply))
      // dispatch(saveTokenAddress(address))
      // history.push("/createToken/success")
      if(props.parent === 'Normal') {
        dispatch(saveTokenAddr1(address))
        clearData()
        setVisible(false)
      } else if(props.parent === 'Fair') {
        dispatch(saveTokenAddr2(address))
        clearData()
        setVisible(false)
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  async function createBuybackBabyToken() {
    try {
      const web3 = new Web3(provider())

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];

      const standardTokenFactoryContract = new web3.eth.Contract(buybackAbi, buybackbabyFactoryAddr)
      console.log("standardTokenFactoryContract starts here.......")
      console.log(standardTokenFactoryContract)

      const txResult = await standardTokenFactoryContract.methods.create(
        tokenName, 
        tokenSymbol, 
        +tokenTotalSupply,
        rewardToken,
        testRouterAddr,
        [liquidityFee*100, buyBackFee*100, reflectionFee*100, marketingFee*100, 10000]
      ).send({ 'from': account, 'value': `0x${stressValue.toString(16)}` })

      console.log(txResult)

      const address = txResult.events[1].address

      console.log(address)
      
      // dispatch(saveTokenName(tokenName))
      // dispatch(saveTokenSymbol(tokenSymbol))
      // dispatch(saveTokenTotalSupply(tokenTotalSupply))
      // dispatch(saveTokenAddress(address))
      // history.push("/createToken/success")
      if(props.parent === 'Normal') {
        dispatch(saveTokenAddr1(address))
        clearData()
        setVisible(false)
      } else if(props.parent === 'Fair') {
        dispatch(saveTokenAddr2(address))
        clearData()
        setVisible(false)
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  const handleClickCreateToken = async () => {
    const isConnect = localStorage.getItem('isConnect');
    if (isConnect === 'true') {
      setVisible(!visible);
    } else {
      alert('Please connect wallet');
    }
  }

	const handleNext = async () => {
    setCreateLoad(true)
    if(tokenType == 'Standard Token') {
      await createStandardToken()
    } else if(tokenType == 'Liquidity Generator Token') {
      await createLiquidityToken()
    } else if(tokenType == 'Baby Token') {
      await createBabyToken()
    } else if(tokenType == 'Buyback Baby Token') {
      await createBuybackBabyToken()
    }
    setCreateLoad(false)
	}

  async function getData(address) {
    const web3 = new Web3(provider())
    const TokenContract = new web3.eth.Contract(TokenAbi, address)
    await TokenContract.methods.decimals().call().then(function(result) {
      setRewardTokenDecimal(result)
    })
    await TokenContract.methods.name().call().then(function(result) {
      setRewardTokenName(result)
    })    
    await TokenContract.methods.symbol().call().then(function(result) {
      setRewardTokenSymbol(result)
    })
  }

  async function isAvailable(address) {
    const web3 = new Web3(provider())
    const TokenContract = new web3.eth.Contract(FactoryAbi, testFactoryAddr)
    await TokenContract.methods.getPair(address, swapPairsAddr).call().then(function(result) {
      if(result == '0x0000000000000000000000000000000000000000'){
        setAvailableToken(false)
      } else {
        setAvailableToken(true)
      }
    })
  }

  const onChangeTokenType = (e) => {
    clearData()
    setTokenType((v) => (e.target.validity.valid ? e.target.value : v))
  }

  const onChangeTokenName = (e) => {
    setTokenName(e.currentTarget.value);
  }

  const onChangeTokenSymbol = (e) => {
    setTokenSymbol(e.currentTarget.value);
  }

  const onChangeTokenDecimal = (e) => {
    setTokenDecimal(delZero(e.target.value));
  }

  const onChangeTokenTotalSupply = (e) => {
    setTokenTotalSupply(delZero(e.target.value));
  }

  const onChangeAntiBot = (e) => {
    setIsCheckedAntiBot(e.target.checked)
  }

  const onChangeRouter = (e) => {
    setRouter((v) => (e.target.validity.valid ? e.target.value : v))
  }

  const onChangeTransFeeYield = (e) => {
    setTransFeeYield((v) => (e.target.validity.valid ? e.target.value : v))
  }

  const onChangeTransFeeLiquidity = (e) => {
    setTransFeeLiquidity((v) => (e.target.validity.valid ? e.target.value : v))
  }

  const onChangeCharityAddress = (e) => {
    setCharityAddress((v) => (e.target.validity.valid ? e.target.value : v))
  }

  const onChangeCharityPercent = (e) => {
    setCharityPercent(delZero(e.target.value))
  }

  const onChangeRewardToken = (e) => {
    setRewardToken((v) => (e.target.validity.valid ? e.target.value : v))
  }

  const onChangeMinimumTokenBalance = (e) => {
    setMinimumTokenBalance(delZero(e.target.value))
  }

  const onChangeTokenRewardFee = (e) => {
    setTokenRewardFee(delZero(e.target.value))
  }

  const onChangeAutoAddLiquidity = (e) => {
    setAutoAddLiquidity(delZero(e.target.value))
  }

  const onChangeMarketingFee = (e) => {
    setMarketingFee(delZero(e.target.value))
  }

  const onChangeMarketingWallet = (e) => {
    setMarketingWallet((v) => (e.target.validity.valid ? e.target.value : v))
  }

  const onChangeLiquidityFee = (e) => {
    setLiquidityFee(delZero(e.target.value))
  }

  const onChangeBuyBackFee = (e) => {
    setBuyBackFee(delZero(e.target.value))

  }

  const onChangeReflectionFee = (e) => {
    setReflectionFee(delZero(e.target.value))
  }

  useEffect(() => {
    async function checkTokenValidation(address) {
      const web3 = new Web3()
      if (address.length === 0) {
        setIsTokenValid(false)
        setErrMsgRewardToken("Token address can not be blank")
      } else if (address.substring(0, 2) !== "0x") {
        setIsTokenValid(false)
        setErrMsgRewardToken("Invalid Token Address")
      } else if (address.length !== 42) {
        setIsTokenValid(false)
        setErrMsgRewardToken("Invalid Token Address")
      } else if (!web3.utils.isAddress(address)) {
        setIsTokenValid(false)
        setErrMsgRewardToken("Invalid Token Address")
      } else {
        await getData(address)
        await isAvailable(address)
        setIsTokenValid(true)
        setErrMsgRewardToken("")
      }
    }

    checkTokenValidation(rewardToken)
  },[rewardToken])

  useEffect(() => {
    if(tokenName == '') {
      setErrMsgTokenName('tokenName is a required field')
    } else {
      setErrMsgTokenName('')
    }

    if(tokenSymbol == '') {
      setErrMsgTokenSymbol('tokenSymbol is a required field')
    } else {
      setErrMsgTokenSymbol('')
    }

    if(+tokenDecimal == 0) {
      setErrMsgTokenDecimal('Invalid decimals');
    } else {
      setErrMsgTokenDecimal('')
    }

    if(+tokenTotalSupply == 0) {
      setErrMsgTokenTotalSupply('totalSupply is a required field');
    } else {
      setErrMsgTokenTotalSupply('')
    }

    if(+transfeeYield > 25) {
      setErrMsgTransfeeYield('taxFeeBps must be less than or equal to 25')
    } else if(+transfeeYield <= 0) {
      setErrMsgTransfeeYield('taxFeeBps must be greater than or equal to 0.01')
    } else {
      setErrMsgTransfeeYield('')
    }

    if(+transfeeLiquidity > 25) {
      setErrMsgTransfeeLiquidity('liquidityFeeBps must be less than or equal to 25')
    } else if(+transfeeLiquidity <= 0) {
      setErrMsgTransfeeLiquidity('liquidityFeeBps must be greater than or equal to 0.01')
    } else {
      setErrMsgTransfeeLiquidity('')
    }

    if(+charityPercent > 25) {
      setErrMsgCharityPercent('charityBps must be less than or equal to 25')
    } else if(+charityPercent < 1) {
      setErrMsgCharityPercent('charityBps must be greater than or equal to 1')
    } else {
      setErrMsgCharityPercent('')
    }

    if(+minimumTokenBalance > +tokenTotalSupply * 0.001) {
      setErrMsgMinTokenBalance('Minimum token balance for dividends must be less than or equal 0.1% total supply')
    } else if(+minimumTokenBalance === 0) {
      setErrMsgMinTokenBalance('minimumTokenBalanceForDividends must be greater than or equal to 1')
    } else {
      setErrMsgMinTokenBalance('')
    }

    if(+tokenRewardFee > 100) {
      setErrMsgTokenRewardFee('tokenRewardsFee must be less than or equal to 100')
    } else if(+tokenRewardFee <= 0) {
      setErrMsgTokenRewardFee('tokenRewardsFee must be greater than or equal to 0.01')
    } else {
      setErrMsgTokenRewardFee('')
    }

    if(+autoAddLiquidity > 100) {
      setErrMsgAutoLiquidity('liquidityFee must be less than or equal to 100')
    } else if(+autoAddLiquidity <= 0) {
      setErrMsgAutoLiquidity('liquidityFee must be greater than or equal to 0.01')
    } else {
      setErrMsgAutoLiquidity('')
    }

    if(+marketingFee > 100) {
      setErrMsgMarketingFee('marketingFee must be less than or equal to 100')
    } else if(+marketingFee <=0) {
      setErrMsgMarketingFee('marketingFee must be greater than or equal to 0.01')
    } else {
      setErrMsgMarketingFee('')
    }

    if(+liquidityFee > 100) {
      setErrMsgLiquidityFee('liquidityFee must be less than or equal to 100')
    } else if(+marketingFee <= 0) {
      setErrMsgLiquidityFee('liquidityFee must be greater than or equal to 0.01')
    } else {
      setErrMsgLiquidityFee('')
    }

    if(+buyBackFee > 100) {
      setErrMsgBuyBackFee('buybackFee must be less than or equal to 100')
    } else if(+buyBackFee <= 0) {
      setErrMsgBuyBackFee('buybackFee must be greater than or equal to 0.01')
    } else {
      setErrMsgBuyBackFee('')
    }

    if(+reflectionFee > 100) {
      setErrMsgReflectionFee('reflectionFee must be less than or equal to 100')
    } else if(+reflectionFee < 0) {
      setErrMsgReflectionFee('reflectionFee must be greater than or equal to 0.01')
    } else {
      setErrMsgReflectionFee('')
    }
  },
  [
    tokenName,
    tokenSymbol,
    tokenDecimal,
    tokenTotalSupply,
    transfeeYield,
    transfeeLiquidity,
    charityPercent,
    minimumTokenBalance,
    tokenRewardFee,
    autoAddLiquidity,
    marketingFee,
    liquidityFee,
    buyBackFee,
    reflectionFee,
  ])

  useEffect(() => {
    if(tokenType == 'Standard Token') {
      errMsgTokenName === '' &&
      errMsgTokenSymbol === '' &&
      errMsgTokenDecimal === '' &&
      errMsgTokenTotalSupply === '' ?
      setCreateValid(true) : setCreateValid(false)
     } else if(tokenType == 'Liquidity Generator Token') {
      errMsgTokenName === '' &&
      errMsgTokenSymbol === '' &&
      errMsgTokenTotalSupply === '' &&
      errMsgTransfeeYield === '' &&
      errMsgTransfeeLiquidity === '' &&
      errMsgCharityAddress === '' &&
      errMsgCharityPercent === '' ?
      setCreateValid(true) : setCreateValid(false)
     } else if(tokenType == 'Baby Token') {
      errMsgTokenName === '' &&
      errMsgTokenSymbol === '' &&
      errMsgTokenTotalSupply === '' &&
      errMsgRewardToken === '' &&
      errMsgMinTokenBalance === '' &&
      errMsgTokenRewardFee === '' &&
      errMsgAutoAddLiquidity === '' &&
      errMsgMarketingFee === '' &&
      errMsgMarketingWallet === '' && 
      availableToken == true
      ?
      setCreateValid(true) : setCreateValid(false)
     } else if(tokenType == 'Buyback Baby Token') {
      errMsgTokenName === '' &&
      errMsgTokenSymbol === '' &&
      errMsgTokenTotalSupply === '' &&
      errMsgRewardToken === '' &&
      errMsgLiquidityFee === '' &&
      errMsgBuyBackFee === '' &&
      errMsgReflectionFee === '' &&
      errMsgMarketingFee === '' &&
      availableToken == true ?
      setCreateValid(true) : setCreateValid(false)
     }
  }, [
    errMsgTokenName,
    errMsgTokenSymbol,
    errMsgTokenDecimal,
    errMsgTokenTotalSupply,
    errMsgTransfeeYield,
    errMsgTransfeeLiquidity,
    errMsgCharityAddress,
    errMsgCharityPercent,
    errMsgRewardToken,
    errMsgMinTokenBalance,
    errMsgTokenRewardFee,
    errMsgAutoAddLiquidity,
    errMsgMarketingFee,
    errMsgMarketingWallet,
    errMsgLiquidityFee,
    errMsgBuyBackFee,
    errMsgReflectionFee,
    availableToken
  ])
  
  return (
  <>
      {/* <CButton variant='outline' onClick={() => setVisible(!visible)}>+ Create Token</CButton> */}
      <CButton variant='outline' onClick={handleClickCreateToken}>+ Create Token</CButton>
      <CModal style={{backgroundColor: '#f5f8f8'}} visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
            <CModalTitle>Create Token</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CRow>
              <div className="danger small-text-sz mb-0 text-red-color">(*) is required field.</div>
              <CCol>
                <div className='font-bold mb-2'>Token Type
                  <sup className="danger">*</sup>
                </div>
              </CCol>
            </CRow>
            <CRow>
              <div>
                <CFormSelect className="mb-1" onChange={onChangeTokenType}>
                  <option value="Standard Token">Standard Token</option>
                  <option value="Liquidity Generator Token">Liquidity Generator Token</option>
                  <option value="Baby Token">Baby Token</option>
                  <option value="Buyback Baby Token">Buyback Baby Token</option>
                </CFormSelect>
                <div className="small-text-sz mt-1 light-blue">Fee: {stressValue / 1e18} {unit}</div>
              </div>
            </CRow>
            {
              <>
              <CRow className='mt-3'>
                <TextInputComponent
                  title='Name'
                  value={tokenName}
                  onChange={onChangeTokenName}
                  // errMsg={errMsgTokenName}
                  placeholder='Ethereum'
                  desc='' />
              </CRow>
              <CRow className='mt-3'>
                  <TextInputComponent
                    title='Symbol'
                    value={tokenSymbol}
                    onChange={onChangeTokenSymbol}
                    // errMsg={errMsgTokenSymbol}
                    placeholder='ETH'
                    desc='' />
              </CRow>
              {
                tokenType === 'Standard Token' ? (
                  <CRow className='mt-3'>
                    <NumberInputComponent
                      title='Decimals'
                      value={tokenDecimal}
                      onChange={onChangeTokenDecimal}
                      // errMsg={errMsgTokenDecimal}
                      desc=''
                      needInt />
                  </CRow>
                ) : (
                  <></>
                )
              }
              <CRow className='mt-3'>
                <NumberInputComponent
                  title='TotalSupply'
                  value={tokenTotalSupply}
                  onChange={onChangeTokenTotalSupply}
                  // errMsg={errMsgTokenTotalSupply}
                  desc=''
                  needInt />
              </CRow>
              {
                tokenType === 'Liquidity Generator Token' ? (
                  <>
                    <CRow className='mt-3'>
                      <div className='font-bold text-yellow-color'>Router
                        <sup className="danger">*</sup>
                      </div>
                    </CRow>
                    <CRow>
                      <div>
                        <CFormSelect className="mb-3" onChange={onChangeRouter}>
                          <option value="pancakeswap">Pancakeswap</option>
                        </CFormSelect>
                      </div>
                    </CRow>
                    <CRow className='mt-3'>
                      <CCol className='col-md-6'>
                        <NumberInputComponent 
                          title='Transaction fee to generate yield (%)'
                          value={transfeeYield}
                          onChange={onChangeTransFeeYield}
                          errMsg={errMsgTransfeeYield}
                          desc=''
                          needInt 
                        />
                      </CCol>
                      <CCol className='col-md-6'>
                        <NumberInputComponent 
                          title='Transaction fee to generate liquidity (%)'
                          value={transfeeLiquidity}
                          onChange={onChangeTransFeeLiquidity}
                          errMsg={errMsgTransfeeLiquidity}
                          desc=''
                          needInt
                        />
                      </CCol>
                    </CRow>
                    <CRow className='mt-3'>
                      <TextInputComponent 
                        title='Charity/Marketing address'
                        value={charityAddress}
                        onChange={onChangeCharityAddress}
                        errMsg={errMsgCharityAddress}
                        placeholder='Ex: 0x...'
                      />
                    </CRow>
                    <CRow className='mt-3'>
                      <NumberInputComponent 
                        title='Charity/Marketing percent (%)'
                        value={charityPercent}
                        onChange={onChangeCharityPercent}
                        errMsg={errMsgCharityPercent}
                      />
                    </CRow>

                  </>
                ) : (
                  tokenType === 'Baby Token' ? (
                  <>
                  <CRow className='mt-3'>
                    <div className='font-bold text-yellow-color'>Router
                      <sup className="danger">*</sup>
                    </div>
                  </CRow>
                  <CRow>
                    <div>
                      <CFormSelect className="mb-3" onChange={onChangeRouter}>
                        <option value="pancakeswap">Pancakeswap</option>
                      </CFormSelect>
                    </div>
                  </CRow>
                  <CRow className='mt-3'>
                    <CCol className='col-12 col-md-6'>
                      <TextInputComponent 
                        title='Reward token'
                        value={rewardToken}
                        onChange={onChangeRewardToken}
                        errMsg={errMsgRewardToken}
                        placeholder='Ex: 0x...'
                        desc='If you want to reward DOGE, please enter 0xba2ae424d960c26247dd6c32edc70b295c744c43.'
                      />
                      {
                        availableToken == true ?
                        (
                          <></>
                        ) : (<div className='danger small-text-sz mb-0'>Address is invalid</div>)
                      }
                      {
                        isTokenValid == true ?
                        (
                          <div>
                            <div style={{display: 'flex'}}>
                              <div className='col-md-6 text_align_left danger'>TokenName</div>
                              <div className='col-md-6 text_align_right  danger'>{rewardTokenName}</div>
                            </div>
                            <div style={{display: 'flex'}}>
                              <div className='col-md-6 text_align_left light-blue'>TokenSymbol</div>
                              <div className='col-md-6 text_align_right light-blue'>{rewardTokenSymbol}</div>
                            </div>
                            <div style={{display: 'flex'}}>
                              <div className='col-md-6 text_align_left light-blue'>TokenDecimal</div>
                              <div className='col-md-6 text_align_right light-blue'>{rewardTokenDecimal}</div>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )
                      }
                    </CCol>
                    <CCol className='col-12 col-md-6'>
                      <NumberInputComponent 
                        title= {'Minimum token balance for dividends (max:' + +tokenTotalSupply * 0.001 + ')'}
                        value={minimumTokenBalance}
                        onChange={onChangeMinimumTokenBalance}
                        placeholder='Ex: 10000000000'
                        errMsg={errMsgMinTokenBalance}
                        desc='Min hold each wallet must be over $50 to receive rewards.'
                        needInt
                      />
                    </CCol>
                  </CRow>
                  <CRow className='mt-3'>
                    <CCol className='col-12 col-md-6'>
                      <NumberInputComponent 
                        title= 'Token reward fee (%)'
                        value={tokenRewardFee}
                        onChange={onChangeTokenRewardFee}
                        errMsg={errMsgTokenRewardFee}
                        placeholder='0 - 100'
                      />
                    </CCol>
                    <CCol className='col-12 col-md-6'>
                      <NumberInputComponent 
                        title= 'Auto add liquidity (%)'
                        value={autoAddLiquidity}
                        onChange= {onChangeAutoAddLiquidity}
                        errMsg={errMsgAutoAddLiquidity}
                        placeholder='0 - 100'
                      />
                    </CCol>
                  </CRow>
                  <CRow className='mt-3'>
                    <CCol className='col-12 col-md-6'>
                      <NumberInputComponent 
                        title='Marketing fee (%)'
                        value={marketingFee}
                        onChange={onChangeMarketingFee}
                        errMsg={errMsgMarketingFee}
                        placeholder='0 - 100'
                        needInt
                      />
                    </CCol>
                    <CCol className='col-12 col-md-6'>
                      <TextInputComponent 
                        title='Marketing wallet'
                        value={marketingWallet}
                        onChange={onChangeMarketingWallet}
                        errMsg={errMsgMarketingWallet}
                        placeholder='Ex: 0x...'
                      />
                    </CCol>
                  </CRow>

                  </>) : (
                    tokenType === 'Buyback Baby Token' ? (
                    <>
                    <CRow className='mt-3'>
                      <div className='font-bold text-yellow-color'>Router
                        <sup className="danger">*</sup>
                      </div>
                    </CRow>
                    <CRow>
                      <div>
                        <CFormSelect className="mb-3" onChange={onChangeRouter}>
                          <option value="pancakeswap">Pancakeswap</option>
                        </CFormSelect>
                      </div>
                    </CRow>
                  <CRow className='mt-3'>
                    <CCol className='col-12 col-md-6'>
                      <TextInputComponent 
                        title='Reward token'
                        value={rewardToken}
                        onChange={onChangeRewardToken}
                        // errMsg={errMsgRewardToken}
                        placeholder='Ex: 0x...'
                        desc='If you want to reward DOGE, please enter 0xba2ae424d960c26247dd6c32edc70b295c744c43.'
                      />
                      {
                        availableToken == true ?
                        (
                          <></>
                        ) : (<div className='danger small-text-sz mb-0'>Address is invalid</div>)
                      }
                      {
                        isTokenValid == true ?
                        (
                          <div>
                            <div style={{display: 'flex'}}>
                              <div className='col-md-6 text_align_left danger'>TokenName</div>
                              <div className='col-md-6 text_align_right danger'>{rewardTokenName}</div>
                            </div>
                            <div style={{display: 'flex'}}>
                              <div className='col-md-6 text_align_left light-blue'>TokenSymbol</div>
                              <div className='col-md-6 text_align_right light-blue'>{rewardTokenSymbol}</div>
                            </div>
                            <div style={{display: 'flex'}}>
                              <div className='col-md-6 text_align_left light-blue'>TokenDecimal</div>
                              <div className='col-md-6 text_align_right light-blue'>{rewardTokenDecimal}</div>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )
                      }
                    </CCol>
                    <CCol className='col-12 col-md-6'>
                      <NumberInputComponent 
                        title= 'Liquidity Fee (%)'
                        value={liquidityFee}
                        onChange={onChangeLiquidityFee}
                        placeholder='0 - 100'
                        errMsg={errMsgLiquidityFee}
                      />
                    </CCol>
                  </CRow>
                  <CRow className='mt-3'>
                    <CCol className='col-12 col-md-6'>
                      <NumberInputComponent 
                        title= 'Buyback Fee (%)'
                        value={buyBackFee}
                        onChange={onChangeBuyBackFee}
                        errMsg={errMsgBuyBackFee}
                        placeholder='0 - 100'
                      />
                    </CCol>
                    <CCol className='col-12 col-md-6'>
                      <NumberInputComponent 
                        title= 'Reflection Fee (%)'
                        value={reflectionFee}
                        onChange= {onChangeReflectionFee}
                        errMsg={errMsgReflectionFee}
                        placeholder='0 - 100'
                      />
                    </CCol>
                  </CRow>
                  <CRow className='mt-3'>
                    <NumberInputComponent
                      title='Marketing fee (%)'
                      value={marketingFee}
                      onChange = {onChangeMarketingFee}
                      errMsg={errMsgMarketingFee}
                    />
                  </CRow>
                  {
                    (+liquidityFee + +buyBackFee + +reflectionFee + +marketingFee) > 25 ? 
                    (
                      <div className='light-blue small-text-sz mb-0'>Liquidity Fee + Buyback Fee + Reflection Fee + Marketing Fee must be less than 25%</div>
                    ) : (
                      <></>
                    )
                  }
                    </>) : (
                      <></>
                    )
                  )
                )
              }
              {/* <CFormCheck
                id="useAntiBot"
                label="Implement Pink Anti-Bot System?"
                onChange={onChangeAntiBot} /> */}
              </>
            }
        </CModalBody>
        <CModalFooter>
          {/* <CButton color="secondary" onClick={() => setVisible(false)}>
          Close
          </CButton> */}
          <button type="button" className='btn btn-outline-primary' onClick={() => {
            clearData() 
            setVisible(false)}}>
            Close
          </button>
          {
            isCreateValid === true ? 
            <>
              <button type="button" className='btn btn-primary' disabled={isCreateLoad} onClick={handleNext} >
                {
                  isCreateLoad === true ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    variant="light"
                    style={{marginRight: '5px', marginTop: '2px'}}
                  /> ) : (<></>)
                }
                Create
              </button>
            </> :
            <button type="button" className='btn btn-primary' disabled >Create</button>
          }
        </CModalFooter>
      </CModal>
  </>
  )   
}