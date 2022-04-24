import React from 'react'
import PropTypes from 'prop-types'

import { ReactComponent as BtnMenu } from 'app/assets/btn-menu.svg'
import { ReactComponent as UserIcon } from 'app/assets/user.svg'
import cn from 'classnames'

import style from './headerMenu.module.sass'
import { useSelector } from 'react-redux'
import { getCurrentUser } from 'app/store/user'
import { Link } from 'react-router-dom'
import { getCategoryList } from 'app/store/category'
import { getSubategoryList } from 'app/store/subcategory'

const HeaderMenu = (props) => {
  const currentUser = useSelector(getCurrentUser())
  // eslint-disable-next-line no-unused-vars
  const category = useSelector(getCategoryList())
  // eslint-disable-next-line no-unused-vars
  const subcategory = useSelector(getSubategoryList())
  const { isOpen, onOpen, handlerShowLogin } = props

  const handlerOpen = () => {
    onOpen(prevState => !prevState)
  }

  return (
    <div className={cn(style.menu, isOpen && style.menu__open)}>
      <div className={style.header}>
        <div
          className={cn(style.btn__menu, style.btn, isOpen && style.btn__menu_open)}
          onClick={handlerOpen}
        >
          <BtnMenu className={cn(isOpen && style.blue)} />
        </div>
          {!currentUser
            ? <div className={cn(style.btn__user, style.btn, isOpen && style.btn__user_open)} onClick={handlerShowLogin}> <UserIcon /> </div>
            : <Link to='/user/profile'> <div className={cn(style.btn__user, style.btn, isOpen && style.btn__user_open)}> <UserIcon /> </div> </Link>
          }
      </div>
      <div className={cn(style.wrapper, isOpen && style.visible)}>
        HEADER MENU
      </div>
    </div>
  )
}

HeaderMenu.propTypes = {
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
  handlerShowLogin: PropTypes.func
}

export default HeaderMenu
