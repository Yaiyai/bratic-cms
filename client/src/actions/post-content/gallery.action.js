import Swal from 'sweetalert2'
import { fetchConToken } from '../../helpers/fetch'

export const addGallery = async (gallery, postID) => {
	const resp = await fetchConToken(`galleries/${postID}`, gallery, 'POST')
	const body = await resp.json()
	if (body.ok) {
		const galleryCreated = body.gallery
		return galleryCreated
	} else {
		const errorMsg = body.msg
		Swal.fire('¡Oh-oh!', errorMsg, 'error')
	}
}

export const deleteGallery = async (id) => {
	const resp = await fetchConToken(`galleries/${id}`, {}, 'DELETE')
	const body = await resp.json()
	if (!body.ok) {
		const errorMsg = body.msg
		Swal.fire('¡Oh-oh!', errorMsg, 'error')
	}
}

export const findGalleryAndUpdate = async (id, gallery) => {
	const resp = await fetchConToken(`galleries/${id}`, gallery, 'PUT')
	const body = await resp.json()
	if (!body.ok) {
		const errorMsg = body.msg
		Swal.fire('¡Oh-oh!', errorMsg, 'error')
	}
}

export const findGalleryAndUpdateReturn = async (id, gallery) => {
	const resp = await fetchConToken(`galleries/${id}`, gallery, 'PUT')
	const body = await resp.json()
	if (!body.ok) {
		const errorMsg = body.msg
		Swal.fire('¡Oh-oh!', errorMsg, 'error')
	} else {
		return body
	}
}
