
import {
  CCard,
  CCardBody,
  CCol, CFormCheck, CFormInput, CFormSelect, CRow,
  CFormTextarea,
  CAlert,
  CAccordion,
  CAccordionHeader,
  CAccordionBody, CAccordionItem, CProgress, CProgressBar,
  CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell
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
import Spinner from 'react-bootstrap/Spinner';

import Web3 from 'web3';
import { getWeb3 } from '../web3/getWeb3'
import abi from '../../contracts/presaleFactoryAbi.js'
import { presaleFactory } from '../components/ContractAddress'
import { toWei, fromWei } from "web3-utils";

import {
  saveCurrentAddr
} from '../../state/CreateLaunchPadState'

const Review = () => {
  const [presaleFactoryAddr, setPresaleFactoryAddr] = useState('')
  useEffect(() => {
    presaleFactory()
    .then((result) => {
      setPresaleFactoryAddr(result)
    })
  }, [])
  window.ethereum.on('networkChanged', function (networkid) {
    presaleFactory()
    .then((result) => {
      setPresaleFactoryAddr(result)
    })
  })

  const dispatch = useDispatch()
  const needTokenAmount = useSelector((state) => state.createLaunchPadState.needTokenAmount)
  const tokenAddr = useSelector((state) => state.createLaunchPadState.tokenAddress)
  const tokenName = useSelector((state) => state.createLaunchPadState.tokenName)
  const tokenSymbol = useSelector((state) => state.createLaunchPadState.tokenSymbol)
  const tokenDecimals = useSelector((state) => state.createLaunchPadState.tokenDecimals)
  const tokenTotalSupply = useSelector((state) => state.createLaunchPadState.tokenTotalSupply)
  const presaleRate = useSelector((state) => state.createLaunchPadState.presaleRate)
  const listingRate = useSelector((state) => state.createLaunchPadState.listingRate)
  const isWhitelist = useSelector((state) => state.createLaunchPadState.isWhitelist)
  const softCap = useSelector((state) => state.createLaunchPadState.softcap)
  const hardCap = useSelector((state) => state.createLaunchPadState.hardcap)
  const refundType = useSelector((state) => state.createLaunchPadState.refundType)
  const minBuy = useSelector((state) => state.createLaunchPadState.minBuy)
  const maxBuy = useSelector((state) => state.createLaunchPadState.maxBuy)
  const liquidity = useSelector((state) => state.createLaunchPadState.liquidity)
  const startDate = useSelector((state) => state.createLaunchPadState.start)
  const endDate = useSelector((state) => state.createLaunchPadState.end)
  const lockTime = useSelector((state) => state.createLaunchPadState.lockup)

  const cVest = useSelector((state) => state.createLaunchPadState.cvest)
  const tVest = useSelector((state) => state.createLaunchPadState.tvest)
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
  const desc = useSelector((state) => state.createLaunchPadState.desc)

  const [isShowInfo, setIsShowInfo] = useState(true)
  const [presaleAddr, setPresaleAddr] = useState('')
  const [submitStatus, setSubmitStatus] = useState(false)

  // const database_url = 'http://127.0.0.1:5000/presale/launchpad/'
  const database_url = 'https://presale-backend.vercel.app/presale/launchpad/'
  
  const history = useHistory();

  const handleCloseInfo = () => {
    setIsShowInfo(false)
  }

  const provider = () => {
    // 1. Try getting newest provider
    const { ethereum } = window
    if (ethereum) return ethereum

    // 2. Try getting legacy provider
    const { web3 } = window
    if (web3 && web3.currentProvider) return web3.currentProvider
  }

  async function createStandardToken() {
    try {
      const web3 = new Web3(provider())

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      console.log('review===========>', presaleFactoryAddr)
      const presaleFactoryContract = new web3.eth.Contract(abi, presaleFactoryAddr)
      console.log("presaleFactoryContract starts here.......")
      console.log(presaleFactoryContract)

      const softCapGwei = web3.utils.toWei(softCap, 'ether');

      const hardCapGwei = web3.utils.toWei(hardCap, 'ether');
      
      const minBuyGwei = web3.utils.toWei(minBuy, 'ether');
      
      const maxBuyGwei = web3.utils.toWei(maxBuy, 'ether');

      const txResult = await presaleFactoryContract.methods.create(
        tokenAddr,
        [presaleRate, listingRate],
        [minBuyGwei, maxBuyGwei],
        softCapGwei,
        hardCapGwei,
        liquidity,
        isWhitelist,
        moment(startDate).utc().valueOf()/1000,
        moment(endDate).utc().valueOf()/1000
      ).send({ 'from': account, 'value': 10000000000000000 })

      console.log(txResult)

      // const address = txResult.events.PresaleCreated.returnValues.token
      const address = txResult.events[0].address
      console.log(address)
      return address
      
    } catch (error) {
      console.log(error)
    }
  }

  async function handleSubmit () {
    setSubmitStatus(true)
    const presaleAddr = await createStandardToken();
    const web3 = new Web3(provider())

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    let netId = await window.ethereum.request({ method: 'eth_chainId' })
    netId = parseInt(netId, 16)
    const account = accounts[0];

    console.log("save database here =========================")
    let unsoldType = false;
    if(refundType === 'Burn') {
      unsoldType = false
    }  else if(refundType === 'Refund') {
      unsoldType = true
    }
    console.log(" the result =======================>")
    console.log(presaleAddr, account)
    if(presaleAddr != '') {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({ token_address: tkn.address, amount: (+amount / (10 ** tkn.decimals)).toString(), timestamp: Date.now() })
        body: JSON.stringify({
          token_owner: account,
          presale_addr: presaleAddr,
          token_name: tokenName, token_symbol: tokenSymbol, token_decimal: tokenDecimals, token_supply: tokenTotalSupply, token_addr: tokenAddr, iswhitelist: isWhitelist,
          token_presale_rate: presaleRate, token_listing_rate: listingRate, 
          softcap: softCap, hardcap: hardCap, unsold: unsoldType, 
          starttime: moment(startDate).utc().valueOf(), endtime: moment(endDate).utc().valueOf(), 
          liquidityPercent: liquidity, lockupTime: lockTime, maxBuy: maxBuy, minBuy: minBuy, 
          useVestingCont: cVest, ves_firstReleasePresale: cFirstReleasePercent, ves_vestingPeriod: cVestingPeriod, ves_presaleTokenRelease: cEachReleasePercent,
          useTeamVest: tVest, team_totalTeamVest: totalTeamVestingTokens, team_firstTokenReleaseMinute: tFirstReleaseTime, team_firstTokenReleasePercent: tFirstReleasePercent, team_vestingPeriod: tVestingPeriod, team_teamTokenRelease: tEachReleasePercent,
          logoURL: logoURL, websiteURL: website, facebookURL: facebook, twitterURL: twitter, githubURL: github, telegramURL: telegram, instagramURL: instagram, discordURL: discord, redditURL: reddit, description: desc,
          presaletype: false, network: netId
        })
      };
      let _idAddr = '';
      const data = await fetch(database_url.concat('addpad/'), requestOptions)
      console.log(data)
      await data.json()
        .then(data1 => {
          _idAddr = data1._id
        })
      console.log("id ===========>")
      console.log(_idAddr)
      dispatch(saveCurrentAddr(_idAddr))
      setSubmitStatus(false)
      history.push(`/launchviewnormal?id=${_idAddr}`);
    }
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
                    childEnd={<p className='text-accent-color text-right'>{`${needTokenAmount} ${tokenSymbol}`}</p>}
                  />
                  <RowBetween
                    childStart={<p>Token name</p>}
                    childEnd={<p className='text-blue-color text-right'>{tokenName}</p>}
                  />
                  <RowBetween
                    childStart={<p>Token symbol</p>}
                    childEnd={<p className='text-blue-color text-right'>{tokenSymbol}</p>}
                  />
                  <RowBetween
                    childStart={<p>Token decimals</p>}
                    childEnd={<p className='text-blue-color text-right'>{tokenDecimals}</p>}
                  />
                  <RowBetween
                    childStart={<p>Presale rate</p>}
                    childEnd={<p className='text-blue-color text-right'>{presaleRate}</p>}
                  />
                  <RowBetween
                    childStart={<p>Listing rate</p>}
                    childEnd={<p className='text-blue-color text-right'>{listingRate}</p>}
                  />
                  <RowBetween
                    childStart={<p>Sale method</p>}
                    childEnd={<p className='text-blue-color text-right'>{
                      isWhitelist == true ? 
                        'Whitelist' : 'Public'
                    }</p>}
                  />
                  <RowBetween
                    childStart={<p>Softcap</p>}
                    childEnd={<p className='text-blue-color text-right'>{softCap}</p>}
                  />
                  <RowBetween
                    childStart={<p>Hardcap</p>}
                    childEnd={<p className='text-blue-color text-right'>{hardCap}</p>}
                  />
                  <RowBetween
                    childStart={<p>Minimum buy</p>}
                    childEnd={<p className='text-blue-color text-right'>{minBuy}</p>}
                  />
                  <RowBetween
                    childStart={<p>Maximum buy</p>}
                    childEnd={<p className='text-blue-color text-right'>{maxBuy}</p>}
                  />
                  <RowBetween
                    childStart={<p>Liquidity</p>}
                    childEnd={<p className='text-blue-color text-right'>{liquidity}</p>}
                  />
                  <RowBetween
                    childStart={<p>Start time</p>}
                    childEnd={<p className='text-blue-color text-right'>{moment(startDate).utc().format('DD/MM/YYYY HH:mm')}</p>}
                  />
                  <RowBetween
                    childStart={<p>End time</p>}
                    childEnd={<p className='text-blue-color text-right'>{moment(endDate).utc().format('DD/MM/YYYY HH:mm')}</p>}
                  />
                  <RowBetween
                    childStart={<p>Liquidity lockup time</p>}
                    childEnd={<p className='text-blue-color text-right'>{lockTime}</p>}
                  />
                  <RowBetween
                    childStart={<p>Website</p>}
                    childEnd={<p className='text-blue-color text-right'>{website}</p>}
                  />
                  {
                    facebook ? (
                      <RowBetween
                        childStart={<p>Facebook</p>}
                        childEnd={<p className='text-blue-color text-right'>{facebook}</p>}
                      />
                    ) : (
                      <></>
                    )
                  }
                  {
                    twitter ? (
                      <RowBetween
                        childStart={<p>Twitter</p>}
                        childEnd={<p className='text-blue-color text-right'>{twitter}</p>}
                      />
                    ) : (
                      <></>
                    )
                  }
                  {
                    github ? (
                      <RowBetween
                        childStart={<p>Github</p>}
                        childEnd={<p className='text-blue-color text-right'>{github}</p>}
                      />
                    ) : (
                      <></>
                    )
                  }
                  {
                    telegram ? (
                      <RowBetween
                        childStart={<p>Telegram</p>}
                        childEnd={<p className='text-blue-color text-right'>{telegram}</p>}
                      />
                    ) : (
                      <></>
                    )
                  }
                  {
                    instagram ? (
                      <RowBetween
                        childStart={<p>Instagram</p>}
                        childEnd={<p className='text-blue-color text-right'>{instagram}</p>}
                      />
                    ) : (
                      <></>
                    )
                  }
                  {
                    discord ? (
                      <RowBetween
                        childStart={<p>Discord</p>}
                        childEnd={<p className='text-blue-color text-right'>{discord}</p>}
                      />
                    ) : (
                      <></>
                    )
                  }
                  {
                    reddit ? (
                      <RowBetween
                        childStart={<p>Reddit</p>}
                        childEnd={<p className='text-blue-color text-right'>{reddit}</p>}
                        
                      />
                    ) : (
                      <></>
                    )
                  }

                  <RowBetween
                    childStart={<p>Using Team Vesting?</p>}
                    childEnd={<p className='text-blue-color text-right'>{
                      tVest ? 'Yes' : 'No'
                    }</p>}
                  />
                  {
                    tVest ? (
                      <>
                        <RowBetween
                          childStart={<p>Total vesting tokens</p>}
                          childEnd={<p className='text-blue-color text-right'> {totalTeamVestingTokens} </p>}
                        />
                        <RowBetween
                          childStart={<p>First token release after listing($minutes)</p>}
                          childEnd={<p className='text-blue-color text-right'> {tFirstReleaseTime} </p>}
                        />
                        <RowBetween
                          childStart={<p>Vesting period each cycle($minutes)</p>}
                          childEnd={<p className='text-blue-color text-right'> {tVestingPeriod} </p>}
                        />
                        <RowBetween
                          childStart={<p>Token release each cycle</p>}
                          childEnd={<p className='text-blue-color text-right'> {tEachReleasePercent} </p>}
                        />
                        <RowBetween
                          childStart={<p>First batch token release amount</p>}
                          childEnd={<p className='text-blue-color text-right'> {tFirstReleasePercent} </p>}
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
                                    {
                                      
                                    }
                                  </CTableBody>
                                </CTable>
                              </CAccordionBody>
                            </CAccordionItem>
                          </CAccordion>
                        </CRow>
                      </>
                    ) : (<></>)
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
                    <button type="button" className="btn-accent" onClick={handleSubmit} disabled={submitStatus}>
                      {
                        submitStatus == true ? (
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          variant="light"
                          style={{marginRight: '5px', marginTop: '2px'}}
                        /> ) : (<></>)
                      }
                      Submit</button>
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
