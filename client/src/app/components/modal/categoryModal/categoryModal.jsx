import React, { useState, useEffect } from 'react'
import InputText from 'app/components/input/input'
import PropTypes from 'prop-types'
import Modal from '../modal'
import { useDispatch } from 'react-redux'
import { validator } from 'app/utils/validator'
import { createCatalog } from 'app/store/catalog'
import { nanoid } from '@reduxjs/toolkit'
import DropDown from 'app/components/dropDown/dropDown'

const CategoryModal = (props) => {
  const dispatch = useDispatch()
  const { isVisible, setVisibility, header } = props

  const initialState = {
    ru: '',
    en: '',
    ro: '',
    id: nanoid()
  }
  const [state, setState] = useState(initialState)
  const [errors, setErrors] = useState({})

  const validatorConfig = {
    ru: {
      isRequired: {
        message: 'Поле обязательно для заполнения'
      },
      min: {
        message: 'Название категории должно состоять минимум из 3 символов',
        value: 3
      }
    },
    en: {
      isRequired: {
        message: 'Поле обязательно для заполнения'
      },
      min: {
        message: 'Название категории должно состоять минимум из 3 символов',
        value: 3
      }
    },
    ro: {
      isRequired: {
        message: 'Поле обязательно для заполнения'
      },
      min: {
        message: 'Название категории должно состоять минимум из 3 символов',
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
    dispatch(createCatalog(state))
    setVisibility(false)
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
      info={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ante vitae eros suscipit pulvinar.'}
    >
      <DropDown
        label='Choose parent catalog'
        // options={catalogsList}
        // lang={currantLang}
        name={'catalog'}
        // value={catalog}
        // onChange={onChangeSelect}
        styles={customStyles}
      />
      <InputText
        label='Catalog Russian'
        value={state.ru}
        name={'ru'}
        type={'text'}
        onChange={hadleChange}
        error={errors?.ru}
      />
      <InputText
        label='Catalog English'
        value={state.en}
        name={'en'}
        type={'text'}
        onChange={hadleChange}
        error={errors?.en}
      />
      <InputText
        label='Catalog Romanian'
        value={state.ro}
        name={'ro'}
        type={'text'}
        onChange={hadleChange}
        error={errors?.ro}
      />
    </Modal>
  )
}

CategoryModal.propTypes = {
  isVisible: PropTypes.bool,
  header: PropTypes.string,
  setVisibility: PropTypes.func
}

export default CategoryModal
