/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'

import { ReactComponent as CartIcon } from 'app/assets/cart.svg'
import { ReactComponent as HeartIcon } from 'app/assets/heart.svg'
import { ReactComponent as InfoIcon } from 'app/assets/info.svg'

import style from './mobileProduct.module.sass'
import { useDispatch } from 'react-redux'
import { addProductToCart } from 'app/store/products'
import Tabs from 'app/components/tabs/tabs'
import ProductSlider from '../sliderInProduct/sliderInProduct'
import imageBlock from 'app/assets/image-block.png'

const MobileProduct = (props) => {
  const dispatch = useDispatch()
  const { product } = props
  const { images = [{ src: imageBlock }], actualPrice, brand, sku, oldPrice } = product
  const lang = 'ru'
  const currency = 'MDL'

  const handlerAddToCart = () => {
    const currentProduct = {
      ...product,
      quantity: 1
    }
    dispatch(addProductToCart(currentProduct))
  }

  const category = Array(5).fill('').map((row, index) => (
    <div className={style.row} key={index}>
      <span>
        <span> Category: </span> <span> Characteristics </span>
      </span>
    </div>
  ))

  const isDiscount = (Number(oldPrice) > Number(actualPrice))
    ? `${Number(oldPrice)} ${currency}`
    : ''

  return (
    <>
      <div
        className={style.shopfrontCard}
      >
        <div className={style.wrapper}>
          <div className={style.wrapper__actual}>{actualPrice} {currency}</div>
          <div className={style.wrapper__old}>{isDiscount}</div>
        </div>
        <ProductSlider slides={images} />
        <div className={style.wrapper}>
          <div className={style.wrapper__brand}>{brand}</div>
          <div className={style.wrapper__number}>Sku: {sku}</div>
        </div>
        <h3 className={style.title}>{product[lang]?.title || 'title'}</h3>
        <div className={style.control}>
          <div className={style.control__buy}
            onClick={handlerAddToCart}>
            <CartIcon /> Add to cart
          </div>
          <div className={style.control__like}>
            <HeartIcon />
          </div>
        </div>
      </div>
      <div className={style.specs}>
        <div className={style.row}>
          <span> <InfoIcon/> Characteristics </span>
        </div>
        {category}
      </div>
      <Tabs info={product[lang]?.description}/>
    </>
  )
}

MobileProduct.propTypes = {
  product: PropTypes.object,
  images: PropTypes.arrayOf(PropTypes.string),
  price: PropTypes.string,
  brand: PropTypes.string,
  sku: PropTypes.string,
  name: PropTypes.string
}

export default MobileProduct
