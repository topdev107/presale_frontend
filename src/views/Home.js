
import {
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CRow
} from '@coreui/react';
import {
  cilBell,
  cilInfo,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faInfoCircle, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from 'react';
import WorkflowItem from "./components/WorkflowItem";
import Web3 from 'web3'
import RowBetween from './components/RowBetween';
import CIcon from '@coreui/icons-react'

const Home = () => {

  const [NO_APPROVED, APPROVED] = ['no_approved', 'approved']
  const [tokenAddress, setTokenAddress] = useState("0x745348AA8f389795ee74c51977fF70Aa17D4c1e2")
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

  return (
    <CRow>
      <CCol xs={12}>
        <CRow className="hide-less-than-1026">
          <CCol className="col-sm-3">
            <WorkflowItem
              stemNumber={1}
              active={true}
              title='Verify Token'
              desc='Enter the token address and verify' />
          </CCol>
          <CCol className="col-sm-3">
            <WorkflowItem
              stemNumber={2}
              active={false}
              title='DeFi Launchpad Info'
              desc='Enter the launchpad information that you want to raise , that should be enter all details about your presale' />
          </CCol>
          <CCol className="col-sm-3">
            <WorkflowItem
              stemNumber={3}
              active={false}
              title='Add Additional Info'
              desc='Let people know who you are' />
          </CCol>
          <CCol className="col-sm-3">
            <WorkflowItem
              stemNumber={4}
              active={false}
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
                    <p>Token address
                      <sup className="danger">*</sup>
                    </p>
                  </CCol>
                  <CCol>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button type="button" className="btn-black">Create Token</button>
                    </div>
                  </CCol>
                  <div>
                    <CFormInput type="text" id="tokenAddress" placeholder="Ex: Ox..." value={tokenAddress} onChange={onChange} />
                  </div>
                  <p className="small-text-sz mt-1 blue-color">Create pool fee: 0.01 BNB</p>
                  {
                    isTokenValid ? (
                      <div>
                        <RowBetween
                          childStart={<p>Name</p>}
                          childEnd={<p className='blue-color'>Flash Token</p>}
                        />
                        <RowBetween
                          childStart={<p>Symbol</p>}
                          childEnd={<p>FLASH</p>}
                        />
                        <RowBetween
                          childStart={<p>Decimals</p>}
                          childEnd={<p>18</p>}
                        />
                        {
                          isShowInfo ? (
                            <div>
                              <div className='yellow-outline-box'>
                                <RowBetween
                                  isLong
                                  childStart={<FontAwesomeIcon icon={faInfoCircle} style={{ color: 'yellow', marginTop: '10px' }} />}
                                  childMiddle={<p style={{ fontSize: '13px', color: 'yellow', marginTop: '10px' }}>Make sure the token has Exclude transfer fee function if it has transfer fees.</p>}
                                  childEnd={<FontAwesomeIcon icon={faWindowClose} onClick={handleCloseInfo} style={{ color: 'black', marginTop: '10px' }} />}
                                />
                              </div>
                              {
                                tokenStatus === NO_APPROVED ? (
                                  <div className="d-md-flex justify-content-md-center mt-4">
                                    <button type="button" className="btn-accent">Approve</button>
                                  </div>
                                ) : (
                                  <div className="d-md-flex justify-content-md-center mt-4">
                                    <button type="button" className="btn-accent">Next</button>
                                  </div>
                                )
                              }
                            </div>
                          ) : (
                            <></>
                          )
                        }

                        {
                          !isExistPool ? (
                            tokenStatus === NO_APPROVED ? (
                              <></>
                            ) : (
                              <></>
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
