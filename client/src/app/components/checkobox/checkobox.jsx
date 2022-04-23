import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import style from './checkobox.module.sass'

const Checkbox = (props) => {
  const { label, value = false, setChecked, onChange, size = 'big', name, error } = props

  const handleChange = (e) => {
    setChecked
      ? setChecked(value)
      : onChange({ name: e.target.name, value: !value })
  }

  return (
    <label htmlFor={name}
      className={cn(style.checkbox, {
      [style.big]: size === 'big',
      [style.small]: size === 'small'
    })} >
      <input
        type='checkbox'
        id={name}
        name={name}
        checked={ value }
        onChange={handleChange}
      />
      <div className={style.wrapper}>
        <div className={cn(style.checkbox__wrapper, {
          [style.checked]: value
        })}>
          <div className={style.checkbox__inside}/>
        </div>
        {label}
      </div>
      {error && <p className={style.error}>{error}</p>}
    </label>
  )
}

Checkbox.propTypes = {
  value: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.oneOf(['big', 'small']),
  setChecked: PropTypes.func,
  onChange: PropTypes.func
}

export default Checkbox
