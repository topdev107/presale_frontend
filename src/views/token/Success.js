import {
  CCard,
  CCardBody,
  CCol, CFormCheck, CFormInput, CFormSelect, CRow,
  CFormTextarea,
  CAlert,
  CTable, CTableRow, CTableHeaderCell, CTableDataCell, CTableBody, CTableCaption
} from '@coreui/react';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { HashRouter, Route, Switch, Link, useHistory } from 'react-router-dom'
import { saveTokenAddr as saveTokenAddr1 } from 'src/state/CreateLaunchPadState';
import { saveTokenAddr as saveTokenAddr2 } from 'src/state/CreateFairLaunchState';
import RowBetween from '../components/RowBetween';

const TokenSuccess = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const tokenName = useSelector((state) => state.createTokenState.tokenName)
  const tokenSymbol = useSelector((state) => state.createTokenState.tokenSymbol)
  const tokenDecimal = useSelector((state) => state.createTokenState.tokenDecimals)
  const tokenTotalSupply = useSelector((state) => state.createTokenState.tokenTotalSupply)
  const tokenAddress = useSelector((state) => state.createTokenState.tokenAddress)

  const handleNext = () => {

  }
  const handleLaunchPad = () => {
    dispatch(saveTokenAddr1(tokenAddress))
    history.push("/launchpad/home")
  }

  const handleFairLaunch = () => {
    dispatch(saveTokenAddr2(tokenAddress))
    history.push("/fairlaunch/home")
  }

  return (
    <CRow className='text-title'>
      <CCol xs={12} className='p-4 panel'>
        <CRow className='danger mb-4'>
          Your token was created!
        </CRow>
        <RowBetween
          childStart='Name'
          childEnd={<p className='light-blue m-0'>{tokenName}</p>}
        />
        <RowBetween
          childStart='Symbol'
          childEnd={<p className='m-0'>{tokenSymbol}</p>}
        />
        <RowBetween
          childStart='TotalSupply'
          childEnd={<p className='m-0'>{tokenTotalSupply}</p>}
        />
        <RowBetween
          childStart='Address'
          childEnd={<p className='danger m-0'>{tokenAddress}</p>}
        />
        {/* <CTable bordered hover caption="top" color="warning" className='token-table'>
          <CTableCaption className='text-yellow-color text_align_center'>Your token was created!</CTableCaption>
          <CTableBody>
            <CTableRow>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableDataCell >{tokenName}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell >Symbol</CTableHeaderCell>
              <CTableDataCell>{tokenSymbol}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell >TotalSupply</CTableHeaderCell>
              <CTableDataCell>{tokenTotalSupply}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell >Address</CTableHeaderCell>
              <CTableDataCell>{tokenAddress}</CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable> */}
        <div className="py-4 d-grid gap-3 d-md-flex justify-content-md-center">
          <button type="button" className="btn btn-outline-primary" onClick={handleNext}>View transaction</button>
          <button type="button" className="btn btn-outline-primary" onClick={() => { alert("👋 Copied."); }}>
            Copy address
          </button>
          <button type="button" className="btn btn-outline-primary" onClick={handleLaunchPad}>Create launchpad</button>
          <button type="button" className="btn btn-outline-primary" onClick={handleFairLaunch}>Create Fairlaunch</button>
        </div>
      </CCol>
    </CRow>
  )
}

export default TokenSuccess