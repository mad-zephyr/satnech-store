import React from 'react'
import PropTypes from 'prop-types'

import { ReactComponent as DeleteIcon } from 'app/assets/delete.svg'
import style from './tableImageRow.module.sass'

const TableImageRow = (props) => {
  const { image, onRemove } = props
  const dragBtn = <div className={style.btn__drag}>
    {Array(6).fill('').map((elem, index) => <div key={index} />)}
  </div>

  return (
    <>
      <td>{dragBtn} </td>
      <td>
        <div className={style.cell}>
          <img src={image.src} alt={image.alt} />
        </div>
      </td>
      <td>
        <div className={style.link} >
          <div className={style.category}>...{
            image.src.split('')
              .reverse()
              .filter((char, index) => index < 25)
              .reverse()
              .join('')
          }</div>
        </div>
      </td>
      <td>Change</td>
      <td >...</td>
      <td className={style.remove}
        onClick={onRemove}
      >
        <DeleteIcon
          style={{ width: '16px' }}
        />
      </td>
    </>
  )
}
TableImageRow.propTypes = {
  image: PropTypes.objectOf(PropTypes.string),
  onRemove: PropTypes.func
}

export default TableImageRow
