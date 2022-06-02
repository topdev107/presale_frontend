
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
import Spinner from 'react-bootstrap/Spinner';
import {
  saveCurrentAddr
} from '../../state/CreateFairLaunchState'

import Web3 from 'web3';
import abi from '../../contracts/fairlaunchFactoryAbi'
import { presaleFactory, fairlaunchFactory } from '../components/ContractAddress'
import { toWei, fromWei } from "web3-utils";

const FairReview = () => {
  const [fairlaunchFactoryAddr, setfairlaunchFactoryAddr] = useState('')
  useEffect(() => {
    fairlaunchFactory()
    .then((result) => {
      setfairlaunchFactoryAddr(result)
      console.log(result)
    })  
  }, [])
  window.ethereum.on('networkChanged', function (networkid) {
    fairlaunchFactory()
    .then((result) => {
      setfairlaunchFactoryAddr(result)
      console.log(result)
    })
  })

  const dispatch = useDispatch()
  const needTokenAmount = useSelector((state) => state.createFairLaunchState.needTokenAmount)
  const tokenAddr = useSelector((state) => state.createFairLaunchState.tokenAddress)
  const tokenName = useSelector((state) => state.createFairLaunchState.tokenName)
  const tokenSymbol = useSelector((state) => state.createFairLaunchState.tokenSymbol)
  const tokenDecimals = useSelector((state) => state.createFairLaunchState.tokenDecimals)
  const tokenTotalSupply = useSelector((state) => state.createFairLaunchState.tokenTotalSupply)

  const total_selling_amount = useSelector((state) => state.createFairLaunchState.total_selling_amount)
  const softcap = useSelector((state) => state.createFairLaunchState.softcap)

  const liquidity = useSelector((state) => state.createFairLaunchState.liquidity)
  const startDate = useSelector((state) => state.createFairLaunchState.startDate)
  const endDate = useSelector((state) => state.createFairLaunchState.endDate)
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

  const database_url = 'https://presale-backend.vercel.app/presale/launchpad/'
  // const database_url = 'http://127.0.0.1:5000/presale/launchpad/'
  const [submitStatus, setSubmitStatus] = useState(false)

  const history = useHistory();

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

      const presaleFactoryContract = new web3.eth.Contract(abi, fairlaunchFactoryAddr)
      console.log("presaleFactoryContract starts here.......")
      console.log(presaleFactoryContract)

      const softCapGwei = web3.utils.toWei(softcap, 'ether');

      const txResult = await presaleFactoryContract.methods.create(
        tokenAddr,
        total_selling_amount,
        softCapGwei,
        liquidity,
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


  const handleSubmit = async () => {
    setSubmitStatus(true)
    const presaleAddr = await createStandardToken();
    const web3 = new Web3(provider())

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    let netId = await window.ethereum.request({ method: 'eth_chainId' })
    netId = parseInt(netId, 16)
    const account = accounts[0];

    console.log("save database here =========================")
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
          token_name: tokenName, token_symbol: tokenSymbol, token_decimal: tokenDecimals, token_supply: tokenTotalSupply, token_addr: tokenAddr, iswhitelist: 0,
          token_presale_rate: total_selling_amount, token_listing_rate: 0, 
          softcap: softcap, hardcap: 0, unsold: false, 
          starttime: moment(startDate).utc().valueOf(), endtime: moment(endDate).utc().valueOf(), 
          liquidityPercent: liquidity, lockupTime: lockTime, maxBuy: 0, minBuy: 0, 
          useVestingCont: false, ves_firstReleasePresale: 0, ves_vestingPeriod: 0, ves_presaleTokenRelease: 0,
          useTeamVest: false, team_totalTeamVest: 0, team_firstTokenReleaseMinute: 0, team_firstTokenReleasePercent: 0, team_vestingPeriod: 0, team_teamTokenRelease: 0,
          logoURL: logoURL, websiteURL: website, facebookURL: facebook, twitterURL: twitter, githubURL: github, telegramURL: telegram, instagramURL: instagram, discordURL: discord, redditURL: reddit, description: desc,
          presaletype: true, network: netId
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
      history.push(`/launchviewfair?id=${_idAddr}`);
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
                    childStart={<p>Total selling amount</p>}
                    childEnd={<p className='text-blue-color text-right'>{total_selling_amount}</p>}
                  />
                  <RowBetween
                    childStart={<p>Softcap</p>}
                    childEnd={<p className='text-blue-color text-right'>{softcap}</p>}
                  />
                  <RowBetween
                    childStart={<p>Liquidity</p>}
                    childEnd={<p className='text-blue-color text-right'>{liquidity}</p>}
                  />
                  <RowBetween
                    childStart={<p>Start time</p>}
                    childEnd={<p className='text-blue-color text-right'>{startDate}</p>}
                  />
                  <RowBetween
                    childStart={<p>End time</p>}
                    childEnd={<p className='text-blue-color text-right'>{endDate}</p>}
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
                  {
                    !usingTeamVesting ?
                      <RowBetween
                        childStart={<p>Using Team Vesting?</p>}
                        childEnd={<p className='text-blue-color text-right'>No</p>}
                      /> :
                      <RowBetween
                        childStart={<p>Using Team Vesting?</p>}
                        childEnd={<p className='text-blue-color text-right'>Yes</p>}
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
