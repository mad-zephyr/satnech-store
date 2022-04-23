import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import style from './categorySlider.module.sass'
import useEvent from '../../hooks/useEvent'
import { Swiper, SwiperSlide } from 'swiper/react'

import data from './data.json'
import CategoryCard from '../categoryCard/categoryCard'

const CategorySlider = ({ sliderOnMobile }) => {
  const [mobile, setMobile] = useState(false)

  const checkIfMobile = () => {
    if (window.innerWidth < 420) {
      setMobile(true)
    }
    if (window.innerWidth > 420) {
      setMobile(false)
    }
  }

  useEffect(() => {
    checkIfMobile()
  }, [])

  useEvent('resize', checkIfMobile)

  const cards = data?.map((card, index) => {
    const { sale, img, title, subtitle, id } = card
    return (
      <SwiperSlide key={card.title + index}>
        <CategoryCard
          sale={sale}
          img={img}
          title={title}
          subtitle={subtitle}
          id={id}
          index={index + 1}
          inSlider={true}
        />
      </SwiperSlide>
    )
  })

  return (
    <div className="container">
      <div className={style.category}>
        <Swiper
          style={{ padding: '2px' }}
          spaceBetween={sliderOnMobile && mobile ? 12 : 24}
          slidesPerView={sliderOnMobile && mobile ? 1.2 : mobile ? 2 : 4}
          centeredSlides={true}
          grabCursor={true}
          direction={'horizontal'}
          mousewheel={true}
          loop={true}
          resizeObserver={true}
          // on={() => {
          //   mobile && Swiper.slides.css('width', '')
          // }}
        >
          {cards}
        </Swiper>
      </div>
    </div>
  )
}

CategorySlider.propTypes = {
  sliderOnMobile: PropTypes.bool
}

export default CategorySlider
