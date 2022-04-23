const {Schema, model} = require('mongoose')

const schema = new Schema({
	id: { type: String, required: true },
	parent: { type: Schema.Types.ObjectId, ref: 'Category' },
	ru: { type: String, required: true },
	en: { type: String, required: true },
	ro: { type: String, required: true }
}, {
	timestamps: true
})

module.exports = model('Subcategory', schema)