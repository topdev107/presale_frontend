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


const AppHeaderDropdown = (props) => {

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        {
          props.currentAccount === null ? (
            <button className='connect_btn' onClick={props.onConnect}>Connect</button>
          ) : (
            <button className='connected_btn' >{props.currentAccount}</button>
          )
        }
      </CDropdownToggle>
      {
        props.currentAccount === null ? (
          <></>
        ) : (
          <CDropdownMenu className="pt-0" placement="bottom-end">            
            <CDropdownItem href="#" onClick={props.onLogout}>
              <CIcon icon={cilLockLocked} className="me-2" />
              Logout
            </CDropdownItem>
          </CDropdownMenu>
        )
      }
    </CDropdown>
  )
}

export default AppHeaderDropdown
