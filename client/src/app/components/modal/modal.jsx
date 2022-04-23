import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import style from './modal.module.sass'
import cn from 'classnames'
import { ReactComponent as CloseIcon } from '../../assets/CloseIcon.svg'
import setWindowOverflow from 'app/utils/windowOverflow'

const Modal = (props) => {
  const { isShow, header, onShow, children, info, showControl = true, isValid = true, onSave } = props

  const handlerShow = () => {
    onShow(prevState => !prevState)
  }

  useEffect(() => {
    setWindowOverflow(isShow)
  }, [isShow])

  return (
    <div className={cn(style.modal, {
      [style.show]: isShow
    })}>
    <div className={cn(style.modal__wrapper, {
      [style.modal__wrapper_show]: isShow
    })}>
      <div className={style.modal__content}>
        <div className={style.modal__header}>
          {header}
          <CloseIcon onClick={handlerShow} />
        </div>
        <div className={style.modal__body}>
          {children}
          <div className={style.modal__info}>{info}</div>
        </div>

      </div>
        {showControl && <div className={style.modal__control}>
          <button
            onClick={handlerShow}
          >Cancel</button>
          <button
            className={cn(isValid && style.disabled)}
            disabled={isValid}
            onClick={onSave}
          >Save</button>
        </div>}
    </div>
    <div
      className={style.modal__bg}
      onClick={handlerShow}
    />
    </div>
  )
}

Modal.propTypes = {
  isShow: PropTypes.bool,
  isValid: PropTypes.bool,
  showControl: PropTypes.bool,
  onShow: PropTypes.func,
  onSave: PropTypes.func,
  header: PropTypes.string,
  info: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default Modal
