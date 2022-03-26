
import {
  CCard,
  CCardBody,
  CCol, CFormCheck, CFormInput, CFormSelect, CRow,
  CFormTextarea
} from '@coreui/react';
import moment from "moment-timezone";
import React, { useEffect, useState } from 'react';
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";
import { FormControl } from "react-bootstrap";
import NumberInputComponent from './components/NumberInputComponent';
import UrlInputComponent from './components/UrlInputComponent';
import WorkflowItem from "./components/WorkflowItem";
import { HashRouter, Route, Switch, Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setToken, delToken, setTokenAddr } from '../state/CreateLaunchPadState'
import { faImage, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter, faGithub, faReddit, faTelegram, faInstagram, faDiscord } from "@fortawesome/free-brands-svg-icons"
import RowBetween from './components/RowBetween';

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


  const history = useHistory();


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
                    childStart={<p>Token symbol</p>}
                    childEnd={<p className='text-blue-color'>{tokenSymbol}</p>}
                  />
                  <RowBetween
                    childStart={<p>Token symbol</p>}
                    childEnd={<p className='text-blue-color'>{tokenSymbol}</p>}
                  />
                  <RowBetween
                    childStart={<p>Token symbol</p>}
                    childEnd={<p className='text-blue-color'>{tokenSymbol}</p>}
                  />
                  <RowBetween
                    childStart={<p>Token symbol</p>}
                    childEnd={<p className='text-blue-color'>{tokenSymbol}</p>}
                  />
                  <RowBetween
                    childStart={<p>Token symbol</p>}
                    childEnd={<p className='text-blue-color'>{tokenSymbol}</p>}
                  />
                  <RowBetween
                    childStart={<p>Token symbol</p>}
                    childEnd={<p className='text-blue-color'>{tokenSymbol}</p>}
                  />
                  <RowBetween
                    childStart={<p>Token symbol</p>}
                    childEnd={<p className='text-blue-color'>{tokenSymbol}</p>}
                  />
                  <RowBetween
                    childStart={<p>Token symbol</p>}
                    childEnd={<p className='text-blue-color'>{tokenSymbol}</p>}
                  />
                  <RowBetween
                    childStart={<p>Token symbol</p>}
                    childEnd={<p className='text-blue-color'>{tokenSymbol}</p>}
                  />
                  <RowBetween
                    childStart={<p>Token symbol</p>}
                    childEnd={<p className='text-blue-color'>{tokenSymbol}</p>}
                  />
                  <RowBetween
                    childStart={<p>Token symbol</p>}
                    childEnd={<p className='text-blue-color'>{tokenSymbol}</p>}
                  />

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
