const mongoose = require('mongoose')
const Schema = mongoose.Schema
const postModel = new Schema(
	{
		title: String,
		subtitle: String,
		author: { type: Schema.Types.ObjectId, ref: 'User' },
		text: String,
		parsedText: Object,
		content: [
			{ type: Schema.Types.ObjectId, ref: 'Slider' },
			{ type: Schema.Types.ObjectId, ref: 'Gallery' },
			{ type: Schema.Types.ObjectId, ref: 'Video' },
		],
	},
	{
		timestamps: true,
	}
)
const Post = mongoose.model('Post', postModel)
module.exports = Post
