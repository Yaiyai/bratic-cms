import { fetchConToken, fetchSinToken } from '../helpers/fetch'

export const addSection = async (section) => {
	const resp = await fetchConToken(`sections/`, section, 'POST')
	const body = await resp.json()
	return body.section
}
export const updateSection = async (section, id) => {
	await fetchConToken(`sections/${id}`, section, 'PUT')
	const resp = await fetchSinToken(`sections`)
	const body = await resp.json()
	return body.sections
}
export const deleteSection = async (id) => {
	await fetchConToken(`sections/${id}`, {}, 'DELETE')
	const resp = await fetchSinToken(`sections`)
	const body = await resp.json()
	return body.sections
}
