import {
  cilLockLocked
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CDropdown, CDropdownItem,
  CDropdownMenu,
  CDropdownToggle
} from '@coreui/react'
import React from 'react'
import { headerCard } from '../../assets/brand/header-card'
import { headerCardDisabled } from '../../assets/brand/header-card-disabled'

const AppHeaderDropdown = (props) => {

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        {
          localStorage.getItem('isConnect') === 'false' || props.currentAccount === null || props.currentAccount === '' || props.currentAccount === undefined ? (
            <button className='btn btn-outline-primary header-button' onClick={props.onConnect}>
              <CIcon icon={headerCardDisabled} customClassName='d-md-none' width={25}/>
              <span className='d-none d-md-block'>Connect Wallet</span>
            </button>
          ) : (
            <button className='btn btn-primary header-button' >
              <CIcon icon={headerCard} customClassName='d-md-none' width={25}/>
              <span className='d-none d-md-block'>{props.currentAccount.substring(0, 11) + '...'}</span>
            </button>
          )
        }
      </CDropdownToggle>
      {
        // props.currentAccount === null ? (
        localStorage.getItem('isConnect') === 'false'? (
          <></>
        ) : (
          <CDropdownMenu className="pt-0" placement="bottom-end">            
            <CDropdownItem href="#" onClick={props.onLogout}>
              <CIcon icon={cilLockLocked} className="me-2" />
              Logout
            </CDropdownItem>
          </CDropdownMenu>
          // <></>
        )
      }
    </CDropdown>
  )
}

export default AppHeaderDropdown
