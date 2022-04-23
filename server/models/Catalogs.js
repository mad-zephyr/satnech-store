const {Schema, model} = require('mongoose')

const schema = new Schema({
	ru: { type: String, required: true },
	en: { type: String },
	ro: { type: String }
}, {
	timestamps: true
})

module.exports = model('Catalogs', schema)