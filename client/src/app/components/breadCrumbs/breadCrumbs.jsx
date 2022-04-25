import React, { useEffect } from 'react'
import { getCartProductsID } from 'app/store/products'
import { useSelector } from 'react-redux'
import { Link, useParams, useHistory } from 'react-router-dom'
import style from './breadCrumbs.module.sass'

const BreadCrumbs = () => {
  const { location: { pathname } } = useHistory()
  const params = useParams()
  const { id } = params

  const currentLang = 'ru'

  useEffect(() => {

  }, [])

  const breadCrumbs = Object.values(params)
  const currentProduct = useSelector(getCartProductsID(id))

  const cartReg = /\/cart/gm
  const cart = pathname.match(cartReg)
  console.log(cart)

  return (
    <div className={style.breadCrumbs}>
      <span> <Link to='/'>Главная</Link> </span>
      { breadCrumbs.map((elem, index) => {
        return id
          ? <span key={index}>{currentProduct[currentLang]?.title}</span>
          : <span> Корзина </span>
      })}
    </div>
  )
}

export default BreadCrumbs
