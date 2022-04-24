import React from 'react'

import styles from './loader.module.sass'

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.text}>LOADING</div>
      <div className={styles.inner}/>
    </div>
  )
}

export default Loader
