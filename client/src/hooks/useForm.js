import { useState } from 'react'
import { fileUpload } from '../helpers/uploadFiles'

const useForm = (initialState = {}) => {
	const [values, setValues] = useState(initialState)
	const [loading, setLoading] = useState(false)

	const resetForm = () => {
		setValues(initialState)
	}

	const handleInputChange = ({ target }) => {
		setValues({
			...values,
			[target.name]: target.value,
		})
	}

	const handleFileChange = async ({ target }) => {
		setLoading(true)
		const file = target.files[0]
		const url = await fileUpload(file)
		await setValues({
			...values,
			[target.name]: url,
		})
		setLoading(false)
	}

	return { values, setValues, handleInputChange, handleFileChange, resetForm, loading }
}

export default useForm
