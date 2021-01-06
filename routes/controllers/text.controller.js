const Text = require('../../models/subdocs/text.model')

const getText = async (req, res) => {
	const textID = req.params.textID
	await Text.findById(textID)
		.populate('post')
		.then((text) => res.status(201).json({ ok: true, msg: 'Texto encontrado', text }))
		.catch((err) => res.status(400).json({ ok: false, msg: 'No se ha encontrado el texto que buscas', err }))
}

const addText = async (req, res) => {
	const postID = req.params.postID
	const { text } = req.body
	await Text.create({ text, post: postID })
		.then((text) => res.status(201).json({ ok: true, msg: 'Texto creado', text }))
		.catch((err) => res.status(400).json({ ok: false, msg: 'No se ha creado texto', err }))
}

const updateText = async (req, res) => {
	const textID = req.params.textID
	const checkExistence = await Text.findById(textID)
	if (!checkExistence) {
		return res.status(400).json({ ok: false, msg: 'No se ha encontrado el texto que quieres actualizar' })
	}
	const textUpdated = req.body

	await Text.findByIdAndUpdate(textID, textUpdated, { new: true })
		.then((text) => res.status(201).json({ ok: true, msg: 'Texto encontrado', text }))
		.catch((err) => res.status(400).json({ ok: false, msg: 'No se ha encontrado el texto que buscas', err }))
}

const deleteText = async (req, res) => {
	const textID = req.params.textID
	const checkExistence = await Text.findById(textID)
	if (!checkExistence) {
		return res.status(400).json({ ok: false, msg: 'No se ha encontrado el texto que quieres borrar' })
	}

	await Text.findByIdAndRemove(textID)
		.then(() => res.status(201).json({ ok: true, msg: 'Texto borrado' }))
		.catch((err) => res.status(400).json({ ok: false, msg: 'No se ha borrado el texto que querías', err }))
}

module.exports = { getText, addText, updateText, deleteText }
