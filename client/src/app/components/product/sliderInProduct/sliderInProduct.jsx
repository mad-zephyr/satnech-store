import React, { useState } from 'react'
import PropTypes from 'prop-types'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import style from './sliderInProduct.module.sass'

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper'
import imageBlock from '../../../assets/image-block.png'

export default function SliderInProduct({ slides }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  const innerSlides = slides?.map((slide, index) => (
    <SwiperSlide key={slide.id + index}>
      <img src={slide.src || imageBlock} alt={slide.alt}/>
    </SwiperSlide>
  ))
  return (
    <div className={style.slider__wrapper}>
      <Swiper
        style={{
          '--swiper-navigation-color': '#8D8D8D',
          '--swiper-pagination-color': '#8D8D8D'
        }}
        spaceBetween={4}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={style.mainSwiper}
      >
        {innerSlides}
      </Swiper>

      <Swiper
        style={{
          cursor: 'pointer',
          marginTop: '3px'
        }}

        onSwiper={setThumbsSwiper}
        spaceBetween={6}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={style.mySwiper}
      >
        {innerSlides}
      </Swiper>
    </div>
  )
}

SliderInProduct.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.object)
}
