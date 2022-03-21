
import { CRow, CCol } from '@coreui/react'
import React from 'react'

const RowBetween = (props) => {
  return (
    <CRow className='mr-0 pr-0' >
      <CCol>
        {props.childStart}
      </CCol>
      {
        props.childMiddle && props.isLong ? (
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
      <CCol>
        <div className="d-md-flex justify-content-md-end">
          {props.childEnd}
        </div>
      </CCol>
    </CRow>
  )
}

export default RowBetween