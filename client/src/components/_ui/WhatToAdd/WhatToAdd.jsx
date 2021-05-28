import React from 'react'
import AddImage from '../../posts/content/AddImage'
import AddText from '../../posts/content/AddText'

const WhatToAdd = ({ auxContent, setAuxContent, select, postId, saveElement }) => {

    const addThis = ({ target }) => {
        switch (target.value) {
            case 'text':
                setAuxContent('text')
                break
            case 'image':
                setAuxContent('image')
                break
            default:
                setAuxContent('default')
                break
        }
    }


    return (
        <>
            <label>Tienes que añadir obligatoriamente, por lo menos, una imagen</label>
            <select ref={ select } onChange={ addThis }>
                <option value='default' defaultValue> Añadir Elemento a la entrada... </option>
                <option value='text'>Texto</option>
                <option value='image'>Imagen</option>
            </select>


            <article className='add-post'>
                { auxContent === 'text' && <AddText saveElement={ saveElement } postID={ postId } /> }
                { auxContent === 'image' && <AddImage saveElement={ saveElement } postID={ postId } /> }
            </article>
        </>
    )
}

export default WhatToAdd
