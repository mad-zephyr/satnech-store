/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { ReactComponent as DescriptionIcon } from '../../assets/description.svg'

import style from './tabs.module.sass'

const Tabs = (props) => {
  const curentLang = 'ru'
  const { info } = props
  const tabsTitle = ['Decsription', 'Reviews']
  const tabsContents = [info, 'Reviews will be soon']
  const [active, setActive] = useState(0)

  const handlerShow = (index) => {
    setActive(index)
  }

  const tabsBtn = tabsTitle.map((title, index) => (
    <div
      key={index}
      onClick={() => handlerShow(index)}
      className={cn(style.tab__btn, active === index && style.active)}
    > {title}
    </div>
  ))

  const tabContent = tabsContents.map((elem, index) => (
    <div className={cn(style.tab__content, {
        [style.show]: active === index,
        [style.hide]: active !== index
      })} key={index}
    >
      <div className={style.title}>
        <span><DescriptionIcon /> Product description</span>
      </div>
        <p>{elem}</p>
    </div>
  ))

  return (
    <div className={style.tab}>
      <div className={style.tab__wrapper}>
        {tabsBtn}
      </div>
      {tabContent}
    </div>
  )
}

Tabs.propTypes = {
  info: PropTypes.string
}

export default Tabs
