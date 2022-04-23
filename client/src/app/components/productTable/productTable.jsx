import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Reorder, AnimatePresence, useDragControls } from 'framer-motion'

import style from './productTable.module.sass'
import ListProduct from './listProducts/listProducts'
import { useDispatch } from 'react-redux'
import { deleteProduct, loadProductsList } from 'app/store/products'

const ProductTable = ({ setIsSideOpen, listProduct, setListProduct }) => {
  const dispatch = useDispatch()
  const [products, setProducts] = useState([])
  const dragControls = useDragControls()

  useEffect(() => {
    setProducts(listProduct?.map((product, index) => (
      <ListProduct
        key={product._id}
        index={product._id}
        product={product}
        remove={onRemove}
        dragControls={dragControls}
        setIsSideOpen={setIsSideOpen}
      />
    )))
  }, [listProduct])

  const reOrder = (products) => {
    const updateProducts = products.map(prod => prod.props?.product)
    dispatch(loadProductsList(updateProducts))
  }

  const animationVariation = {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1
    },
    exit: {
      opacity: 0
    }
  }

  function onRemove(id) {
    setListProduct(prevState => {
      return prevState.filter(elem => elem._id !== id)
    })
    dispatch(deleteProduct(id))
  }

  return (
    <div className={style.container}>
      <div className={style.table}>
        <table>
          <thead>
            <tr>
              <th ></th>
              <th > <input type='checkbox'/>  </th>
              <th >Photo</th>
              <th >Product title</th>
              <th >Sku</th>
              <th >Price</th>
              <th >Quantity</th>
              <th >Visibility</th>
              <th >Delete</th>
            </tr>
          </thead>
          { products && <Reorder.Group
              as="tbody"
              axis="y"
              values={products}
              onReorder={reOrder}
            >
              <AnimatePresence>
                {products?.map((item, index) => (
                  <Reorder.Item
                    as='tr'
                    key={item.key}
                    value={item}
                    dragMomentum={false}
                    dragControls={dragControls}
                    // dragListener={false}
                    whileDrag={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
                    {...animationVariation}
                  >
                    {item}
                  </Reorder.Item>
                ))}
              </AnimatePresence>
            </Reorder.Group>
          }
        </table>
      </div>
    </div>
  )
}

ProductTable.propTypes = {
  dataProducts: PropTypes.arrayOf(PropTypes.object),
  listProduct: PropTypes.arrayOf(PropTypes.object),
  setListProduct: PropTypes.func,
  setIsSideOpen: PropTypes.any
}

export default ProductTable
