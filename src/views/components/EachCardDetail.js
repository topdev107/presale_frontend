import {
  CRow, CCol,
  CCard, CCardImage, CBadge,
  CCardBody, CCardTitle, CCardText,
  CProgress, CProgressBar,
  CButton,
} from '@coreui/react'

import React, { useEffect, useState } from 'react'
import { HashRouter, Route, Switch, Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import RowBetween from '../components/RowBetween'
import {
  saveCurrentAddr as saveCurrentAddr1
} from '../../state/CreateLaunchPadState'
import {
  saveCurrentAddr as saveCurrentAddr2
} from '../../state/CreateFairLaunchState'

import Web3 from 'web3';
import fairabi from '../../contracts/fairlaunchAbi'
import normalabi from '../../contracts/presaleAbi'

const provider = () => {
  // 1. Try getting newest provider
  const { ethereum } = window
  if (ethereum) return ethereum

  // 2. Try getting legacy provider
  const { web3 } = window
  if (web3 && web3.currentProvider) return web3.currentProvider
}

export const FairCardDetail = (props) => {

  const dispatch = useDispatch()
  const history = useHistory();
  
  const [badgestate, setBadgeState] = useState('')
  const [progress, setProgress] = useState(0)
  const [currentState, setCurrentState] = useState(0)

  async function getPresaleStatus(address) {
    try {
      const web3 = new Web3(provider())

      const presaleContract = new web3.eth.Contract(fairabi, address)
      const txResult = await presaleContract.methods.presaleStatus().call()
      let balance = await web3.eth.getBalance(address)
      console.log('Fairlaunch=======>', props.name, balance)
      const value = +balance / (10 ** 18)
      setCurrentState(value)
      balance = await presaleContract.methods.getProgress().call()
      setProgress(balance)
      return +txResult+1;
      
    } catch (error) {
      console.log('error', error)
    }
  }
  
  const handleClick = () => {
    dispatch(saveCurrentAddr2(props.id))
    history.push(`/launchviewfair?id=${props.id}`);
  }

  useEffect(async () => {
    const presaleState = await getPresaleStatus(props.address)
    console.log('FairLaunch ========>', presaleState)
    if(presaleState == 1) {
      setBadgeState('Upcoming')
    } else if(presaleState == 2) {
      setBadgeState('In progress')
    } else if(presaleState == 3 || presaleState == 6) {
      setBadgeState('Ended')
    } else if(presaleState == 4) {
      setBadgeState('Failed')
    } else if(presaleState == 5) {
      setBadgeState('Canceled')
    }
  }, [])
    
  return (
      <CCol className="col-lg-4" style={{marginBottom: '7px'}}>
        <CCard className='mb-4'>
          <CCardBody>
            <CRow>
              <CCol>
                <div>
                <CCardImage src={props.img} width={50} height={50}/>
                </div>
              </CCol>
              <CCol className="d-md-flex justify-content-md-end text-white-color text-right">
                <div>
                {
                    badgestate && <CBadge>{badgestate}</CBadge>
                }
                </div>
              </CCol>
            </CRow>
            {/* <CCardTitle>{props.tokenName}</CCardTitle> */}
            <CCardText className='medium-text-sz'>
              <CRow className='py-4'>
                <CCol>
                  <h6 className='text-title my-0'>
                    {props.name}
                  </h6>
                  <p className='my-0'>Fair Launch</p>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <p className='text-white-color my-0'>Soft Cap:</p>            
                  <h6 className='danger'>{props.softCap} {props.basicSymbol}</h6>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <p className='text-title'>
                    Progress ({progress}%)
                  </p>
                  <CProgress className="my-2">
                    <CProgressBar color="warning" value={+progress}/>
                  </CProgress>
                  <p className='my-0'>{currentState} {props.basicSymbol} raised</p>
                </CCol>
              </CRow>
              <RowBetween
                childStart={<p className='my-1'>Liquidity %:</p>}
                childEnd={<p className='my-1'>{props.liquidity}%</p>}
              />
              <RowBetween
                childStart={<p>Lockup Time:</p>}
                childEnd={<p>{props.lockup} minutes</p>}
              />
              <hr/>
              {
                props.list == 1 ?
                  <RowBetween
                    lanchpadList
                    childStart={<p></p>}
                    childMiddle={<p></p>}
                    childEnd={<button type="button" className='btn btn-primary' style={{minWidth: 'auto', padding: '6px 16px', borderRadius: '16px'}} onClick={handleClick}>View Pool</button>}
                  /> :
                  <RowBetween
                    childStart={<p></p>}
                    childMiddle={<p></p>}
                    childEnd={<button type="button" className='btn btn-primary' style={{minWidth: 'auto', padding: '6px 16px', borderRadius: '16px'}} onClick={handleClick}>View Pool</button>}
                  />
              }
              
              
            </CCardText>
          </CCardBody>
        </CCard>
      </CCol>
  )
}

export const NormalCardDetail = (props) => {
  const [badgestate, setBadgeState] = useState('')
  const [progress, setProgress] = useState(0)
  const [currentState, setCurrentState] = useState(0)

  const dispatch = useDispatch()
  const history = useHistory();

  async function getPresaleStatus(address) {
    try {
      const web3 = new Web3(provider())

      const presaleContract = new web3.eth.Contract(normalabi, address)
      const txResult = await presaleContract.methods.presaleStatus().call()
      let balance = await web3.eth.getBalance(address)
      console.log('Launchpad=======>', props.name, balance)
      const value = +balance / (10 ** 18)
      setCurrentState(value)
      balance = await presaleContract.methods.getProgress().call()
      setProgress(+balance)
      return +txResult+1;
      
    } catch (error) {
      console.log('error', error)
    }
  }
  
  const handleClick = () => {
    dispatch(saveCurrentAddr1(props.id))
    history.push(`/launchviewnormal?id=${props.id}`);
  }

  useEffect(async () => {
    const presaleState = await getPresaleStatus(props.address)
    console.log('presale=======>', presaleState)
    if(+presaleState == 1) {
      setBadgeState('Upcoming')
    } else if(+presaleState == 2) {
      setBadgeState('In progress')
    } else if(+presaleState == 3 || +presaleState == 6) {
      setBadgeState('Ended')
    } else if(+presaleState == 4) {
      setBadgeState('Failed')
    } else if(+presaleState == 5) {
      setBadgeState('Canceled')
    }
  }, [])

  return (
      <CCol className="col-lg-4" style={{marginBottom: '7px'}}>
        <CCard className='mb-4'>
          <CCardBody>
            <CRow>
              <CCol>
                <div>
                <CCardImage align="start" rounded src={props.img} width={50} height={50} />
                </div>
              </CCol>
              <CCol className="d-md-flex justify-content-md-end text-white-color text-right">
                <div>
                {
                   badgestate && <CBadge>{badgestate}</CBadge>
                }
                </div>
              </CCol>
            </CRow>
            {/* <CCardTitle>TestToken</CCardTitle> */}
            <CCardText className='medium-text-sz'>
              <CRow className='py-4'>
                <CCol>
                  <h6 className='text-title my-0'>
                    {props.name}
                  </h6>
                  <p className='my-0'>1 {props.basicSymbol} = {props.perrate} {props.symbol}</p>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <p className='text-white-color my-0'>Soft/Hard Cap:</p>
                  <h6 className='danger'>{props.softCap} {props.basicSymbol} - {props.hardCap} {props.basicSymbol}</h6>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <p className='text-title'>
                    Progress ({progress}%)
                  </p>
                  <CProgress className="my-2">
                    <CProgressBar color="warning" value={+progress}/>
                  </CProgress>
                  <CRow>
                    <CCol className='xs-2' style={{fontWeight: 300}}>{props.softCap} {props.basicSymbol} </CCol>
                    <CCol className='xs-2 text-right' style={{fontWeight: 300}}>{props.hardCap} {props.basicSymbol} </CCol>
                  </CRow>
                </CCol>
              </CRow>
              <RowBetween
                noBorder={true}
                childStart={<p className='my-1'>Liquidity %:</p>}
                childEnd={<p className='my-1'>{props.liquidity}%</p>}
              />
              <RowBetween
                noBorder={true}
                childStart={<p>Lockup Time:</p>}
                childEnd={<p>{props.lockup} minutes</p>}
              />
              <hr/>
              {
                props.list == 1 ?
                  <RowBetween
                    noBorder={true}
                    lanchpadList
                    childStart={<p>{/*<p>Sales Starts In: {props.remain}</p>*/}</p>}
                    childMiddle={<p></p>}
                    childEnd={<button type='button' className="btn btn-primary" style={{minWidth: 'auto', padding: '6px 16px', borderRadius: '16px'}} onClick={handleClick}>View</button>}
                  /> :
                  <RowBetween
                    noBorder={true}
                    childStart={<p>{/*<p>Sales Starts In: {props.remain}</p>*/}</p>}
                    childMiddle={<p></p>}
                    childEnd={<button type="button" className='btn btn-primary' style={{minWidth: 'auto', padding: '6px 16px', borderRadius: '16px'}} onClick={handleClick}>View</button>}
                  />
              }
            </CCardText>
          </CCardBody>
        </CCard>
      </CCol>
  )
}
