import React from 'react'
import { addImage } from '../../../actions/post-content/image.action'
import useForm from '../../../hooks/useForm'

const AddImage = ({ saveElement, postID, increment }) => {
	const { values, handleFileChange } = useForm()
	const saveImage = async () => {
		const theImage = await addImage({ image: values.image }, postID)
		saveElement('image', theImage)
		increment()
	}

	return (
		<div>
			<div className='file-group'>
				<input type='file' className='file-input' name='image' id='image' onChange={ handleFileChange } />
			</div>
			{values?.image && (
				<>
					<img className='unique-image' src={ values.image } alt='' />
					<button className='my-btn mini' onClick={ () => saveImage() }> Añadir Imagen a la Entrada</button>
				</>
			) }
		</div>
	)
}

export default AddImage
