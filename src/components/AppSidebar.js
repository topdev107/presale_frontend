import { CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
// sidebar nav config
import navigation from '../_nav'
import { AppSidebarNav } from './AppSidebarNav'
import { set } from '../state/SideBarState'
import ThemeSwitcher from './ThemeSwitcher'


const AppSidebar = () => {
    const dispatch = useDispatch()
    // const unfoldable = useSelector((state) => state.sidebarUnfoldable)
    const sidebarShow = useSelector((state) => state.sideBarState.isSidebarShow)    
    const currentTheme = useSelector((state) => state.themeState.mode);

    return (
        <CSidebar
            className="my_csidebar"
            position="fixed"
            // unfoldable={unfoldable}
            unfoldable={false}
            visible={sidebarShow}
            onVisibleChange={(visible) => {
                dispatch({ type: 'set', sidebarShow: visible })
                dispatch(set(visible))
            }}
        >
            <CSidebarBrand className="my_sidebar_brand my_logo d-none d-md-flex" to="/">
                {/* <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
                <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}
                <img src={`/assets/logo-${currentTheme}.png`} alt="logo" className='logo' />
            </CSidebarBrand>
            <CSidebarNav className="my_csidebarnav">
                <SimpleBar>
                    <AppSidebarNav items={navigation} />
                </SimpleBar>
            </CSidebarNav>
            <ThemeSwitcher />
        </CSidebar>
    )
}

export default React.memo(AppSidebar)
