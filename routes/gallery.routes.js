const express = require('express')
const { getGallery, deleteGallery, updateGallery, addGallery } = require('./controllers/gallery.controller')
const tokenValidator = require('../middlewares/tokenValidator')

const router = express.Router()

// /api/galleries

router.get('/', getGallery)

router.use(tokenValidator)
router.post('/:postID', addGallery)
router.put('/:galleryID', updateGallery)
router.delete('/:galleryID', deleteGallery)

module.exports = router
