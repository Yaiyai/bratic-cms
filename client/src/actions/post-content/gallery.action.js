import Swal from 'sweetalert2'
import { fetchConToken } from '../../helpers/fetch'

export const addGallery = async (gallery, postID) => {
	const resp = await fetchConToken(`galleries/${postID}`, gallery, 'POST')
	const body = await resp.json()
	if (body.ok) {
		const galleryCreated = body.gallery
		Swal.fire('¡Chachi!', 'La Galería ha sido añadida', 'success')
		return galleryCreated
	} else {
		const errorMsg = body.msg
		Swal.fire('¡Oh-oh!', errorMsg, 'error')
	}
}
