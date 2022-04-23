/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import useEvent from '../../hooks/useEvent'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards, EffectCoverflow, Navigation, Autoplay } from 'swiper'

import { ReactComponent as LeftArrow } from './assets/leftArrow.svg'
import { ReactComponent as RightArrow } from './assets/rigthArrow.svg'
import { ReactComponent as BtnIcon } from 'app/assets/round_btn.svg'

import 'swiper/css'
import 'swiper/css/effect-cards'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'

import styles from './slider.module.sass'

const Slider = ({ slides }) => {
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    setMobile(window.innerWidth <= 420)
  }, [])

  const checkIfMobile = () => {
    if (window.innerWidth < 420) {
      setMobile(true)
    }
    if (window.innerWidth > 420) {
      setMobile(false)
    }
  }
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

  useEvent('resize', checkIfMobile)

  const slider = slides.map((slide) => {
    const { img, title, subtitle, id } = slide

    return (
      <SwiperSlide key={id}>
        <div
          style={{ background: `url(${img})` }}
          className={styles.slider__background}
        >
          <p className={styles.slider__title}>{title}</p>
          <span>
            <p className={styles.slider__subtitle}>{subtitle}</p>
            <BtnIcon />
          </span>
        </div>
      </SwiperSlide>
    )
  })

  return !mobile
    ? <div className={styles.slider__wrapper}>
      <div
        className={styles.slider__navigation}
        ref={navigationPrevRef}
        style={{ opacity: 0.1 }}
      >
        <LeftArrow />
      </div>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        modules={[EffectCoverflow, Navigation, Autoplay]}
        className={styles.slider}
        onSlideChange={(swiper) => handleChangeArrowOpacity(swiper)}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false
        }}
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
        {slider}
      </Swiper>
      <div className={styles.slider__navigation} ref={navigationNextRef}>
        <RightArrow />
      </div>
    </div>
   : <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className={styles.slider}
      >
        {slider}
      </Swiper>
}

Slider.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string
}

export default Slider
