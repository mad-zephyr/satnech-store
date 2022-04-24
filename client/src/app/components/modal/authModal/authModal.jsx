import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { validator } from 'app/utils/validator'
import Login from '../loginModal/loginModal'
import Modal from '../modal'
import SignUp from '../signUp/signUp'
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentUser, getIsLoggedIn, loadUserData } from 'app/store/user'

const AuthModal = ({ isOpenLoginModal, setIsOpenLoginModal }) => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(getIsLoggedIn())
  const currentUser = useSelector(getCurrentUser())
  const [isSignup, setIsSignup] = useState(true)
  const [errors, setErrors] = useState({})

  const initialUser = {
    true: {
      email: '',
      password: '',
      logIn: false
    },
    false: {
      email: '',
      password: '',
      rePassword: '',
      agrement: false
    }
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
    password: {
      isRequired: {
          message: 'Пароль обязателен для заполнения'
      },
      isCapitalSymbol: {
        message: 'Пароль должен содержать хотя бы одну заглавную букву'
      },
      isContainDigit: {
        message: 'Пароль должен содержать хотя бы одно число'
      },
      min: {
        message: 'Пароль должен состоять минимум из 8 символов',
        value: 8
      }
    },
    rePassword: {
      isRequired: {
        message: 'Пароль обязателен для заполнения'
      },
      passNotEqual: {
        message: 'Пароли не совпадает'
      }
    },
    agrement: {
      isRequired: {
        message:
          'Вы не можете использовать наш сервис без подтверждения лицензионного соглашения'
      }
    }
  }

  const [user, setUser] = useState(initialUser)

  useEffect(() => {
    validate()
  }, [user, isSignup])

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadUserData())
    }
  }, [isLoggedIn])

  const validate = () => {
    const errors = validator(user[isSignup], validatorConfig)

    setErrors(errors)
    return Object.keys(errors).length > 0
  }

  const isValid = Object.keys(errors).length > 0

  const handlerUserChange = (value) => {
    setUser(prevState => {
      const updated = {
        ...prevState[isSignup],
        [value.name]: value.value
      }

      return {
        ...prevState,
        [isSignup]: {
          ...updated
        }
      }
    })
  }

  const loginAction = {
    true: {
      header: 'Login in account',
      button: 'Sign In',
      switch: 'Create account',
      checkbox: 'Stay logged in',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ante vitae eros suscipit pulvinar.'

    },
    false: {
      header: 'Create account',
      button: 'Register',
      switch: 'Already have account',
      checkbox: 'I agree to the terms of the policy',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ante vitae eros suscipit pulvinar.'
    }
  }

  return (
    <>
      <Modal
        header={!currentUser ? loginAction[isSignup].header : `Welcome ${currentUser.name}`}
        isShow={isOpenLoginModal}
        onShow={setIsOpenLoginModal}
        showControl={false}
        info={!currentUser
          ? loginAction[isSignup].header
          : `You have successfully logged in, if you need to change the data - go to your account`
        }
      >
      {!isLoggedIn && <>
        {isSignup && <Login
          description={loginAction}
          isSignup={isSignup}
          user={user}
          handlerUser={handlerUserChange}
          setIsSignup={setIsSignup}
          errors={errors}
          isValid={!isValid}
        /> }
        {!isSignup && <SignUp
          description={loginAction}
          isSignup={isSignup}
          user={user}
          onShow={setIsOpenLoginModal}
          handlerUser={handlerUserChange}
          setIsSignup={setIsSignup}
          errors={errors}
          isValid={!isValid}
        /> }
        </>}
      </Modal>
    </>
  )
}

AuthModal.propTypes = {
  isOpenLoginModal: PropTypes.bool,
  setIsOpenLoginModal: PropTypes.func
}

export default AuthModal
