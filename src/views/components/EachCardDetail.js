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
        <CCard 
          color='#242525'
          textColor='white'
          className='border-dark'
        >
          <CCardBody>
            <CRow>
              <CCol>
                <div>
                <CCardImage orientation="top" src={props.img} width={50} height={50}/>
                </div>
              </CCol>
              <CCol className="d-md-flex justify-content-md-end text-white-color text-right">
                <div>
                {
                  badgestate === 'Ended' ?
                    <CBadge color='danger'>{badgestate}</CBadge>
                    : badgestate === 'Upcoming' ?
                    <CBadge color='warning' style={{textColor: 'white'}}>Upcoming</CBadge>
                    : badgestate === 'In progress' ?
                    <CBadge color='success'>Sale Live</CBadge>
                    : badgestate === 'Canceled' ?
                      <CBadge color='light'>Canceled</CBadge>
                    : <></>
                }
                </div>
              </CCol>
            </CRow>
            {/* <CCardTitle>{props.tokenName}</CCardTitle> */}
            <CCardText>
              <CRow>
                <CCol>
                  <p className='font-bold text-white-color'>
                    {props.name}
                    <p className='font-bold text-grey-color'>Fair Launch</p>
                  </p>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <p className='font-bold text-white-color'>
                    Soft Cap:
                    <p>{props.softCap} {props.basicSymbol}</p>
                  </p>            
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <div className='font-bold text-white-color'>
                    Progress ({progress}%)
                    <CProgress className="mb-3">
                      <CProgressBar color="warning" value={+progress}/>
                    </CProgress>
                    <p>{currentState} {props.basicSymbol} raised</p>
                  </div>
                </CCol>
              </CRow>
              <RowBetween
                childStart={<p>Liquidity %:</p>}
                childEnd={<p className='text-yellow-color'>{props.liquidity}%</p>}
              />
              <RowBetween
                childStart={<p>Lockup Time:</p>}
                childEnd={<p className='text-yellow-color'>{props.lockup} minutes</p>}
              />
              {
                props.list == 1 ?
                  <RowBetween
                    lanchpadList
                    childStart={<p></p>}
                    childMiddle={<p></p>}
                    childEnd={<CButton color='dark' shape="rounded-2" onClick={handleClick}>View Pool</CButton>}
                  /> :
                  <RowBetween
                    childStart={<p></p>}
                    childMiddle={<p></p>}
                    childEnd={<CButton color='dark' shape="rounded-2" onClick={handleClick}>View Pool</CButton>}
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
        <CCard
          color='#242525'
          textColor='white'
          className='border-dark'
        >
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
                  badgestate === 'Ended' ?
                    <CBadge color='danger'>{badgestate}</CBadge>
                    : badgestate === 'Upcoming' ?
                    <CBadge color='warning' style={{textColor: 'white'}}>Upcoming</CBadge>
                    : badgestate === 'In progress' ?
                    <CBadge color='success'>Sale Live</CBadge>
                    : badgestate === 'Canceled' ? 
                      <CBadge color='light'>Canceled</CBadge>
                    : <></>
                }
                </div>
              </CCol>
            </CRow>
            {/* <CCardTitle>TestToken</CCardTitle> */}
            <CCardText>
              <CRow>
                <CCol>
                  <p className='font-bold text-white-color'>
                    {props.name}
                    <p>1 {props.basicSymbol} = {props.perrate} {props.symbol}</p>
                  </p>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <p className='font-bold text-white-color'>
                    Soft/Hard Cap:
                    <p className='font-bold text-accent-color'>{props.softCap} {props.basicSymbol} - {props.hardCap} {props.basicSymbol}</p>
                  </p>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <p className='font-bold text-white-color'>
                    Progress ({progress}%)
                    <CProgress className="mb-3">
                      <CProgressBar color="warning" value={+progress}/>
                    </CProgress>
                    <CRow>
                    <CCol className='xs-2 text_align_left'>{props.softCap} {props.basicSymbol} </CCol>
                    <CCol className='xs-2 text_align_right'>{props.hardCap} {props.basicSymbol} </CCol>
                    </CRow>
                  </p>
                </CCol>
              </CRow>
              <RowBetween
                childStart={<p>Liquidity %:</p>}
                childEnd={<p className='text-yellow-color'>{props.liquidity}%</p>}
              />
              <RowBetween
                childStart={<p>Lockup Time:</p>}
                childEnd={<p className='text-yellow-color'>{props.lockup} minutes</p>}
              />
              {
                props.list == 1 ?
                  <RowBetween
                    lanchpadList
                    childStart={<p>{/*<p>Sales Starts In: {props.remain}</p>*/}</p>}
                    childMiddle={<p></p>}
                    childEnd={<CButton className="width-100" color='dark' shape="rounded-2" onClick={handleClick}>View Pool</CButton>}
                  /> :
                  <RowBetween
                    childStart={<p>{/*<p>Sales Starts In: {props.remain}</p>*/}</p>}
                    childMiddle={<p></p>}
                    childEnd={<CButton color='dark' shape="rounded-2" onClick={handleClick}>View Pool</CButton>}
                  />
              }
            </CCardText>
          </CCardBody>
        </CCard>
      </CCol>
  )
}
