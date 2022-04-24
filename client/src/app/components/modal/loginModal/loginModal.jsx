import React from 'react'
import PropTypes from 'prop-types'
import InputText from 'app/components/input/input'
import cn from 'classnames'
import { ReactComponent as GoogleIcon } from '../../../assets/googleIcon.svg'
import { ReactComponent as FacebookIcon } from '../../../assets/facebookIcon.svg'

import style from './loginModal.module.sass'
import Checkbox from 'app/components/checkobox/checkobox'
import { useDispatch } from 'react-redux'
import { login } from 'app/store/user'

const Login = ({ description, setIsSignup, isSignup, user, handlerUser, errors, isValid }) => {
  const dispatch = useDispatch()

  const handlerSignUp = () => {
    setIsSignup(prevState => !prevState)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isValid) return
    const userData = {
      ...user[isValid]
    }
    dispatch(login(userData))
  }

  return (
    <>
      <div className={style.login}>
        <InputText
          label='Login Email'
          value={user[isSignup].email}
          id={'email'}
          name={'email'}
          type={'text'}
          onChange={handlerUser}
          error={errors?.email}
        />
        <InputText
          label='Password'
          type='password'
          id={'password'}
          name={'password'}
          value={user[isSignup].password}
          onChange={handlerUser}
          error={errors?.password}
        />
        <Checkbox
          size={'small'}
          id={'logIn'}
          name={'logIn'}
          value={user[isSignup].logIn}
          label={description[isSignup].checkbox}
          onChange={handlerUser}
        />
      </div>
      <button
        className={cn(style.button)}
        onClick={handleSubmit}
      >
        {description[isSignup].button}
      </button>
      <div
        className={style.signup}
        onClick={handlerSignUp}>
          {description[isSignup].switch}
      </div>
      <hr className={style.line}/>
      <div className={style.social}>
        <p>or continue with</p>
        <div className={style.social__control}>
          <button><GoogleIcon /></button>
          <button><FacebookIcon /></button>
        </div>
      </div>
    </>
  )
}

Login.propTypes = {
  setIsSignup: PropTypes.func,
  handlerUser: PropTypes.func,
  user: PropTypes.object,
  isSignup: PropTypes.bool,
  isValid: PropTypes.bool,
  description: PropTypes.object,
  errors: PropTypes.objectOf(PropTypes.string)
}

export default Login
