import CIcon from '@coreui/icons-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { themeLightIcon } from '../assets/brand/theme-light'
import { themeDarkIcon } from '../assets/brand/theme-dark'
import { setMode } from 'src/state/ThemeState'

const ThemeSwitcher = () => {
    const dispatch = useDispatch()
    const activeTheme = useSelector((state) => state.themeState.mode);
    const changeTheme = (theme) => {
        dispatch(setMode(theme))
        document.body.classList.remove('light-theme')
        document.body.classList.remove('dark-theme')
        document.body.classList.add(theme + '-theme')
    }
    return (
        <div className='theme-switcher'>
            <div className={`light ${activeTheme == 'light' ? 'active' : ''}`} onClick={()=>changeTheme('light')}>
                <CIcon icon={themeLightIcon} width={25} height={25} customClassName="nav-icon" />
            </div>
            <div className={`dark ${activeTheme == 'dark' ? 'active' : ''}`} onClick={()=>changeTheme('dark')}>
                <CIcon icon={themeDarkIcon} width={18} height={18} customClassName="nav-icon" />
            </div>
        </div>
    )
}

export default ThemeSwitcher
