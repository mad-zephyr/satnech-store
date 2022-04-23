const Products = require('../models/Products')
const productsMock = require('../mock/products.json')

const Catalogs = require('../models/Catalogs')
const catalogMock = require('../mock/catalogMock.json')

const Category = require('../models/Category')
const categoryMock = require('../mock/categoryMock.json')

const Subcategory = require('../models/Subcategory')
const subcategoryMock = require('../mock/subcategoryMock.json')

const User = require('../models/User')
const userMock = require('../mock/userMock.json')

const Brand = require('../models/Brand')
const brandMock = require('../mock/brandMock.json')

module.exports = async () => {
	const products = await Products.find()
	
	const catalog = await Catalogs.find()
	const category = await Category.find()
	const subcategory = await Subcategory.find()
	const user = await User.find()
	const brand = await Brand.find()

	if (catalog.length < catalogMock.length ) {
		await createInitialEntity(Catalogs, catalogMock)
	}
	if (category.length < categoryMock.length ) {
		await createInitialEntity(Category, categoryMock)
	}
	if (subcategory.length < subcategoryMock.length ) {
		await createInitialEntity(Subcategory, subcategoryMock)
	}
	if (products.length < productsMock.length ) {
		await createInitialEntity(Products, productsMock)
	}
	if (brand.length < brandMock.length ) {
		await createInitialEntity(Brand, brandMock)
	}
	if (user.length < userMock.length ) {
		await createInitialEntity(User, userMock)
	}
}

async function createInitialEntity(Model, mockData) {
	await Model.collection.drop()
	return Promise.all(
		mockData.map(async item => {
			try {
				delete item._id
				const newItem = new Model(item)
				await newItem.save()
				return newItem
			} catch (error) {
				return error
			}
		})
	)
}