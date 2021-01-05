const express = require('express')
const { getSlider, deleteSlider, updateSlider, addSlider } = require('./controllers/slider.controller')
const tokenValidator = require('../middlewares/tokenValidator')

const router = express.Router()

// /api/sliders

router.get('/', getSlider)

router.use(tokenValidator)
router.post('/:postID', addSlider)
router.put('/:sliderID', updateSlider)
router.delete('/:sliderID', deleteSlider)

module.exports = router
