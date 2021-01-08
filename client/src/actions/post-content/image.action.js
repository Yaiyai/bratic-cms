import Swal from 'sweetalert2'
import { fetchConToken } from '../../helpers/fetch'

export const addImage = async (image, postID) => {
	const resp = await fetchConToken(`images/${postID}`, image, 'POST')
	const body = await resp.json()
	if (body.ok) {
		const imageCreated = body.image
		return imageCreated
	} else {
		const errorMsg = body.msg
		Swal.fire('¡Oh-oh!', errorMsg, 'error')
	}
}

export const deleteImage = async (id) => {
	const resp = await fetchConToken(`images/${id}`, {}, 'DELETE')
	const body = await resp.json()
	if (!body.ok) {
		const errorMsg = body.msg
		Swal.fire('¡Oh-oh!', errorMsg, 'error')
	}
}
