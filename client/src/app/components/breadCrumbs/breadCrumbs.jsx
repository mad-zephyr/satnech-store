import { getCartProductsID } from 'app/store/products'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import style from './breadCrumbs.module.sass'

const BreadCrumbs = () => {
  const params = useParams()
  const { id } = params
  const breadCrumbs = Object.values(params)
  const currentProduct = useSelector(getCartProductsID(id))
  const lang = 'ru'

  return (
    <div className={style.breadCrumbs}> <span><Link to='/'>Главная</Link></span>
      {
        breadCrumbs.map((elem, index) => <span key={index}>{currentProduct[lang]?.title}</span>)
      }
    </div>
  )
}

export default BreadCrumbs
