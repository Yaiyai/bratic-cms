import React from 'react'

const TitlesArea = ({ selectedPost, saveTitles, handleInputChange }) => {
    return (
        <article className="title-area">
            <form className='form-title' onSubmit={ saveTitles }>
                <label htmlFor='title'>Título de la Entrada</label>
                <input id='title' type='text' name='title' onChange={ handleInputChange } placeholder={ selectedPost.title } />
                <label htmlFor='subtitle'>Subtítulo de la Entrada</label>
                <input id='subtitle' type='text' name='subtitle' placeholder={ selectedPost.subtitle } onChange={ handleInputChange } />
                <button className='my-btn mini secondary' type='submit'>
                    Guardar títulos
                        </button>
            </form>
        </article>
    )
}

export default TitlesArea
