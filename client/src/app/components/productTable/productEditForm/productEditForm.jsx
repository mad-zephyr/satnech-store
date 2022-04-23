import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import style from './productEditForm.module.sass'
import InputText from 'app/components/input/input'
import DropDown from 'app/components/dropDown/dropDown'

import { ReactComponent as AddIcon } from '../../../assets/icon_add.svg'
import TableImage from '../tableImage/tableImage'
import InputTextArea from '../../inputTextArea/inputTextArea'
import { useSelector } from 'react-redux'
import { getCategoryList } from 'app/store/category'
import { getSubategoryList } from 'app/store/subcategory'

const ProductEditForm = ({ curentProduct, catalogsList, onUpdate, langBtn, currantLang, handleOpenCloseModal, tableImageRow, setTableImageRow, onChangeSelect }) => {
  const categoryList = useSelector(getCategoryList())
  const subcategoryList = useSelector(getSubategoryList())
  const {
    [currantLang]: { title, description, text } = { title: '', description: '', text: '' },
    actualPrice, oldPrice, quantity, sku, _id, catalog, category, subcategory
  } = curentProduct
  const handlerChange = (target) => {
    onUpdate(target)
  }

  const customStyles = {
    control: () => ({
      // none of react-select's styles are passed to <Control />
      height: 48,
      display: 'flex',
      border: '1px solid #EAEAEA',
      borderRadius: '5px'
    })
  }

  return <>
      <div className={style.form}>
        <div className={style.tabs}>
          {langBtn}
        </div>
        <div className={style.section}>
          <InputText
            type='text'
            onChange={handlerChange}
            value={ title || 'title' }
            name={'title'}
            label='Title'
          />
          <InputTextArea
            type='text'
            onChange={handlerChange}
            value={ description || 'description' }
            name={'description'}
            label='Description'
          />
          <InputTextArea
            type='text'
            onChange={handlerChange}
            value={ text || 'text' }
            name={'text'}
            label='Text'
          />
        </div>
        <div className={style.section}>
          <p className={style.section__title}>Catalog sections</p>
          <div className={style.section__selection}>
             <DropDown
              className={style.dropDown}
              label='Catalog'
              options={catalogsList}
              lang={currantLang}
              name={'catalog'}
              value={catalog}
              onChange={onChangeSelect}
              styles={customStyles}
            />
            <DropDown
              label='Category'
              options={categoryList}
              lang={currantLang}
              name={'category'}
              value={category}
              onChange={onChangeSelect}
              className={style.dropDown}
              styles={customStyles}
            />
            <DropDown
              label='Subategory'
              options={subcategoryList}
              lang={currantLang}
              name={'subcategory'}
              value={subcategory}
              onChange={onChangeSelect}
              className={style.dropDown}
              styles={customStyles}
            />
            <DropDown
              label='Type'
              className={style.dropDown}
              styles={customStyles}
            />
            <DropDown
              label='Brand'
              className={style.dropDown}
              styles={customStyles}
            />
          </div>
        </div>
        <div className={style.section}>
          <p className={style.section__title}>Price & Quantity</p>
          <InputText
            classes='outlined'
            type='number'
            label='Price'
            onChange={handlerChange}
            value={ actualPrice ?? '0' }
            name={'actualPrice'}
          />
          <InputText
            classes='outlined'
            type='number'
            label='Old Price'
            onChange={handlerChange}
            value={ oldPrice ?? '0' }
            name={'oldPrice'}
          />
          <InputText
            classes='outlined'
            type='number'
            label='Quantity'
            onChange={handlerChange}
            value={ quantity ?? '0' }
            name={'quantity'}
          />
          <InputText
            classes='outlined'
            type='text'
            label='Sku'
            onChange={handlerChange}
            value={ sku ?? '0' }
            name={'sku'}
          />
        </div>
        <div className={style.section}>
          <p className={style.section__title}>Images</p>
          <div className={style.addBtn}>
            <button
              className={cn(style.btn__addProduct, style.btn)}
              onClick={handleOpenCloseModal}
            >
              Add Image <AddIcon/>
            </button>
          </div>
          {tableImageRow?.length > 0 && <TableImage
            tableImageRow={tableImageRow}
            setTableImageRow={setTableImageRow}
          />}
        </div>
        <div className={style.section__id}>
          <p>Product ID: {_id || ''}</p>
        </div>
      </div>
    </>
}

ProductEditForm.propTypes = {
  curentProduct: PropTypes.object,
  onUpdate: PropTypes.func,
  setTableImageRow: PropTypes.func,
  onChangeSelect: PropTypes.func,
  currantLang: PropTypes.string,
  catalog: PropTypes.string,
  cetegory: PropTypes.string,
  handleOpenCloseModal: PropTypes.func,
  langBtn: PropTypes.arrayOf(PropTypes.node),
  catalogsList: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    )
  ),
  tableImageRow: PropTypes.oneOfType([PropTypes.node], PropTypes.node)
}

export default ProductEditForm
