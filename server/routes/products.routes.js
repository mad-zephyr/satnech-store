const express = require('express')
const Products = require('../models/Products')
const router = express.Router({mergeParams: true})
const authAdmin = require('../middleware/admin.middleware')

router.get('/', async (req, res) => {
	try {
		const products = await Products.find()
		res.status(200).send(products)
	} catch (error) {
		res.status(500).json({
			message: 'Error on server, try later...'
		})
	}
})

router.post('/', authAdmin, async(req, res) => {
	try {
		const createdProduct = await Products.create({...req.body}, {new: true})
		res.send(createdProduct)
		
	} catch (error) {
		res.status(500).json({
			message: error._message
		})
	}
})

router.patch('/:productID', authAdmin, async(req, res) => {
	try {
		const { productID } = req.params

		if (productID) {
			const updatedCatalog = await Products.findByIdAndUpdate(productID, req.body, {new: true})
			res.send(updatedCatalog)
		} 
		
	} catch (error) {
		res.status(500).json({
			message: error._message
		})
	}
})

router.delete('/:productID', authAdmin, async(req, res) => {
	try {
		const { productID } = req.params

		if (productID) {
			await Products.findByIdAndDelete(productID, {new: true})
			res.send(null)
		} 
		
	} catch (error) {
		res.status(500).json({
			message: error._message
		})
	}
})

module.exports = router