import React from 'react'
import PropTypes from 'prop-types'

import { Reorder, AnimatePresence } from 'framer-motion'

import style from './tableImage.module.sass'

const TableImage = (props) => {
  const { tableImageRow, setTableImageRow } = props

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

  return (
    <div className={style.container}>
      <div className={style.table}>
        <table>
          <thead>
            <tr>
              <th ></th>
              <th >Photo</th>
              <th >Link</th>
              <th >Action</th>
              <th > </th>
              <th >Delete</th>
            </tr>
          </thead>
          <Reorder.Group
            as="tbody"
            axis="y"
            values={tableImageRow}
            onReorder={setTableImageRow}
          >
            <AnimatePresence>
              {tableImageRow?.map(item => (
                <Reorder.Item
                  as='tr'
                  key={item.key}
                  value={item}
                  whileDrag={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
                  {...animationVariation}
                >
                  {item}
                </Reorder.Item>
              ))}
            </AnimatePresence>
          </Reorder.Group>
        </table>
      </div>
    </div>
  )
}

TableImage.propTypes = {
  tableImageRow: PropTypes.array,
  setTableImageRow: PropTypes.func
}

export default TableImage
