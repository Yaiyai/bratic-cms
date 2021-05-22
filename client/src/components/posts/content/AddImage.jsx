import React from 'react'
import { addImage } from '../../../actions/post-content/image.action'
import useForm from '../../../hooks/useForm'
import Loader from '../../_ui/Loader/Loader'

const AddImage = ({ saveElement, postID }) => {
	const { values, handleFileChange, loading } = useForm()
	const saveImage = async () => {
		const theImage = await addImage({ image: values.image }, postID)
		saveElement('image', theImage)
	}

	return (
		<section className="add-image">
			<div className='file-group'>
				<input type='file' className='file-input' name='image' id='image' onChange={ handleFileChange } />
			</div>
			{loading ? (
				<Loader loading={ true } />
			) : (
				values?.image && (
					<div className="muestra">
						<figure>
							<img className='unique-image' src={ values.image } alt='' />
						</figure>
						<button className='my-btn mini third' onClick={ () => saveImage() }> Añadir Imagen a la Entrada</button>
					</div>
				)

			)
			}
		</section>
	)
}

export default AddImage
