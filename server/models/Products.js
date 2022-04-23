const {Schema, model} = require('mongoose')

const schema = new Schema({
	actualPrice: { type: String },
	brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
	catalog: { type: Schema.Types.ObjectId, ref: 'Catalogs' },
	category: { type: Schema.Types.ObjectId, ref: 'Category' },
	images: [{ alt: String, id: String, src: String }],
	isShow: { type: Boolean },
	oldPrice: { type: String },
	oldPrice: { type: String },
	quantity: { type: String },
	ru: {
		type: Object,
		alt: String,
		id: String,
		src: String 
	},
	en: {
		type: Object,
		alt: String,
		id: String,
		src: String 
	},
	ro: {
		type: Object,
		alt: String,
		id: String,
		src: String 
	},
	sku: { type: String },
	subcategory: { type: Schema.Types.ObjectId, ref: 'Subcategory' },
	// type: { type: Schema.Types.ObjectId, ref: 'Type'},

}, {
	timestamps: true
})

module.exports = model('Products', schema)