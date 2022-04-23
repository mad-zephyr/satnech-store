import React from 'react'

import cn from 'classnames'
import styles from './cart.module.sass'

import { useSelector } from 'react-redux'
import { getCartProducts } from '../../store/products'
import { Link } from 'react-router-dom'

import { ReactComponent as CartIcon } from '../../assets/cart.svg'

const HeaderCart = () => {
  const cartProducts = useSelector(getCartProducts())
  let quantity = 0

  if (cartProducts) {
    for (const product of cartProducts) {
      quantity += product.quantity
    }
  }

  return (
    <Link to='/cart' className={cn(styles.btn, styles.blue)}>
      <CartIcon />
      {Boolean(quantity) && (
        <div
          className={styles.tooltip__quantity}>
            {quantity}
        </div>
      )}
    </Link>
  )
}

export default HeaderCart
