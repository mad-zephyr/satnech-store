import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { uploadFiles } from 'app/services/storage.service'

import { ReactComponent as Delete } from 'app/assets/delete.svg'

import cn from 'classnames'
import style from './modalUploadImg.module.sass'

const ModalUploadImg = (props) => {
  const {
    handleOpenCloseModal,
    modalIsOpedend,
    filesToUpload,
    setFilesToUpload,
    onSaveImage
  } = props
  const [drogOver, setDrogOver] = useState(false)

  const handleFiles = (e) => {
    e.preventDefault()
    const { target, dataTransfer } = e
    const regEx = /png|jpeg|jpg|svg/gm

    if (e._reactName === 'onDragEnter') {
      setDrogOver(true)
    }
    if (e._reactName === 'onDragEnd') {
      setDrogOver(false)
    }
    if (e._reactName === 'onDragOver') {
      setDrogOver(true)
    }
    if (e._reactName === 'onDragLeave') {
      setDrogOver(false)
    }
    if (e._reactName === 'onChange' || e._reactName === 'onDrop') {
      setDrogOver(false)
      const fileList = target.files || dataTransfer.files
      const selectedFiles = Object.keys(fileList)
        .map((key) => fileList[key])
        .filter(file => file.type.match(regEx))
      setFilesToUpload(prevState => [...prevState, ...selectedFiles])
    }
  }

  useEffect(() => {
    const isAllUploaded = filesToUpload.length > 0 && filesToUpload.every(file => Boolean(file.url))

    if (isAllUploaded) {
      onSaveImage()
      clearFilesFromUpload()
    }
  }, [filesToUpload])

  const removeFromUpload = (fileName) => {
    setFilesToUpload(prevState => prevState.filter(file => file.name !== fileName))
  }

  const clearFilesFromUpload = () => {
    setFilesToUpload([])
    handleOpenCloseModal()
  }

  const handleUploadFile = () => {
    uploadFiles(filesToUpload, setFilesToUpload)
  }

  return (
    <div className={style.modal} >
      <div className={cn(style.modal__wrapper, {
        [style.modal__wrapper_show]: modalIsOpedend
      })}>
        <div className={style.upload} onDrop={handleFiles}>
          <label className={cn(style.upload__zone, {
            [style.dragOver]: drogOver
          })}
            onDragEnter={handleFiles}
            onDragLeave={handleFiles}
            onDragOver={handleFiles}
          >
            Drag and drop a file to upload, or <span>browse.</span>
            <input
              onChange={handleFiles}
              type="file"
              name=""
              id=""
              accept="image/png, image/jpeg"
              multiple
            />
          </label>
          {filesToUpload.map((file, index) => (
            <div key={file?.name + index} className={style.upload__file}>
              {file?.name}
              <div className={style.upload__wrapper}>
                <div className={style.upload__size}>{(file?.size / 1000).toFixed(2)}Kb</div>
                {!file?.url
                  ? <Delete onClick={() => removeFromUpload(file?.name)}/>
                  : 'Done'
                }
              </div>
              <div className={style.upload__progress}>
                <div
                className={style.upload__progress_bar}
                style={{ width: `${file?.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className={style.control}>
          <button onClick={clearFilesFromUpload}>Cancel</button>
          <button onClick={handleUploadFile}>Save & Close</button>
        </div>
      </div>
      <div
        className={cn(style.modal__bg, {
          [style.modal__bg_show]: modalIsOpedend
        })}
        onClick={handleOpenCloseModal}
      />
    </div>
  )
}

ModalUploadImg.propTypes = {
  handleOpenCloseModal: PropTypes.func,
  filesToUpload: PropTypes.array,
  modalIsOpedend: PropTypes.bool,
  setFilesToUpload: PropTypes.func,
  onSaveImage: PropTypes.func
}

export default ModalUploadImg
