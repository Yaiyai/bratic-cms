const express = require('express')
const { getVideo, deleteVideo, updateVideo, addVideo } = require('./controllers/video.controller')
const tokenValidator = require('../middlewares/tokenValidator')

const router = express.Router()

// /api/videos

router.get('/', getVideo)

router.use(tokenValidator)
router.post('/:postID', addVideo)
router.put('/:videoID', updateVideo)
router.delete('/:videoID', deleteVideo)

module.exports = router
