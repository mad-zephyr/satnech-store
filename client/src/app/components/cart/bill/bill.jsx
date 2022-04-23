import React from 'react'
import styles from './bill.module.sass'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAllFromCart, getCartProducts } from '../../../store/products'
import { ReactComponent as Delete } from '../../../assets/delete.svg'

const Bill = () => {
  const dispatch = useDispatch()
  const cartProduct = useSelector(getCartProducts())

  const handlerDelete = () => {
    dispatch(deleteAllFromCart())
  }

  const allProduct = cartProduct?.length > 0
    ? cartProduct?.map(product => product.quantity * product.actualPrice).reduce((a, b) => a + b)
    : 0

  return (
    <div className={styles.bill}>
      <div className={styles.row}>
        <div className={styles.title}>Your order:</div>
          {
            allProduct > 0 && <span
              style={{ cursor: 'pointer' }}
              onClick={handlerDelete}>
                <Delete style={{ width: '12px', height: '12px' }} />
                Удалить все товары
            </span>
          }
      </div>

      <div className={styles.info}>
        <div className={styles.info__row}>
          <span >Order amount
            <span style={{ whiteSpace: 'pre' }}> (without discount):</span>
          </span>
          <span>{allProduct || 0} MDL</span>
        </div>
        <div className={styles.info__row}>
          <span>Weight supplement:</span>
          <span>600 MDL</span>
        </div>
        <div className={styles.info__row}>
          <span>Delivery:</span>
          <span>Not calculated yet</span>
        </div>
      </div>
      <div className={styles.total}>
        <div className={styles.title}>Total:</div>
        <span> {allProduct || 0} MDL</span>
      </div>

      <button className={styles.btn}> Checkout </button>
    </div>
  )
}

export default Bill
