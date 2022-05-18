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

export const RemoveUser = (props) => {

  const [visible, setVisible] = useState(false)
  const [whitelistArray, setWhitelist] = useState([])
  const [textarea, setTextArea] = useState('')

  const handleRemoveUser = async () => {
    const whitearray = textarea.split('\n')
    setWhitelist(whitearray)
    try {
      const web3 = new Web3(provider())

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      console.log(account)

      const presaleContract = new web3.eth.Contract(abi, props.presaleAddr)
//     const txResult = await presaleFactoryContract.methods.create(hexSoftCap, hexHardCap, startDate, presaleRate, tokenAddr, ).send({ 'from': account, 'value': 100000000000000000 })
     const txResult = await presaleContract.methods.deleteWhitelistInfo(whitelistArray).send({'from': account})

     console.log('success', txResult)
     setVisible(false)
     return 1;
      
    } catch (error) {
      console.log('error', error)
      setVisible(false)
      return -1
    }
  }

  const onChangeTextArea = (e) => {
    setTextArea(e.target.value)
  }
  return (
    <>
    <CButton color="dark" shape = "rounded-2" style={{backgroundColor: '#000', width: '100%'}} onClick={() => setVisible(!visible)}>Remove users from whitelist</CButton>
    <CModal style={{backgroundColor: '#333'}} scrollable visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>Remove users from whitelist</CModalTitle>
      </CModalHeader>
      <CModalBody>
        Users
        <CFormTextarea
          id="inputUsers"
          label="Users"
          rows="10"
          placeholder="Insert address: separate with breaks linke. Ex:
          0x34E7f6A4d0BB1fa7aFe548582c47Df337FC337E6
          0xd8Ebc66f0E3D638156D6F5eFAe9f43B1eBc113B1
          0x968136BB860D9534aF1563a7c7BdDa02B1A979C2"
          value={textarea}
          onChange={onChangeTextArea}
        ></CFormTextarea>
      </CModalBody>
      <CModalFooter>
        <CButton color="dark" onClick={handleRemoveUser} >Add Users</CButton>
      </CModalFooter>
    </CModal>
    </>
  )
}