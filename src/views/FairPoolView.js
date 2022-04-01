import {
  CCard,
  CCardBody,
  CCol, CFormCheck, CFormInput, CFormSelect, CRow,
  CAlert,
  CCardHeader,
  CCardImage,
  CImage,
  CContainer, CTooltip,
  CBadge,
  CAccordion,
  CAccordionHeader,
  CAccordionBody, CAccordionItem, CProgress, CProgressBar,
  CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell
} from '@coreui/react';
import {
  CChart,
  CChartPie,
} from '@coreui/react-chartjs'
import React, { useEffect, useState } from 'react';

import CIcon from '@coreui/icons-react';
import { cilList, cilKey, cilShieldAlt, AiOutlineGlobal } from '@coreui/icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faWindowClose, faKey, faEdit, faEarth, faLink } from "@fortawesome/free-solid-svg-icons";
import RowBetween from './components/RowBetween'
import NumberInputComponent from './components/NumberInputComponent';
//import { AiOutlineGlobal } from "react-icons/ai";

const TotalView = () => {
  const [buyAmount, setBuyAmount] = useState(0)
  const [saleType, setSaleType] = useState('')

  const onChangeAmount = (e) => {
    setBuyAmount((v) => (e.target.validity.valid ? e.target.value : v))
  }
  const onChangeSaleType = (e) => {

  }

  return (
    <CRow xs={12}>
      <CCol xs={8}>
        <CCard
          color='#242525'
          textColor='white'
          className='border-dark'
        >
          <CCardBody >
            <CRow>
              <CCol className="col-md-1">
                <div className="clearfix">
                  <CImage align="start" rounded src="/assets/avatar.jpg" width={50} height={50} />
                </div>
              </CCol>
              <CCol >
                <div>TestTokenName &nbsp;
                  <FontAwesomeIcon icon={faKey} /> &nbsp;
                  <FontAwesomeIcon icon={faEdit} /> 
                </div>
              </CCol>
              <CCol className="d-md-flex justify-content-md-end">
                <div>
                  <CBadge color='light'>Canceled</CBadge>
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol>Here is description about tokens.</CCol>
            </CRow>
            <br/><br/>
            <RowBetween
              childStart = 'Presale Address'
              childEnd = '0xA3EE27D6AbF931a584d51a433f15e6eAA5b0C964'
              underline
            />
            <RowBetween
              childStart = 'Token Name'
              childEnd = 'TestToken'
              underline
            />
            <RowBetween
              childStart = 'Token Symbol'
              childEnd = 'TT'
              underline
            />
            <RowBetween
              childStart = 'Token Decimals'
              childEnd = '18'
              underline
            />
            <RowBetween
              childStart = 'TokenAddress'
              childEnd = '0xA3EE27D6AbF931a584d51a433f15e6eAA5b0C964'
              desc = 'Do not send BNB to the token address!'
              underline
            />
            <RowBetween
              childStart = 'Total Supply'
              childEnd = '1,000,000,000 TT'
              underline
            />
            <RowBetween
              childStart = 'Tokens For Presale'
              childEnd = '100 TT'
              underline
            />
            <RowBetween
              childStart = 'Tokens For Liquidity'
              childEnd = '57 TT'
              underline
            />
            <RowBetween
              childStart = 'Soft Cap'
              childEnd = '0.1 BNB'
              underline
            />
            <RowBetween
              childStart = 'Presale Start Time'
              childEnd = '2022.03.30 00:00(UTC)'
              underline
            />
            <RowBetween
              childStart = 'Presale End Time'
              childEnd = '2022.03.31 23:59(UTC)'
              underline
            />
            <RowBetween
              childStart = 'Listing On'
              childEnd = 'Pancakeswap'
              underline
            />
            <RowBetween
              childStart = 'Liquidity Percent'
              childEnd = '57%'
              underline
            />
            <RowBetween
              childStart = 'Liquidity Lockup Time'
              childEnd = '10 minutes after pool ends'
              underline
            />
            <RowBetween
              childStart = 'Total Team Vesting Tokens'
              childEnd = '10,000 TT'
              underline
            />
            <RowBetween
              childStart = 'First Release After Listing(minutes)'
              childEnd = '10 minutes'
              underline
            />
            <RowBetween
              childStart = 'First Release For Team'
              childEnd = '40%'
              underline
            />
            <RowBetween
              childStart = 'Tokens release each cycle'
              childEnd = '20% each 5 minutes'
              underline
            />
            <CRow className='mr-0 pr-0' >
              <CAccordion >
                <CAccordionItem itemKey={1} className="text-white-color" style={{border: 'none'}}>
                  <CAccordionHeader>
                    Team Vesting Info (Estimate from end time)
                  </CAccordionHeader>
                  <CAccordionBody style={{backgroundColor: '#242525'}}>
                    <CTable style={{textAlign: 'center', textColor: 'white'}}>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell scope="col">Unlock #</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Time (UTC)</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Unlocked tokens</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        <CTableRow>
                          <CTableHeaderCell scope="row">1</CTableHeaderCell>
                          <CTableDataCell>2022.03.31 15:35</CTableDataCell>
                          <CTableDataCell>4,000 (40%)</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableHeaderCell scope="row">2</CTableHeaderCell>
                          <CTableDataCell>2022.03.31 15:45</CTableDataCell>
                          <CTableDataCell>2,000 (20%)</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableHeaderCell scope="row">3</CTableHeaderCell>
                          <CTableDataCell>2022.03.31 15:55	</CTableDataCell>
                          <CTableDataCell>2,000 (20%)</CTableDataCell>
                        </CTableRow>
                      </CTableBody>
                    </CTable>
                  </CAccordionBody>
                </CAccordionItem>
              </CAccordion>
            </CRow>
          </CCardBody>
        </CCard>
        <CCol>
          <br/>
          <CCard
            color='#242525'
            textColor='white'
            className='border-dark'
          >
            <CCardBody>
              <CRow>
                <CCol className='col-md-3'></CCol>
                <CCol>
                  <CChart
                    type="doughnut"
                    width="320px"
                    height="320px"
                    data={{
                      labels: ['Presale', 'Liquidity', 'Unlock'],
                      datasets: [
                        {
                          backgroundColor: ['#e02677', '#209ae6', '#edc01f'],
                          data: [40, 30, 80],
                        },
                      ],
                    }}
                  />
                </CCol>
                <CCol className='col-md-3'></CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CCol>
      <CCol xs={4}>
        <CCard
          color='#242525'
          textColor='white'
          className='border-dark'
        >
          <CCardBody>
            <CAlert color="dark">
              Make sure the website is pinksale.finance!
            </CAlert>
            <p className="text-align-center text-white-color">Presale Ends In</p>
            <CRow>
              <CCol><div className="text-timer">00</div></CCol>
              <CCol><div className="text-timer">20</div></CCol>
              <CCol><div className="text-timer">50</div></CCol>
              <CCol><div className="text-timer">14</div></CCol>
            </CRow>
            <br/>
            <CProgress className="mb-3">
              <CProgressBar color="warning" value={25}/>
            </CProgress>
            <CRow>
              <CCol className='xs-2 text_align_left'>0 BNB </CCol>
              <CCol className='xs-2 text_align_right'>0.5 BNB </CCol>
            </CRow>
            <CRow>
              <NumberInputComponent
                title="Amount: (max: 0.05 BNB)"
                value={buyAmount}
                onChange={onChangeAmount}
                errMsg=''
                desc=''
                notSup
              />
              <div className='mt-3 d-grid gap-3 d-md-flex'>
                <button type="button" className="btn-disabled ">Buy</button>
              </div>
            </CRow>
          </CCardBody>
        </CCard>
        <br/>
        <CCard
          color='#242525'
          textColor='white'
          className='border-dark'
        >
          <CCardBody>
            <RowBetween
              childStart = "Status"
              childEnd = "in progress"
              underline
            />
            <RowBetween
              childStart = "Sale type"
              childEnd = "Public"
              underline
            />
            <RowBetween
              childStart = "Minimum Buy"
              childEnd = "0.01 BNB"
              underline
            />
            <RowBetween 
              childStart = "Maximum Buy"
              childEnd = "0.05 BNB"
              underline
            />
          </CCardBody>
        </CCard>
        <br/>
        <CCard 
          color='#242525'
          textColor='white'
          className='border-dark'>
          <CCardHeader>Owner Zone</CCardHeader>
          <CCardBody>
            <CAlert color="dark">
              To make sure there will be no issues during the presale time, please don&apos;t send tokens to wallets before you finalize the presale pool
            </CAlert>
            <div>
              <div>Sale Type</div>
              <CFormCheck 
                inline type="radio"
                name="SaleTypeOptions"
                id="sPublic"
                value="sPublic"
                label="Public"
                onChange={onChangeSaleType}
                defaultChecked/>
              <CFormCheck 
                inline type="radio"
                name="SaleTypeOptions"
                id="swhitelist"
                value="swhitelist"
                label="Whitelist"
                onChange={onChangeSaleType}/>
              <CFormCheck 
                inline type="radio"
                name="SaleTypeOptions"
                id="sPublicAntiBot"
                value="sPublicAntiBot"
                label="Public Anti-Bot"
                onChange={onChangeSaleType}/>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default TotalView