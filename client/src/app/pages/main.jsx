/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'

import Slider from '../components/slider/slider'
import MainCategory from '../components/mainCategory/mainCategory'
import Wrapper from '../hoc/wrapper'

import { techData } from '../api/data'
import SectionName from '../components/sectionName/sectionName'
import ShopFront from '../components/shopfront/shopFront'
import TextBlock from '../components/textBlock/textBlock'
import CategorySlider from '../components/categorySlider/categorySlider'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, loadProductsList } from '../store/products'
import { setLocation } from 'app/store/location'

const MainPage = () => {
  const dispatch = useDispatch()
  const { sliders, category } = techData

  useEffect(() => {
    dispatch(setLocation(''))
  }, [])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, [])

  return (
    <>
      <Wrapper>
        <Slider slides={sliders} />
        <MainCategory category={category} />
        <SectionName title={'Самые популярные'} favorite />
        <ShopFront sliderOnMobile />
      </Wrapper>
      <CategorySlider sliderOnMobile={true} />
      <Wrapper background="white" style={{}}>
        <SectionName btn title="Инсталяции" />
        <ShopFront />
      </Wrapper>
      <Wrapper>
        <SectionName btn title="Для ванной" />
        <ShopFront />
      </Wrapper>
      <TextBlock />
    </>
  )
}

export default MainPage
