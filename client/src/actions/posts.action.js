import Swal from 'sweetalert2'
import { fetchConToken, fetchSinToken } from '../helpers/fetch'

export const getUserPosts = async (user) => {
	const resp = await fetchSinToken(`posts/${user}`, 'GET')
	const body = await resp.json()
	if (body.ok) {
		const userPosts = body.posts
		return userPosts
	}
}

export const addPost = async (post) => {
	const resp = await fetchConToken(`posts/`, post, 'POST')
	const body = await resp.json()
	if (body.ok) {
		const postCreated = body.post
		return postCreated
	}
}

export const updatePost = async (id, post) => {
	const resp = await fetchConToken(`posts/${id}`, post, 'PUT')
	const body = await resp.json()
	if (body.ok) {
		const updatedPost = body.post
		Swal.fire('¡Chachi!', 'Los cambios han sido guardados', 'success')
		return updatedPost
	} else {
		const errorMsg = body.error
		Swal.fire('Error', errorMsg, 'error')
	}
}

export const deletePost = async (id) => {
	await fetchConToken(`posts/${id}`, {}, 'DELETE')
}
