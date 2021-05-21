const mongoose = require('mongoose')
const Schema = mongoose.Schema
const postModel = new Schema(
	{
		title: String,
		status: {
			type: String,
			enum: ['borrador', 'publicado', 'privada'],
			default: 'borrador',
		},
		subtitle: String,
		author: { type: Schema.Types.ObjectId, ref: 'User' },
		content: {
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

//flexibleContent: [{ type: Schema.Types.ObjectId, ref: 'FlexContent' }]
//FlexContent: type: [gallery, slider, video, text, image, download], [{ type: Schema.Types.ObjectId, ref: 'Whatever' }]
