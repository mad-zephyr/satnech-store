const express = require('express')
const Category = require('../models/Category')
const router = express.Router({mergeParams: true})
const authAdmin = require('../middleware/admin.middleware')

router.get('/', async (req, res) => {
	try {
		const categories = await Category.find()
		res.status(200).json(categories)
	} catch (error) {
		res.status(500).json({
			message: 'Error on server, try later...'
		})
	}
})

router.post('/', authAdmin, async(req, res) => {
	try {
		const isExist = await Category.findOne({ ru: req.body.ru})

		if (!isExist) {
			const createdCategory = await Category.create({...req.body})
			res.send(createdCategory)
		} else {
			res.status(500).json({
				message: 'Category already exist'
			})
		}
		
	} catch (error) {
		res.status(500).json({
			message: error._message
		})
	}
})

router.patch('/:categoryID', authAdmin, async(req, res) => {
	try {
		const { categoryID } = req.params

		if (categoryID) {
			const updatedCategory = await Category.findByIdAndUpdate(categoryID, req.body, {new: true})
			res.send(updatedCategory)
		} 
		
	} catch (error) {
		res.status(500).json({
			message: error._message
		})
	}
})

module.exports = router