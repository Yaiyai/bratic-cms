import Swal from 'sweetalert2'
import { fetchConToken } from '../../helpers/fetch'

export const addText = async (text, postID) => {
	const resp = await fetchConToken(`texts/${postID}`, text, 'POST')
	const body = await resp.json()
	if (body.ok) {
		const textCreated = body.text
		return textCreated
	} else {
		const errorMsg = body.msg
		Swal.fire('¡Oh-oh!', errorMsg, 'error')
	}
}

export const deleteText = async (id) => {
	const resp = await fetchConToken(`texts/${id}`, {}, 'DELETE')
	const body = await resp.json()
	if (!body.ok) {
		const errorMsg = body.msg
		Swal.fire('¡Oh-oh!', errorMsg, 'error')
	}
}

export const findTextAndUpdate = async (id, text) => {
	const resp = await fetchConToken(`texts/${id}`, text, 'PUT')
	const body = await resp.json()
	if (!body.ok) {
		const errorMsg = body.msg
		Swal.fire('¡Oh-oh!', errorMsg, 'error')
	}
}

export const findTextAndUpdateReturn = async (id, text) => {
	const resp = await fetchConToken(`texts/${id}`, text, 'PUT')
	const body = await resp.json()
	if (!body.ok) {
		const errorMsg = body.msg
		Swal.fire('¡Oh-oh!', errorMsg, 'error')
	} else {
		return body
	}
}
