import React, { useState } from 'react'
import { fileUpload } from '../../../helpers/uploadFiles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { addSlider } from '../../../actions/post-content/slider.action'

const AddSlider = ({ saveElement, postID }) => {
	const [auxValue, setAuxValue] = useState()
	const [slider, setSlider] = useState([])

	const handleGalleryChange = async ({ target }) => {
		const file = target.files[0]
		const url = await fileUpload(file)

		setAuxValue(url)
	}

	const deletePicture = (idx) => {
		const sliderCopy = [...slider]
		sliderCopy.splice(idx, 1)
		setSlider(sliderCopy)
	}

	const handleAddSlider = (e) => {
		e.preventDefault()
		if (slider.length === 0) {
			setSlider([auxValue])
		} else if (!slider?.includes(auxValue)) {
			setSlider([...slider, auxValue])
		}
	}
	const saveSlider = async () => {
		const theSlider = await addSlider({ slides: slider }, postID)
		saveElement('slider', theSlider)
	}

	return (
		<>
			<label htmlFor=''>Slider</label>

			<div className='file-group'>
				<input className='file-input' type='file' onChange={handleGalleryChange} name='slider' />
				<button onClick={handleAddSlider} className='my-btn mini secondary'>
					Añadir Imagen al Slider
				</button>
			</div>
			<button className='my-btn mini third' onClick={() => saveSlider()}>
				Añadir Slider a la Entrada
			</button>
			<div className='gallery'>
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
