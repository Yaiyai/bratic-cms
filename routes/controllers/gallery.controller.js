const Gallery = require('./../../models/subdocs/gallery.model')

const getGallery = async (req, res) => {
	const postID = req.params.postID
	await Gallery.find({ post: postID })
		.populate('post')
		.then((galleries) => res.status(201).json({ ok: true, msg: 'Galería encontrada', galleries }))
		.catch((err) => res.status(400).json({ ok: false, msg: 'No se ha encontrado la galería que buscas', err }))
}

const addGallery = async (req, res) => {
	const postID = req.params.postID
	const { gallery } = req.body
	await Gallery.create({ gallery, post: postID })
		.then((gallery) => res.status(201).json({ ok: true, msg: 'Galería creada', gallery }))
		.catch((err) => res.status(400).json({ ok: false, msg: 'No se ha creado galería', err }))
}

const updateGallery = async (req, res) => {
	const galleryID = req.params.galleryID
	const checkExistence = await Gallery.findById(galleryID)
	if (!checkExistence) {
		return res.status(400).json({ ok: false, msg: 'No se ha encontrado la galería que quieres actualizar' })
	}
	const galleryUpdated = req.body

	await Gallery.findByIdAndUpdate(galleryID, galleryUpdated, { new: true })
		.then((gallery) => res.status(201).json({ ok: true, msg: 'Galería encontrada', gallery }))
		.catch((err) => res.status(400).json({ ok: false, msg: 'No se ha encontrado la galería que buscas', err }))
}

const deleteGallery = async (req, res) => {
	const galleryID = req.params.galleryID
	const checkExistence = await Gallery.findById(galleryID)
	if (!checkExistence) {
		return res.status(400).json({ ok: false, msg: 'No se ha encontrado la galería que quieres borrar' })
	}

	await Gallery.findByIdAndRemove(galleryID)
		.then(() => res.status(201).json({ ok: true, msg: 'Galería borrada' }))
		.catch((err) => res.status(400).json({ ok: false, msg: 'No se ha borrado la galería que querías', err }))
}

module.exports = { getGallery, addGallery, updateGallery, deleteGallery }
