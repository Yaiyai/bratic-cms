import Swal from 'sweetalert2'
import { fetchConToken } from '../../helpers/fetch'

export const addImage = async (image, postID) => {
	console.log(image)
	const resp = await fetchConToken(`images/${postID}`, image, 'POST')
	const body = await resp.json()
	if (body.ok) {
		const imageCreated = body.image
		Swal.fire('¡Chachi!', 'La Imagen ha sido añadida', 'success')
		return imageCreated
	} else {
		const errorMsg = body.msg
		Swal.fire('¡Oh-oh!', errorMsg, 'error')
	}
}
