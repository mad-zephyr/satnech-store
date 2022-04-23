import React from 'react'
import PropTypes from 'prop-types';
import cn from 'classnames'
import styles from './button.module.sass'

import { ReactComponent as SearchIcon } from '../../assets/search.svg'
import { ReactComponent as Heart } from '../../assets/heart.svg'
import { ReactComponent as User } from '../../assets/user.svg'
import { ReactComponent as Menu } from '../../assets/btn-menu.svg';

const Button = (props) => {
  const { icon, color, width, text, radius, margin } = props
  const style = {
    width: `${width}%`,
    borderRadius: radius,
    margin: `${margin}px 0px`
  }
  const btnIcon = () => {
    switch (icon) {
      case 'heart':
        return <Heart />
      case 'user':
        return <User />
      case 'search':
        return <SearchIcon />
      case 'menu':
        return <Menu />
    }
  }
  return (
    <div className={cn(styles.btn, {
      [styles.btn__blue]: color === 'blue'
    })}
    style={style}
    >{btnIcon()}{text}</div>
  )
}

Button.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  margin: PropTypes.number,
  width: PropTypes.number,
  radius: PropTypes.number,
  color: PropTypes.string
}

export default Button
