import React, { useEffect, useState } from 'react'
import { deleteText } from '../../../../actions/post-content/text.action'
import { deleteImage } from '../../../../actions/post-content/image.action'

const RenderContentByType = ({ content, setContent }) => {

    const [newContent, setNewContent] = useState([])

    useEffect(() => {
        setNewContent(content)
    }, [content])

    const updatedContent = (id) => {
        let filteredArray = newContent.filter(elm => elm._id !== id)
        setNewContent(filteredArray)
        setContent(filteredArray)
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
            default:
                break
        }
    }
    const renderByContentType = (contentType, content) => {
        switch (contentType) {
            case 'texto':
                return (
                    <div key={ content._id } className="receiving-container">

                        <div posttype="texto" className="preview post-text" id={ content._id }>
                            <p><strong>Tipo de contenido:</strong> Texto</p>
                            <hr />
                            <div className="text" dangerouslySetInnerHTML={ content.parsedText }></div>
                            <button className='my-btn mini underlined' onClick={ () => deleteThis('text', content._id) }>Borrar</button>
                        </div>
                    </div>
                )
            case 'imagen':
                return (
                    <div key={ content._id } className="receiving-container">
                        <div posttype="imagen" className='preview post-simple-image' id={ content._id }>
                            <p><strong>Tipo de contenido:</strong> Imagen Única</p>
                            <hr />
                            <img draggable='false' className='unique-image' src={ content.image } alt='' />
                            <button className='my-btn mini underlined' onClick={ () => deleteThis('image', content._id) }>Borrar</button>
                        </div>
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
