const mongoose = require('mongoose')
const Schema = mongoose.Schema
const sliderModel = new Schema(
	{
		post: { type: Schema.Types.ObjectId, ref: 'Post' },
		slides: Array,
		order: {
			type: Number,
			default: 0,
		},
		postType: {
			type: String,
			default: 'slider',
		},
	},
	{
		timestamps: true,
	}
)
const Slider = mongoose.model('Slider', sliderModel)
module.exports = Slider
