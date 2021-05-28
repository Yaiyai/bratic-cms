import React from 'react'
import useForm from '../../../hooks/useForm'

const DateInput = ({ setSelectedPost }) => {
    const { values, handleInputChange, resetForm } = useForm({})

    const handleSubmit = (e) => {
        e.preventDefault()
        setSelectedPost(prevState => ({ ...prevState, postDate: values.postDate }))
        resetForm()
    }

    return (
        <article className="title-area">
            <form className='form-title' onSubmit={ handleSubmit }>
                <label htmlFor='postDate'>¿Quieres modificar la fecha de publicación? Por defecto saldrá la fecha de creación de la entrada.</label>
                <input id='postDate' type='date' name='postDate' onChange={ handleInputChange } />
                <button className='my-btn mini third' type='submit'> Guardar nueva fecha </button>
            </form>
        </article>
    )
}

export default DateInput
