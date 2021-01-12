const express = require('express')
const { getDownload, deleteDownload, updateDownload, addDownload } = require('./controllers/download.controller')
const tokenValidator = require('../middlewares/tokenValidator')

const router = express.Router()

// /api/downloads

router.get('/:postID', getDownload)

router.use(tokenValidator)
router.post('/:postID', addDownload)
router.put('/:downloadID', updateDownload)
router.delete('/:downloadID', deleteDownload)

module.exports = router
