import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import useEvent from '../../hooks/useEvent'
import ShopfrontCard from './shopfrontCard/shopfrontCard'

import { ReactComponent as LeftArrow } from './assets/leftArrow.svg'
import { ReactComponent as RightArrow } from './assets/Vector 2.svg'
import imageBlock from '../../assets/image-block.png'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import cn from 'classnames'
import { getProducts } from 'app/store/products'
import { useSelector } from 'react-redux'

import style from './shopFront.module.sass'

import 'swiper/css'
import 'swiper/css/navigation'
import { getBrands } from 'app/store/brands'

const ShopFront = ({ children, sliderOnMobile }) => {
  const products = useSelector(getProducts())
  const allBrands = useSelector(getBrands())
  const currentLang = 'ru'
  const [mobile, setMobile] = useState(false)

  const handleChangeArrowOpacity = (swiper) => {
    if (swiper.progress === 0) {
      navigationPrevRef.current.style.opacity = 0.1
    }
    if (swiper.progress > 0 && swiper.progress !== 1) {
      navigationPrevRef.current.style.opacity = 1
    }
    if (swiper.progress > 0 && swiper.progress < 1) {
      navigationPrevRef.current.style.opacity = 1
      navigationNextRef.current.style.opacity = 1
    }
    if (swiper.progress === 1) {
      navigationNextRef.current.style.opacity = 0.1
    }
  }
  const navigationPrevRef = React.useRef(null)
  const navigationNextRef = React.useRef(null)

  const checkIfMobile = () => {
    if (window.innerWidth < 420) {
      setMobile(true)
    }
    if (window.innerWidth > 420) {
      setMobile(false)
    }
  }
  useEvent('resize', checkIfMobile)

  useEffect(() => {
    checkIfMobile()
  }, [])

  const slidersArr = products
    ?.filter(product => product.isShow)
    ?.map((product, index) => {
      const { images = [{ src: imageBlock }], actualPrice, oldPrice, brand, sku } = product
      const { title } = product[currentLang]
      return <SwiperSlide
          key={index}
          className={cn(mobile && style.shopFront__cards_slide)}
          style={{ height: 'auto' }}
        >
          <ShopfrontCard
            img={images[0]?.src || imageBlock}
            actualPrice={actualPrice}
            oldPrice={oldPrice}
            brand={brand}
            allBrands={allBrands}
            articul={`Art: ${sku}`}
            title={title}
            sliderOnMobile={sliderOnMobile}
            mobile={mobile}
            product={product}
          />
        </SwiperSlide>
    })

  return (
    <div className={style.shopFront}>
      <div
        className={cn(style.shopFront__navigation)}
        ref={navigationPrevRef}
        style={{ opacity: 0.1 }}
      >
        <LeftArrow />
      </div>
      <div className={style.shopFront__slider}>
        {!mobile
          ? <Swiper
            style={{ padding: '2px' }}
            spaceBetween={24}
            modules={[Navigation]}
            slidesPerView={4}
            grabCursor={true}
            resizeObserver={true}
            onSlideChange={(swiper) => handleChangeArrowOpacity(swiper)}
            onSwiper={(swiper) => {
              setTimeout(() => {
                try {
                  // Override prevEl & nextEl now that refs are defined
                  swiper.params.navigation.prevEl = navigationPrevRef.current
                  swiper.params.navigation.nextEl = navigationNextRef.current

                  // Re-init navigation
                  swiper.navigation.destroy()
                  swiper.navigation.init()
                  swiper.navigation.update()
                } catch (error) {}
              })
            }}
            >
              {slidersArr}
            </Swiper>
          : sliderOnMobile
          ? <Swiper
              style={{ padding: '2px', overflow: 'visible' }}
              spaceBetween={12}
              slidesPerView={1.1}
              grabCursor={true}
              // on={() => mobile && Swiper.slides.css('width', '')}
            >
              {slidersArr}
            </Swiper>
          : <div className={style.shopFront__cards}>{slidersArr}</div>
        }
      </div>
      <div className={style.shopFront__navigation} ref={navigationNextRef}>
        <RightArrow />
      </div>
    </div>
  )
}

ShopFront.propTypes = {
  sliderOnMobile: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default ShopFront
