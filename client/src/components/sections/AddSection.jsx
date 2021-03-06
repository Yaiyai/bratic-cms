import React, { useContext, useState } from 'react'
import { fileUpload } from '../../helpers/uploadFiles'
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import useForm from '../../hooks/useForm'
import { addSection } from '../../actions/sections.action'
import { SectionContext } from '../../reducers/sections/sectionsContext'
import { types } from '../../types/types'
import Swal from 'sweetalert2'
import TextEditorSections from '../_ui/TextEditor/TextEditorSections';

export const AddSection = ({ handleClose }) => {
	const { dispatchSections } = useContext(SectionContext)
	const [auxValue, setAuxValue] = useState()
	const [quill, setQuill] = useState()
	const [parsed, setParsed] = useState()

	const { values, setValues, handleInputChange, handleFileChange } = useForm()
	const { uniqueImage, gallery, features, formInputs } = values

	const handleQuill = (e) => {
		e.preventDefault()
		setValues({
			...values,
			text: quill,
			parsedText: parsed,
		})
	}

	const clearInput = (input) => {
		const theinput = document.getElementById(input)
		theinput.value = ''
	}

	const deleteFormInput = (idx) => {
		const inputCopy = [...formInputs]
		inputCopy.splice(idx, 1)
		setValues({
			...values,
			formInputs: inputCopy,
		})
	}

	const handleChangeFormInput = (e) => {
		setAuxValue(e.target.value)
	}

	const handleAddFormInput = (e) => {
		e.preventDefault()
		if (!formInputs) {
			setValues({
				...values,
				formInputs: [auxValue],
			})
			clearInput('to-reset-section-inputs')
		} else if (!formInputs?.includes(auxValue)) {
			setValues({
				...values,
				formInputs: [...formInputs, auxValue],
			})
			clearInput('to-reset-section-inputs')
		}
		clearInput('to-reset-section-inputs')
	}

	const deleteFeature = (idx) => {
		const featCopy = [...features]
		featCopy.splice(idx, 1)
		setValues({
			...values,
			features: featCopy,
		})
	}

	const handleFeatureChange = (e) => {
		setAuxValue(e.target.value)
	}

	const handleAddFeature = (e) => {
		e.preventDefault()
		if (!features) {
			setValues({
				...values,
				features: [auxValue],
			})
			clearInput('to-reset-section-features')
		} else if (!features?.includes(auxValue)) {
			setValues({
				...values,
				features: [...features, auxValue],
			})
			clearInput('to-reset-section-features')
		}
		clearInput('to-reset-section-features')
	}

	const handleGalleryChange = async ({ target }) => {
		const file = target.files[0]
		const url = await fileUpload(file)

		setAuxValue(url)
	}

	const handleAddGallery = (e) => {
		e.preventDefault()
		if (!gallery) {
			setValues({
				...values,
				gallery: [auxValue],
			})
		} else if (!gallery?.includes(auxValue)) {
			setValues({
				...values,
				gallery: [...gallery, auxValue],
			})
		}
	}

	const deletePicture = (idx) => {
		const galleryCopy = [...gallery]
		galleryCopy.splice(idx, 1)
		setValues({
			...values,
			gallery: galleryCopy,
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const newSection = await addSection(values)
		if (!newSection) {
			Swal.fire('¡Oh-oh!', 'Ha habido un error, inténtalo de nuevo', 'error')
		} else {
			Swal.fire('¡Chachi!', 'Los cambios han sido guardados', 'success')
			dispatchSections({ type: types.addSection, payload: newSection })
		}
		handleClose()
	}

	return (
		<>
			<section className='section-form'>
				<div className='left-side'>
					<label>Tipo de sección* { values?.sectionType && <FaCheckCircle /> }</label>
					<select onChange={ handleInputChange } name='sectionType' required>
						<option value='section' defaultValue>
							Sección
						</option>
						<option value='nav'>Navegador</option>
						<option value='header'>Cabecera</option>
						<option value='footer'>Footer</option>
					</select>

					<label>Nombre de la sección* { values?.sectionName && <FaCheckCircle /> }</label>
					<input type='text' onChange={ handleInputChange } name='sectionName' autoComplete='off' placeholder='Nombre de la sección' required />

					<label>Título { values?.title && <FaCheckCircle /> }</label>
					<input type='text' onChange={ handleInputChange } autoComplete='off' name='title' placeholder='Título' required />

					<label>Subtítulo </label>
					<input type='text' onChange={ handleInputChange } autoComplete='off' name='subtitle' placeholder='Subtítulo' />

					<label>Imagen principal</label>
					{ uniqueImage && (
						<figure className='unique-image'>
							<img src={ uniqueImage } alt='' />
						</figure>
					) }

					<input className='file-input' type='file' onChange={ handleFileChange } name='uniqueImage' />
					<label htmlFor=''>Galería de imágenes</label>
					<div className='gallery'>
						{ gallery?.map((picture, idx) => (
							<figure className='each-picture' key={ idx }>
								<img src={ picture } alt='' />
								<FaTimesCircle className='close-icon' onClick={ () => deletePicture(idx) } />
							</figure>
						)) }
					</div>

					<div className='button-file-group'>
						<input className='file-input' type='file' onChange={ handleGalleryChange } placeholder={ 'Añadir Foto' } name='gallery' />
						<button onClick={ handleAddGallery } className='my-btn mini third'>
							Añadir
						</button>
					</div>
				</div>

				<div className='right-side'>
					<label>Texto </label>
					<TextEditorSections setQuill={ setQuill } handleQuill={ handleQuill } setParsed={ setParsed } />

					<label htmlFor=''>Características</label>
					<div className='features'>
						{ features?.map((ft, idx) => (
							<div className='each-feat' key={ ft }>
								{ft }
								<FaTimesCircle onClick={ () => deleteFeature(idx) } />
							</div>
						)) }
					</div>
					<div className='button-input-group'>
						<input type='text' id='to-reset-section-features' onChange={ handleFeatureChange } placeholder={ 'Añadir Característica' } name='features' />
						<button onClick={ handleAddFeature } className='my-btn mini third'>
							Añadir
						</button>
					</div>

					<label>Inputs del formulario</label>
					<div className='features'>
						{ formInputs?.map((inp, idx) => (
							<div className='each-feat' key={ inp }>
								{inp }
								<FaTimesCircle onClick={ () => deleteFormInput(idx) } />
							</div>
						)) }
					</div>
					<div className='button-input-group'>
						<input type='text' id='to-reset-section-inputs' onChange={ handleChangeFormInput } placeholder={ 'Añadir Input' } name='formInputs' />
						<button onClick={ handleAddFormInput } className='my-btn mini third'>
							Añadir
						</button>
					</div>
				</div>
			</section>

			<form className='section-form' onSubmit={ handleSubmit }>
				<button className='my-btn mini' type='submit'>
					Guardar Datos
				</button>
			</form>
		</>
	)
}
