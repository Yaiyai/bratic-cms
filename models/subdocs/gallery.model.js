const mongoose = require('mongoose')
const Schema = mongoose.Schema
const galleryModel = new Schema(
	{
		post: { type: Schema.Types.ObjectId, ref: 'Post' },
		gallery: Array,
	},
	{
		timestamps: true,
	}
)
const Gallery = mongoose.model('Gallery', galleryModel)
module.exports = Gallery
