import React from 'react'
import { addCompany } from './../../actions/company.action'
import useForm from '../../hooks/useForm'
import SectionTitle from '../_ui/SectionTitle/SectionTitle'

const AddCompany = () => {
	const { values, handleInputChange, handleFileChange } = useForm({})

	const handleSubmit = async (e) => {
		await addCompany(values)
	}

	return (
		<>
			<SectionTitle
				image='https://res.cloudinary.com/bratic-app/image/upload/v1621695927/web/company_ppk0jk.svg'
				title="Añadir Empresa"
				instructions="Añade los datos de tu empresa :)"
			/>
			<form className='add-form' onSubmit={ handleSubmit }>
				<input type='text' name='name' placeholder='Nombre de la empresa' onChange={ handleInputChange } />
				<input type='email' name='mainEmail' placeholder='Correo Principal' onChange={ handleInputChange } />
				<input type='text' name='phone' placeholder='Teléfono principal' onChange={ handleInputChange } />
				<input type='text' name='address' placeholder='Dirección' onChange={ handleInputChange } />
				<input type='text' name='linkedin' placeholder='URL Linkedin' onChange={ handleInputChange } />
				<input type='text' name='facebook' placeholder='URL Facebook' onChange={ handleInputChange } />
				<input type='text' name='instagram' placeholder='URL Instagram' onChange={ handleInputChange } />
				<input type='text' name='twitter' placeholder='URL Twitter' onChange={ handleInputChange } />
				<div className='input-images'>
					<div>
						<label htmlFor='mainLogo'>Logo principal</label>
						<input type='file' className='file-input' name='mainLogo' id='mainLogo' placeholder='Logo Principal' onChange={ handleFileChange } />
					</div>
					<div>
						<label htmlFor='secondaryLogo'>Logo en BN</label>
						<input type='file' className='file-input' name='secondaryLogo' id='secondaryLogo' placeholder='Logo Secundario' onChange={ handleFileChange } />
					</div>
				</div>
				<button className='my-btn mini' type='submit'>
					Crear empresa
				</button>
			</form>
		</>
	)
}

export default AddCompany
