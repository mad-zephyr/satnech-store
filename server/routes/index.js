const express = require('express')
const router = express.Router({mergeParams: true})

router.use('/auth', require('./auth.routes'))
router.use('/subcategory', require('./subcategory.routes'))
router.use('/category', require('./category.routes'))
router.use('/products', require('./products.routes'))
router.use('/catalogs', require('./catalogs.routes'))
router.use('/users', require('./user.routes'))
router.use('/brands', require('./brands.routes'))

module.exports = router