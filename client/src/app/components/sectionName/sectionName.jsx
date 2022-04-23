import React from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as Arrow } from './assets/arror.svg'
import { ReactComponent as Star } from './assets/Star.svg'
import styles from './sectionName.module.sass'

const SectionName = (props) => {
  const { title, favorite, btn } = props
  return (
    <div className={styles.category}>
      <span className={styles.category__title}>
        {favorite && <Star />}
        <h2 className={styles.category__name}>{title}</h2>
      </span>
      {btn && <div className={styles.category__btn}>
        Перейти в каталог
        <Arrow />
      </div>}
    </div>
  )
}

SectionName.defaultProps = {
  favorite: false
}

SectionName.propTypes = {
  title: PropTypes.string,
  favorite: PropTypes.bool,
  btn: PropTypes.bool
}
export default SectionName
