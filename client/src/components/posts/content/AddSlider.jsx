import React, { useState } from 'react'
import { fileUpload } from '../../../helpers/uploadFiles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { addSlider } from '../../../actions/post-content/slider.action'

const AddSlider = ({ saveElement, postID }) => {
	const [auxValue, setAuxValue] = useState()
	const [slider, setGallery] = useState([])

	const handleGalleryChange = async ({ target }) => {
		const file = target.files[0]
		const url = await fileUpload(file)

		setAuxValue(url)
	}

	const deletePicture = (idx) => {
		const sliderCopy = [...slider]
		sliderCopy.splice(idx, 1)
		setGallery(sliderCopy)
	}

	const handleAddSlider = (e) => {
		e.preventDefault()
		if (slider.length === 0) {
			setGallery([auxValue])
		} else if (!slider?.includes(auxValue)) {
			setGallery([...slider, auxValue])
		}
	}
	const saveSlider = async () => {
		const theSlider = await addSlider({ slider: slider }, postID)
		saveElement('slider', theSlider)
	}

	return (
		<>
			<label htmlFor=''>Slider</label>

			<div className='button-file-group'>
				<input className='file-input' type='file' onChange={handleGalleryChange} name='slider' />
				<button onClick={handleAddSlider} className='my-btn mini third'>
					Añadir Imagen al Slider
				</button>
			</div>
			<button onClick={() => saveSlider()}>Añadir Slider al Post</button>
			<div className='slider'>
				{slider?.map((picture, idx) => (
					<figure className='each-picture' key={idx}>
						<img src={picture} alt='' />
						<FontAwesomeIcon className='close-icon' onClick={() => deletePicture(idx)} icon='times-circle' />
					</figure>
				))}
			</div>
		</>
	)
}

export default AddSlider
