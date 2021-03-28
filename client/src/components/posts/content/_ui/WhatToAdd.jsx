import React from 'react'
import AddGallery from '../AddGallery'
import AddImage from '../AddImage'
import AddSlider from '../AddSlider'
import AddText from '../AddText'
import AddVideo from '../AddVideo'

const WhatToAdd = ({ auxContent, setAuxContent, select, postId, saveElement, increment }) => {

    const addThis = ({ target }) => {
        switch (target.value) {
            case 'text':
                setAuxContent('text')
                break
            case 'image':
                setAuxContent('image')
                break
            case 'gallery':
                setAuxContent('gallery')
                break
            case 'video':
                setAuxContent('video')
                break
            case 'slider':
                setAuxContent('slider')
                break
            default:
                setAuxContent('default')
                break
        }
    }


    return (
        <>
            <select ref={ select } onChange={ addThis } name='content' placeholder='Añadir...'>
                <option value='default' defaultValue> Añadir... </option>
                <option value='text'>Texto</option>
                <option value='image'>Imagen única</option>
                <option value='gallery'>Galería de imágenes</option>
                <option value='slider'>Slider</option>
                <option value='video'>Vídeo</option>
            </select>


            <article className='add-post'>
                { auxContent === 'default' && <p>Añadir elemento al post</p> }
                { auxContent === 'text' && <AddText saveElement={ saveElement } postID={ postId } increment={ increment } /> }
                { auxContent === 'image' && <AddImage saveElement={ saveElement } postID={ postId } increment={ increment } /> }
                { auxContent === 'gallery' && <AddGallery saveElement={ saveElement } postID={ postId } increment={ increment } /> }
                { auxContent === 'video' && <AddVideo saveElement={ saveElement } postID={ postId } increment={ increment } /> }
                { auxContent === 'slider' && <AddSlider saveElement={ saveElement } postID={ postId } increment={ increment } /> }
            </article>
        </>
    )
}

export default WhatToAdd
