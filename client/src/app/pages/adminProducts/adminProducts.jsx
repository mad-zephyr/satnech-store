import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLocation } from 'app/store/location'
import AdminHeader from 'app/components/adminHeader/adminHeader'
import ProductTable from 'app/components/productTable/productTable'
import ProductSideMenu from 'app/components/productTable/sideMenu/sideMenu'
import { getProducts } from 'app/store/products'
import { getCatalogsList } from 'app/store/catalog'

const AdminProducts = () => {
  const dispatch = useDispatch()
  const initialFilter = {
    catalog: [],
    sortBy: ''
  }
  const dataProducts = useSelector(getProducts())
  const catalogsList = useSelector(getCatalogsList())
  const [listProduct, setListProduct] = useState([])
  const [isSideOpen, setIsSideOpen] = useState(false)
  const [filter, setFilter] = useState(initialFilter)

  useEffect(() => {
    dispatch(setLocation('admin'))
  }, [])

  useEffect(() => {
    setListProduct(prevState => dataProducts)
  }, [dataProducts])

  useEffect(() => {
    const catalogsId = filter.catalog.map(catalog => catalog.value)
    if (catalogsId.length > 0) {
      setListProduct(prevState => dataProducts.filter(product => catalogsId.includes(product?.catalog)))
    } else {
      setListProduct(dataProducts)
    }
  }, [filter.catalog])

  const handlerChangeFilter = (target) => {
    setFilter((prevState) => ({
      ...prevState,
      [target.name]: [...target.target]
    }))
  }

  return (
    <>
      <AdminHeader
        setIsSideOpen={setIsSideOpen}
        filter={filter}
        handlerSetFilter={handlerChangeFilter}
        catalogsList={catalogsList}
      />
      { isSideOpen && <ProductSideMenu
        isOpen={isSideOpen}
        setIsSideOpen={setIsSideOpen}
      /> }
      <ProductTable
        setIsSideOpen={setIsSideOpen}
        listProduct={listProduct}
        setListProduct={setListProduct}
      />
    </>
  )
}

export default AdminProducts
