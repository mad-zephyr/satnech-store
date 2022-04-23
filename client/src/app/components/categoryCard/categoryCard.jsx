import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { ReactComponent as SaleIcon } from './assets/saleIcon.svg'
import styles from './categoryCard.module.sass'

const CategoryCard = (props) => {
  const { sale, img, title, subtitle, id, index, inSlider } = props

  return (
    <div
      key={id}
      className={cn(styles.category__card, {
        [styles.one]: index % 3 === 1,
        [styles.two]: index % 3 === 2,
        [styles.three]: index % 3 === 0,
        [styles.category__card_inSlider]: inSlider === true
      })}
    >
      {sale
      ? <SaleIcon />
      : <img className={styles.category__image} src={img} alt="" />}
      <div className={styles.category__block}>
        <div className={styles.category__title}>{title}</div>
        <div className={styles.category__subtitle}>
          <a>{subtitle}</a>
        </div>
      </div>
    </div>
  )
}

CategoryCard.propTypes = {
  sale: PropTypes.bool,
  img: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string
  ]),
  index: PropTypes.number,
  inSlider: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

export default CategoryCard
