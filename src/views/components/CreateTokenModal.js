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
  
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NumberInputComponent from '../components/NumberInputComponent';
import TextInputComponent from '../components/TextInputComponent';
import { HashRouter, Route, Switch, Link, useHistory } from 'react-router-dom'

import { 
	saveTokenName,
	saveTokenSymbol,
	saveTokenDecimal,
	saveTokenType,
	saveTokenTotalSupply,
  saveUseAntiBot,
} from '../../state/CreateTokenState'

export const CreateTokenModal = () => {

  const history = useHistory()
	const dispatch = useDispatch()

	const [tokenType, setTokenType] = useState('')
	const [tokenName, setTokenName] = useState('')
  const [errMsgTokenName, setErrMsgTokenName] = useState('')

  const [tokenSymbol, setTokenSymbol] = useState('')
  const [errMsgTokenSymbol, setErrMsgTokenSymbol] = useState('')

  const [tokenDecimal, setTokenDecimal] = useState(0)
  const [errMsgTokenDecimal, setErrMsgTokenDecimal] = useState('')

  const [tokenTotalSupply, setTokenTotalSupply] = useState(0)
  const [errMsgTokenTotalSupply, setErrMsgTokenTotalSupply] = useState('')

  const [isCheckedAntiBot, setIsCheckedAntiBot] = useState(false)

  const [visible, setVisible] = useState(false)

	const handleNext = () => {
    dispatch(saveTokenName(tokenName))
    dispatch(saveTokenSymbol(tokenSymbol))
    dispatch(saveTokenDecimal(tokenDecimal))
    dispatch(saveTokenType(tokenType))
    dispatch(saveTokenTotalSupply(tokenTotalSupply))
    dispatch(saveUseAntiBot(isCheckedAntiBot))
    history.push("/createToken/success")
}

  const onChangeTokenType = (e) => {
  setTokenType((v) => (e.target.validity.valid ? e.target.value : v))
  }
  
  const onChangeTokenName = (e) => {
  setTokenName(e.currentTarget.value);
  }

  const onChangeTokenSymbol = (e) => {
  setTokenSymbol(e.currentTarget.value);
  }

  const onChangeTokenDecimal = (e) => {
  setTokenDecimal((v) => (e.target.validity.valid ? e.target.value : v));
  }

  const onChangeTokenTotalSupply = (e) => {
  setTokenTotalSupply((v) => (e.target.validity.valid ? e.target.value : v));
  }

  const onChangeAntiBot = (e) => {
  setIsCheckedAntiBot(e.target.checked)
  }

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

    if(tokenDecimal == 0) {
      setErrMsgTokenDecimal('Invalid decimals');
    } else {
      setErrMsgTokenDecimal('')
    }

    if(tokenTotalSupply == 0) {
      setErrMsgTokenTotalSupply('totalSupply is a required field');
    } else {
      setErrMsgTokenTotalSupply('')
    }
  },
  [
    tokenName,
    tokenSymbol,
    tokenDecimal,
    tokenTotalSupply,
  ])
  return (
  <>
      <CButton style={{backgroundColor: '#333', borderColor: '#333', height: '30px', paddingTop: '3px'}} onClick={() => setVisible(!visible)}>Create Token</CButton>
      <CModal style={{backgroundColor: '#333'}} scrollable visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
            <CModalTitle>Create Token</CModalTitle>
        </CModalHeader>
        <CModalBody>
        <CRow>
          <div className="danger small-text-sz mb-0">(*) is required field.</div>
          <CCol>
            <div className='font-bold text-yellow-color'>Token Type
              <sup className="danger">*</sup>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <div>
            <CFormSelect className="mb-3" onChange={onChangeTokenType}>
              <option value="Standard Token">Standard Token</option>
              <option value="Liquidity Generator Token">Liquidity Generator Token</option>
              <option value="Baby Token">Baby Token</option>
              <option value="Buyback Baby Token">Buyback Baby Token</option>
            </CFormSelect>
          </div>
          <div className="small-text-sz mt-1 text-blue-color">Fee: 0.01 BNB</div>
        </CRow>
        <CRow className='mt-3'>
          <TextInputComponent
            title='Name'
            value={tokenName}
            onChange={onChangeTokenName}
            errMsg={errMsgTokenName}
            placeholder='Ethereum'
            desc=''
          />
        </CRow>
        <CRow className='mt-3'>
          <TextInputComponent 
            title='Symbol'
            value={tokenSymbol}
            onChange={onChangeTokenSymbol}
            errMsg={errMsgTokenSymbol}
            placeholder='ETH'
            desc=''
          />
        </CRow>
        <CRow className='mt-3'>
          <NumberInputComponent
            title='Decimals'
            value={tokenDecimal}
            onChange={onChangeTokenDecimal}
            errMsg={errMsgTokenDecimal}
            desc=''
            needInt
          />
        </CRow>
        <CRow className='mt-3'>
          <NumberInputComponent
            title='TotalSupply'
            value={tokenTotalSupply}
            onChange={onChangeTokenTotalSupply}
            errMsg={errMsgTokenTotalSupply}
            desc=''
            needInt
          />
        </CRow>
        <CFormCheck  
          id="useAntiBot"
          label="Implement Pink Anti-Bot System?"
          onChange={onChangeAntiBot}
        />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
          Close
          </CButton>
          <CButton color="dark" onClick={handleNext}>Create</CButton>
        </CModalFooter>
      </CModal>
  </>
  )   
}