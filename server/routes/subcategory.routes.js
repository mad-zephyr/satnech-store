const express = require('express')
const Subcategory = require('../models/Subcategory')
const router = express.Router({mergeParams: true})
const authAdmin = require('../middleware/admin.middleware')

router.get('/', async (req, res) => {
	try {
		const subcategories = await Subcategory.find()
		res.status(200).json(subcategories)
	} catch (error) {
		res.status(500).json({
			message: 'Error on server, try later...'
		})
	}
})

router.delete('/:subcategoriesId', authAdmin, async (req, res) => {
	try {
		const { subcategoriesId } = req.params
		const subcategory = await Subcategory.findByIdAndDelete(subcategoriesId, {new: true})

		if (subcategory) {
			res.status(200).send({
				message: "SUBCATEGORY_DELETED"
			})
		} else {
			res.status(204).send({
				message: "SUBCATEGORY_DOESNT_EXIST"
			})
		}
	} catch (error) {
		res.status(500).json({
			message: 'Error on server, try later...'
		})
	}
})

router.patch('/:subcategoriesId', authAdmin, async(req, res) => {
	try {
		const { subcategoriesId } = req.params
		// done: subcategoriesId === current subcategoriesId
		if (subcategoriesId) {
			const updatedSubCategory = await Subcategory.findByIdAndUpdate(subcategoriesId, req.body, {new: true})
			res.send(updatedSubCategory)
		} else {
			res.status(401).json({
				message: 'Unauthorized'
			})
		}
		
	} catch (error) {
		res.status(500).json({
			message: 'Error on server, try later...'
		})
	}
})

module.exports = router