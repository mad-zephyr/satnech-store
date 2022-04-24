/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './dropDown.module.sass'

import Select from 'react-select'

const DropDown = (props) => {
  const { className, label, value, options, name, lang, onChange, isMulti = false, styles, error } = props

  const optionArr = options?.map((opt, index) => (
    { value: `${opt._id}`, label: `${opt[lang]}` }
  ))

  const handleChange = (target) => {
    onChange({
      name: name,
      target
    })
  }

  return (
    <div className={className}>
      <label htmlFor={name}> {label}
        <Select
          defaultValue={value}
          value={value}
          options={optionArr}
          onChange={handleChange}
          isMulti={isMulti}
          styles={styles}
        />
         {error && <p className={style.error}>{ error }</p>}
      </label>
    </div>
  )
}

DropDown.defaultProps = {
  options: [],
  value: { label: '' }
}

DropDown.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  name: PropTypes.string,
  className: PropTypes.string,
  lang: PropTypes.string,
  onChange: PropTypes.func,
  isMulti: PropTypes.bool,
  styles: PropTypes.object,
  options: PropTypes.array,
  error: PropTypes.string
}

export default DropDown
