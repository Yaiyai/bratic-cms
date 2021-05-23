import React from 'react'

const ImageType = ({ setSelectedPost }) => {
    const handleImagesType = ({ target }) => {

        switch (target.value) {
            case 'galeria':
                setSelectedPost(selectedPost => ({ ...selectedPost, isGallery: true, isSlider: false }))
                break;
            case 'slider':
                setSelectedPost(selectedPost => ({ ...selectedPost, isGallery: false, isSlider: true }))
                break;
            default:
                setSelectedPost(selectedPost => ({ ...selectedPost, isGallery: false, isSlider: false }))
                break;
        }

    }

    return (
        <>
            <label>Has añadido más de una imagen, ¿Cómo quieres que aparezcan en la entrada?</label>
            <select name='images-view' onChange={ handleImagesType } placeholder='Galería/Slider'>
                <option value='default' defaultValue> Galería/Slider </option>
                <option value='slider'>Slider</option>
                <option value='galeria'>Galería</option>
            </select>
        </>
    )
}

export default ImageType
