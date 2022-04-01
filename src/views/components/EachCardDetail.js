import {
  CRow, CCol,
  CCard, CCardImage, CBadge,
  CCardBody, CCardTitle, CCardText,
  CProgress, CProgressBar,
  CButton,
} from '@coreui/react'

import React, { useEffect, useState } from 'react'
import { HashRouter, Route, Switch, Link, useHistory } from 'react-router-dom'
import RowBetween from '../components/RowBetween'

export const FairCardDetail = (props) => {
    
  return (
      <CCol className="col-lg-4">
        <CCard 
          color='#242525'
          textColor='white'
          className='border-dark'
        >
          <CCardBody>
            <CRow>
              <CCol>
                <CCardImage orientation="top" src={props.img} />
              </CCol>
              <CCol className="d-md-flex justify-content-md-end text-white-color">
                {
                  props.badgestate === 'Canceled' || props.badgestate === 'Sale Ended' ?
                    <CBadge color='danger'>{props.badgestate}</CBadge>
                    : props.badgestate === 'Upcoming' ?
                    <CBadge color='warning' style={{textColor: 'white'}}>Upcoming</CBadge>
                    : props.badgestate === 'Sale Live' ?
                    <CBadge color='success'>Sale Live</CBadge>
                    : <CBadge color='light'>Canceled</CBadge>
                }
              </CCol>
            </CRow>
            <CCardTitle>TestToken</CCardTitle>
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
                    <p>{props.softCap} BNB</p>
                  </p>            
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <div className='font-bold text-white-color'>
                    Progress ({props.progress}%)
                    <CProgress className="mb-3">
                      <CProgressBar color="warning" value={+props.progress}/>
                    </CProgress>
                    <p>{+props.softCap * +props.progress / 100} BNB raised</p>
                  </div>
                </CCol>
              </CRow>
              <RowBetween
                childStart={<p>Liquidity %:</p>}
                childEnd={<p className='text-yellow-color'>{props.liquidity}</p>}
              />
              <RowBetween
                childStart={<p>Lockup Time:</p>}
                childEnd={<p className='text-yellow-color'>{props.lockup} minutes</p>}
              />
              <RowBetween
                childStart={<p>Presale: {props.state}</p>}
                childMiddle={<p></p>}
                childEnd={<Link to={props.goto} className="btn btn-accent">View Pool</Link>}
              />
              
            </CCardText>
          </CCardBody>
        </CCard>
      </CCol>
  )
}

export const NormalCardDetail = (props) => {

  return (
      <CCol className="col-lg-4">
        <CCard
          color='#242525'
          textColor='white'
          className='border-dark'
        >
          <CCardBody>
            <CRow>
              <CCol>
                <CCardImage orientation="top" src={props.img} />
              </CCol>
              <CCol className="d-md-flex justify-content-md-end text-white-color">
                {
                  props.badgestate === 'Canceled' || props.badgestate === 'Sale Ended' ?
                    <CBadge color='danger'>{props.badgestate}</CBadge>
                    : props.badgestate === 'Upcoming' ?
                    <CBadge color='warning' style={{textColor: 'white'}}>Upcoming</CBadge>
                    : props.badgestate === 'Sale Live' ?
                    <CBadge color='success'>Sale Live</CBadge>
                    : <CBadge color='light'>Canceled</CBadge>
                }
              </CCol>
            </CRow>
            <CCardTitle>TestToken</CCardTitle>
            <CCardText>
              <CRow>
                <CCol>
                  <p className='font-bold text-white-color'>
                    {props.name}
                    <p>1 BNB = {props.perrate} {props.name}</p>
                  </p>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <p className='font-bold text-white-color'>
                    Soft/Hard Cap:
                    <p className='font-bold text-accent-color'>{props.softCap} BNB - {props.hardCap} BNB</p>
                  </p>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <div className='font-bold text-white-color'>
                    Progress ({props.progress}%)
                    <CProgress className="mb-3">
                      <CProgressBar color="warning" value={+props.progress}/>
                    </CProgress>
                    <CRow>
                    <CCol className='xs-2 text_align_left'>{props.softCap} BNB </CCol>
                    <CCol className='xs-2 text_align_right'>{props.hardCap} BNB </CCol>
                    </CRow>
                  </div>
                </CCol>
              </CRow>
              <RowBetween
                childStart={<p>Liquidity %:</p>}
                childEnd={<p className='text-yellow-color'>{props.liquidity}</p>}
              />
              <RowBetween
                childStart={<p>Lockup Time:</p>}
                childEnd={<p className='text-yellow-color'>{props.lockup} minutes</p>}
              />
              <RowBetween
                childStart={<p><p>Sales Starts In: {props.remain}</p></p>}
                childEnd={<Link to={props.goto} className="btn btn-accent">View Pool</Link>}
              />
            </CCardText>
          </CCardBody>
        </CCard>
      </CCol>
  )
}
