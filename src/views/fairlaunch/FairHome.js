import {
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CRow,
  CAlert,
} from '@coreui/react';
import { faInfoCircle, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, useMemo } from 'react';
import { HashRouter, Route, Switch, Link, useHistory } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';
import Web3 from 'web3';
import RowBetween from '../components/RowBetween';
import WorkflowItem from "../components/WorkflowItem";
import { useDispatch, useSelector } from 'react-redux'
import { saveTokenAddr, saveTokenName, saveTokenSymbol, saveTokenDecimals, saveTokenTotalSupply, saveBasicSymbol } from '../../state/CreateFairLaunchState'
import CIcon from '@coreui/icons-react';
import { cilList, cilWarning, cilShieldAlt } from '@coreui/icons';
import { CreateTokenModal } from '../components/CreateTokenModal'
import TokenAbi from '../../contracts/tokenAbi'
import { fairlaunchFactory, getFinalizeFees, getPresaleFees } from '../components/ContractAddress'

const provider = () => {
  // 1. Try getting newest provider
  const { ethereum } = window
  if (ethereum) return ethereum

  // 2. Try getting legacy provider
  const { web3 } = window
  if (web3 && web3.currentProvider) return web3.currentProvider
}

const FairHome = () => {
  const [fairlaunchFactoryAddr, setfairlaunchFactoryAddr] = useState('')
  const [currentChain, setCurrentChain] = useState(0)
  const [createFee, setCreateFee] = useState(0)
  const [finalizeFee, setFinalizeFee] = useState(0)
  useEffect(async () => {
    fairlaunchFactory()
      .then((result) => {
        setfairlaunchFactoryAddr(result)
        console.log(result)
      })
    const id = await window.ethereum.request({ method: 'eth_chainId' })
    setCurrentChain(parseInt(id, 16))
  }, [])


  async function getFees() {
    let fee = await getPresaleFees(fairlaunchFactoryAddr)
    setCreateFee(fee)
    fee = await getFinalizeFees()
    setFinalizeFee(fee)
  }

  useEffect(() => {
    getFees()
  }, [fairlaunchFactoryAddr])

  window.ethereum && window.ethereum.on('networkChanged', function (networkid) {
    fairlaunchFactory()
      .then((result) => {
        setfairlaunchFactoryAddr(result)
        console.log(result)
      })
    setCurrentChain(networkid)
  })

  const unit = useMemo(() => {
    if (currentChain == 97 || currentChain == 56) return "BNB"
    if (currentChain == 25 || currentChain == 338) return "CRO"
  }, [currentChain])

  const history = useHistory();
  const dispatch = useDispatch()
  const tokenAddr = useSelector((state) => state.createFairLaunchState.tokenAddress)
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
    await TokenContract.methods.decimals().call().then(function (result) {
      setTokenDecimal(result)
    })
    await TokenContract.methods.name().call().then(function (result) {
      setTokenName(result)
    })
    await TokenContract.methods.symbol().call().then(function (result) {
      setTokenSymbol(result)
    })
    await TokenContract.methods.totalSupply().call().then(function (result) {
      setTotalSupply(result)
    })
  }

  useEffect(() => {
    const checkTokenValidation = async (address) => {
      const web3 = new Web3()
      console.log(web3)
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
    await tokenContract.methods.approve(fairlaunchFactoryAddr, tokenTotalSupply).send({ 'from': account })
      .then(function (result) {
        console.log(result)
        setTokenStatus(APPROVED)
        setApproveState(false)
      })
      .catch(e => {
        setApproveState(false)
      })
    
  }

  const handleNext = () => {
    dispatch(saveTokenAddr(tokenAddress))
    dispatch(saveTokenName(tokenName))
    dispatch(saveTokenSymbol(tokenSymbol))
    dispatch(saveTokenDecimals(tokenDecimal))
    dispatch(saveTokenTotalSupply(tokenTotalSupply / (10 ** tokenDecimal)))
    dispatch(saveBasicSymbol(unit))
    history.push("/fairlaunch/defi_fair_launch_info");
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CRow className="panel">
          <CCol className="col-md-3 p-0">
            <WorkflowItem
              stemNumber={1}
              active
              title='Verify Token'
              desc='Enter the token address and verify' />
          </CCol>
          <CCol className="col-md-3 p-0">
            <WorkflowItem
              stemNumber={2}
              title='DeFi Fairlaunch Info'
              desc='Enter the fairlaunch information that you want to raise, that should be enter all details about your pool' />
          </CCol>
          <CCol className="d-none d-md-block col-md-3 p-0">
            <WorkflowItem
              stemNumber={3}
              title='Add Additional Info'
              desc='Let people know who you are' />
          </CCol>
          <CCol className="d-none d-md-block col-md-3 p-0">
            <WorkflowItem
              stemNumber={4}
              title='Finish'
              desc='Review your information' />
          </CCol>
        </CRow>
        <CRow className="mt-1 px-2 pt-4 p-md-4 panel">
          <div>
            <CRow>
              {/* <p className="danger small-text-sz mb-0">(*) is required field.</p> */}
              <CCol className='pt-2'>
                <p className='font-bold text-title' style={{ fontSize: 18 }}>Token address
                  {/* <sup className="danger">*</sup> */}
                </p>
              </CCol>
              <CCol className='mb-4 p-1'>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <CreateTokenModal parent='Fair' />
                </div>
              </CCol>
              {
                isTokenValid ? (
                  <div>
                    <CFormInput type="text" id="tokenAddress" placeholder="Ex: 0x3d..." style={{ border: 0, fontSize: 14, padding: 20 }} value={tokenAddress} onChange={onChange} />
                  </div>
                ) : (
                  <div>
                    <CFormInput type="text" id="tokenAddress" className='input-highlighted' style={{ border: 0, fontSize: 14, padding: 20 }} placeholder="Ex: 0x3d..." value={tokenAddress} onChange={onChange} />
                  </div>
                )
              }
              <div className="col small-text-sz mt-3">
                Create pool fee: <span className='text-title p-md-2'>{createFee} {unit}</span>
              </div>
              <div className="col small-text-sz mt-3 text-right">
                Finalize fee: <span className='text-title p-md-2'>{finalizeFee}%</span>
              </div>
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
                    {/* <CAlert color="danger" className="back-gray d-flex align-items-center" dismissible>
                      <CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={24} height={24} />
                      <div >
                        Make sure the token has <q>Exclude transfer fee</q> function if it has transfer fees.
                      </div>
                    </CAlert> */}
                    {
                      !isExistPool ? (
                        tokenStatus === NO_APPROVED ? (
                          <div className="d-md-flex justify-content-md-center mt-4 position-right">
                            <div className='loader'></div>
                            {/* <button type="button" className={approveState ? "btn-disabled" : "btn-accent"} disabled={approveState} onClick={() => handleApprove()} > */}
                            <button type="button" className={`btn btn-outline-primary ${approveState ? "disabled" : "btn-accent"}`} style={{ width: 150 }} disabled={approveState} onClick={() => handleApprove()} >
                              {
                                approveState == true ? (
                                  <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    variant="light"
                                    style={{ marginRight: '5px', marginTop: '2px' }}
                                  />) : (<></>)
                              }
                              Approve
                            </button>
                          </div>
                        ) : (
                          <div className="d-md-flex justify-content-md-center mt-4 position-right">
                            <button type="button" className="btn btn-primary btn-accent" onClick={handleNext}>Next</button>
                          </div>
                        )
                      ) : (
                        <></>
                      )
                    }
                  </div>
                ) : (
                  <div className="d-grid gap-4 d-md-flex justify-content-center justify-content-md-between align-items-center" style={{ marginTop: 64, marginBottom: 12 }}>
                    <p className="danger small-text-sz mb-0">{validMessage}</p>
                    <button type="button" className="btn btn-primary disabled">Next</button>
                  </div>
                )
              }
            </CRow>
            {
              isTokenValid ? (
                <CRow className='mt-3'>
                  <CCol>
                    <p className='danger small-text-sz text-center'>
                      <FontAwesomeIcon icon={faInfoCircle} className='danger mx-2' />
                      Make sure the token has <q>Exclude transfer fee</q> function if it has transfer fees.
                    </p>
                  </CCol>
                </CRow>
              ) : (
                <></>
              )
            }

          </div>
        </CRow>
      </CCol>
    </CRow>

  );
}

export default FairHome
