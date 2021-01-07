import React from 'react'
import useForm from '../../../hooks/useForm'

const AddImage = () => {
	const { values, handleFileChange } = useForm()
	return (
		<div>
			<input type='file' className='file-input' name='mainLogo' id='mainLogo' placeholder='Logo Principal' onChange={handleFileChange} />
		</div>
	)
}

export default AddImage
