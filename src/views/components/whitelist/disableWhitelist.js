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

export const DisableWhitelist = (props) => {

  const handleDisableWhitelist = async () => {
    try {
      const publicDateInUnixTimestamp = parseInt((new Date).now().getTime() / 1000);
      console.log(publicDateInUnixTimestamp)
      const web3 = new Web3(provider())

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      console.log(account)

      const presaleContract = new web3.eth.Contract(abi, props.presaleAddr)
//     const txResult = await presaleFactoryContract.methods.create(hexSoftCap, hexHardCap, startDate, presaleRate, tokenAddr, ).send({ 'from': account, 'value': 100000000000000000 })
     const txResult = await presaleContract.methods.setPublic(publicDateInUnixTimestamp).send({'from': account})

     console.log('success', txResult)
     props.setPublicRadio('Public')
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <>
    <CButton color="dark" shape = "rounded-2" style={{backgroundColor: '#000', width: '100%'}} onClick={handleDisableWhitelist}>Disable whitelist</CButton>
    </>
  )
}