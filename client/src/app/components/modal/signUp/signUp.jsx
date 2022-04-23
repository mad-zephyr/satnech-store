import React from 'react'
import PropTypes from 'prop-types'
import InputText from 'app/components/input/input'
import Checkbox from 'app/components/checkobox/checkobox'
import { signUp } from 'app/store/user'

import { ReactComponent as GoogleIcon } from '../../../assets/googleIcon.svg'
import { ReactComponent as FacebookIcon } from '../../../assets/facebookIcon.svg'

import style from '../loginModal/loginModal.module.sass'
import cn from 'classnames'
import { useDispatch } from 'react-redux'

const SignUp = ({ description, setIsSignup, isSignup, user, handlerUser, errors, isValid }) => {
  const dispatch = useDispatch()
  const handlerSignUp = () => {
    setIsSignup(prevState => !prevState)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isValid) return
    const newData = {
      ...user[!isValid]
    }
    dispatch(signUp(newData))
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
        <InputText
          label='Password'
          type='password'
          id={'rePassword'}
          name={'rePassword'}
          value={user[isSignup].rePassword}
          onChange={handlerUser}
          error={errors?.rePassword}
        />
        <Checkbox
          size={'small'}
          id={'agrement'}
          name={'agrement'}
          value={user[isSignup].agrement}
          label={description[isSignup].checkbox}
          onChange={handlerUser}
          error={errors?.agrement}
        />
      </div>
      <button
        className={cn(style.button, {
          [style.disabled]: !isValid
        })}
        disabled={!isValid}
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

SignUp.propTypes = {
  setIsSignup: PropTypes.func,
  description: PropTypes.objectOf(PropTypes.any),
  isSignup: PropTypes.bool,
  isValid: PropTypes.bool,
  handlerUser: PropTypes.func,
  user: PropTypes.object,
  errors: PropTypes.objectOf(PropTypes.string)
}

export default SignUp
