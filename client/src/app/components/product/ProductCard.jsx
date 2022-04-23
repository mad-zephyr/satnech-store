import React from 'react'
import PropTypes from 'prop-types'

import { ReactComponent as Cart } from '../../assets/cart.svg'
import { ReactComponent as Heart } from '../../assets/heart.svg'
import { ReactComponent as DiscountIcon } from '../../assets/discount.svg'
import { ReactComponent as InfoIcon } from '../../assets/info.svg'
import imageBlock from 'app/assets/image-block.png'

import SliderInProduct from './sliderInProduct/sliderInProduct'

import style from './product.module.sass'
import Tabs from '../tabs/tabs'
import { useDispatch } from 'react-redux'
import { addProductToCart } from 'app/store/products'

const ProductCard = (props) => {
  const { product } = props
  const { oldPrice, actualPrice, images = [{ src: imageBlock }] } = product

  const dispatch = useDispatch()
  const currency = 'MDL'
  const lang = 'ru'

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
      <div className={style.product__wrapper}>
      <div className={style.product__base}>
        <div className={style.left}>
          <SliderInProduct slides={images} />
        </div>
        <div className={style.right}>
          <div className={style.product__card}>
            <div className={style.inner}>

              <div className={style.price}>
                <div className={style.price__title}>
                  Price:
                </div>
                <div className={style.price__num}>
                  <span>{Number(actualPrice)}</span> <span> {currency} </span>
                </div>
                <div className={style.price__old}> {isDiscount} </div>
              </div>

              <div className={style.inner__info}>
                <DiscountIcon />
                <span> Promotional price valid for delivery before 06/24/2020</span>
              </div>
            </div>
            <div className={style.btn}>
                <button
                  className={style.btn__add}
                  onClick={handlerAddToCart}
                >
                  <Cart />  Add to Cart
                </button>
                <button className={style.btn__favorite}>
                  <Heart />
                </button>
              </div>
          </div>
          <div className={style.product__specs}>
            <div className={style.row}>
              <span> <InfoIcon/> Characteristics </span>
            </div>
            {category}
          </div>
        </div>
        </div>
      </div>
      <Tabs info={product[lang]?.description}/>
    </>
  )
}

ProductCard.propTypes = {
  product: PropTypes.object,
  images: PropTypes.arrayOf(PropTypes.string),
  price: PropTypes.string,
  brand: PropTypes.string,
  sku: PropTypes.string,
  name: PropTypes.string
}

export default ProductCard
