import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { setLocation } from 'app/store/location'
import { ReactComponent as ArrowIcon } from 'app/assets/arrow.svg'
import { ReactComponent as LogoutIcon } from 'app/assets/logout.svg'
import cn from 'classnames'
import { Link, useParams } from 'react-router-dom'

import style from './user.module.sass'
import { getCurrentUser, logOut } from 'app/store/user'

const User = ({ children }) => {
  const dispatch = useDispatch()
  const currentUser = useSelector(getCurrentUser())
  const params = useParams()
  const { location } = params

  const handlerSwitch = (location, index) => {
    dispatch(setLocation(location))
  }

  const curentLang = 'ru'
  const contrloConfig = {
    ru: ['order history', 'profile', 'change password']
  }

  const controls = contrloConfig[curentLang].map((btn, index) => {
    const btnName = btn.split(' ').join('-')
    return <Link
        key={btn}
        to={`/user/${btnName}`}
        onClick={() => handlerSwitch(btn, index)}
        className={cn(style.button, {
            [style.button__active]: location === btnName
        })}
      >
        {btn} <ArrowIcon/>
      </Link>
  })

  return (
    <>
      <div className={style.user} >
        <div className={style.user__wrapper} >
          <div className={style.user__container}>
            <div className={style.user__control}>
              {currentUser?.admin && <Link
                to={`/admin`}
                className={cn(style.button)}
              > Admin <ArrowIcon/>
              </Link>}
               {controls}
            <div className={style.logout}>
              <Link to={`/`} className={style.button}
                onClick={() => dispatch(logOut())}
              >
                Logout <LogoutIcon/>
              </Link>
            </div>
            </div>
            <div className={style.user__data}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

User.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default User
