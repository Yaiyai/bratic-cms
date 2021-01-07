import Swal from 'sweetalert2'
import { fetchConToken } from '../../helpers/fetch'

export const addText = async (text, postID) => {
	const resp = await fetchConToken(`texts/${postID}`, text, 'POST')
	const body = await resp.json()
	if (body.ok) {
		const textCreated = body.text
		Swal.fire('¡Chachi!', 'El texto ha sido añadido', 'success')
		return textCreated
	} else {
		const errorMsg = body.msg
		Swal.fire('¡Oh-oh!', errorMsg, 'error')
	}
}
