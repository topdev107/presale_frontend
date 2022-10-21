import React from 'react'
import { AppContent, AppHeader, AppSidebar } from '../components/index'

const DefaultLayout = () => {
  return (
    <div className='dark-theme'>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        {/* <AppFooter /> */}
      </div>
    </div>
  )

  // return (
  //   <div>
  //     <AppHeader />
  //     <div className="wrapper d-flex flex-column min-vh-100">
  //       <AppSidebar />
  //       <div className="body flex-grow-1 px-3">
  //         <AppContent />
  //       </div>
  //       {/* <AppFooter /> */}
  //     </div>
  //   </div>
  // )
}

export default DefaultLayout
