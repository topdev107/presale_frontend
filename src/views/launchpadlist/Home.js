import {
  CCard,
  CCardBody,
  CCol, CFormCheck, CFormInput, CFormSelect, CRow,
  CAlert,
  CNav, CNavLink, CNavItem, CTabContent, CTabPane,
  CCardImage, CCardTitle, CCardText, CButton, CBadge,
  CProgressBar, CProgress,
} from '@coreui/react'

import React, { useEffect, useState } from 'react'
import { FormControl } from "react-bootstrap"
import { FairCardDetail, NormalCardDetail } from '../components/EachCardDetail'

const LaunchpadList = () => {

  const [activeKey, setActiveKey] = useState(1)

  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardBody>
            <CNav variant="tabs" role="tablist" >
              <CNavItem >
                <CNavLink
                  href="javascript:void(0);"
                  active={activeKey === 1}
                  onClick={() => setActiveKey(1)}
                  className="text-grey-color"
                >
                  All launchpads
                </CNavLink>
              </CNavItem>
              <CNavItem >
                <CNavLink
                  href="javascript:void(0);"
                  active={activeKey === 2}
                  onClick={() => setActiveKey(2)}
                  className="text-grey-color"
                >
                  My Contributions
                </CNavLink>
              </CNavItem>
            </CNav>
            <CTabContent>
              <CTabPane role="tabpanel" visible={activeKey === 1}>
                <br/>
                <CRow >
                  <FairCardDetail
                    img='/assets/avatar.jpg'
                    name='Guess'
                    badgestate='Canceled'
                    softCap='1'
                    progress='50'
                    liquidity = '60'
                    lockup = '5454'
                    state = 'Canceled'
                    goto = '../fairlaunchview'
                  />
                  <FairCardDetail
                    img='/assets/avatar.jpg'
                    name='Guess'
                    badgestate='Upcoming'
                    softCap='1'
                    progress='50'
                    liquidity = '60'
                    lockup = '5454'
                    state = 'Upcoming'
                    goto = '../fairlaunchview'
                  />
                  <NormalCardDetail
                    img='/assets/avatar.jpg'
                    name='WWWWAQ'
                    perrate='560000'
                    badgestate='Sale Live'
                    softCap='40'
                    hardCap='80'
                    progress='20'
                    liquidity='70'
                    lockup='5256000'
                    remain='00:01:02:56'
                    goto='../fairlaunchview'
                  />
                </CRow>
              </CTabPane>
              <CTabPane role="tabpanel" visible={activeKey === 2}>
                Hello Tabpanel                
              </CTabPane>
            </CTabContent>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default LaunchpadList