import {
  CCard,
  CCardBody,
  CCol, CFormCheck, CFormInput, CFormSelect, CRow,
  CAlert,
  CNav, CNavLink, CNavItem, CTabContent, CTabPane,
  CCardImage, CCardTitle, CCardText, CButton, CBadge,
  CProgressBar, CProgress,  
} from '@coreui/react'
import { CSpinner } from '@coreui/react'

import React, { useEffect, useState, useMemo } from 'react'
import { FormControl } from "react-bootstrap"
import { FairCardDetail, NormalCardDetail } from '../components/EachCardDetail'
import Spinner from 'react-bootstrap/Spinner'

const LaunchpadList = () => {

  const [activeKey, setActiveKey] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] = useState(9)
  const [tabledata, setTableData] = useState([])
  const [myCurrentPage, setMyCurrentPage] = useState(1)
  const [myTableData, setMyTableData] = useState([])
  const [currentChain, setCurrentChain] = useState(97)

  const [wholeLoading, setWholeLoading] = useState(true)
 
  // const database_url = 'http://127.0.0.1:5000/presale/launchpad'
  const database_url = 'https://presale-backend.vercel.app/presale/launchpad'

  window.ethereum && window.ethereum.on('networkChanged', function (networkid) {
    setCurrentChain(networkid)
  })

  useEffect(() => { handleGetChain() }, [])

  const handleGetChain = async () => {
    const id = await window.ethereum.request({ method: 'eth_chainId' })
    console.log('id =====', id)
    setCurrentChain(parseInt(id, 16))
  }

  const unit = useMemo (() => {
    if (currentChain == 97 || currentChain == 56) return "BNB"
    if (currentChain == 25 || currentChain == 338 ) return "CRO"
  }, [currentChain])

  const loadData = async () => {
    // const res = await fetch(database_url.concat('/').concat('page'), requestOptions)
    // const res = await fetch(`${database_url}/page?pageCount=${pageCount_}&currentPage=${currentPage_}`)
    const res = await fetch(`${database_url}/all?chainId=${currentChain}`)
    await res.json()
    .then(data => {
      console.log('fetch whole Data=========>', data)
      setTableData(data)
    })
  }

  const loadMyData = async (currentPage_, pageCount_, owner_) => {
    const res = await fetch(`${database_url}/myzone?pageCount=${pageCount_}&currentPage=${currentPage_}&owner=${owner_}&chainId=${currentChain}`)
    await res.json()
      .then(data => {
        console.log('fetch my Data==========>', data)
        setMyTableData(data)
      })
  }

  const loadWalletAddress = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    console.log('Account=============',account)
    return account
  }

  const handlePage = (e) => {
    if(e.target.value !== '') {
      setCurrentPage(e.target.value)
    }
  }

  const handleMyPage = (e) => {
    if(e.target.value !== '') {
      setMyCurrentPage(e.target.value)
    }
  }

  useEffect(async () => {
    setWholeLoading(true)
    await loadData(currentPage, pageCount)
    setWholeLoading(false)
  },[currentPage, pageCount, currentChain])

  useEffect(async () => {
    setWholeLoading(true)
    const ownerAddr = await loadWalletAddress()
    console.log('ownerAddr=============>',ownerAddr)
    await loadMyData(myCurrentPage, pageCount, ownerAddr)
    setWholeLoading(false)
  },[myCurrentPage, pageCount, currentChain])

  return (
    <CRow>
      {
        wholeLoading === true ? 
        (
          <CSpinner className="loading danger" />
        ) : (
      <CCol xs={12}>
        <CRow className='mb-4'>
          <CCol>
            <p className='medium-text-sz my-2'>&nbsp;</p>
            <CFormInput type="text" className='input-highlighted' style={{padding: '6px 16px'}} placeholder="Enter token name or token symbol" />
          </CCol>
          <CCol xs={2}>
            <p className='medium-text-sz my-2'>Filter By</p>
            <CFormSelect>
              <option value="All Status">All Status</option>
            </CFormSelect>
          </CCol>
          <CCol xs={2}>
            <p className='medium-text-sz my-2'>Sort By</p>
            <CFormSelect>
              <option value="No Filter">No Filter</option>
            </CFormSelect>
          </CCol>

        </CRow>
        <CRow className="display-block">
        {
          tabledata.length === 0 ? 
          (
            <div className='danger text-center mt-4'>There are no launchpad or fairlaunchpad</div>
          ) : (
          tabledata.map((data) => {
            return (data.presaletype === true ?
            <FairCardDetail
              list={1}
              xs={4}
              id = {data._id}
              address = {data.presale_addr}
              img = {data.logoURL}
              name = {data.token_name}
              softCap = {data.softcap}
              liquidity = {data.liquidityPercent}
              lockup = {data.lockupTime}
              basicSymbol = {`${unit}`}
            /> : 
            <NormalCardDetail 
              list={1}
              xs={4}
              id = {data._id}
              address = {data.presale_addr}
              img = {data.logoURL}
              name = {data.token_name}
              symbol = {data.token_symbol}
              perrate = {data.token_presale_rate}
              softCap = {data.softcap}
              hardCap = {data.hardcap}
              liquidity = {data.liquidityPercent}
              lockup = {data.lockupTime}
              basicSymbol = {`${unit}`}
            />)
          })
          )
        }
        </CRow>
      </CCol>
    )}
    </CRow>
  );
}

export default LaunchpadList