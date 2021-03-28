const mongoose = require('mongoose')
const Schema = mongoose.Schema
const videoModel = new Schema(
	{
		post: { type: Schema.Types.ObjectId, ref: 'Post' },
		video: String,
		order: Number,
		postType: {
			type: String,
			default: 'video',
		},
	},
	{
		timestamps: true,
	}
)
const Video = mongoose.model('Video', videoModel)
module.exports = Video
