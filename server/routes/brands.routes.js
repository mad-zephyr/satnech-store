const express = require('express')
const Brand = require('../models/Brand')
const router = express.Router({mergeParams: true})
const authAdmin = require('../middleware/admin.middleware')

router.get('/', async (req, res) => {
	try {
		const brands = await Brand.find()
		res.status(200).json(brands)
	} catch (error) {
		res.status(500).json({
			message: 'Error on server, try later...'
		})
	}
})

router.delete('/:brandId', authAdmin, async (req, res) => {
	try {
		const { brandId } = req.params
		const brand = await Brand.findByIdAndDelete(brandId, {new: true})

		if (brand) {
			res.status(200).send({
				message: "BRAND_DELETED"
			})
		} else {
			res.status(204).send({
				message: "BRAND_DOESNT_EXIST"
			})
		}
	} catch (error) {
		res.status(500).json({
			message: 'Error on server, try later...'
		})
	}
})

router.patch('/:brandId', authAdmin, async(req, res) => {
	try {
		const { brandId } = req.params
		if (brandId) {
			const updatedBrand = await Brand.findByIdAndUpdate(brandId, req.body, {new: true})
			res.send(updatedBrand)
		} 
		
	} catch (error) {
		res.status(500).json({
			message: 'Error on server, try later...'
		})
	}
})

router.post('/', authAdmin, async(req, res) => {
	try {
		const isExist = await Brand.findOne({ name: req.body.name})

		if (!isExist) {
			const createdBrand = await Brand.create({...req.body})
			res.send(createdBrand)
		} else {
			res.status(500).json({
				message: 'Brand already exist'
			})
		}
		
	} catch (error) {
		res.status(500).json({
			message: error._message
		})
	}
})

module.exports = router