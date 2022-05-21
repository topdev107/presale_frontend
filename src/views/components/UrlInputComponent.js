import {
  CFormInput
} from '@coreui/react';
import React from 'react';
import { faImage, faInfoCircle, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UrlInputComponent = (props) => {
  return (
    <div>
      <p className='font-bold'>{props.title}
        {
          props.required ? (
            <sup className="danger">*</sup>
          ) : (
            <></>
          )
        }
      </p>
      {
        props.errMsg !== '' ? (
          <div>
            <CFormInput type="text" id={props.title} style={{ paddingLeft: '40px' }} className='input-highlighted' placeholder={props.placeholder} value={props.value} onChange={props.onChange} />
            <FontAwesomeIcon icon={props.icon} style={{ position: 'relative', top: '-31px', left: '14px' }} className='text-label-color'></FontAwesomeIcon>
            <div style={{marginTop: '-15px'}}>
              <p className='danger small-text-sz mb-0'>{props.errMsg}</p>
              <p className="small-text-sz mt-1 mb-0 text-blue-color">{props.desc}</p>
              {props.extra}
            </div>
          </div>
        ) : (
          <div>
            <CFormInput type="text" id={props.title} autoFocus style={{ paddingLeft: '40px' }} placeholder={props.placeholder} value={props.value} onChange={props.onChange} />
            <FontAwesomeIcon icon={props.icon} className='text-label-color' style={{ position: 'relative', top: '-31px', left: '14px' }}></FontAwesomeIcon>
            <p className="small-text-sz mt-1 mb-0 text-blue-color">{props.desc}</p>
            {props.extra}
          </div>
        )
      }

    </div>
  )
}

export default UrlInputComponent