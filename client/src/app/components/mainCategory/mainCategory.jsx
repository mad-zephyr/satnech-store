import React from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as SaleIcon } from './assets/saleIcon.svg'

import styles from './mainCategory.module.sass'

const MainCategory = (props) => {
  const { category } = props
  const categoryItems = category.map((elem) => {
    const { img, title, subtitle, sale } = elem

    return (
      <div key={elem.id} className={styles.category__card}>
        {sale
? (
          <SaleIcon />
        )
: (
          <img className={styles.category__image} src={img} alt="" />
        )}
        <div className={styles.category__block}>
          <div className={styles.category__title}>{title}</div>
          <div className={styles.category__subtitle}>
            {subtitle.map((elem) => (
              <a key={elem.id}> {elem.title}</a>
            ))}
          </div>
        </div>
      </div>
    )
  })
  return <div className={styles.category}>{categoryItems}</div>
}

MainCategory.propTypes = {
  category: PropTypes.array
}

export default MainCategory
