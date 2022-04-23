const express = require('express')
const Catalog = require('../models/Catalogs')
const router = express.Router({mergeParams: true})
const authAdmin = require('../middleware/admin.middleware')

router.get('/', async (req, res) => {
	try {
		const catalogs = await Catalog.find()
		res.status(200).json(catalogs)
	} catch (error) {
		res.status(500).json({
			message: 'Error on server, try later...'
		})
	}
})

router.post('/', authAdmin, async(req, res) => {
	try {
		const isExist = await Catalog.findOne({ ru: req.body.ru})

		if (!isExist) {
			const createdBrand = await Catalog.create({...req.body})
			res.send(createdBrand)
		} else {
			res.status(500).json({
				message: 'Catalog already exist'
			})
		}
		
	} catch (error) {
		res.status(500).json({
			message: error._message
		})
	}
})

router.patch('/:catalogID', authAdmin, async(req, res) => {
	try {
		const { catalogID } = req.params

		if (catalogID) {
			const updatedCatalog = await Catalog.findByIdAndUpdate(catalogID, req.body, {new: true})
			res.send(updatedCatalog)
		} 
		
	} catch (error) {
		res.status(500).json({
			message: error._message
		})
	}
})

module.exports = router