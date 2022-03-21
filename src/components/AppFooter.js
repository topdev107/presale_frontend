import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>      
      <div className="ms-auto">
        {/* <a href="#" target="_blank" rel="noopener noreferrer">
          Presale
        </a> */}
        <span className="ms-1">&copy; 2022 TopDev.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
