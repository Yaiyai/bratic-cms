import React, { useState } from 'react'
import { fileUpload } from '../../../helpers/uploadFiles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { addGallery } from '../../../actions/post-content/gallery.action'

const AddGallery = ({ saveElement, postID, increment }) => {
	const [auxValue, setAuxValue] = useState()
	const [gallery, setGallery] = useState([])
	const [showButton, setShowButton] = useState(false)


	const handleGalleryChange = async ({ target }) => {
		const file = target.files[0]
		const url = await fileUpload(file)
		setShowButton(true)

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
		setShowButton(false)

	}
	const saveGallery = async () => {
		const theGallery = await addGallery({ gallery: gallery }, postID)
		saveElement('gallery', theGallery)
		increment()
	}

	return (
		<section id="add-gallery">
			<div className='file-group'>
				<input className='file-input' type='file' onChange={ handleGalleryChange } placeholder={ 'Añadir Foto' } name='gallery' />
				{ showButton && <button onClick={ handleAddGallery } className='my-btn mini third'>Añadir Imagen</button> }
			</div>
			<div className='gallery'>
				{ gallery?.map((picture, idx) => (
					<figure className='each-picture' key={ idx }>
						<img src={ picture } alt='' />
						<FontAwesomeIcon className='close-icon' onClick={ () => deletePicture(idx) } icon='times-circle' />
					</figure>
				)) }
			</div>
			{gallery.length > 0 && <button className='my-btn mini' onClick={ () => saveGallery() }> Añadir Galería a la entrada </button> }
		</section>
	)
}

export default AddGallery
