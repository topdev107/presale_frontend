import {
  CFormInput
} from '@coreui/react';
import React from 'react';

const NumberInputComponent = (props) => {
  return (
    <div>
      <div className='font-bold text-yellow-color'>{props.title}
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
              <CFormInput type="number" min='0' id={props.title} className='input-highlighted' placeholder="0" value={props.value} onChange={props.onChange} />
              <div className='danger small-text-sz mb-0'>{props.errMsg}</div>
            </div>
          ) : (
            <div>
              <CFormInput type="number" min='0' step='any' id={props.title} className='input-highlighted' placeholder="0" value={props.value} onChange={props.onChange} />
              <div className='danger small-text-sz mb-0'>{props.errMsg}</div>
            </div>
          )

        ) : (
          props.needInt ? (
            <CFormInput type="number" min='0' id={props.title} placeholder="0" value={props.value} onChange={props.onChange} />
          ) : (
            <CFormInput type="number" min='0' step='any' id={props.title} placeholder="0" value={props.value} onChange={props.onChange} />
          )
        )
      }
      <div className="small-text-sz mt-1 text-blue-color">{props.desc}</div>
    </div>
  )
}

export default NumberInputComponent