import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import style from './adminSideMenu.module.sass'
import setWindowOverflow from 'app/utils/windowOverflow'
import { Link } from 'react-router-dom'
import { logOut } from '../../../store/user';
import { useDispatch } from 'react-redux'

const AdminSideMenu = (props) => {
  const dispatch = useDispatch()
  const { isVisible, handlerVisible } = props
  setWindowOverflow(isVisible)

  const handlerOpener = () => {
    handlerVisible(prevState => !prevState)
  }

  const handlerLogout = () => {
    dispatch(logOut())
  }

  return (
    <div className={cn(style.sideMenu, isVisible && style.sideMenu__open)}>
      <div className={style.wrapper}>
        <div className={style.content}>
          <Link to='/'>
            Go to main page </Link>
          <Link
            onClick={handlerLogout}
            to='/'> Log out </Link>
        </div>
        <div
          onClick={handlerOpener}
          className={style.btnClose}
        >
          <div/>
          <div/>
        </div>
      </div>
      <div
        onClick={handlerOpener}
        className={style.background}>
      </div>
    </div>
  )
}

AdminSideMenu.propTypes = {
  isVisible: PropTypes.bool,
  handlerVisible: PropTypes.func
}

export default AdminSideMenu
