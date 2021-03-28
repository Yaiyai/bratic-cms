import React, { useState } from 'react'
import { fileUpload } from '../../../helpers/uploadFiles'
import { FaTimesCircle } from "react-icons/fa";
import { addSlider } from '../../../actions/post-content/slider.action'

const AddSlider = ({ saveElement, postID, increment }) => {
	const [auxValue, setAuxValue] = useState()
	const [slider, setSlider] = useState([])
	const [showButton, setShowButton] = useState(false)

	const handleGalleryChange = async ({ target }) => {
		const file = target.files[0]
		const url = await fileUpload(file)
		setShowButton(true)
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
		setShowButton(false)
	}
	const saveSlider = async () => {
		const theSlider = await addSlider({ slides: slider }, postID)
		saveElement('slider', theSlider)
		increment()
	}

	return (
		<section id="add-slider">
			<div className='file-group'>
				<input className='file-input' type='file' onChange={ handleGalleryChange } name='slider' />
				{
					showButton && <button onClick={ handleAddSlider } className='my-btn mini third'> Añadir Imagen al Slider </button>
				}
			</div>
			<div className='slider-gallery'>
				{ slider?.map((picture, idx) => (
					<figure className='each-picture' key={ idx }>
						<img src={ picture } alt='' />
						<FaTimesCircle className='close-icon' onClick={ () => deletePicture(idx) } />
					</figure>
				)) }
			</div>
			{
				slider.length > 0 && <button className='my-btn mini' onClick={ () => saveSlider() }>Añadir Slider a la Entrada </button>
			}
		</section>
	)
}

export default AddSlider
