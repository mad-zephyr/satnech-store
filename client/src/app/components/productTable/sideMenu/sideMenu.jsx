import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { updateProduct, getCartProductsID, createProduct, getIsProductExist } from 'app/store/products'

import cn from 'classnames'
import ProductEditForm from '../productEditForm/productEditForm'

import { ReactComponent as CloseIcon } from 'app/assets/close.svg'
import style from './sideMenu.module.sass'
import ModalUploadImg from '../modalUploadImg/modalUploadImg'
import setWindowOverflow from 'app/utils/windowOverflow'
import TableImageRow from '../tableImage/tableImageRow/tableImageRow'
import { getCatalogByID, getCatalogsList } from 'app/store/catalog'
import { getCategoryByID } from 'app/store/category'
import { getSubcategoryByID } from 'app/store/subcategory'

const ProductSideMenu = ({ isOpen, setIsSideOpen }) => {
  const dispatch = useDispatch()
  const curentProduct = useSelector(getCartProductsID(isOpen))
  const catalogsList = useSelector(getCatalogsList())
  const isProductAlreadyExist = useSelector(getIsProductExist(isOpen))
  const curentCatalogName = useSelector(getCatalogByID(curentProduct?.catalog))
  const curentCategoryName = useSelector(getCategoryByID(curentProduct?.category))
  const curentSubcategoryName = useSelector(getSubcategoryByID(curentProduct?.subcategory))
  const [productToEdit, setCurentProductToEdit] = useState(curentProduct)
  const [langBtnActive, setLangBtnActive] = useState(0)
  const [filesToUpload, setFilesToUpload] = useState([])
  const [isModalOpened, setModalIsOpedend] = useState(false)
  const [tableImageRow, setTableImageRow] = useState([])

  setWindowOverflow(isOpen)
  useEffect(() => {
    setCurentProductToEdit({
      ...curentProduct,
      catalog: {
        label: curentCatalogName?.ru,
        value: curentCatalogName?._id
      },
      category: {
        label: curentCategoryName?.ru,
        value: curentCategoryName?._id
      },
      subcategory: {
        label: curentSubcategoryName?.ru,
        value: curentSubcategoryName?._id
      }
    })
  }, [curentCatalogName])

  const handleRemove = (removeIndex) => {
    setCurentProductToEdit(prevState => {
      const updImages = prevState.images.filter((image, index) => index !== removeIndex)
      return {
        ...prevState,
        images: updImages
      }
    })
  }

  useEffect(() => {
    setTableImageRow(productToEdit?.images?.map((image, index) => (
      <TableImageRow
        key={image.id + index}
        image={image}
        onRemove={() => handleRemove(index)}
      />
    )))
  }, [productToEdit])

  const handleSave = (closeSideMenu = false) => {
    const updatedImages = tableImageRow?.map(image => image.props.image)
    const updatedProduct = {
      ...productToEdit,
      images: updatedImages,
      catalog: productToEdit?.catalog?.value,
      category: productToEdit?.category?.value,
      subcategory: productToEdit?.subcategory?.value
    }

    isProductAlreadyExist
      ? dispatch(updateProduct(updatedProduct))
      : dispatch(createProduct(updatedProduct))

    setCurentProductToEdit(curentProduct)
    if (closeSideMenu) {
      closeMenu()
    }
  }

  const closeMenu = () => {
    setWindowOverflow(false)
    setIsSideOpen(false)
  }

  const handleSaveAndClose = () => handleSave(true)

  const openModal = () => setModalIsOpedend(prevState => !prevState)

  const handleSaveImages = () => {
    const newImages = filesToUpload.map(image => ({
      id: image.name,
      src: image.url || '',
      alt: ''
    }))

    const img = productToEdit?.images?.length
      ? productToEdit.images
      : []

    const updatedCurentProduct = {
      ...productToEdit,
      images: [...img, ...newImages]
    }

    setCurentProductToEdit(updatedCurentProduct)
  }

  const lang = {
    ru: 'Russian',
    en: 'English',
    ro: 'Romanian'
  }

  const langBtn = Object.keys(lang).map((key, index) => (
    <div
      key={index}
      onClick={() => setLangBtnActive(index)}
      className={cn(style.cell,
        { [style.cell__active]: langBtnActive === index }
      )}
    >{lang[key]}</div>
  ))
  const currantLang = Object.keys(lang)[langBtnActive]

  const handlerChangeSelect = (target) => {
    setCurentProductToEdit((prevState) => ({
      ...prevState,
      [target.name]: {
        ...target.target
      }
    }))
  }

  const handlerChange = (target) => {
    const description = ['title', 'description', 'text']
    const editDescr = description.includes(target.name)

    if (editDescr) {
      setCurentProductToEdit((prevState) => ({
        ...prevState,
        [currantLang]: {
          ...prevState[currantLang],
          [target.name]: target.value
        }
      }))
      return
    }
    setCurentProductToEdit((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  return (
    <div className={style.sideMenu}>
      <div className={cn(style.sideMenu__wrapper, {
        [style.sideMenu__wrapper_show]: isOpen
        })}
      >
        <div
          className={style.btn__close}
          onClick={closeMenu}>
          <CloseIcon />
        </div>
        <div className={style.sideMenu__menu}>
          <div className={style.control}>
            <div
              className={cn(style.btn__save, style.btn__black)}
              onClick={() => handleSave()}
            >Save</div>
            <div
              className={cn(style.btn__save, style.btn__blue)}
              onClick={() => handleSaveAndClose()}
            >Save & close</div>
          </div>
          {productToEdit && <ProductEditForm
            curentProduct = {productToEdit}
            currantLang = {currantLang}
            langBtn = {langBtn}
            catalogsList = {catalogsList}
            onUpdate = {handlerChange}
            onChangeSelect = {handlerChangeSelect}
            handleOpenCloseModal = {openModal}
            setFilesToUpload = {setFilesToUpload}
            tableImageRow = {tableImageRow}
            setTableImageRow = {setTableImageRow}
          />}
          {isModalOpened && <ModalUploadImg
            filesToUpload = {filesToUpload}
            setFilesToUpload = {setFilesToUpload}
            modalIsOpedend = {isModalOpened}
            onSaveImage = {handleSaveImages}
            handleOpenCloseModal={openModal}
          />}
        </div>
      </div>
      <div className={cn(style.sideMenu__bg,
        { [style.sideMenu__bg_show]: isOpen })}
        onClick={closeMenu}
      > </div>
    </div>
  )
}

ProductSideMenu.propTypes = {
  isOpen: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  setIsSideOpen: PropTypes.func
}

export default ProductSideMenu
