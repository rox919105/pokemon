import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './Header.module.css'

const Header = () => {
    return (
        <div className={s.mainWrapper}>
            <div className={s.link}>
                <NavLink to='/' exact >
                    <span className={s.headerTittle}>Pokemon</span>
                </NavLink>
            </div>
        </div>
    )
}

export default Header