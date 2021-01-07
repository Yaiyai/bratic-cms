const Slider = require('../../models/subdocs/slider.model')

const getSlider = async (req, res) => {
	const postID = req.params.postID
	await Slider.find({ post: postID })
		.populate('post')
		.then((sliders) => res.status(201).json({ ok: true, msg: 'Slider encontrada', sliders }))
		.catch((err) => res.status(400).json({ ok: false, msg: 'No se ha encontrado el slider que buscas', err }))
}

const addSlider = async (req, res) => {
	const postID = req.params.postID
	const { slides } = req.body
	await Slider.create({ slides, post: postID })
		.then((slider) => res.status(201).json({ ok: true, msg: 'Slider creada', slider }))
		.catch((err) => res.status(400).json({ ok: false, msg: 'No se ha creado slider', err }))
}

const updateSlider = async (req, res) => {
	const sliderID = req.params.sliderID
	const checkExistence = await Slider.findById(sliderID)
	if (!checkExistence) {
		return res.status(400).json({ ok: false, msg: 'No se ha encontrado el slider que quieres actualizar' })
	}
	const sliderUpdated = req.body

	await Slider.findByIdAndUpdate(sliderID, sliderUpdated, { new: true })
		.then((slider) => res.status(201).json({ ok: true, msg: 'Slider encontrada', slider }))
		.catch((err) => res.status(400).json({ ok: false, msg: 'No se ha encontrado el slider que buscas', err }))
}

const deleteSlider = async (req, res) => {
	const sliderID = req.params.sliderID
	const checkExistence = await Slider.findById(sliderID)
	if (!checkExistence) {
		return res.status(400).json({ ok: false, msg: 'No se ha encontrado el slider que quieres borrar' })
	}

	await Slider.findByIdAndRemove(sliderID)
		.then(() => res.status(201).json({ ok: true, msg: 'Slider borrada' }))
		.catch((err) => res.status(400).json({ ok: false, msg: 'No se ha borrado el slider que querías', err }))
}

module.exports = { getSlider, addSlider, updateSlider, deleteSlider }
