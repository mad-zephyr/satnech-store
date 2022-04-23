import React, { useState, useEffect } from 'react'
import BreadCrumbs from 'app/components/breadCrumbs/breadCrumbs'
import ProductCard from 'app/components/product/ProductCard'
import SectionName from 'app/components/sectionName/sectionName'
import ShopFront from 'app/components/shopfront/shopFront'
import TextBlock from 'app/components/textBlock/textBlock'
import Wrapper from 'app/hoc/wrapper'

import style from './productPage.module.sass'
import MobileProduct from 'app/components/product/mobileProduct/mobileProduct'
import { getProducts } from 'app/store/products'
import { useSelector } from 'react-redux'
import useEvent from 'app/hooks/useEvent'
import { useParams } from 'react-router-dom'

const ProductPage = () => {
  const products = useSelector(getProducts())
  const params = useParams()
  const [mobile, setMobile] = useState(false)
  const lang = 'ru'

  const { id } = params

  const currentProduct = products.find(prod => prod._id === id)

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0
      // behavior: 'smooth'
    })
  }, [id])

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
    setMobile(window.innerWidth <= 420)
  }, [])

  return (
    <>
      <div className="container" style={{ padding: '0 24px' }}>
        <BreadCrumbs />
        {!mobile && <h1 className={style.h1}>{currentProduct[lang]?.title || '' }</h1>}
        {
          mobile
            ? <MobileProduct product={currentProduct} />
            : <ProductCard product={currentProduct}/>
        }
      </div>
      <Wrapper>
        <SectionName title="Похожие товары" />
        <ShopFront />
      </Wrapper>
      <TextBlock/>
    </>
  )
}

export default ProductPage
