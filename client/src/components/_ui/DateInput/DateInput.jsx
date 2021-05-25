import React from 'react'

const DateInput = ({ selectedPost, saveDate, handleInputChange }) => {
    return (
        <article className="title-area">
            <form className='form-title' onSubmit={ saveDate }>
                <label htmlFor='postDate'>¿Quieres modificar la fecha de publicación? Por defecto saldrá la fecha de creación de la entrada.</label>
                <input id='postDate' type='date' name='postDate' onChange={ handleInputChange } />
                <button className='my-btn mini third' type='submit'> Guardar nueva fecha </button>
            </form>
        </article>
    )
}

export default DateInput
