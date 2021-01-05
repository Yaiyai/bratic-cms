const express = require('express')
const router = express.Router()
const formValidator = require('../middlewares/formValidator')
const tokenValidator = require('../middlewares/tokenValidator')
const { check } = require('express-validator')

const { getPosts, getPost, addPost, deletePost, updatePost } = require('./controllers/post.controller')
// api/posts
router.get('/', getPosts)
router.get('/:postID', getPost)

//Solo usuarios logeados pueden añadir, borrar o editar la info de la empresa
router.use(tokenValidator) //Poniendolo aqui, todas las rutas que estén por debajo, solo podrán accederse si se está validado

router.post('/', [check('title', 'el titulo del post es obligatorio').not().isEmpty(), formValidator], addPost)
router.put('/:postID', [check('title', 'el titulo del post es obligatorio').not().isEmpty(), formValidator], updatePost)
router.delete('/:postID', deletePost)

module.exports = router
