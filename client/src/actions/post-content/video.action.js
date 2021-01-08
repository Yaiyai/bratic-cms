import Swal from 'sweetalert2'
import { fetchConToken } from '../../helpers/fetch'

export const addVideo = async (video, postID) => {
	const resp = await fetchConToken(`videos/${postID}`, video, 'POST')
	const body = await resp.json()
	if (body.ok) {
		const videoCreated = body.video
		return videoCreated
	} else {
		const errorMsg = body.msg
		Swal.fire('¡Oh-oh!', errorMsg, 'error')
	}
}

export const deleteVideo = async (id) => {
	const resp = await fetchConToken(`videos/${id}`, {}, 'DELETE')
	const body = await resp.json()
	if (!body.ok) {
		const errorMsg = body.msg
		Swal.fire('¡Oh-oh!', errorMsg, 'error')
	}
}
