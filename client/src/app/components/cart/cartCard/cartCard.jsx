import React from 'react'
import style from './cartCard.module.sass'

import { ReactComponent as Heart } from 'app/assets/heart.svg'
import { ReactComponent as Delete } from 'app/assets/delete.svg'
import { ReactComponent as Minus } from 'app/assets/minus.svg'
import { ReactComponent as Plus } from 'app/assets/plus.svg'

import { useDispatch, useSelector } from 'react-redux'
import { increaseProductInCart, dicreaseProductInCart, deleteProductFromCart } from 'app/store/products'
import { getBrandByID } from 'app/store/brands'
import imageBlock from 'app/assets/image-block.png'

const CartCard = (product) => {
  const dispatch = useDispatch()
  const { actualPrice, quantity, sku, brand: brandId, images = [{ src: imageBlock }], _id } = product
  const { name } = useSelector(getBrandByID(brandId))

  const currency = 'MDL'
  const lang = 'ru'

  const handlerIncrease = () => {
    dispatch(increaseProductInCart(_id))
  }
  const handlerDicrease = () => {
    dispatch(dicreaseProductInCart(_id))
  }

  const handlerDelete = () => {
    dispatch(deleteProductFromCart(_id))
  }

  return (
    <div className={style.product}>
      <div className={style.left}>
        <div className={style.btn__favorite}><Heart/></div>
        <img
          src={images[0]?.src || imageBlock}
          alt={images.alt}
        />
      </div>
      <div className={style.center}>
        <div className={style.title}>{product[lang]?.title || 'Product without title'}</div>
        <div className={style.info}>
          <div className={style.brand}>{name}</div>
          <div className={style.sku}>SKU: {sku}</div>
        </div>
        <div className={style.price}>{actualPrice} {currency} per unit</div>
        <div className={style.control}>
          <div className={style.control__wrapper}>
            <div
              className={style.control__dicrease}
              onClick={handlerDicrease}><Minus/> </div>
            <div className={style.control__input}>{quantity} </div>
            <div
              className={style.control__increase}
              onClick={handlerIncrease}> <Plus/>
            </div>
          </div>
        </div>
      </div>
      <div className={style.right}>
        <div
          className={style.btn__delete}
          onClick={handlerDelete} > <Delete/>
        </div>
        <div className={style.addComment}>Добавить комментарий к заказу</div>
        <div
          className={style.right__total}>{actualPrice * quantity}
          <span>{currency}</span>
        </div>
      </div>
    </div>
  )
}

export default CartCard
