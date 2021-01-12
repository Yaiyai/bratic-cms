const mongoose = require('mongoose')
const Schema = mongoose.Schema
const downloadModel = new Schema(
	{
		post: { type: Schema.Types.ObjectId, ref: 'Post' },
		download: String,
	},
	{
		timestamps: true,
	}
)
const Download = mongoose.model('Download', downloadModel)
module.exports = Download
