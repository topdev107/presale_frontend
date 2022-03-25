import {
  CFormInput
} from '@coreui/react';
import React from 'react';

const NumberInputComponent = (props) => {
  return (
    <div>
      <p className='font-bold'>{props.title}
        <sup className="danger">*</sup>
      </p>
      {
        props.errMsg !== '' ? (
          props.needInt ? (
            <div>
              <CFormInput type="number" min='0' id={props.title} className='input-highlighted' placeholder="0" value={props.value} onChange={props.onChange} />
              <p className='danger small-text-sz mb-0'>{props.errMsg}</p>
            </div>
          ) : (
            <div>
              <CFormInput type="number" min='0' step='any' id={props.title} className='input-highlighted' placeholder="0" value={props.value} onChange={props.onChange} />
              <p className='danger small-text-sz mb-0'>{props.errMsg}</p>
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
      <p className="small-text-sz mt-1 blue-color">{props.desc}</p>
    </div>
  )
}

export default NumberInputComponent