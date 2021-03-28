import React, { useEffect, useState } from 'react'
import { deleteGallery } from '../../../../actions/post-content/gallery.action';
import { deleteText } from '../../../../actions/post-content/text.action';
import { deleteSlider } from '../../../../actions/post-content/slider.action';
import { deleteVideo } from '../../../../actions/post-content/video.action';
import { deleteImage } from '../../../../actions/post-content/image.action';

const RenderContentByType = ({ content, setContent, dragOver, dragStart, decrement }) => {

    const [newContent, setNewContent] = useState([])

    useEffect(() => {
        setNewContent(content)
    }, [content]);

    const updatedContent = (id) => {
        let filteredArray = newContent.filter(elm => elm._id !== id)
        setNewContent(filteredArray)
        setContent(filteredArray)
        decrement()
    }

    const deleteThis = async (type, id) => {
        switch (type) {
            case 'text':
                await deleteText(id)
                updatedContent(id)
                break
            case 'image':
                await deleteImage(id)
                updatedContent(id)
                break
            case 'video':
                await deleteVideo(id)
                updatedContent(id)
                break
            case 'slider':
                await deleteSlider(id)
                updatedContent(id)
                break
            case 'gallery':
                await deleteGallery(id)
                updatedContent(id)
                break

            default:
                break;
        }
    }
    const renderByContentType = (contentType, content) => {
        switch (contentType) {
            case 'texto':
                return (
                    <div key={ content._id } posttype="texto" className="preview post-text" id={ content._id } onDragStart={ dragStart } onDragOver={ dragOver } draggable='true'>
                        <p><strong>Tipo de contenido:</strong> Texto</p>
                        <p><strong>Orden de aparición:</strong> { content.order }</p>
                        <hr />
                        <div dangerouslySetInnerHTML={ content.parsedText }></div>
                        <button className='my-btn mini underlined' onClick={ () => deleteThis('text', content._id) }>Borrar</button>
                    </div>
                )
            case 'imagen':
                return (
                    <div key={ content._id } posttype="imagen" className='preview post-simple-image' id={ content._id } onDragStart={ dragStart } onDragOver={ dragOver } draggable='true'>
                        <p><strong>Tipo de contenido:</strong> Imagen simple</p>
                        <p><strong>Orden de aparición:</strong> { content.order }</p>
                        <hr />
                        <img draggable='false' className='unique-image' src={ content.image } alt='' />
                        <button className='my-btn mini underlined' onClick={ () => deleteThis('image', content._id) }>Borrar</button>
                    </div>
                )
            case 'video':
                return (
                    <div key={ content._id } posttype="video" className='preview post-video' id={ content._id } onDragStart={ dragStart } onDragOver={ dragOver } draggable='true'>
                        <p><strong>Tipo de contenido:</strong> Vídeo</p>
                        <p><strong>Orden de aparición:</strong> { content.order }</p>
                        <hr />
                        <video draggable='false' className='video-preview' src={ content.video } controls muted />
                        <button className='my-btn mini underlined' onClick={ () => deleteThis('video', content._id) }>Borrar</button>
                    </div>
                )
            case 'slider':
                return (
                    <div key={ content._id } posttype="slider" className='preview post-slider' onDragStart={ dragStart } onDragOver={ dragOver } draggable='true'>
                        <p><strong>Tipo de contenido:</strong> Slider</p>
                        <p><strong>Orden de aparición:</strong> { content.order }</p>
                        <hr />
                        <div className='gallery'>
                            { content.slides.map((picture, idx) => (
                                <figure draggable='false' className='each-picture' key={ idx }>
                                    <img draggable='false' src={ picture } alt='' />
                                </figure>
                            )) }
                        </div>
                        <button className='my-btn mini underlined' onClick={ () => deleteThis('slider', content._id) }>Borrar</button>
                    </div>
                )
            case 'galeria':
                return (
                    <div key={ content._id } posttype="galeria" className='preview post-gallery' id={ content._id } onDragStart={ dragStart } onDragOver={ dragOver } draggable='true'>
                        <p><strong>GTipo de contenido:</strong> alería</p>
                        <p><strong>Orden de aparición:</strong> { content.order }</p>
                        <hr />>
                        <div className='gallery'>
                            { content.gallery.map((picture, idx) => (
                                <figure draggable='false' className='each-picture' key={ idx }>
                                    <img draggable='false' src={ picture } alt='' />
                                </figure>
                            )) }
                        </div>
                        <button className='my-btn mini underlined' onClick={ () => deleteThis('gallery', content._id) }>Borrar</button>
                    </div>
                )
            default:
                break
        }
    }

    return (
        <>
            {newContent.length > 0 && newContent.map(content => renderByContentType(content.postType, content)) }
        </>
    )
}

export default RenderContentByType
