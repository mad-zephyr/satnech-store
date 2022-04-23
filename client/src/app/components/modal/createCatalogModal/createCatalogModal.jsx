import React, { useState, useEffect } from 'react'
import InputText from 'app/components/input/input'
import PropTypes from 'prop-types'
import Modal from '../modal'
import { useDispatch } from 'react-redux'
import { validator } from 'app/utils/validator'
import { createCatalog } from 'app/store/catalog'
import { nanoid } from '@reduxjs/toolkit'

const CatalogModal = (props) => {
  const dispatch = useDispatch()
  const { isVisible, setVisibility } = props

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

  return (
    <Modal
      isShow={isVisible}
      onShow={setVisibility}
      header={'Create new catalog'}
      isValid={isValid}
      onSave={handleSave}
      info={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ante vitae eros suscipit pulvinar.'}
    >
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

CatalogModal.propTypes = {
  isVisible: PropTypes.bool,
  setVisibility: PropTypes.func
}

export default CatalogModal
