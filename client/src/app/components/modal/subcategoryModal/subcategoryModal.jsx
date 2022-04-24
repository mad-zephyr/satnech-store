/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import InputText from 'app/components/input/input'
import PropTypes from 'prop-types'
import Modal from '../modal'
import { useDispatch, useSelector } from 'react-redux'
import { validator } from 'app/utils/validator'
import { nanoid } from '@reduxjs/toolkit'
import DropDown from 'app/components/dropDown/dropDown'
import { getCategoryList } from 'app/store/category'
import { createSubcategory } from 'app/store/subcategory'

const SubcategoryModal = (props) => {
  const { isVisible, setVisibility, header } = props
  const dispatch = useDispatch()
  const categoryList = useSelector(getCategoryList())

  const currantLang = 'ru'

  const initialState = {
    ru: '',
    en: '',
    ro: '',
    parent: { value: null, label: 'Выберите родительскую категорию' }
  }
  const [state, setState] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [touch, setTouch] = useState(false)

  const validatorConfig = {
    parent: {
      isExist: {
        message: 'Поле обязательно для заполнения'
      }
    },
    ru: {
      isRequired: {
        message: 'Поле обязательно для заполнения'
      },
      min: {
        message: 'Название подкатегории должно состоять минимум из 3 символов',
        value: 3
      }
    },
    en: {
      isRequired: {
        message: 'Поле обязательно для заполнения'
      },
      min: {
        message: 'Название подкатегории должно состоять минимум из 3 символов',
        value: 3
      }
    },
    ro: {
      isRequired: {
        message: 'Поле обязательно для заполнения'
      },
      min: {
        message: 'Название подкатегории должно состоять минимум из 3 символов',
        value: 3
      }
    }
  }

  useEffect(() => {
    validate()
  }, [state])

  const validate = () => {
    const errors = validator(state, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length > 0
  }

  const isValid = Object.keys(errors).length > 0

  const hadleChange = (value) => {
    setState(prevState => ({
      ...prevState,
      [value.name]: value.value
    }))
  }

  const handleSave = () => {
    setTouch(true)
    if (!isValid) {
      const newCategory = {
        ...state,
        parent: state.parent.value
      }
      dispatch(createSubcategory(newCategory))
      setVisibility(false)
      setState(initialState)
    }
  }

  const handlerChangeSelect = (target) => {
    setState((prevState) => ({
      ...prevState,
      [target.name]: { ...target.target }
    }))
  }

  const customStyles = {
    control: () => ({
      // none of react-select's styles are passed to <Control />
      height: 48,
      display: 'flex',
      border: '1px solid #EAEAEA',
      borderRadius: '5px',
      marginTop: '8px'
    })
  }

  return (
    <Modal
      isShow={isVisible}
      onShow={setVisibility}
      header={header}
      isValid={isValid}
      onSave={handleSave}
      info={'Create a new product subcategory by first selecting the parent category. All fields are required '}
    >
      <DropDown
        label='Choose parent category'
        options={categoryList}
        lang={currantLang}
        onChange={handlerChangeSelect}
        name={'parent'}
        value={state.parent}
        styles={customStyles}
        error={errors.parent}
      />
      <InputText
        label='Subcategory Russian'
        value={state.ru}
        onChange={hadleChange}
        touchInput={touch}
        name={'ru'}
        type={'text'}
        error={errors.ru}
      />
      <InputText
        label='Subcategory English'
        value={state.en}
        onChange={hadleChange}
        touchInput={touch}
        name={'en'}
        type={'text'}
        error={errors.en}
      />
      <InputText
        label='Subcategory Romanian'
        value={state.ro}
        touchInput={touch}
        name={'ro'}
        type={'text'}
        onChange={hadleChange}
        error={errors.ro}
      />
    </Modal>
  )
}

SubcategoryModal.propTypes = {
  isVisible: PropTypes.bool,
  header: PropTypes.string,
  setVisibility: PropTypes.func
}

export default SubcategoryModal
