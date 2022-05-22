import {
  CFormInput
} from '@coreui/react';
import React from 'react';

const TextInputComponent = (props) => {
  return (
    <div>
      <div className='font-bold text-yellow-color'>{props.title}
        <sup className="danger">*</sup>
      </div>
      {
        props.errMsg !== '' ? (
          <div>
            <CFormInput type="text" id={props.title} className='input-highlighted' placeholder={props.placeholder} value={props.value} onChange={props.onChange} />
            <div className='danger small-text-sz mb-0'>{props.errMsg}</div>
          </div>
          ) : (
            <CFormInput type="text" id={props.title} autoFocus placeholder={props.placeholder} value={props.value} onChange={props.onChange} />
          )
      }
      <div className="small-text-sz mt-1 text-blue-color">{props.desc}</div>
    </div>
  )
}

export default TextInputComponent