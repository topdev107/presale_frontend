import {
  CCard,
  CCardBody,
  CCol, CFormCheck, CFormInput, CFormSelect, CRow,
  CAlert,
  CNav, CNavLink, CNavItem, CTabContent, CTabPane,
  CCardImage, CCardTitle, CCardText, CButton, CBadge,
  CProgressBar, CProgress,
} from '@coreui/react'

import React, { useEffect, useState } from 'react'
import { FormControl } from "react-bootstrap"
import { FairCardDetail, NormalCardDetail } from '../components/EachCardDetail'

const LaunchpadList = () => {

  const [activeKey, setActiveKey] = useState(1)
  const [currentPage, setCurrentPage] = useState(5)
  const [pageCount, setPageCount] = useState(9)
  const [tabledata, setTableData] = useState([])
  
  const database_url = 'http://127.0.0.1:5000/presale/launchpad'
  // const database_url = 'http://134.209.22.166:5000/presale/launchpad/'


  const loadData = async (currentPage_, pageCount_) => {
    // const res = await fetch(database_url.concat('/').concat('page'), requestOptions)
    const res = await fetch(`${database_url}/page?pageCount=${pageCount}&currentPage=${currentPage}`)
    await res.json()
    .then(data => {
      console.log(data)
      setTableData(data)
    })
  }

  useEffect(() => {
    loadData(currentPage, pageCount)
  },[currentPage, pageCount])

  return (
    <CRow>
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
                <CRow>
                {
                  tabledata.map((data) => {
                    return (data.presaletype === true ?
                    <FairCardDetail
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
                      xs={4}
                      id = {data._id}
                      address = {data.presale_addr}
                      img = {data.logoURL}
                      name = {data.token_name}
                      symbol = {data.token_symbol}
                      softCap = {data.softcap}
                      hardCap = {data.hardcap}
                      liquidity = {data.liquidityPercent}
                      lockup = {data.lockupTime}
                    />)
                  })
                }
                </CRow>
              </CTabPane>
              <CTabPane role="tabpanel" aria-labelledby="mine-tab" visible={activeKey === 2}>
                Hello Tabpanel                
              </CTabPane>
            </CTabContent>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default LaunchpadList