import React, { useState } from 'react'
import { fileUpload } from '../../../helpers/uploadFiles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { addGallery } from '../../../actions/post-content/gallery.action'

const AddGallery = ({ saveElement, postID }) => {
	const [auxValue, setAuxValue] = useState()
	const [gallery, setGallery] = useState([])

	const handleGalleryChange = async ({ target }) => {
		const file = target.files[0]
		const url = await fileUpload(file)

		setAuxValue(url)
	}

	const deletePicture = (idx) => {
		const galleryCopy = [...gallery]
		galleryCopy.splice(idx, 1)
		setGallery(galleryCopy)
	}

	const handleAddGallery = (e) => {
		e.preventDefault()
		if (gallery.length === 0) {
			setGallery([auxValue])
		} else if (!gallery?.includes(auxValue)) {
			setGallery([...gallery, auxValue])
		}
	}
	const saveGallery = async () => {
		const theGallery = await addGallery({ gallery: gallery }, postID)
		saveElement('gallery', theGallery)
	}

	return (
		<>
			<label htmlFor=''>Galería de imágenes</label>

			<div className='button-file-group'>
				<input className='file-input' type='file' onChange={handleGalleryChange} placeholder={'Añadir Foto'} name='gallery' />
				<button onClick={handleAddGallery} className='my-btn mini third'>
					Añadir Imagen
				</button>
			</div>
			<button onClick={() => saveGallery()}>Añadir Galería al Post</button>
			<div className='gallery'>
				{gallery?.map((picture, idx) => (
					<figure className='each-picture' key={idx}>
						<img src={picture} alt='' />
						<FontAwesomeIcon className='close-icon' onClick={() => deletePicture(idx)} icon='times-circle' />
					</figure>
				))}
			</div>
		</>
	)
}

export default AddGallery