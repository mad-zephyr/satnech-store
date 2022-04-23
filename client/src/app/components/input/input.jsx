import React, { useState } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { ReactComponent as AlertIcon } from 'app/assets/alert-icon.svg'
import { ReactComponent as SuccessIcon } from 'app/assets/ok-icon.svg'
import { ReactComponent as SeePassIcon } from 'app/assets/charm_eye.svg'
import { ReactComponent as HidePassIcon } from 'app/assets/charm_eye-slash.svg'

import style from './input.module.sass'

const InputText = (props) => {
  const { label, type, value, classes, name, onChange, placeholder, error } = props
  const [isSeePass, setIsSeePass] = useState('password')
  const [touched, setTouched] = useState(false)

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

  const handleBlur = () => {
    setTouched(true)
  }

  const handleSeePass = () => {
    setIsSeePass(prevState => {
      if (prevState === 'password') {
        return 'text'
      } else {
        return 'password'
      }
    })
  }

  const setPasswordIcon = () => {
    return isSeePass === 'text'
      ? <SeePassIcon style={{ cursor: 'pointer' }} onClick={handleSeePass} className={style.pass} />
      : <HidePassIcon style={{ cursor: 'pointer' }} onClick={handleSeePass} className={style.pass} />
  }

  const icon = error && touched
    ? <AlertIcon className={style.alert} />
    : !error && !touched
    ? <SuccessIcon className={style.success} />
    : <></>

  return (
    <div className={cn(style.input, {
      [style.input__outline]: classes,
      [style.input__error]: error && touched
    })}>
      <label htmlFor={name}> {label}
        <div className={style.input__wrapper}>
          <input
            onChange={handleChange}
            name={name}
            type={type === 'password' ? isSeePass : type }
            value={value}
            placeholder={placeholder}
            onBlur={handleBlur}
          />
          <div className={style.icons}>
            {icon}
            {type === 'password' && setPasswordIcon()}
          </div>
        </div>
        {error && touched && <p className={style.error}>{ error }</p>}
      </label>
    </div>
  )
}

InputText.defaultProps = {
  placeholder: 'PlaceHolder'
}

InputText.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  classes: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func
}

export default InputText
