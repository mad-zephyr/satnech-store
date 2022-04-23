import React, { useEffect } from 'react'
import style from './cartPage.module.sass'
import { useSelector } from 'react-redux'
import { getCartProducts } from 'app/store/products'
import BreadCrumbs from 'app/components/breadCrumbs/breadCrumbs'
import CartCard from 'app/components/cart/cartCard/cartCard'
import Bill from 'app/components/cart/bill/bill'
import { ReactComponent as Cart } from 'app/assets/cart.svg'

const CartPage = () => {
  const products = useSelector(getCartProducts())

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, [])

  return (
    <>
      <div className="container" style={{ padding: '0 24px' }}>
        <BreadCrumbs />
        <div className={style.title}>
          <Cart className={style.icon__cart} /> Корзина
        </div>
        <div className={style.wrapper}>
          <div className={style.products}>
            {products?.map((elem, index) => <CartCard key={index} {...elem}/>)}
          </div>
          <div className={style.side}>
            <Bill />
          </div>
        </div>
      </div>
    </>
  )
}

export default CartPage
