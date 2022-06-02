import {
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CRow,
  CAlert,
} from '@coreui/react';
import { CLoadingButton } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react';
import { cilList, cilWarning, cilShieldAlt } from '@coreui/icons';

import { faInfoCircle, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, useMemo } from 'react';
import { HashRouter, Route, Switch, Link, useHistory } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';
import Web3 from 'web3';
import RowBetween from '../components/RowBetween';
import WorkflowItem from "../components/WorkflowItem";
import { useDispatch, useSelector } from 'react-redux'
import { saveBasicSymbol, saveTokenAddr, saveTokenName, saveTokenSymbol, saveTokenDecimals, saveTokenTotalSupply } from '../../state/CreateLaunchPadState'
import { CreateTokenModal } from '../components/CreateTokenModal'
import TokenAbi from '../../contracts/tokenAbi'
import { presaleFactory } from '../components/ContractAddress'

const provider = () => {
  // 1. Try getting newest provider
  const { ethereum } = window
  if (ethereum) return ethereum

  // 2. Try getting legacy provider
  const { web3 } = window
  if (web3 && web3.currentProvider) return web3.currentProvider
}

const Home = () => {
  const [presaleFactoryAddr, setPresaleFactoryAddr] = useState('')
  const [currentChain, setCurrentChain] = useState(0)
  // const [unit, setUnit] = useState('')
  useEffect( async () => {
    presaleFactory()
    .then((result) => {
      setPresaleFactoryAddr(result)
      console.log(result)
    })  
    const id = await window.ethereum.request({ method: 'eth_chainId' })
    setCurrentChain(parseInt(id, 16))
  }, [])
  window.ethereum.on('networkChanged', function (networkid) {
    presaleFactory()
    .then((result) => {
      setPresaleFactoryAddr(result)
    })
    setCurrentChain(networkid)
  })

  const unit = useMemo (() => {
    if (currentChain == 97 || currentChain == 56) return "BNB"
    if (currentChain == 25 || currentChain == 338 ) return "CRO"
  }, [currentChain])

  const history = useHistory();
  const dispatch = useDispatch()
  const tokenAddr = useSelector((state) => state.createLaunchPadState.tokenAddress)
  const initialTokenAddr = tokenAddr ? tokenAddr : ""

  const [NO_APPROVED, APPROVED] = ['no_approved', 'approved']
  const [tokenAddress, setTokenAddress] = useState(initialTokenAddr === "" ? "" : initialTokenAddr) // 0x06a95C72e5a5ee6BD8D933067Bc49ef9B6A1Ca18
  const [isTokenValid, setIsTokenValid] = useState(false)
  const [validMessage, setValidMessage] = useState("")
  const [isExistPool, setIsExistPool] = useState(false)
  const [tokenStatus, setTokenStatus] = useState(NO_APPROVED) // NO_APPROVED, APPROVED
  const [isShowInfo, setIsShowInfo] = useState(true)

  const [tokenName, setTokenName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [tokenDecimal, setTokenDecimal] = useState(0)
  const [tokenTotalSupply, setTotalSupply] = useState(0)

  const [approveState, setApproveState] = useState(false)

  const [tokenContract, setTokenContract] = useState('')

  useEffect(() => {
    setTokenAddress(tokenAddr)
  }, [tokenAddr])
  const onChange = (event) => {
    setTokenAddress(event.currentTarget.value);    
  }

  async function getData(address) {
    const web3 = new Web3(provider())
    const TokenContract = new web3.eth.Contract(TokenAbi, address)
    setTokenContract(TokenContract)
    await TokenContract.methods.decimals().call().then(function(result) {
      setTokenDecimal(result)
    })
    await TokenContract.methods.name().call().then(function(result) {
      setTokenName(result)
    })    
    await TokenContract.methods.symbol().call().then(function(result) {
      setTokenSymbol(result)
    })
    await TokenContract.methods.totalSupply().call().then(function(result) {
      setTotalSupply(result)
    })
  }

  useEffect(() => {
    async function checkTokenValidation(address) {
      const web3 = new Web3()
      if (address.length === 0) {
        setIsTokenValid(false)
        setValidMessage("Token address can not be blank")
      } else if (address.substring(0, 2) !== "0x") {
        setIsTokenValid(false)
        setValidMessage("Invalid Token Address")
      } else if (address.length !== 42) {
        setIsTokenValid(false)
        setValidMessage("Invalid Token Address")
      } else if (!web3.utils.isAddress(address)) {
        setIsTokenValid(false)
        setValidMessage("Invalid Token Address")
      } else {
        await getData(address)
        setIsTokenValid(true)
        setValidMessage("")
      }
    }

    checkTokenValidation(tokenAddress)
  }, [tokenAddress])

  const handleCloseInfo = () => {
    setIsShowInfo(false)
  }

  async function handleApprove() {
    setApproveState(true)
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    console.log(tokenContract)
    console.log({presaleFactoryAddr, tokenTotalSupply, account})
    await tokenContract.methods.approve(presaleFactoryAddr, tokenTotalSupply).send({ 'from': account })
      .then(function(result) {
        console.log(result)
      })
    setTokenStatus(APPROVED)
    setApproveState(false)
  }

  const handleNext = () => {
    dispatch(saveTokenAddr(tokenAddress))
    dispatch(saveTokenName(tokenName))
    dispatch(saveTokenSymbol(tokenSymbol))
    dispatch(saveTokenDecimals(tokenDecimal))
    dispatch(saveTokenTotalSupply(tokenTotalSupply / (10 ** tokenDecimal)))
    dispatch(saveBasicSymbol(unit))
    history.push("/launchpad/defi_launch_pad_info");
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CRow className="hide-less-than-1026">
          <CCol className="col-sm-3">
            <WorkflowItem
              stemNumber={1}
              active
              title='Verify Token'
              desc='Enter the token address and verify' />
          </CCol>
          <CCol className="col-sm-3">
            <WorkflowItem
              stemNumber={2}
              title='DeFi Launchpad Info'
              desc='Enter the launchpad information that you want to raise , that should be enter all details about your presale' />
          </CCol>
          <CCol className="col-sm-3">
            <WorkflowItem
              stemNumber={3}
              title='Add Additional Info'
              desc='Let people know who you are' />
          </CCol>
          <CCol className="col-sm-3">
            <WorkflowItem
              stemNumber={4}
              title='Finish'
              desc='Review your information' />
          </CCol>
        </CRow>
        <CRow className="mt-3">
          <CCol>
            <CCard className="mb-4">
              <CCardBody>
                <CRow>
                  <p className="danger small-text-sz mb-0">(*) is required field.</p>
                  <CCol>
                    <p className='font-bold'>Token address
                      <sup className="danger">*</sup>
                    </p>
                  </CCol>
                  <CCol>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <CreateTokenModal parent='Normal'/>
                    </div>
                  </CCol>
                  {
                    isTokenValid ? (
                      <div>
                        <CFormInput type="text" id="tokenAddress" placeholder="Ex: Ox..." value={tokenAddress} onChange={onChange} />
                      </div>
                    ) : (
                      <div>
                        <CFormInput type="text" id="tokenAddress" className='input-highlighted' placeholder="Ex: Ox..." value={tokenAddress} onChange={onChange} />
                      </div>
                    )
                  }
                  <p className="small-text-sz mt-1 text-blue-color">Create pool fee: 0.01 {unit}</p>
                  {
                    isTokenValid ? (
                      <div>
                        <RowBetween
                          childStart={<p>Name</p>}
                          childEnd={<p className='text-blue-color text-right'>{tokenName}</p>}
                        />
                        <RowBetween
                          childStart={<p>Symbol</p>}
                          childEnd={<p className="text-right">{tokenSymbol}</p>}
                        />
                        <RowBetween
                          childStart={<p>Decimals</p>}
                          childEnd={<p className="text-right">{tokenDecimal}</p>}
                        />
                        {/* <CAlert color="dark" className="d-flex align-items-center" dismissible>
                          <CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={24} height={24} />
                          <div>
                            Make sure the token has <q>Exclude transfer fee</q> function if it has transfer fees.
                          </div>
                        </CAlert> */}
                        <div>
                              <div className='warning-outline-box-accent dispaly-line-table'>
                                <RowBetween
                                  isLong
                                  createLanchpad
                                  childStart={<FontAwesomeIcon icon={faInfoCircle} className='text-accent-color' style={{ marginTop: '10px' }} />}
                                  childMiddle={<p className='text-accent-color' style={{ fontSize: '13px', marginTop: '10px' }}>Make sure the token has <q>Exclude transfer fee</q> function if it has transfer fees.</p>}
                                  childEnd={<FontAwesomeIcon icon={faWindowClose} onClick={handleCloseInfo} style={{ color: 'black', marginTop: '10px' }} />}
                                />
                              </div>
                            </div>
                        {
                          !isExistPool ? (
                            tokenStatus === NO_APPROVED ? (
                              <div className="d-md-flex justify-content-md-center mt-4 position-right">
                                <div className='loader'></div>
                                <button type="button" className="btn-accent" disabled={approveState} onClick={() => handleApprove()} >
                                  {
                                    approveState == true ? (
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
                                  Approve
                                </button>             
                              </div>
                            ) : (
                              <div className="d-md-flex justify-content-md-center mt-4 position-right">
                                <button type="button" className="btn-accent" onClick={handleNext}>Next</button>
                              </div>
                            )
                          ) : (
                            <></>
                          )
                        }
                      </div>
                    ) : (
                      <>
                        <p className="danger small-text-sz mb-0">{validMessage}</p>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                          <button type="button" className="btn-disabled">Next</button>
                        </div>
                      </>
                    )
                  }
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CCol>
    </CRow>

  );
}

export default Home
