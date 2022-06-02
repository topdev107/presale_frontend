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
  const [currentChain, setCurrentChain] = useState(0)

  const [wholeLoading, setWholeLoading] = useState(true)
 
  // const database_url = 'http://127.0.0.1:5000/presale/launchpad'
  const database_url = 'https://presale-backend.vercel.app/presale/launchpad'

  window.ethereum.on('networkChanged', function (networkid) {
    setCurrentChain(networkid)
  })

  const unit = useMemo (() => {
    if (currentChain == 97 || currentChain == 56) return "BNB"
    if (currentChain == 25 || currentChain == 338 ) return "CRO"
  }, [currentChain])

  useEffect( async () => {
    const netId = await window.ethereum.request({ method: 'eth_chainId' })
    setCurrentChain(parseInt(netId, 16))
  }, [])

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
          <CSpinner color="primary" />
        ) : (
      <CCol xs={12}>
        <CCard>
          <CCardBody>
            <CNav variant="tabs" role="tablist">
              <CNavItem >
                <CNavLink
                  href="javascript:void(0);"
                  active={activeKey === 1}
                  onClick={() => setActiveKey(1)}
                  className="text-grey-color"
                >
                  All launchpads
                </CNavLink>
              </CNavItem>
              <CNavItem >
                <CNavLink
                  href="javascript:void(0);"
                  active={activeKey === 2}
                  onClick={() => setActiveKey(2)}
                  className="text-grey-color"
                >
                  My Contributions
                </CNavLink>
              </CNavItem>
            </CNav>
            <br/>
            <CTabContent>
              <CTabPane role="tabpanel" aria-labelledby="all-tab" visible={activeKey === 1}>  
                {/* <CRow>
                  <CCol xs={10}></CCol>
                  <CCol xs={2} >
                    <CFormInput type="number" size="sm" placeholder="page input" value={currentPage} aria-label="sm input example" onChange={handlePage}/>
                  </CCol>
                </CRow> */}
                <CRow className="display-block">
                {
                  tabledata.length === 0 ? 
                  (
                    <div className='text-white-color'>There are no launchpad or fairlaunchpad</div>
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
              </CTabPane>
              <CTabPane role="tabpanel" aria-labelledby="mine-tab" visible={activeKey === 2}>
                {/* <CRow>
                <CCol xs={10}></CCol>
                  <CCol xs={2} >
                    <CFormInput type="number" size="sm" placeholder="page input" value={myCurrentPage} aria-label="sm input example" onChange={handleMyPage}/>
                  </CCol>
                </CRow> */}
                <CRow>
                {
                  tabledata.length === 0 ? 
                  (
                    <div className='text-white-color'>There are no your launchpad or fairlaunchpad</div>
                  ) : (
                  myTableData.map((data) => {
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
                    />)
                  })
                  )
                }
                </CRow>                
              </CTabPane>
            </CTabContent>
          </CCardBody>
        </CCard>
      </CCol>
    )}
    </CRow>
  );
}

export default LaunchpadList