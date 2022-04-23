/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'

import { ReactComponent as DeleteIcon } from 'app/assets/delete.svg'
import { useDispatch, useSelector } from 'react-redux'
import { updateProduct } from 'app/store/products'
import style from './listProducts.module.sass'
import Checkbox from 'app/components/checkobox/checkobox'
import imageBlock from 'app/assets/image-block.png'
import { getCatalogByID } from 'app/store/catalog'
import { getCategoryByID } from 'app/store/category'
import { getSubcategoryByID } from 'app/store/subcategory'
import { Reorder, useDragControls } from 'framer-motion'

const ListProduct = ({ product, remove, setIsSideOpen }) => {
  const {
    actualPrice,
    images = [{ src: imageBlock }],
    quantity,
    sku,
    catalog,
    category,
    subcategory,
    type,
    _id,
    isShow
  } = product

  const dispatch = useDispatch()
  const catalogName = useSelector(getCatalogByID(catalog))
  const categoryName = useSelector(getCategoryByID(category))
  const subcategoryName = useSelector(getSubcategoryByID(subcategory))
  const dragControls = useDragControls()

  const lang = 'ru'
  const dragBtn = (
    <div className={style.btn__drag} >
      {Array(6).fill('').map((elem, index) => <div key={index} />)}
    </div>
  )

  const dataLoaded = catalogName && categoryName && subcategoryName

  const handlerRemove = () => {
    remove(_id)
  }

  const handleShow = () => {
    dispatch(updateProduct({
      ...product,
      isShow: !isShow
    }))
  }
  const animationVariation = {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1
    },
    exit: {
      opacity: 0
    }
  }

  return (
    <>
      <td
        onPointerDown={(e) => dragControls.start(e)}
        >{dragBtn} </td>
      <td>
        <input type='checkbox'/>
      </td>
      <td>
        <div className={style.cell}>
          <img
            src={images[0]?.src || imageBlock}
            alt={images?.alt || ''}
          />
        </div>
      </td>
      <td>
        <div className={style.text} >
          <div
            className={style.title}
            onClick={() => setIsSideOpen(_id)}
          >{product[lang]?.title}</div>
          <div className={style.category}>
           { dataLoaded && `${catalogName[lang]} / ${categoryName[lang]} / ${subcategoryName[lang]} / ${type}`}
          </div>
        </div>
      </td>
      <td>
        <div className={style.sku}>{sku}</div>
      </td>
      <td>
        <div className={style.cell}> {actualPrice} </div>
      </td>
      <td>
        {quantity} items
      </td>
      <td>
        <Checkbox
          setChecked={handleShow}
          value={isShow}
        />
      </td>
      <td className={style.remove}>
        <DeleteIcon
          onClick={handlerRemove}
          style={{ width: '16px' }}
        />
      </td>
    </>
  )
}

export default ListProduct
