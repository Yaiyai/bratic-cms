import React from 'react'
import useForm from '../../../hooks/useForm'

const TitlesArea = ({ selectedPost, setSelectedPost }) => {
    const { values, handleInputChange, resetForm } = useForm({})

    const handleSubmit = (e) => {
        e.preventDefault()
        setSelectedPost(prevState => ({ ...prevState, title: values.title, subtitle: values.subtitle }))
        resetForm()
    }

    return (
        <article className="title-area">
            <form className='form-title' onSubmit={ handleSubmit }>
                <label htmlFor='title'>Título de la Entrada</label>
                <input id='title' type='text' name='title' onChange={ handleInputChange } placeholder={ selectedPost.title ?? 'Título de la entrada' } />
                <label htmlFor='subtitle'>Subtítulo de la Entrada</label>
                <input id='subtitle' type='text' name='subtitle' placeholder={ selectedPost.subtitle ?? 'Subtítulo de la entrada' } onChange={ handleInputChange } />
                <button className='my-btn mini third' type='submit'> Guardar títulos </button>
            </form>
        </article>
    )
}

export default TitlesArea
