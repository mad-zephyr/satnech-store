import React, { useState } from 'react'
import PropTypes from 'prop-types'
import style from './adminHeader.module.sass'

import cn from 'classnames'
import { nanoid } from '@reduxjs/toolkit'

import { ReactComponent as AddIcon } from 'app/assets/icon_add.svg'
import CatalogModal from '../modal/createCatalogModal/createCatalogModal'
import DropDown from '../dropDown/dropDown'
import CategoryModal from '../modal/categoryModal/categoryModal'
import AdminSideMenu from './adminSideMenu/adminSideMenu'

const AdminHeader = ({ setIsSideOpen, filter, handlerSetFilter, catalogsList }) => {
  const [isOpen, setOpen] = useState(false)
  const [modalCatalog, setModalCatalog] = useState(false)
  const [modalCategory, setModalCategory] = useState(false)

  const currantLang = 'ru'

  const handlerBurger = () => {
    setOpen(prevState => !prevState)
  }

  const handlerCatalogModal = () => {
    setModalCatalog(prevState => !prevState)
  }
  const handlerCategoryModal = () => {
    setModalCategory(prevState => !prevState)
  }

  const startCreateNewProduct = () => {
    setIsSideOpen(nanoid())
  }

  return (
    <div className={style.container}>
      <AdminSideMenu
        isVisible={isOpen}
        handlerVisible={setOpen}
      />
      <CatalogModal
        isVisible = {modalCatalog}
        setVisibility = {setModalCatalog}
      />
      <CategoryModal
        header={'Create new category'}
        isVisible = {modalCategory}
        setVisibility = {setModalCategory}
      />
      <div className={style.header}>
        <div className={style.header__wrapper}>
          <div
            className={cn(style.burger_menu, isOpen && style.burger_menu__active)}
            onClick={handlerBurger}
          >
          <div className={style.burger_menu__line}/>
          <div className={style.burger_menu__line}/>
          <div className={style.burger_menu__line}/>
        </div>
          <div className={style.header__inner}>
            <div className={style.navigation}>
              <div
                className={style.navigation__tab}
                onClick={handlerCatalogModal}
              >Разделы каталога</div>
              <div
                className={style.navigation__tab}
                onClick={handlerCategoryModal}
              >Категории товаров</div>
              <div
                className={style.navigation__tab}
              >Подкатегории товаров</div>
            </div>
            <button
              className={cn(style.btn__addProduct, style.btn)}
              onClick={startCreateNewProduct}
            >
              Add Product <AddIcon/>
            </button>
          </div>
        </div>
      </div>
      <div className={style.subHeader}>
        <div className={style.subHeader__wrapper}>
          <div className={style.dropDown}>
            <DropDown
              label='Choose catalog'
              options={catalogsList}
              lang={currantLang}
              name={'catalog'}
              value={filter.catalog}
              isMulti={true}
              onChange={handlerSetFilter}
            />
          </div>

        <div className={style.right}>
          <div className={style.dropDown}>
            <DropDown
              label='Search:'
            />
          </div>
          <div className={style.dropDown}>
            <DropDown
              label='Sort products by:'
            />
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

AdminHeader.propTypes = {
  setIsSideOpen: PropTypes.func,
  filter: PropTypes.object,
  handlerSetFilter: PropTypes.func,
  catalogsList: PropTypes.arrayOf(PropTypes.object)
}

export default AdminHeader
