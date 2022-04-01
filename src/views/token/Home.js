import {
  CCard,
  CCardBody,
  CCol, CFormCheck, CFormInput, CFormSelect, CRow,
  CAlert,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilList, cilShieldAlt } from '@coreui/icons';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import RowBetween from '../components/RowBetween';
import WorkflowItem from "../components/WorkflowItem";
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

const TokenHome = () => {
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
    <CRow>
      <CCol xs={12}>
        <br/><br/>
        <CCard className='mb-4 pb-5'>
          <CCardBody>
            <CRow>
              <div className="danger small-text-sz mb-0 text-white-color">(*) is required field.</div>
              <CCol>
                <div className='font-bold text-white-color'>Token Type
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
                <div className="small-text-sz mt-1 text-blue-color">Fee: 0.01 BNB</div>
              </div>
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
            <div className="mt-3 d-grid gap-3 d-md-flex justify-content-md-center">
              <button type="button" className="btn-accent" onClick={handleNext}>Create Token</button>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
	);

}

export default TokenHome