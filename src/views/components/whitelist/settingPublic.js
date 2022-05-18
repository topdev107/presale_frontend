import React, { useEffect, useState } from 'react';

import {
CRow, CCol,
CCard, CCardImage, CBadge,
CCardBody, CCardTitle, CCardText,
CProgress, CProgressBar,
CFormSelect,
CButton,
CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter,
CFormCheck,
CFormTextarea,
} from '@coreui/react'

import { CDatePicker } from '@coreui/react-pro'
//import CDatePicker from '@coreui/react/src/components/datepicker/CDatePicker'
import DatePicker from 'react-datepicker';  

// import 'bootstrap/dist/css/bootstrap.min.css';  
import "react-datepicker/dist/react-datepicker.css";  

import Web3 from 'web3'
import abi from '../../../contracts/presaleAbi'

const provider = (props) => {
// 1. Try getting newest provider
const { ethereum } = window
if (ethereum) return ethereum

// 2. Try getting legacy provider
const { web3 } = window
if (web3 && web3.currentProvider) return web3.currentProvider
}

export const SettingPublic = (props) => {

  const [visible, setVisible] = useState(false)
  const [radioPublic, setRadioPublic] = useState('PublicNow')
  const [startDate, setStartDate] = useState(new Date())

  async function handleSetPublic(publicTime) {
    try {
      console.log(publicTime)
      const publicDateInUnixTimestamp = parseInt(publicTime / 1000);
      const web3 = new Web3(provider())

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      console.log(account)

      const presaleContract = new web3.eth.Contract(abi, props.presaleAddr)
  //     const txResult = await presaleFactoryContract.methods.create(hexSoftCap, hexHardCap, startDate, presaleRate, tokenAddr, ).send({ 'from': account, 'value': 100000000000000000 })
     const txResult = await presaleContract.methods.setPublic(publicDateInUnixTimestamp).send({'from': account})

     props.onChangeVisible(false)
     props.onChangeSale('Public')
      return 1;
      
    } catch (error) {
      console.log('error', error)
      props.onChangeVisible(false)
      return -1
    }
  }

  const onChangeRadio = (e) => {
    setRadioPublic(e.target.value)
  }

  return (
    <>
    <CModal style={{backgroundColor: '#333'}} visible={props.visible} onClose={() => props.onChangeVisible(false)}>
      <CModalHeader>
        <CModalTitle>Change Status</CModalTitle>
      </CModalHeader>
      <CModalBody>
        Change this pool to public
        <div>
          <CFormCheck 
            inline type="radio"
            name="publicOption"
            id="PublicNow"
            value="PublicNow"
            label="Public now"
            onChange={onChangeRadio}
            defaultChecked={radioPublic == 'PublicNow'}/>
          <CFormCheck 
            inline type="radio"
            name="publicOption"
            id="PublicSpecific" 
            value="PublicSpecific"
            label="Public with specific time"
            onChange={onChangeRadio}
            defaultChecked={radioPublic == 'PublicSpecific'}/>
        </div>
        {
          radioPublic == 'PublicSpecific' ? (
            <>
              <style>
                {`.date-picker input {
                  width: 100%;
                  backgroundColor: #000 !important;
                }`}
              </style>
              Public sale start time
              <DatePicker
                wrapperClassName="date-picker"
                selected={ startDate }  
                name="startDate"  
                dateFormat="MMMM d, yyyy h:mm aa"  
                showTimeSelect  
                timeFormat="HH:mm"  
                timeIntervals={10}  
                timeCaption="time" 
                onChange={(date) =>   
                  setStartDate(date)} 
              />
              <p className="small-text-sz mt-1 text-blue-color"> Set the time that you want to open this pool to public </p>
            </>
          ) : (
            <></>
          )
        }
      </CModalBody>
      <CModalFooter>
        {
          radioPublic === 'PublicSpecific' ? (
            <CButton color="dark" onClick={() => handleSetPublic(startDate.getTime())}>Save settings</CButton>
          ) : (
            <CButton color="dark" onClick={() => handleSetPublic(0)}>Public now</CButton>
          )
        }
      </CModalFooter>
    </CModal>
    </>
  )
}