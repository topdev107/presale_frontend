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
  CButton,
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
import ReactEcharts from "echarts-for-react"; 

import CIcon from '@coreui/icons-react';
import { cilList, cilKey, cilShieldAlt, AiOutlineGlobal } from '@coreui/icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faInfoCircle, faWindowClose, faKey, faEdit, faEarth, faLink } from "@fortawesome/free-solid-svg-icons";
import RowBetween from './components/RowBetween'
import NumberInputComponent from './components/NumberInputComponent';
import { useDispatch, useSelector } from 'react-redux'
//import { AiOutlineGlobal } from "react-icons/ai";
import { AddUser } from './components/whitelist/addUser'
import { RemoveUser } from './components/whitelist/removeUser'
import { SettingPublic } from './components/whitelist/settingPublic'
import { DisableWhitelist } from './components/whitelist/disableWhitelist'

import Web3 from 'web3';
import abi from '../contracts/presaleAbi'

const TotalView = () => {
  const [buyAmount, setBuyAmount] = useState(0)
  const [saleType, setSaleType] = useState('Public')
  const [whitelistcap, setWhitelistCap] = useState('Whitelist')
  const [currentState, setCurrentState] = useState(0)
  // const tokenName = useSelector((state) => state.createLaunchPadState.tokenName)
  const currentAddr = useSelector((state) => state.createLaunchPadState.currentAddr)
  const database_url = 'http://127.0.0.1:5000/presale/launchpad'
  // const database_url = 'http://134.209.22.166:5000/presale/launchpad/'

  /// simple
  const [presaleAddress, setPresaleAddress] = useState('')
  const [tokenName, setTokenName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [tokenDecimal, setTokenDecimal] = useState(0)
  const [tokenAddress, setTokenAddress] = useState('')
  const [tokenSupply, setTokenSupply] = useState(0)
  const [presaleRate, setPresaleRate] = useState(0)
  const [listingRate, setListingRate] = useState(0)
  const [softcap, setSoftcap] = useState(0)
  const [hardcap, setHardcap] = useState(0)
  const [unsold, setUnsold] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [listing, setListing] = useState('Pancakeswap')
  const [liquidityPercent, setLiquidityPercent] = useState(0)
  const [lockTime, setLockTime] = useState(0)
  const [minBuy, setMinBuy] = useState(0)
  const [maxBuy, setMaxBuy] = useState(0)
  const [description, setDescription] = useState('')

  /// first option

  const [useVesting, setUseVesting] = useState(false)
  const [firstReleasePresale, setFirstReleasePresale] = useState(0)
  const [vestingPresalePercent, setVestingPresalePercent] = useState(0)
  const [vestingPresaleTime, setVestingPresaleTime] = useState(0)

  /// second option

  const [useTeamVesting, setUseTeamVesting] = useState(false)
  const [totalTeamVesting, setTotalTeamVesting] = useState(0)
  const [firstReleaseListing, setFirstReleaseListing] = useState(0)
  const [firstReleaseTeam, setFirstReleaseTeam] = useState(0)
  const [cycleTime, setCycleTime] = useState(0)
  const [teamReleaseEach, setTeamReleaseEach] = useState(0)

  const [tabledata, setTableData] = useState([])
  const [isCancel, setCancel] = useState(false)
  const [publicvisible, setVisible] = useState(false)

  const [presaleState, setPresaleState] = useState(0)
  const [presaleTime, setPresaleTime] = useState(-1)
  const [presaleDay, setPresaleDay] = useState(0)
  const [presaleHour, setPresaleHour] = useState(0)
  const [presaleMinute, setPresaleMinute] = useState(0)
  const [presaleSecond, setPresaleSecond] = useState(0)

  const [isChecked, setIsChecked] = useState(false)
  const [isValidBuy, setIsValidBuy] = useState(false)

  const chartOption = {
    tooltip: {
      trigger: 'none'
    },
    legend: {
      orient: 'vertical',
      x: 'right',
      data: ['Unlocked', 'Liquidity', 'Presale']
    },
    itemStyle: {
      // Color of the point.
      color: '#fff'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['80%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1000, name: 'Unlocked' },
          { value: 0, name: 'Liquidity' },
          { value: 0, name: 'Presale' },
        ]
      }
    ]
  };

  const onChangeAmount = (e) => {
    // setBuyAmount((v) => (e.target.validity.valid ? e.target.value : v))
    setBuyAmount(e.target.value)
    setIsValidBuy(e.target.value < maxBuy && e.target.value > 0)
//    console.log(e.target.value, maxBuy, (e.target.value < maxBuy))

  }
  const onChangeSaleType = async (e) => {
    const current = e.target.value
    const prev = saleType
    if(current == 'Whitelist') {
      setWhitelistCap('Whitelisting...')
      const flag = await handleWhitelist()
      console.log(flag)
      if(flag == -1) {
        setSaleType(prev)
      } else {
        setSaleType('Whitelist')
      }
      setWhitelistCap('Whitelist')
    } else if(current == 'Public' && prev == 'Whitelist') {
      setVisible(!publicvisible)
      setSaleType(current)
    } else {
      setSaleType(current)
    }
  }

  const provider = () => {
    // 1. Try getting newest provider
    const { ethereum } = window
    if (ethereum) return ethereum

    // 2. Try getting legacy provider
    const { web3 } = window
    if (web3 && web3.currentProvider) return web3.currentProvider
  }

  async function handleBuy(valueBid) {
    try {
      const web3 = new Web3(provider())

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      console.log(account)

      const presaleContract = new web3.eth.Contract(abi, presaleAddress)
  //  const txResult = await presaleContract.methods.Bid().send({'from': account, 'value': valueBid * 10 ** 18})
      const blocktime = await presaleContract.methods.getTimestamp().call()
      console.log(blocktime)
      const txResult = await presaleContract.methods.userDeposit().send({'from': account, 'value': valueBid * 10 ** 18})

     console.log('success', txResult)
     return 1;
      
    } catch (error) {
      return -1
      console.log('error', error)
    }
  }

  async function handleWhitelist() {
    try {
      const web3 = new Web3(provider())

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      console.log(account)

      const presaleContract = new web3.eth.Contract(abi, presaleAddress)
//     const txResult = await presaleFactoryContract.methods.create(hexSoftCap, hexHardCap, startDate, presaleRate, tokenAddr, ).send({ 'from': account, 'value': 100000000000000000 })
     const txResult = await presaleContract.methods.setWhitelist().send({'from': account})

     console.log('success', txResult)
     return 1;
      
    } catch (error) {
      return -1
      console.log('error', error)
    }
  }

  async function handleCancel() {
    try {
      const web3 = new Web3(provider())

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      console.log(account)

      const presaleContract = new web3.eth.Contract(abi, presaleAddress)
//     const txResult = await presaleFactoryContract.methods.create(hexSoftCap, hexHardCap, startDate, presaleRate, tokenAddr, ).send({ 'from': account, 'value': 100000000000000000 })
     const txResult = await presaleContract.methods.setCancel().send({'from': account})

     console.log('success', txResult)
     setCancel(true)      
    } catch (error) {
      console.log('error', error)
    }
  }

  async function handleWithdraw() {
    try {
      const web3 = new Web3(provider())

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      const presaleContract = new web3.eth.Contract(abi, presaleAddress)
      const txResult = await presaleContract.methods.ownerWithdrawTokens().send({'from': account})

      console.log('success', txResult)
      
    } catch (error) {
      console.log('error', error)
    }
  }

  async function handleFinalize() {
    try {
      const web3 = new Web3(provider())

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      const presaleContract = new web3.eth.Contract(abi, presaleAddress)
      const txResult = await presaleContract.methods.purchaseICOCoin().send({'from': account})

      console.log('success', txResult)
      
    } catch (error) {
      console.log('error', error)
    }
  }

  async function handleClaim() {
    try {
      const web3 = new Web3(provider())

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0]
      const presaleContract = new web3.eth.Contract(abi, presaleAddress)
      const txResult = await presaleContract.methods.userWithdrawTokens().send({'from': account})
      
      console.log('success', txResult)
    } catch (error) {
      console.log('error', error)
    }
  }

  async function loadWholeData() {
    // const res = await fetch(database_url.concat('/').concat(currentAddr))
    let presaleAddr;
    let currentime, startime, endtime;
    const res = await fetch(database_url.concat('/').concat('62712c89c917ef8bdb27f264'))
    await res.json()
      .then(data => {
        setPresaleAddress(data.presale_addr)
        presaleAddr = data.presale_addr
        setTokenName(data.token_name)
        setTokenSymbol(data.token_symbol)
        setTokenDecimal(data.token_decimal)
        setTokenAddress(data.token_addr)
        setTokenSupply(data.token_supply)
        setPresaleRate(data.token_presale_rate)
        setListingRate(data.token_listing_rate)
        setSoftcap(data.softcap)
        setHardcap(data.hardcap)
        if(data.unsold == false) {
          setUnsold('Burn')
        } else {
          setUnsold('Refund')
        }
        setStartTime(data.starttime)
        setEndTime(data.endtime)
        setLiquidityPercent(data.liquidityPercent)
        setLockTime(data.lockupTime)
        setMinBuy(data.minBuy)
        setMaxBuy(data.maxBuy)
        setDescription(data.desc)
        if(data.iswhitelist == true) {
          setSaleType('Whitelist')
        } else {
          setSaleType('Public')
        }
    
        if(data.useVestingCont) {
          setUseVesting(true)
          setFirstReleasePresale(data.ves_firstReleasePresale)
          setVestingPresaleTime(data.ves_vestingPeriod)
          setVestingPresaleTime(data.ves_presaleTokenRelease)
        }
    
        if(data.useTeamVest) {
          setUseTeamVesting(true)
          setTotalTeamVesting(data.team_totalTeamVest)
          setFirstReleaseListing(data.team_firstTokenReleaseMinute)
          setFirstReleaseTeam(data.team_firstTokenReleasePercent)
          setCycleTime(data.team_vestingPeriod)
          setTeamReleaseEach(data.team_teamTokenRelease)
          const ltotal = data.team_totalTeamVest
          const lfirstReleaseTeam = data.team_firstTokenReleasePercent
          const lfirstlisting = data.team_firstTokenReleaseMinute
          const lcycletime = data.team_vestingPeriod
          const lteameach = data.team_teamTokenRelease
          const lstarttime = data.starttime
          var ltabledata = []
          ltabledata.push([1, lstarttime + lfirstlisting, ltotal * lfirstReleaseTeam / 100, lfirstReleaseTeam])
          var count = 2;
          var temp = 100 - +lfirstReleaseTeam
          var temptime = lstarttime
          while( temp > 0 ) {
            if(temp < +lteameach){
              ltabledata.push([count, temptime, ltotal * temp / 100, temp ])
              // console.log([count, temptime, ltotal * temp / 100, temp])
            } else {
              ltabledata.push([count, temptime, ltotal * lteameach / 100, lteameach])
              // console.log([count, temptime, ltotal * lteameach / 100, lteameach])
            }
            count ++;
            temp -= +lteameach
            temptime += +lcycletime
          }
        }
        setTableData(ltabledata)
        currentime = parseInt((new Date()).getTime() / 1000)
        startime = new Date(data.starttime).getTime() / 1000
        endtime = new Date(data.endtime).getTime() / 1000
        // console.log(startime, endtime, currentime)
        // if(currentime < startime) {
        //   setPresaleState(1)
        //   setPresaleTime(startime - currentime)
        // } else if(currentime >= startime && currentime <= endtime) {
        //   setPresaleState(2)
        //   setPresaleTime(endtime - currentime)
        // } else {
        //   setPresaleState(3)
        // }
      })
  
      const status = await getPresaleStatus(presaleAddr)
      setPresaleState(status)
      if(status == 1) {
        setPresaleTime(startime - currentime)
      } else if(status == 2) { 
        setPresaleTime(endtime - currentime)
      } else {
        setPresaleTime(0)
      }
//      loadTotalSupply()
  }

  async function getPresaleStatus(address) {
    try {
      const web3 = new Web3(provider())

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      const presaleContract = new web3.eth.Contract(abi, address)
      const txResult = await presaleContract.methods.presaleStatus().call()
      const balance = await web3.eth.getBalance(address)
      console.log(balance)
      setCurrentState(+balance / (10 ** 18))
      return +txResult+1;
      
    } catch (error) {
      console.log('error', error)
    }
  }


  const showState = () => {
    if(presaleState == 1) {
      return 'upcoming'
    } else if(presaleState == 2) {
      return 'in progress'
    } else if(presaleState == 3) {
      return 'ended'
    } else if(presaleState == 4) {
      return 'failed'
    } else if(presaleState == 5) {
      return 'canceled'
    }
  }

  const showStatus = () => {
    let message = ''
    if(presaleState == 1) {
      message = 'Presale Starts In'
    } else if(presaleState == 2) {
      message = 'Presale Ends In'
    } else if(presaleState == 3) {
      message = 'Presale Ended'
    } else if(presaleState == 4) {
      message = 'Presale Failed'
    } else if(presaleState == 5) {
      message = 'Presale Canceled'
    }
    return (
      <>
        <p className="text-align-center text-white-color">{message}</p>
        {
          presaleState == 1 || presaleState == 2 ? 
          (
            <>
            <CRow>
                <CCol><div className="text-timer">{presaleDay}</div></CCol>
                <CCol><div className="text-timer">{presaleHour}</div></CCol>
                <CCol><div className="text-timer">{presaleMinute}</div></CCol>
                <CCol><div className="text-timer">{presaleSecond}</div></CCol>
              </CRow>
              <br/>
              <CProgress className="mb-1">
                <CProgressBar color="warning" value={currentState / hardcap * 100}/>
              </CProgress>
              <div style={{display: 'flex'}}>
                <div className='col-md-6 text_align_left'>{currentState} BNB </div>
                <div className='col-md-6 text_align_right'>{hardcap} BNB </div>
              </div>
              <CRow>
                <NumberInputComponent
                  title= {'Amount: (max: ' + maxBuy + 'BNB)'}
                  value={buyAmount}
                  onChange={onChangeAmount}
                  errMsg=''
                  desc=''
                  notSup
                />
                <div className='mt-3 d-grid gap-3 d-md-flex'>
                  {
                    (isValidBuy == true) ? (
                    <button type="button" className="btn-accent" onClick={() => handleBuy(buyAmount)}>Buy</button>
                    ) : (
                      <button type="button" className="btn-disabled ">Buy</button>
                    )
                  }
                </div>
              </CRow>
            </>
          ) : (<>
              <CButton color="dark" shape = "rounded-2" style={{backgroundColor: '#000'}} onClick={handleClaim}>Claim tokens</CButton>
          </>)
        }
      </>
    )
  }

  useEffect(() => {
    loadWholeData()
   }, [])
 
  useEffect(() => {
    const interval = setInterval(() => {
      setPresaleTime((prevCounter) => prevCounter - 1);
    }, 1000);

    return () => clearInterval(interval);
   }, [])

  useEffect(async () => {
    const status = await getPresaleStatus(presaleAddress)
    setPresaleState(status)
    if(status == 2) {
      const currentime = parseInt((new Date()).getTime() / 1000)
      const endtime = new Date(endTime).getTime() / 1000
      setPresaleTime(endtime - currentime)
    } else if(status > 2) {
      setPresaleTime(0)
    }
    if(presaleTime >= 0) {
      const day = parseInt(presaleTime / 3600 / 24)
      const hour = parseInt((presaleTime - day * 3600 * 24) / 3600)
      const minute = parseInt((presaleTime - (day * 3600 * 24 + hour * 3600)) / 60 )
      const second = parseInt(presaleTime - (day * 3600 * 24 + hour * 3600 + minute * 60))
      setPresaleDay(day)
      setPresaleHour(hour)
      setPresaleMinute(minute)
      setPresaleSecond(second)
    }
  }, [presaleTime])

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
                <div>{tokenName}&nbsp;Presale &nbsp;
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
              <CCol>{description}</CCol>
            </CRow>
            <br/><br/>
            <RowBetween
              childStart = 'Presale Address'
              childEnd = {<p className='text-yellow-color'>{presaleAddress}</p>}
            />
            <RowBetween
              childStart = 'Token Name'
              childEnd = {<p>{tokenName}</p>}
            />
            <RowBetween
              childStart = 'Token Symbol'
              childEnd = {<p>{tokenSymbol}</p>}
            />
            <RowBetween
              childStart = 'Token Decimals'
              childEnd = {<p>{tokenDecimal}</p>}
            />
            <RowBetween
              childStart = 'TokenAddress'
              childEnd = {<div className='text-yellow-color'>{tokenAddress}</div>}
              desc = 'Do not send BNB to the token address!'
            />
            <RowBetween
              childStart = 'Total Supply'
              childEnd = {<p>{tokenSupply} {tokenSymbol}</p>}
            />
            <RowBetween
              childStart = 'Tokens For Presale'
              childEnd = {<p>{hardcap * presaleRate} {tokenSymbol}</p>}
            />
            <RowBetween
              childStart = 'Tokens For Liquidity'
              childEnd = {<p>{hardcap * listingRate * liquidityPercent / 100} {tokenSymbol}</p>}
            />
            <RowBetween
              childStart = 'Presale Rate'
              childEnd = {<p>1 BNB = {presaleRate} {tokenSymbol}</p>}
            />
            <RowBetween
              childStart = 'Listing Rate'
              childEnd = {<p>1 BNB = {listingRate} {tokenSymbol}</p>}
            />
            {
              useVesting === true ? (
              <>
                <RowBetween
                  childStart = 'First Release For Presale'
                  childEnd = {<p>{firstReleasePresale}%</p>}
                />
                <RowBetween
                  childStart = 'Vesting For Presale'
                  childEnd = {<p>{vestingPresalePercent}% each {vestingPresaleTime} minutes</p>}
                />
              </> ) : (<> </>)
            }
            <RowBetween
              childStart = 'Soft Cap'
              childEnd = {<p>{softcap} BNB</p>}
            />
            <RowBetween
              childStart = 'Hard Cap'
              childEnd = {<p>{hardcap} BNB</p>}
            /> 
            <RowBetween
              childStart = 'Unsold'
              childEnd = {<p>{unsold}</p>}
            />
            <RowBetween
              childStart = 'Presale Start Time'
              childEnd = {<p>{startTime}</p>}
            />
            <RowBetween
              childStart = 'Presale End Time'
              childEnd = {<p>{endTime}</p>}
            />
            <RowBetween
              childStart = 'Listing On'
              childEnd = {<p className='text-yellow-color'>{listing}</p>}
            />
            <RowBetween
              childStart = 'Liquidity Percent'
              childEnd = {<p>{liquidityPercent}</p>}
            />
            <RowBetween
              childStart = 'Liquidity Lockup Time'
              childEnd = {<p>{lockTime} minutes after pool ends</p>}
            />
            {
              useTeamVesting === true ? (
              <>
                <RowBetween
                  childStart = 'Total Team Vesting Tokens'
                  childEnd = {<p>{totalTeamVesting} {tokenSymbol}</p>}
                />
                <RowBetween
                  childStart = 'First Release After Listing(minutes)'
                  childEnd = {<p>{firstReleaseListing} minutes</p>}
                />
                <RowBetween
                  childStart = 'First Release For Team'
                  childEnd = {<p>{firstReleaseTeam} %</p>}
                />
                <RowBetween
                  childStart = 'Cycle (minutes)'
                  childEnd = {<p>{cycleTime} minutes</p>}
                />
                <RowBetween
                  childStart = 'Team Tokens Release Each Cycle'
                  childEnd = {<p>{teamReleaseEach} %</p>}
                />
                {
                  useVesting === true ? (
                    <> 
                      <RowBetween
                        childStart = 'Tokens release each cycle'
                        childEnd = {<p>{vestingPresalePercent}% each {vestingPresaleTime} minutes</p>}
                      />
                    </>
                  ) : (<> </>)
                }
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
                            tabledata.map((item) => {
                              return (
                                <CTableRow key={item[0]}>
                                  <CTableHeaderCell scope="row">{item[0]}</CTableHeaderCell>
                                  <CTableDataCell>{item[1]}</CTableDataCell>
                                  <CTableDataCell>{item[2]}&nbsp;({item[3]}%)</CTableDataCell>
                                </CTableRow>
                              )
                            })
                          }
                          </CTableBody>
                        </CTable>
                      </CAccordionBody>
                    </CAccordionItem>
                  </CAccordion>
                </CRow>
              </> ) : (<></>)
            }
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
                  {/* <CChart
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
                  /> */}
                  <ReactEcharts option={chartOption} />
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
            {
              showStatus()
            }
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
              childEnd = {<p className="text-yellow-color">{
                showState()
              }</p>}  
            />
            <RowBetween
              childStart = "Sale type"
              childEnd = {<p className='text-yellow-color'>{saleType}</p>}
            />
            <RowBetween
              childStart = "Minimum Buy"
              childEnd = {<p className='text-yellow-color'>{minBuy} BNB</p>}
            />
            <RowBetween 
              childStart = "Maximum Buy"
              childEnd = {<p className='text-yellow-color'>{maxBuy} BNB</p>}
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
                value="Public"
                label="Public"
                onChange={onChangeSaleType}
                checked={saleType == 'Public'}/>
              <CFormCheck 
                inline type="radio"
                name="SaleTypeOptions"
                id="swhitelist" 
                value="Whitelist"
                label={whitelistcap}
                onChange={onChangeSaleType}
                checked={saleType == 'Whitelist'}/>
              <CFormCheck 
                inline type="radio"
                name="SaleTypeOptions"
                id="sPublicAntiBot"
                value="PublicAntiBot"
                label="Public Anti-Bot"
                onChange={onChangeSaleType}
                checked={saleType == 'PublicAntiBot'}
              />
              {
                saleType == 'Whitelist' ?
                (
                    <>
                    <p></p>
                    <div className="d-grid gap-1">
                      <AddUser presaleAddr = {presaleAddress} />
                      <RemoveUser presaleAddr = {presaleAddress} />
                      <CButton color="dark" shape = "rounded-2" style={{backgroundColor: '#000', width: '100%'}} onClick={() => setVisible(!publicvisible)}>Setting time to public</CButton>
                      <DisableWhitelist presaleAddr = {presaleAddress} setPublicRadio = {setSaleType} />
                    </div>
                    </>
                ) : (<></>)
              }
            </div>
            <SettingPublic presaleAddr = {presaleAddress} visible = {publicvisible} onChangeVisible = {setVisible} onChangeSale = {setSaleType}/>

            <p></p>
            <div style ={{width: '100%', height: '2px', backgroundColor: 'black'}}></div>
            <p></p>
            <p>Pool Action</p>
            {/* <CButton color="dark" shape="rounded-2" style={{width : '100%'}}>Dark</CButton> */}
            <div className="d-grid gap-2">
              {
                useVesting ? (
                <CButton color="dark" shape = "rounded-2" style={{backgroundColor: '#000'}}>List of contributors</CButton>
                ): (<></>)
              }
              <CButton color="dark" shape = "rounded-2" style={{backgroundColor: '#000'}} disabled onClick={handleFinalize}>Finalize</CButton>
              {
                isCancel ? (
                  <CButton color="dark" shape = "rounded-2" style={{backgroundColor: '#000'}} onClick={handleWithdraw}>Withdraw canceled tokens</CButton>
                ) : (
                  <CButton color="dark" shape = "rounded-2" style={{backgroundColor: '#000'}} onClick={handleCancel}>Cancel Pool</CButton>
                )
              }
            </div>
            <p className="small-text-sz mt-1 text-blue-color">To Finalize presale, you have to exclude token transfer fee for presale contract.</p>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default TotalView