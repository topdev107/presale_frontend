
import {
  CCard,
  CCardBody,
  CCol, CFormCheck, CFormInput, CFormSelect, CRow,
  CFormTextarea,
  CAlert,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilList, cilWarning, cilShieldAlt } from '@coreui/icons';

import moment from "moment-timezone";
import React, { useEffect, useState } from 'react';
import { faInfoCircle, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";
import { FormControl } from "react-bootstrap";
import NumberInputComponent from '../components/NumberInputComponent';
import UrlInputComponent from '../components/UrlInputComponent';
import WorkflowItem from "../components/WorkflowItem";
import { HashRouter, Route, Switch, Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setToken, delToken, setTokenAddr } from '../../state/CreateLaunchPadState'
import { faImage, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter, faGithub, faReddit, faTelegram, faInstagram, faDiscord } from "@fortawesome/free-brands-svg-icons"
import RowBetween from '../components/RowBetween';

const Review = () => {

  const dispatch = useDispatch()
  const needTokenAmount = useSelector((state) => state.createLaunchPadState.needTokenAmount)
  const tokenAddr = useSelector((state) => state.createLaunchPadState.tokenAddress)
  const tokenName = useSelector((state) => state.createLaunchPadState.tokenName)
  const tokenSymbol = useSelector((state) => state.createLaunchPadState.tokenSymbol)
  const tokenDecimals = useSelector((state) => state.createLaunchPadState.tokenDecimals)
  const presaleRate = useSelector((state) => state.createLaunchPadState.presaleRate)
  const listingRate = useSelector((state) => state.createLaunchPadState.listingRate)
  const saleMode = 'Public'
  const softCap = useSelector((state) => state.createLaunchPadState.softCap)
  const hardCap = useSelector((state) => state.createLaunchPadState.hardCap)
  const refundType = useSelector((state) => state.createLaunchPadState.refundType)
  const minBuy = useSelector((state) => state.createLaunchPadState.minBuy)
  const maxBuy = useSelector((state) => state.createLaunchPadState.maxBuy)
  const liquidity = useSelector((state) => state.createLaunchPadState.liquidity)
  const startDate = useSelector((state) => state.createLaunchPadState.start)
  const endDate = useSelector((state) => state.createLaunchPadState.end)
  const lockTime = useSelector((state) => state.createLaunchPadState.lockup)

  const cFirstReleasePercent = useSelector((state) => state.createLaunchPadState.cFirstReleasePercent)
  const cVestingPeriod = useSelector((state) => state.createLaunchPadState.cVestingPeriod)
  const cEachReleasePercent = useSelector((state) => state.createLaunchPadState.cEachReleasePercent)
  const totalTeamVestingTokens = useSelector((state) => state.createLaunchPadState.totalTeamVestingTokens)
  const tFirstReleaseTime = useSelector((state) => state.createLaunchPadState.tFirstReleaseTime)
  const tFirstReleasePercent = useSelector((state) => state.createLaunchPadState.tFirstReleasePercent)
  const tVestingPeriod = useSelector((state) => state.createLaunchPadState.tVestingPeriod)
  const tEachReleasePercent = useSelector((state) => state.createLaunchPadState.tEachReleasePercent)

  const logoURL = useSelector((state) => state.createLaunchPadState.logoURL)
  const website = useSelector((state) => state.createLaunchPadState.website)
  const facebook = useSelector((state) => state.createLaunchPadState.facebook)
  const twitter = useSelector((state) => state.createLaunchPadState.twitter)
  const github = useSelector((state) => state.createLaunchPadState.github)
  const telegram = useSelector((state) => state.createLaunchPadState.telegram)
  const instagram = useSelector((state) => state.createLaunchPadState.instagram)
  const discord = useSelector((state) => state.createLaunchPadState.discord)
  const reddit = useSelector((state) => state.createLaunchPadState.reddit)
  const desc = useSelector((state) => state.createLaunchPadState.website)

  const [isShowInfo, setIsShowInfo] = useState(true)  


  const history = useHistory();

  const handleCloseInfo = () => {
    setIsShowInfo(false)
  }

  const handleSubmit = () => {
    history.push('/normallaunchview');
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CRow className="hide-less-than-1026">
          <CCol className="col-sm-3">
            <WorkflowItem
              stemNumber={1}
              verified
              title='Verify Token'
              desc='Enter the token address and verify' />
          </CCol>
          <CCol className="col-sm-3">
            <WorkflowItem
              stemNumber={2}
              verified
              title='DeFi Launchpad Info'
              desc='Enter the launchpad information that you want to raise , that should be enter all details about your presale' />
          </CCol>
          <CCol className="col-sm-3">
            <WorkflowItem
              stemNumber={3}
              verified
              title='Add Additional Info'
              desc='Let people know who you are' />
          </CCol>
          <CCol className="col-sm-3">
            <WorkflowItem
              stemNumber={4}
              active
              title='Finish'
              desc='Review your information' />
          </CCol>
        </CRow>
        <CRow className="mt-3">
          <CCol>
            <CCard className="mb-4 pb-5">
              <CCardBody>
                <div>
                  <RowBetween
                    childStart={<p>Total token</p>}
                    childEnd={<p className='text-accent-color'>{`${needTokenAmount} ${tokenSymbol}`}</p>}
                  />
                  <RowBetween
                    childStart={<p>Token name</p>}
                    childEnd={<p className='text-blue-color'>{tokenName}</p>}
                  />
                  <RowBetween
                    childStart={<p>Token symbol</p>}
                    childEnd={<p className='text-blue-color'>{tokenSymbol}</p>}
                  />
                  <RowBetween
                    childStart={<p>Token decimals</p>}
                    childEnd={<p className='text-blue-color'>{tokenDecimals}</p>}
                  />
                  <RowBetween
                    childStart={<p>Presale rate</p>}
                    childEnd={<p className='text-blue-color'>{presaleRate}</p>}
                  />
                  <RowBetween
                    childStart={<p>Listing rate</p>}
                    childEnd={<p className='text-blue-color'>{listingRate}</p>}
                  />
                  <RowBetween
                    childStart={<p>Sale method</p>}
                    childEnd={<p className='text-blue-color'>{saleMode}</p>}
                  />
                  <RowBetween
                    childStart={<p>Softcap</p>}
                    childEnd={<p className='text-blue-color'>{softCap}</p>}
                  />
                  <RowBetween
                    childStart={<p>Hardcap</p>}
                    childEnd={<p className='text-blue-color'>{hardCap}</p>}
                  />
                  <RowBetween
                    childStart={<p>Minimum buy</p>}
                    childEnd={<p className='text-blue-color'>{minBuy}</p>}
                  />
                  <RowBetween
                    childStart={<p>Maximum buy</p>}
                    childEnd={<p className='text-blue-color'>{maxBuy}</p>}
                  />
                  <RowBetween
                    childStart={<p>Liquidity</p>}
                    childEnd={<p className='text-blue-color'>{liquidity}</p>}
                  />
                  <RowBetween
                    childStart={<p>Start time</p>}
                    childEnd={<p className='text-blue-color'>{startDate}</p>}
                  />
                  <RowBetween
                    childStart={<p>End time</p>}
                    childEnd={<p className='text-blue-color'>{endDate}</p>}
                  />
                  <RowBetween
                    childStart={<p>Liquidity lockup time</p>}
                    childEnd={<p className='text-blue-color'>{lockTime}</p>}
                  />
                  <RowBetween
                    childStart={<p>Website</p>}
                    childEnd={<p className='text-blue-color'>{website}</p>}
                  />
                  {
                    facebook ? (
                      <RowBetween
                        childStart={<p>Facebook</p>}
                        childEnd={<p className='text-blue-color'>{facebook}</p>}
                      />
                    ) : (
                      <></>
                    )
                  }
                  {
                    twitter ? (
                      <RowBetween
                        childStart={<p>Twitter</p>}
                        childEnd={<p className='text-blue-color'>{twitter}</p>}
                      />
                    ) : (
                      <></>
                    )
                  }
                  {
                    github ? (
                      <RowBetween
                        childStart={<p>Github</p>}
                        childEnd={<p className='text-blue-color'>{github}</p>}
                      />
                    ) : (
                      <></>
                    )
                  }
                  {
                    telegram ? (
                      <RowBetween
                        childStart={<p>Telegram</p>}
                        childEnd={<p className='text-blue-color'>{telegram}</p>}
                      />
                    ) : (
                      <></>
                    )
                  }
                  {
                    instagram ? (
                      <RowBetween
                        childStart={<p>Instagram</p>}
                        childEnd={<p className='text-blue-color'>{instagram}</p>}
                      />
                    ) : (
                      <></>
                    )
                  }
                  {
                    discord ? (
                      <RowBetween
                        childStart={<p>Discord</p>}
                        childEnd={<p className='text-blue-color'>{discord}</p>}
                      />
                    ) : (
                      <></>
                    )
                  }
                  {
                    reddit ? (
                      <RowBetween
                        childStart={<p>Reddit</p>}
                        childEnd={<p className='text-blue-color'>{reddit}</p>}
                        
                      />
                    ) : (
                      <></>
                    )
                  }

                  <RowBetween
                    childStart={<p>Using Team Vesting?</p>}
                    childEnd={<p className='text-blue-color'>{tokenSymbol}</p>}
                  />
                  <CAlert color="warning" className="d-flex align-items-center" dismissible>
                    <CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={24} height={24} />
                    <div>
                      For tokens with burns, rebase or other special transfers please ensure that you have a way to whitelist multiple addresses or turn off the special transfer events (By setting fees to 0 for example for the duration of the presale)
                    </div>
                  </CAlert>
                  <div className="mt-3 d-grid gap-3 d-md-flex justify-content-md-center">
                    <button type="button" className="btn-black" onClick={history.goBack}>Back</button>
                    {/* <Link to="/" style={{ textDecoration: 'none' }} className="btn-black">Back</Link> */}
                    <button type="button" className="btn-accent" onClick={handleSubmit}>Submit</button>
                    {/* <button type="button" className="btn-accent">Next</button> */}
                  </div>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CCol>
    </CRow>
  );
}

export default Review
