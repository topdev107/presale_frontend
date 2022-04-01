
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
import { faImage, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter, faGithub, faReddit, faTelegram, faInstagram, faDiscord } from "@fortawesome/free-brands-svg-icons"
import RowBetween from '../components/RowBetween';

const FairReview = () => {

  const dispatch = useDispatch()
  const needTokenAmount = useSelector((state) => state.createFairLaunchState.needTokenAmount)
  const tokenAddr = useSelector((state) => state.createFairLaunchState.tokenAddress)
  const tokenName = useSelector((state) => state.createFairLaunchState.tokenName)
  const tokenSymbol = useSelector((state) => state.createFairLaunchState.tokenSymbol)
  const tokenDecimals = useSelector((state) => state.createFairLaunchState.tokenDecimals)

  const total_selling_amount = useSelector((state) => state.createFairLaunchState.total_selling_amount)
  const softcap = useSelector((state) => state.createFairLaunchState.softcap)

  const liquidity = useSelector((state) => state.createFairLaunchState.liquidity)
  const startDate = useSelector((state) => state.createFairLaunchState.start)
  const endDate = useSelector((state) => state.createFairLaunchState.end)
  const lockTime = useSelector((state) => state.createFairLaunchState.lockup)

  const cFirstReleasePercent = useSelector((state) => state.createFairLaunchState.cFirstReleasePercent)
  const cVestingPeriod = useSelector((state) => state.createFairLaunchState.cVestingPeriod)
  const cEachReleasePercent = useSelector((state) => state.createFairLaunchState.cEachReleasePercent)
  const totalTeamVestingTokens = useSelector((state) => state.createFairLaunchState.totalTeamVestingTokens)
  const tFirstReleaseTime = useSelector((state) => state.createFairLaunchState.tFirstReleaseTime)
  const tFirstReleasePercent = useSelector((state) => state.createFairLaunchState.tFirstReleasePercent)
  const tVestingPeriod = useSelector((state) => state.createFairLaunchState.tVestingPeriod)
  const tEachReleasePercent = useSelector((state) => state.createFairLaunchState.tEachReleasePercent)

  const logoURL = useSelector((state) => state.createFairLaunchState.logoURL)
  const website = useSelector((state) => state.createFairLaunchState.website)
  const facebook = useSelector((state) => state.createFairLaunchState.facebook)
  const twitter = useSelector((state) => state.createFairLaunchState.twitter)
  const github = useSelector((state) => state.createFairLaunchState.github)
  const telegram = useSelector((state) => state.createFairLaunchState.telegram)
  const instagram = useSelector((state) => state.createFairLaunchState.instagram)
  const discord = useSelector((state) => state.createFairLaunchState.discord)
  const reddit = useSelector((state) => state.createFairLaunchState.reddit)
  const desc = useSelector((state) => state.createFairLaunchState.website)
  const usingTeamVesting = useSelector((state) => state.createFairLaunchState.usingTeamVesting)


  const history = useHistory();

  const handleSubmit = () => {
    
    history.push('/fairlaunchview');
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
                    childStart={<p>Total selling amount</p>}
                    childEnd={<p className='text-blue-color'>{total_selling_amount}</p>}
                  />
                  <RowBetween
                    childStart={<p>Softcap</p>}
                    childEnd={<p className='text-blue-color'>{softcap}</p>}
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
                  {
                    !usingTeamVesting ?
                      <RowBetween
                        childStart={<p>Using Team Vesting?</p>}
                        childEnd={<p className='text-blue-color'>No</p>}
                      /> :
                      <RowBetween
                        childStart={<p>Using Team Vesting?</p>}
                        childEnd={<p className='text-blue-color'>{tokenSymbol}</p>}
                      />
                  }
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

export default FairReview
