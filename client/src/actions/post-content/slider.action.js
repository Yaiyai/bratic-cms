import Swal from 'sweetalert2'
import { fetchConToken } from '../../helpers/fetch'

export const addSlider = async (slider, postID) => {
	const resp = await fetchConToken(`sliders/${postID}`, slider, 'POST')
	const body = await resp.json()
	if (body.ok) {
		const sliderCreated = body.slider
		return sliderCreated
	} else {
		const errorMsg = body.msg
		Swal.fire('¡Oh-oh!', errorMsg, 'error')
	}
}
export const deleteSlider = async (id) => {
	const resp = await fetchConToken(`sliders/${id}`, {}, 'DELETE')
	const body = await resp.json()
	if (!body.ok) {
		const errorMsg = body.msg
		Swal.fire('¡Oh-oh!', errorMsg, 'error')
	}
}
