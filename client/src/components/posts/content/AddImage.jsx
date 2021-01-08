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
			<div className='file-group'>
				<input type='file' className='file-input' name='image' id='image' onChange={handleFileChange} />
			</div>
			<button className='my-btn mini' onClick={() => saveImage()}>
				Añadir Imagen a la Entrada
			</button>
			{values?.image && <img className='unique-image' src={values.image} alt='' />}
		</div>
	)
}

export default AddImage
