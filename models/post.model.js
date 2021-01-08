const mongoose = require('mongoose')
const Schema = mongoose.Schema
const postModel = new Schema(
	{
		title: String,
		subtitle: String,
		author: { type: Schema.Types.ObjectId, ref: 'User' },
		content: {
			gallery: [{ type: Schema.Types.ObjectId, ref: 'Gallery' }],
			slider: [{ type: Schema.Types.ObjectId, ref: 'Slider' }],
			video: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
			text: [{ type: Schema.Types.ObjectId, ref: 'Text' }],
			image: [{ type: Schema.Types.ObjectId, ref: 'Image' }],
		},
	},
	{
		timestamps: true,
	}
)
const Post = mongoose.model('Post', postModel)
module.exports = Post
