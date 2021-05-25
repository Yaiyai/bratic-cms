const Post = require('./../../models/post.model')

const getPosts = async (req, res) => {
	await Post.find()
		.then((posts) => res.status(201).json({ ok: true, msg: 'Posts encontrados', posts }))
		.catch((err) => res.status(400).json({ ok: false, msg: 'No se ha encontrado nada', err }))
}

const getPost = async (req, res) => {
	const postID = req.params.postID
	await Post.findById(postID)
		.populate('content.text')
		.populate('content.image')
		.populate('author')
		.then((post) => res.status(201).json({ ok: true, msg: 'Post encontrado', post }))
		.catch((err) => res.status(400).json({ ok: false, msg: 'Post no encontrado', err }))
}

const getPostBySlug = async (req, res) => {
	const postSlug = req.params.postSlug
	const checkExistence = await Post.find({ slug: postSlug })
	if (!checkExistence.length) {
		//Si no existe el string como slug principal, busco en el array de slugs a ver si existió en algun momento
		Post.find({ slugArray: postSlug })
			.populate('content.text')
			.populate('content.image')
			.populate('author')
			.then((post) => res.status(201).json({ ok: true, msg: 'Post encontrado con ese slug', redirect: true, post }))
			.catch((err) => res.status(400).json({ ok: false, msg: 'Post no encontrado con ese slug', err }))
	} else {
		Post.find({ slug: postSlug })
			.populate('content.text')
			.populate('content.image')
			.populate('author')
			.then((post) => res.status(201).json({ ok: true, msg: 'Post encontrado con ese slug', redirect: false, post }))
			.catch((err) => res.status(400).json({ ok: false, msg: 'Post no encontrado con ese slug', err }))
	}
}

const getUserPosts = async (req, res) => {
	const userID = req.params.userID

	await Post.find({ author: userID, status: { $in: ['borrador', 'publicado', 'privada'] } })
		.then((posts) => res.status(201).json({ ok: true, msg: 'UserPosts encontrados', posts }))
		.catch((err) => res.status(400).json({ ok: false, msg: 'UserPosts no encontrados', err }))
}

const addPost = async (req, res) => {
	const newPost = req.body
	Post.create(newPost)
		.then((post) => res.status(201).json({ ok: true, msg: 'Post Creado', post }))
		.catch((err) => res.status(400).json({ ok: false, msg: 'No se ha creado post', err }))
}

const updatePost = async (req, res) => {
	const postID = req.params.postID
	const checkExistence = await Post.findById(postID)
	if (!checkExistence) {
		return res.status(400).json({ ok: true, msg: 'El post que intentas actualizar no existe' })
	}
	const updatedPost = req.body

	await Post.findByIdAndUpdate(postID, updatedPost, { new: true })
		.then((post) => res.status(201).json({ ok: true, msg: 'Post Actualizado', post }))
		.catch((err) => res.status(400).json({ ok: false, msg: 'No se ha actualizado el post', err }))
}
const deletePost = async (req, res) => {
	const postID = req.params.postID
	const checkExistence = await Post.findById(postID)
	if (!checkExistence) {
		return res.status(400).json({ ok: true, msg: 'El post que intentas borrar no existe' })
	}

	await Post.findByIdAndUpdate(postID, { deletedAt: new Date(), status: 'borrada' })
		.then(() => res.status(201).json({ ok: true, msg: 'Post Borrado' }))
		.catch((err) => res.status(400).json({ ok: false, msg: 'No se ha borrado nada', err }))
}

module.exports = { getPosts, getPost, getPostBySlug, getUserPosts, addPost, updatePost, deletePost }
