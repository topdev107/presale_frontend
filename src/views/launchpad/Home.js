import {
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CRow,
  CAlert
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilList, cilWarning, cilShieldAlt } from '@coreui/icons';

import { faInfoCircle, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from 'react';
import { HashRouter, Route, Switch, Link, useHistory } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';
import Web3 from 'web3';
import RowBetween from '../components/RowBetween';
import WorkflowItem from "../components/WorkflowItem";
import { useDispatch, useSelector } from 'react-redux'
import { saveTokenAddr, saveTokenName, saveTokenSymbol, saveTokenDecimals } from '../../state/CreateLaunchPadState'
import { CreateTokenModal } from '../components/CreateTokenModal'

const Home = () => {
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

  const onChange = (event) => {
    setTokenAddress(event.currentTarget.value);    
  }

  useEffect(() => {
    const checkTokenValidation = (address) => {
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
      } else if (!web3.isAddress(address)) {
        setIsTokenValid(false)
        setValidMessage("Invalid Token Address")
      } else {
        setIsTokenValid(true)
        setValidMessage("")
      }
    }

    checkTokenValidation(tokenAddress)
  }, [tokenAddress])

  const handleCloseInfo = () => {
    setIsShowInfo(false)
  }

  const handleApprove = () => {
    dispatch(saveTokenAddr(tokenAddress))
    dispatch(saveTokenName('Flash token'))
    dispatch(saveTokenSymbol('FLASH'))
    dispatch(saveTokenDecimals(18))
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
                      <CreateTokenModal />
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
                  <p className="small-text-sz mt-1 text-blue-color">Create pool fee: 0.01 BNB</p>
                  {
                    isTokenValid ? (
                      <div>
                        <RowBetween
                          childStart={<p>Name</p>}
                          childEnd={<p className='text-blue-color'>Flash Token</p>}
                        />
                        <RowBetween
                          childStart={<p>Symbol</p>}
                          childEnd={<p>FLASH</p>}
                        />
                        <RowBetween
                          childStart={<p>Decimals</p>}
                          childEnd={<p>18</p>}
                        />
                        {/* <CAlert color="dark" className="d-flex align-items-center" dismissible>
                          <CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={24} height={24} />
                          <div>
                            Make sure the token has <q>Exclude transfer fee</q> function if it has transfer fees.
                          </div>
                        </CAlert> */}
                        <div>
                              <div className='warning-outline-box-accent'>
                                <RowBetween
                                  isLong
                                  childStart={<FontAwesomeIcon icon={faInfoCircle} className='text-accent-color' style={{ marginTop: '10px' }} />}
                                  childMiddle={<p className='text-accent-color' style={{ fontSize: '13px', marginTop: '10px' }}>Make sure the token has <q>Exclude transfer fee</q> function if it has transfer fees.</p>}
                                  childEnd={<FontAwesomeIcon icon={faWindowClose} onClick={handleCloseInfo} style={{ color: 'black', marginTop: '10px' }} />}
                                />
                              </div>
                            </div>
                        {
                          !isExistPool ? (
                            tokenStatus === NO_APPROVED ? (
                              <div className="d-md-flex justify-content-md-center mt-4">
                                <div className='loader'></div>
                                <button type="button" className="btn-accent" onClick={handleApprove}>
                                  {/* <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    variant="light"
                                    style={{marginRight: '5px', marginTop: '2px'}}
                                  /> */}
                                  Approve
                                </button>                                
                              </div>
                            ) : (
                              <div className="d-md-flex justify-content-md-center mt-4">
                                <button type="button" className="btn-accent">Next</button>
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
