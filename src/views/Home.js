
import {
  CCard,
  CCardBody, 
  CCol, 
  CFormInput, 
  CRow
} from '@coreui/react';
import React, { useEffect, useState } from 'react';
import WorkflowItem from "./components/WorkflowItem";
import Web3 from 'web3'


const Home = () => {

  const [tokenAddress, setTokenAddress] = useState("")
  const [isTokenValid, setIsTokenValid] = useState(false)
  const [validMessage, setValidMessage] = useState("")
  const [isExistPool, setIsExistPool] = useState(false)

  const onChange = (event) => {
    setTokenAddress(event.currentTarget.value);
  }

  useEffect(() => {
    const checkTokenValidation = (address) => {
      const web3 = new Web3()
      if (address.length === 0) {      
        setIsTokenValid(false)
        setValidMessage("Token address can not be blank") 
      } else if (address.substring(0,2) !== "0x") {
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
                  <p className="label-color small-text-sz mt-1 blue-color">Create pool fee: 0.01 BNB</p>
                  {
                    isTokenValid ? (
                      <></>
                    ) : (
                      <p className="danger small-text-sz mb-0">{validMessage}</p>
                    )
                  }
                  {
                    isExistPool ? (
                      <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                        <button type="button" className="btn-disabled">Next</button>
                      </div>
                    ) : (
                      <></>
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
