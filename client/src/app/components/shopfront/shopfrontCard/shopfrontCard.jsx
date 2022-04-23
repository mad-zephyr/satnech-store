import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { useDispatch } from 'react-redux'
import { addProductToCart } from '../../../store/products'
import { Link } from 'react-router-dom'

import { ReactComponent as CartIcon } from '../assets/корзина.svg'
import { ReactComponent as HeartIcon } from '../assets/heart.svg'

import style from './shopfrontCard.module.sass'

const ShopfrontCard = (props) => {
  const dispatch = useDispatch()
  const {
    img,
    actualPrice,
    oldPrice,
    brand: brandId,
    articul,
    title,
    sliderOnMobile,
    product,
    allBrands
    // mobile
  } = props

  const { _id } = product
  const currency = 'MDL'

  const addToCart = () => {
    const currentProduct = {
      ...product,
      quantity: 1
    }
    dispatch(addProductToCart(currentProduct))
  }
  const currentProductBrandName = allBrands.find(brand => brand._id === brandId)
  const isDiscount = (Number(oldPrice) > Number(actualPrice))
    ? `${Number(oldPrice)} ${currency}`
    : ''

  return (
    <div
      className={cn(
        sliderOnMobile
          ? style.shopfrontCard
          : style.shopfrontCard__mobile
      )}
    >
      <div className={style.wrapper}>
        <div className={style.wrapper__actual}>{actualPrice} MDL</div>
        <div className={style.wrapper__old}>{ isDiscount } </div>
      </div>
      <Link to={`/product/${_id}`} >
        <img src={img} alt="fdf" />
      </Link>
      <div className={style.wrapper}>
        <div className={style.wrapper__brand}>{currentProductBrandName?.name}</div>
        <div className={style.wrapper__number}>{articul}</div>
      </div>
      <Link to={`/product/${_id}`}>
        <h3 className={style.title}>{title}</h3>
      </Link>
      <div className={style.control}>
        <div className={style.control__buy}
          onClick={addToCart}>
          <CartIcon /> В корзину
        </div>
        <div className={style.control__like}>
          <HeartIcon />
        </div>
      </div>
    </div>
  )
}

ShopfrontCard.propTypes = {
  img: PropTypes.string,
  oldPrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  actualPrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  brand: PropTypes.string,
  allBrands: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))),
  articul: PropTypes.string,
  title: PropTypes.string,
  isMobile: PropTypes.bool,
  sliderOnMobile: PropTypes.bool,
  mobile: PropTypes.bool,
  product: PropTypes.object
}

export default ShopfrontCard
