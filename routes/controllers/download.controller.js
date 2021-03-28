const Download = require('../../models/subdocs/download.model')

const getDownload = async (req, res) => {
	const postID = req.params.postID
	await Download.find({ post: postID })
		.populate('post')
		.then((downloads) => res.status(201).json({ ok: true, msg: 'Download encontrado', downloads }))
		.catch((err) => res.status(400).json({ ok: false, msg: 'No se ha encontrado la download que buscas', err }))
}

const addDownload = async (req, res) => {
	const postID = req.params.postID

	await Download.create({ download: req.body.download, order: req.body.order, post: postID })
		.then((download) => res.status(201).json({ ok: true, msg: 'Download creado', download }))
		.catch((err) => res.status(400).json({ ok: false, msg: 'No se ha creala download', err }))
}

const updateDownload = async (req, res) => {
	const downloadID = req.params.downloadID
	const checkExistence = await Download.findById(downloadID)
	if (!checkExistence) {
		return res.status(400).json({ ok: false, msg: 'No se ha encontrado la download que quieres actualizar' })
	}
	const downloadUpdated = req.body

	await Download.findByIdAndUpdate(downloadID, downloadUpdated, { new: true })
		.then((download) => res.status(201).json({ ok: true, msg: 'Download encontrado', download }))
		.catch((err) => res.status(400).json({ ok: false, msg: 'No se ha encontrado la download que buscas', err }))
}

const deleteDownload = async (req, res) => {
	const downloadID = req.params.downloadID
	const checkExistence = await Download.findById(downloadID)
	if (!checkExistence) {
		return res.status(400).json({ ok: false, msg: 'No se ha encontrado la download que quieres borrar' })
	}

	await Download.findByIdAndRemove(downloadID)
		.then(() => res.status(201).json({ ok: true, msg: 'Download borrado' }))
		.catch((err) => res.status(400).json({ ok: false, msg: 'No se ha borrado la download que querías', err }))
}

module.exports = { getDownload, addDownload, updateDownload, deleteDownload }
