import React, { useCallback, useEffect, useState } from 'react'
import { EditGroup } from './EditGroup'
import useForm from './../../hooks/useForm'
import { deleteCompany, fetchCompany, updateCompany } from './../../actions/company.action'
import Swal from 'sweetalert2'
import SectionTitle from '../_ui/SectionTitle/SectionTitle'
import { FaTimesCircle } from "react-icons/fa";

export const UpdateCompany = () => {
	const [auxValue, setAuxValue] = useState()
	const { values: myCompany, setValues, handleInputChange, handleFileChange } = useForm()

	// const [myCompany, setValues] = useState()

	const getMyCompany = useCallback(async () => {
		let company = await fetchCompany()
		setValues(company[0])
	}, [setValues])

	useEffect(() => {
		getMyCompany()
	}, [getMyCompany])

	const handleDelete = async () => {
		await deleteCompany(myCompany?._id)

	}
	const clearInput = () => {
		const theinput = document.getElementById('to-reset-category')
		theinput.value = ''
	}
	const askIfDelete = () => {
		Swal.fire({
			title: '¿Seguro?',
			text: 'Si borras esto, no habrá datos de empresa',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '¡Borrar Empresa!',
			cancelButtonText: '¡Uy, no!',
		}).then((result) => {
			if (result.isConfirmed) {
				handleDelete()
				Swal.fire('¡Empresa borrada!', 'Esta empresa se marchó para no volver', 'success')
			}
		})
	}
	const handleAddFeature = (e) => {
		e.preventDefault()
		if (!myCompany?.categories.includes(auxValue)) {
			setValues(company => ({
				...company,
				categories: [...myCompany?.categories, auxValue],
			}))
			clearInput()
		}
		clearInput()
	}
	const handleFeatureChange = (e) => {
		setAuxValue(e.target.value)
	}

	const deleteFeature = (idx) => {
		const categoriesCopy = [...myCompany?.categories]
		categoriesCopy.splice(idx, 1)
		setValues(company => ({
			...company,
			categories: [categoriesCopy],
		}))
	}


	const deleteField = async (property) => {
		setValues(company => ({
			...company,
			[property]: '',
		}))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
	}

	const saveChanges = async () => {
		await updateCompany(myCompany._id, myCompany)
	}

	return (
		<>
			<SectionTitle
				image='https://res.cloudinary.com/bratic-app/image/upload/v1621695927/web/company_ppk0jk.svg'
				title="Datos de empresa"
				instructions="Aquí puedes editar los datos de tu empresa :)"
			/>

			<button className='my-btn mini' onClick={ saveChanges }>
				Guardar Cambios
			</button>
			<button className='my-btn danger mini' onClick={ askIfDelete }>
				Borrar esta empresa
			</button>

			<div className='editing'>
				<EditGroup deleteField={ deleteField } nameValue={ 'name' } inputType={ 'text' } editLabel={ 'Nombre de empresa' } editAction={ handleInputChange } editValue={ myCompany?.name } submitEdit={ handleSubmit } />
				<EditGroup deleteField={ deleteField } nameValue={ 'address' } inputType={ 'text' } editLabel={ 'Dirección' } editAction={ handleInputChange } editValue={ myCompany?.address } submitEdit={ handleSubmit } />
				<EditGroup deleteField={ deleteField } nameValue={ 'phone' } inputType={ 'text' } editLabel={ 'Teléfono principal' } editAction={ handleInputChange } editValue={ myCompany?.phone } submitEdit={ handleSubmit } />
				<EditGroup deleteField={ deleteField } nameValue={ 'mainEmail' } inputType={ 'email' } editLabel={ 'Email principal' } editAction={ handleInputChange } editValue={ myCompany?.mainEmail } submitEdit={ handleSubmit } />
				<EditGroup
					deleteField={ deleteField }
					nameValue={ 'mainLogo' }
					imageEdit={ true }
					inputType={ 'file' }
					editLabel={ 'Logo Principal' }
					editAction={ handleFileChange }
					editValue={ myCompany?.mainLogo }
					submitEdit={ handleSubmit }
				/>
				<EditGroup
					deleteField={ deleteField }
					nameValue={ 'secondaryLogo' }
					imageEdit={ true }
					inputType={ 'file' }
					editLabel={ 'Logo BN' }
					editAction={ handleFileChange }
					editValue={ myCompany?.secondaryLogo }
					submitEdit={ handleSubmit }
				/>
				<EditGroup deleteField={ deleteField } nameValue={ 'twitter' } inputType={ 'text' } editLabel={ 'Twitter Url' } editAction={ handleInputChange } editValue={ myCompany?.twitter } submitEdit={ handleSubmit } />
				<EditGroup deleteField={ deleteField } nameValue={ 'facebook' } inputType={ 'text' } editLabel={ 'Facebook url' } editAction={ handleInputChange } editValue={ myCompany?.facebook } submitEdit={ handleSubmit } />
				<EditGroup deleteField={ deleteField } nameValue={ 'instagram' } inputType={ 'text' } editLabel={ 'Instagram Url' } editAction={ handleInputChange } editValue={ myCompany?.instagram } submitEdit={ handleSubmit } />
				<EditGroup deleteField={ deleteField } nameValue={ 'linkedin' } inputType={ 'text' } editLabel={ 'Linkedin Url' } editAction={ handleInputChange } editValue={ myCompany?.linkedin } submitEdit={ handleSubmit } />
				<div className='edit-group categories'>
					<p className='maq-cat-title'>Categorías de posts:</p>
					<div className='features'>
						{ myCompany?.categories?.map((ft, idx) => (
							<div className='each-feat' key={ ft + idx }>
								{ft }
								<FaTimesCircle onClick={ () => deleteFeature(idx) } />
							</div>
						)) }
					</div>
					<div className='button-input-group'>
						<input type='text' id='to-reset-category' onChange={ handleFeatureChange } placeholder={ 'Añadir Categoría' } name='features' />
						<button className='my-btn mini third' onClick={ handleAddFeature }>
							Añadir
						</button>
					</div>
				</div>
			</div>
		</>
	)
}
