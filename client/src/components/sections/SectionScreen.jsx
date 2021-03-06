import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import useForm from '../../hooks/useForm'

import { deleteSection, updateSection } from '../../actions/sections.action'

import { types } from '../../types/types'
import { AuthContext } from '../../reducers/auth/AuthContext'
import { SectionContext } from '../../reducers/sections/sectionsContext'

import { fileUpload } from '../../helpers/uploadFiles'

import { EditGroupSection } from './EditGroupSection'

import Swal from 'sweetalert2'
import { FaTimesCircle } from "react-icons/fa";
import TextEditorSections from '../_ui/TextEditor/TextEditorSections'
import SectionTitle from '../_ui/SectionTitle/SectionTitle'

export const SectionScreen = () => {
	const { user } = useContext(AuthContext)
	const { dispatchSections, sections } = useContext(SectionContext)
	const { id } = useParams()
	const { values, setValues, handleInputChange, handleFileChange } = useForm()
	const { title, text, parsedText, subtitle, _id: idSection, uniqueImage, gallery, features, formInputs } = values
	const history = useHistory()
	let thisSection = useRef()
	const [auxValue, setAuxValue] = useState()
	const [quill, setQuill] = useState()
	const [parsed, setParsed] = useState()

	const handleQuill = (e) => {
		e.preventDefault()
		setValues({
			...values,
			text: quill,
			parsedText: parsed,
		})
	}

	useEffect(() => {
		if (sections.length > 0) {
			thisSection.current = sections.find((sect) => sect._id === id)
			setValues(thisSection.current)
		}
	}, [id, sections, setValues])

	const clearInput = (input) => {
		const theinput = document.getElementById(input)
		theinput.value = ''
	}

	//Features
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
			clearInput('to-reset-features')
		} else if (!features?.includes(auxValue)) {
			setValues({
				...values,
				features: [...features, auxValue],
			})
			clearInput('to-reset-features')
		}
		clearInput('to-reset-features')
	}

	//Galeria
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

	//Form inputs
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
			clearInput('to-reset-inputs')
		} else if (!formInputs?.includes(auxValue)) {
			setValues({
				...values,
				formInputs: [...formInputs, auxValue],
			})
			clearInput('to-reset-inputs')
		}
		clearInput('to-reset-inputs')
	}

	//Borrar propiedades

	const handleDelete = async () => {
		history.push('/bratic')
		const sectionGroup = await deleteSection(id)
		dispatchSections({ type: types.deleteSection, payload: sectionGroup })
	}

	const deleteField = async (property) => {
		setValues({
			...values,
			[property]: '',
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
	}

	const saveChanges = async () => {
		const sectionUpdated = await updateSection(values, idSection)
		if (!sectionUpdated) {
			Swal.fire('¡Oh-oh!', 'Ha habido un error, inténtalo de nuevo', 'error')
		} else {
			Swal.fire('¡Chachi!', 'Los cambios han sido guardados', 'success')
			dispatchSections({ type: types.sectionUpdate, payload: sectionUpdated })
			history.push('/bratic')
		}
	}

	return (
		<>
			<section className='section-screen'>
				<SectionTitle
					image='https://res.cloudinary.com/bratic-app/image/upload/v1621687077/web/blog-login-image_n0ocyy.svg'
					title="Estás editando esta sección"
					instructions={ values?.sectionName }
				/>

				<button className='my-btn mini' onClick={ saveChanges }>
					Guardar Cambios
				</button>

				{ user.email === 'admin@yai.com' && (
					<button className='my-btn mini danger' onClick={ handleDelete }>
						Borrar esta sección
					</button>
				) }

				{ (title || title === '') && (
					<EditGroupSection nameValue={ 'title' } deleteField={ deleteField } inputType='text' editLabel={ 'Título' } editAction={ handleInputChange } editValue={ values?.title } submitEdit={ handleSubmit } />
				) }
				{ subtitle && (
					<EditGroupSection
						nameValue={ 'subtitle' }
						deleteField={ deleteField }
						inputType='text'
						editLabel={ 'Subtítulo' }
						editAction={ handleInputChange }
						editValue={ values?.subtitle }
						submitEdit={ handleSubmit }
					/>
				) }
				{ uniqueImage && (
					<EditGroupSection
						imageEdit={ true }
						nameValue={ 'uniqueImage' }
						deleteField={ deleteField }
						inputType='file'
						editLabel={ 'Imagen principal' }
						editAction={ handleFileChange }
						editValue={ values?.uniqueImage }
						submitEdit={ handleSubmit }
					/>
				) }

				{ gallery?.length > 0 && (
					<div className='edit-gallery'>
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
							<button onClick={ handleAddGallery } className='my-btn mini'>
								Añadir
							</button>
						</div>
					</div>
				) }

				{ features?.length > 0 && (
					<div className='edit-features'>
						<div className='features'>
							{ features?.map((ft, idx) => (
								<div className='each-feat' key={ ft }>
									{ft }
									<FaTimesCircle onClick={ () => deleteFeature(idx) } />
								</div>
							)) }
						</div>
						<div className='button-input-group'>
							<input type='text' id='to-reset-features' onChange={ handleFeatureChange } placeholder={ 'Añadir Característica' } name='features' />
							<button onClick={ handleAddFeature } className='my-btn mini'>
								Añadir
							</button>
						</div>
					</div>
				) }
				{ formInputs?.length > 0 && (
					<div className='edit-features'>
						<div className='features'>
							{ formInputs?.map((inp, idx) => (
								<div className='each-feat' key={ inp }>
									{inp }
									<FaTimesCircle onClick={ () => deleteFormInput(idx) } />
								</div>
							)) }
						</div>
						<div className='button-input-group'>
							<input type='text' id='to-reset-inputs' onChange={ handleChangeFormInput } placeholder={ 'Añadir Input' } name='formInputs' />
							<button onClick={ handleAddFormInput } className='my-btn mini'>
								Añadir
							</button>
						</div>
					</div>
				) }
				{ text && (
					<>
						<section className='edit-group text-editor-group'>
							<p>Texto:</p>
							<div dangerouslySetInnerHTML={ parsedText }></div>
						</section>
						<TextEditorSections setQuill={ setQuill } handleQuill={ handleQuill } setParsed={ setParsed } />
					</>
				) }
			</section>
		</>
	)
}
