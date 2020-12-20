const mongoose = require('mongoose')
const Schema = mongoose.Schema
const galleryModel = new Schema(
	{
		post: { type: Schema.Types.ObjectId, ref: 'myCV' },
		gallery: Array,
	},
	{
		timestamps: true,
	}
)
const Gallery = mongoose.model('Gallery', galleryModel)
module.exports = Gallery
