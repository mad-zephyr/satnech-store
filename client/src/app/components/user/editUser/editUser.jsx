/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import style from './editUser.module.sass'
import InputText from 'app/components/input/input'
import { useParams } from 'react-router-dom'
import { validator } from 'app/utils/validator'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser, loadUserData, updateUserData } from 'app/store/user'
import cn from 'classnames'

const UserEdit = () => {
  const dispatch = useDispatch()
  const initialUser = {
    email: '',
    name: '',
    phone: '',
    adress: ''
  }
  const [user, setUser] = useState(initialUser)
  const curentUser = useSelector(getCurrentUser())
  const params = useParams()
  const { location } = params
  const [errors, setErrors] = useState({})

  const isShow = location === 'profile'
  const isValid = Object.keys(errors).length > 0

  useEffect(() => {
    validate()
  }, [user])

  useEffect(() => {
    dispatch(loadUserData())
  }, [])

  useEffect(() => {
    setUser(prevState => ({
      ...prevState,
      ...curentUser
    }))
  }, [curentUser])

  const handlerUserChange = (value) => {
    setUser(prevState => {
      return {
        ...prevState,
        [value.name]: value.value
      }
    })
  }

  const validate = () => {
    const errors = validator(user, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length > 0
  }

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Электронная почта обязательна для заполнения'
      },
      isEmail: {
        message: 'Email введен некорректно'
      }
    },
    name: {
      isRequired: {
        message: 'Имя обязательно для заполнения'
      },
      min: {
        message: 'Имя должно состоять минимум из 3 символов',
        value: 3
      }
    },
    phone: {
      isRequired: {
        message: 'Внесите номер телефона'
      },
      min: {
        message: 'Мобильный номер состоит минимум из 8',
        value: 9
      }
    }
  }

  const onSubmit = () => {
    dispatch(updateUserData(user))
  }

  return (
    isShow && <>
      <h1 className={style.title}>UserEdit</h1>
      <div className={style.form}>
        <InputText
          label='Name Surname'
          value={user?.name}
          name={'name'}
          type={'text'}
          onChange={handlerUserChange}
          error={errors?.name}
        />
        <InputText
          label='Mobile number'
          value={user?.phone}
          name={'phone'}
          placeholder={'+373 060 000 000'}
          type={'number'}
          onChange={handlerUserChange}
          error={errors?.phone}
        />
        <InputText
          label='Email'
          value={user?.email}
          name={'email'}
          type={'email'}
          onChange={handlerUserChange}
          error={errors?.email}
        />
        <InputText
          label='Delivery adress'
          value={user?.adress}
          name={'adress'}
          type={'text'}
          onChange={handlerUserChange}
          error={errors?.adress}
        />
      </div>
      <div className={style.control}>
        <button onClick={() => setUser({ ...initialUser, ...curentUser }) }>Cancel </button>
        <button className={style.disabled}
          disabled={isValid}
          onClick={onSubmit}
        >Submit </button>
      </div>
    </>
  )
}

export default UserEdit
