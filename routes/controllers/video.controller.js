const Video = require('../../models/subdocs/video.model')

const getVideo = async (req, res) => {
	const postID = req.params.postID
	await Video.find({ post: postID })
		.populate('post')
		.then((videos) => res.status(201).json({ ok: true, msg: 'Video encontrada', videos }))
		.catch((err) => res.status(400).json({ ok: false, msg: 'No se ha encontrado el video que buscas', err }))
}

const addVideo = async (req, res) => {
	const postID = req.params.postID

	await Video.create({ video: req.body.video, order: req.body.order, post: postID })
		.then((video) => res.status(201).json({ ok: true, msg: 'Video creada', video }))
		.catch((err) => res.status(400).json({ ok: false, msg: 'No se ha creado video', err }))
}

const updateVideo = async (req, res) => {
	const videoID = req.params.videoID
	const checkExistence = await Video.findById(videoID)
	if (!checkExistence) {
		return res.status(400).json({ ok: false, msg: 'No se ha encontrado el video que quieres actualizar' })
	}
	const videoUpdated = req.body

	await Video.findByIdAndUpdate(videoID, videoUpdated, { new: true })
		.then((video) => res.status(201).json({ ok: true, msg: 'Video encontrada', video }))
		.catch((err) => res.status(400).json({ ok: false, msg: 'No se ha encontrado el video que buscas', err }))
}

const deleteVideo = async (req, res) => {
	const videoID = req.params.videoID
	const checkExistence = await Video.findById(videoID)
	if (!checkExistence) {
		return res.status(400).json({ ok: false, msg: 'No se ha encontrado el video que quieres borrar' })
	}

	await Video.findByIdAndRemove(videoID)
		.then(() => res.status(201).json({ ok: true, msg: 'Video borrada' }))
		.catch((err) => res.status(400).json({ ok: false, msg: 'No se ha borrado el video que querías', err }))
}

module.exports = { getVideo, addVideo, updateVideo, deleteVideo }
