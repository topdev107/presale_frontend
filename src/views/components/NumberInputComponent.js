import {
  CFormInput
} from '@coreui/react';
import React from 'react';

const NumberInputComponent = (props) => {
  return (
    <div className='mb-2'>
      <div className='text-title mb-2 medium-text-sz'>{props.title}
        { 
          props.notSup ? (
            <></>
          ) : (
            <sup className="danger">*</sup>
          )
        }
      </div>
      {
        props.errMsg !== '' ? (
          props.needInt ? (
            <div>
              <CFormInput type="number" min='0' className='input-highlighted' placeholder="0" value={props.value} onChange={props.onChange} />
              <div className='danger small-text-sz mt-1'>{props.errMsg}</div>
            </div>
          ) : (
            <div>
              <CFormInput type="number" min='0' step='any' className='input-highlighted' placeholder="0" value={props.value} onChange={props.onChange} />
              <div className='danger small-text-sz mt-1'>{props.errMsg}</div>
            </div>
          )

        ) : (
          props.needInt ? (
            <CFormInput type="number" autoFocus min='0' placeholder="0" value={props.value} onChange={props.onChange} />
          ) : (
            <CFormInput type="number" autoFocus min='0' step='any' placeholder="0" value={props.value} onChange={props.onChange} />
          )
        )
      }
      <div className="small-text-sz">{props.desc}</div>
    </div>
  )
}

export default NumberInputComponent