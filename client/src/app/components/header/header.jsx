import React, { useState, useEffect } from 'react'
import styles from './header.module.sass'

import { ReactComponent as BtnMenu } from '../../assets/btn-menu.svg'
import { ReactComponent as Location } from '../../assets/location.svg'
import { ReactComponent as SearchIcon } from '../../assets/search.svg'
import { ReactComponent as HeartIcon } from '../../assets/heart.svg'
import { ReactComponent as UserIcon } from '../../assets/user.svg'
import { ReactComponent as Logo } from '../../assets/logo.svg'

import HeaderCart from '../cart/headerCart'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import useEvent from '../../hooks/useEvent'

import AuthModal from '../modal/authModal/authModal'
import { useSelector } from 'react-redux'
import { getCurrentUser } from 'app/store/user'

const Header = () => {
  const currentUser = useSelector(getCurrentUser())
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false)
  const [isTop, setIsTop] = useState(false)

  useEffect(() => {
    document.querySelector('.container').style.paddingTop = '136px'
  }, [])

  function checkIfTop() {
    const { pageYOffset } = window

    pageYOffset > 80
      ? setIsTop(true)
      : setIsTop(false)
  }

  useEvent('scroll', checkIfTop)

  const handlerShowLogin = () => {
    setIsOpenLoginModal(prevState => !prevState)
  }

  return (
    <>
      <div className="container">
        <AuthModal
          isOpenLoginModal={isOpenLoginModal}
          setIsOpenLoginModal={setIsOpenLoginModal}
        />
        <div className={cn(styles.header, {
          [styles.header__top]: isTop
        })}>
          <div className={styles.header__wrapper}>
            <Link className={styles.logo} to="/">
              <Logo />
            </Link>
            <div className={styles.center}>
              <div className={styles.menu}>
                <button className={styles.btn}>
                  <BtnMenu />
                </button>
                <span className={styles.menu__title}>Catalog</span>
              </div>

              <div className={styles.header__contacts}>
                <Location />
                Chisinau delivery: 373 69 888103, 605 088 80
              </div>

              <div className={styles.search}>
                <label htmlFor="search">
                  <SearchIcon />
                  <input
                    placeholder="Search product"
                    id="search"
                    type="text"
                  />
                </label>
              </div>
            </div>
            <div className={styles.user}>
              <div className={styles.btn}>
                <HeartIcon />
              </div>

              {!currentUser
                ? <div className={styles.btn} onClick={handlerShowLogin}> <UserIcon /> </div>
                : <Link to='/user/profile'> <div className={styles.btn}> <UserIcon /> </div> </Link>
              }
              <HeaderCart />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
