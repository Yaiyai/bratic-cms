import React from 'react'
import { addImage } from '../../../actions/post-content/image.action'
import useForm from '../../../hooks/useForm'

const AddImage = ({ saveElement, postID }) => {
	const { values, handleFileChange } = useForm()
	const saveImage = async () => {
		const theImage = await addImage({ image: values.image }, postID)
		saveElement('image', theImage)
	}

	return (
		<div>
			<label htmlFor='image'>Añadir image</label>
			{values?.image && <img src={values.image} alt='' />}
			<input type='file' className='file-input' name='image' id='image' onChange={handleFileChange} />
			<button onClick={() => saveImage()}>Añadir Imagen</button>
		</div>
	)
}

export default AddImage
