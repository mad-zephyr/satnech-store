import React, { useState } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { ReactComponent as AlertIcon } from 'app/assets/alert-icon.svg'
import { ReactComponent as SuccessIcon } from 'app/assets/ok-icon.svg'
import { ReactComponent as DragIcon } from 'app/assets/drag.svg'

import style from './inputTextArea.module.sass'

const InputTextArea = (props) => {
  const { label, type, value, classes, name, onChange, placeholder, error, rows = 3 } = props

  const [touched, setTouched] = useState(false)

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

  const handleBlur = () => {
    setTouched(true)
  }

  const icon = error && touched
    ? <AlertIcon className={style.alert} />
    : !error && touched
    ? <SuccessIcon className={style.success} />
    : <></>

  return (
    <div className={cn(style.input, {
      [style.input__outline]: classes,
      [style.input__error]: error && touched
    })}>
      <label htmlFor={name}> {label}
        <div className={style.input__wrapper}>
          <textarea
            onChange={handleChange}
            name={name}
            type={type}
            value={value}
            placeholder={placeholder}
            rows={rows}
            onBlur={handleBlur}
          />
          <div className={style.icons}>
            {icon}
          </div>
          <div className={style.icons__drag}>
            <DragIcon/>
          </div>
        </div>
        {error && touched && <p className={style.error}>{ error }</p>}
      </label>
    </div>
  )
}

InputTextArea.defaultProps = {
  placeholder: 'PlaceHolder'
}

InputTextArea.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  classes: PropTypes.string,
  rows: PropTypes.number,
  error: PropTypes.string,
  onChange: PropTypes.func
}

export default InputTextArea
