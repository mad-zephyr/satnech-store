const {Schema, model} = require('mongoose')

const schema = new Schema({
	name: { type: String }
}, {
	timestamps: true
})

module.exports = model('Brand', schema)