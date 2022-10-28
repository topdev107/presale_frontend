
import { CRow, CCol } from '@coreui/react'
import React from 'react'

const RowBetween = (props) => {
  return (
    <CRow className={`${props.noBorder ? '' : 'row-between'} ${props.lanchpadList ? 'mr-0 pr-0 display-block' : 'mr-0 pr-0'}`} >
      {
        !props.lanchpadList && 
          <CCol className={`align-self-center pt-3 pb-2 ${props.createLanchpad && "flex-0"}`}>
            {props.childStart}
          </CCol>
      }
      
      {
        !props.lanchpadList && props.childMiddle && props.isLong ? (
          <CCol className='col-md-8 d-md-flex justify-content-md-center'>
            {props.childMiddle}
          </CCol>
        ) : props.childMiddle && !props.isLong ? (
          <CCol className='d-md-flex justify-content-md-center'>
            {props.childMiddle}
          </CCol>
        ) : (
          <></>
        )
      }
      <CCol className={`align-self-center pt-3 pb-2 ${props.createLanchpad && "flex-0"}`}>
        <div className="d-md-flex justify-content-md-end">
          {props.childEnd}
        </div>
      </CCol>
      {
        props.desc ?
        (
          <div align="end" className="light-blue small"> {props.desc} </div>
        ) : (
          <></>
        )
      }
      {
        props.underline ?
        (
          <div className='underline'>
          </div>
        ) : (
          <></>
        )
      }
    </CRow>
  )
}

export default RowBetween