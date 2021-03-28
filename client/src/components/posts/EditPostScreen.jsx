import React, { useCallback, useEffect, useRef, useState } from 'react'
import { deletePost, getThisPost, updatePost } from '../../actions/posts.action'
import { useHistory } from "react-router-dom";
import useForm from '../../hooks/useForm';
import { deleteVideo } from '../../actions/post-content/video.action';
import { deleteImage } from '../../actions/post-content/image.action';
import { deleteText, findTextAndUpdate, findTextAndUpdateReturn } from '../../actions/post-content/text.action';
import { deleteSlider } from '../../actions/post-content/slider.action';
import { deleteGallery } from '../../actions/post-content/gallery.action';
import AddText from './content/AddText';
import AddImage from './content/AddImage';
import AddGallery from './content/AddGallery';
import AddVideo from './content/AddVideo';
import AddSlider from './content/AddSlider';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import useCounter from '../../hooks/useCounter';

const EditPostScreen = () => {
    let history = useHistory();
    const { counter, increment, decrement, setCounter } = useCounter(1)
    let params = useParams()
    const [postId, setPostId] = useState()
    const select = useRef()
    const [auxContent, setAuxContent] = useState('default')
    const { values, handleInputChange } = useForm()

    const [selectedPost, setSelectedPost] = useState({ title: 'Sin título', subtitle: '', content: { slider: [], image: [], text: [], video: [], gallery: [] } })
    const [content, setContent] = useState([])

    const orderContent = useCallback(() => {
        content.sort((a, b) => a.order - b.order)
    }, [content])


    const orderPreviousContent = async (id) => {
        const currentPost = await getThisPost(id)
        const postContent = currentPost.content
        let aux = []
        for (const content in postContent) {
            postContent[content].forEach(elm => aux.push(elm))
        }
        aux.sort((a, b) => a.order - b.order)
        setContent(aux)
        setCounter(aux.length + 1)
    }

    useEffect(() => {
        orderContent()
    }, [selectedPost, content, orderContent])

    const findCurrentPost = async (id) => {
        const currentPost = await getThisPost(id)
        setSelectedPost(currentPost)
    }

    const handleExit = (id) => {
        history.goBack()
    }

    const handleDeletePost = async (id) => {
        await deletePost(id)
        history.goBack()
    }

    const handleUpdatePost = async (id, content) => {
        await updatePost(id, content)
        history.goBack()
    }

    useEffect(() => {
        setPostId(params.postID)
        findCurrentPost(params.postID)
        orderPreviousContent(params.postID)
    }, [params.postID])

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

    const setToDefault = () => {
        select.current.selectedIndex = 0
        setAuxContent('default')
    }

    const saveElement = (type, element) => {
        switch (type) {
            case 'text':
                if (selectedPost.content.text.length > 0) {
                    const contentCopy = [...selectedPost.content.text, element]
                    setSelectedPost({ ...selectedPost, content: { ...selectedPost.content, text: contentCopy } })
                    setContent(c => [...c, element])
                    setToDefault()
                } else {
                    const contentCopy = [element]
                    setSelectedPost({ ...selectedPost, content: { ...selectedPost.content, text: contentCopy } })
                    setContent(c => [...c, element])
                    setToDefault()
                }
                break
            case 'image':
                if (selectedPost.content.image.length > 0) {
                    const contentCopy = [...selectedPost.content.image, element]
                    setSelectedPost({ ...selectedPost, content: { ...selectedPost.content, image: contentCopy } })
                    setContent(c => [...c, element])
                    setToDefault()
                } else {
                    const contentCopy = [element]
                    setSelectedPost({ ...selectedPost, content: { ...selectedPost.content, image: contentCopy } })
                    setContent(c => [...c, element])
                    setToDefault()
                }
                break
            case 'gallery':
                if (selectedPost.content.gallery.length > 0) {
                    const contentCopy = [...selectedPost.content.gallery, element]
                    setSelectedPost({ ...selectedPost, content: { ...selectedPost.content, gallery: contentCopy } })
                    setContent(c => [...c, element])
                    setToDefault()
                } else {
                    const contentCopy = [element]
                    setSelectedPost({ ...selectedPost, content: { ...selectedPost.content, gallery: contentCopy } })
                    setContent(c => [...c, element])
                    setToDefault()
                }
                break
            case 'video':
                if (selectedPost.content.video.length > 0) {
                    const contentCopy = [...selectedPost.content.video, element]
                    setSelectedPost({ ...selectedPost, content: { ...selectedPost.content, video: contentCopy } })
                    setContent(c => [...c, element])
                    setToDefault()
                } else {
                    const contentCopy = [element]
                    setSelectedPost({ ...selectedPost, content: { ...selectedPost.content, video: contentCopy } })
                    setContent(c => [...c, element])
                    setToDefault()
                }
                break
            case 'slider':
                if (selectedPost.content.slider.length > 0) {
                    const contentCopy = [...selectedPost.content.slider, element]
                    setSelectedPost({ ...selectedPost, content: { ...selectedPost.content, slider: contentCopy } })
                    setContent(c => [...c, element])
                    setToDefault()
                } else {
                    const contentCopy = [element]
                    setSelectedPost({ ...selectedPost, content: { ...selectedPost.content, slider: contentCopy } })
                    setContent(c => [...c, element])
                    setToDefault()
                }
                break
            default:
                break
        }
    }

    const saveTitles = (e) => {
        e.preventDefault()
        setSelectedPost({ ...selectedPost, title: values.title, subtitle: values.subtitle })
    }

    const deleteThis = (type, id, idx) => {
        switch (type) {
            case 'video':
                const videoCopy = [...selectedPost.content.video]
                videoCopy.splice(idx, 1)
                setSelectedPost({ ...selectedPost, content: { ...selectedPost.content, video: videoCopy } })
                deleteVideo(id)
                decrement()
                break
            case 'image':
                const imageCopy = [...selectedPost.content.image]
                imageCopy.splice(idx, 1)
                setSelectedPost({ ...selectedPost, content: { ...selectedPost.content, image: imageCopy } })
                deleteImage(id)
                decrement()
                break
            case 'text':
                const textCopy = [...selectedPost.content.text]
                textCopy.splice(idx, 1)
                setSelectedPost({ ...selectedPost, content: { ...selectedPost.content, text: textCopy } })
                deleteText(id)
                decrement()
                break
            case 'slider':
                const sliderCopy = [...selectedPost.content.slider]
                sliderCopy.splice(idx, 1)
                setSelectedPost({ ...selectedPost, content: { ...selectedPost.content, slider: sliderCopy } })
                deleteSlider(id)
                decrement()
                break
            case 'gallery':
                const galleryCopy = [...selectedPost.content.gallery]
                galleryCopy.splice(idx, 1)
                setSelectedPost({ ...selectedPost, content: { ...selectedPost.content, gallery: galleryCopy } })
                deleteGallery(id)
                decrement()
                break
            default:
                break
        }
    }

    //Drag and Drop Methods
    const drop = async (e) => {
        e.preventDefault()
        const tag = e.dataTransfer.getData('card_id')
        const card = document.getElementById(tag)

        card.style.display = 'block'
        e.target.appendChild(card)

        const spaceId = card.parentElement.id
        await findTextAndUpdate(tag, { order: spaceId })
        const updatedText = await findTextAndUpdateReturn(tag, { order: spaceId })
        const filteredArray = content.filter(elm => elm._id !== tag)
        setContent([...filteredArray, updatedText.text])
        orderContent()

    }

    const dragOverReceptor = (e) => {
        e.preventDefault()
    }
    const dragStart = (e) => {
        const target = e.target
        e.dataTransfer.setData('card_id', target.id)
        const tag = e.dataTransfer.getData('card_id')
        console.log(tag);

        setTimeout(() => {
            target.style.display = 'none'
            target.className = 'preview'
        }, 0)
    }

    const dragOver = (e) => {
        e.stopPropagation()
    }


    const renderByContentType = (contentType, content) => {
        switch (contentType) {
            case 'texto':
                return (
                    <div onDrop={ drop } onDragOver={ dragOverReceptor } id={ content.order } key={ content.order } className="receiving-container">
                        <p className="container-number">
                            { content.order }
                        </p>
                        <div className="preview post-text" key={ content._id } id={ content._id } onDragStart={ dragStart } onDragOver={ dragOver } draggable='true'>
                            <div dangerouslySetInnerHTML={ content.parsedText }></div>
                            <button className='my-btn mini underlined' onClick={ () => deleteThis('text', content._id) }>Borrar</button>
                        </div>
                    </div>
                )
            case 'imagen':
                return (
                    <div onDrop={ drop } onDragOver={ dragOverReceptor } id={ content.order } key={ content.order } className="receiving-container">
                        <p className="container-number">
                            { content.order }
                        </p>
                        <div className='preview post-simple-image' key={ content._id } id={ content._id } onDragStart={ dragStart } onDragOver={ dragOver } draggable='true'>
                            <img draggable='false' className='unique-image' src={ content.image } alt='' />
                            <button className='my-btn mini underlined' onClick={ () => deleteThis('image', content._id) }>Borrar</button>
                        </div>
                    </div>
                )
            case 'video':
                return (
                    <div onDrop={ drop } onDragOver={ dragOverReceptor } id={ content.order } key={ content.order } className="receiving-container">
                        <p className="container-number">
                            { content.order }
                        </p>
                        <div className='preview post-video' key={ content._id } id={ content._id } onDragStart={ dragStart } onDragOver={ dragOver } draggable='true'>
                            <video className='video-preview' src={ content.video } controls muted />
                            <button className='my-btn mini underlined' onClick={ () => deleteThis('video', content._id) }>Borrar</button>
                        </div>
                    </div>
                )
            case 'slider':
                return (
                    <div onDrop={ drop } onDragOver={ dragOverReceptor } id={ content.order } key={ content.order } className="receiving-container">
                        <p className="container-number">
                            { content.order }
                        </p>
                        <div className='preview post-slider' key={ content._id } onDragStart={ dragStart } onDragOver={ dragOver } draggable='true'>
                            <div className='gallery'>
                                { content.slides.map((picture, idx) => (
                                    <figure draggable='false' className='each-picture' key={ idx }>
                                        <img draggable='false' src={ picture } alt='' />
                                    </figure>
                                )) }
                            </div>
                            <button className='my-btn mini underlined' onClick={ () => deleteThis('slider', content._id) }>Borrar</button>
                        </div>
                    </div>
                )
            case 'galeria':
                return (
                    <div onDrop={ drop } onDragOver={ dragOverReceptor } id={ content.order } key={ content.order } className="receiving-container">
                        <p className="container-number">
                            { content.order }
                        </p>
                        <div className='preview post-gallery' id={ content._id } key={ content._id } onDragStart={ dragStart } onDragOver={ dragOver } draggable='true'>
                            <div className='gallery'>
                                { content.gallery.map((picture, idx) => (
                                    <figure draggable='false' className='each-picture' key={ idx }>
                                        <img draggable='false' src={ picture } alt='' />
                                    </figure>
                                )) }
                            </div>
                            <button className='my-btn mini underlined' onClick={ () => deleteThis('gallery', content._id) }>Borrar</button>
                        </div>
                    </div>
                )
            default:
                break
        }
    }

    return (
        <section id="add-posts-screen">
            <article className="post-btn-group">
                <p>¿Qué hacemos con la edición de éste post?</p>
                <button className="my-btn mini secondary" onClick={ () => handleDeletePost(postId) }>Borrar Entrada</button>
                <button className="my-btn mini third" onClick={ () => handleUpdatePost(postId, selectedPost) }>Guardar Entrada</button>
                <button className="my-btn mini" onClick={ () => handleExit() }>Salir</button>
            </article>
            <section className="edit-post">
                <div className="edit-area">
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
                        { auxContent === 'text' && <AddText saveElement={ saveElement } postID={ postId } counter={ counter } increment={ increment } /> }
                        { auxContent === 'image' && <AddImage saveElement={ saveElement } postID={ postId } counter={ counter } increment={ increment } /> }
                        { auxContent === 'gallery' && <AddGallery saveElement={ saveElement } postID={ postId } counter={ counter } increment={ increment } /> }
                        { auxContent === 'video' && <AddVideo saveElement={ saveElement } postID={ postId } counter={ counter } increment={ increment } /> }
                        { auxContent === 'slider' && <AddSlider saveElement={ saveElement } postID={ postId } counter={ counter } increment={ increment } /> }
                    </article>
                </div>
                <div className="view-area">
                    {
                        selectedPost.title && <h1>{ selectedPost.title }</h1>
                    }
                    {
                        selectedPost.subtitle && <h2>{ selectedPost.subtitle }</h2>
                    }
                    {
                        content.length > 0 && content.map((content) => renderByContentType(content.postType, content))
                    }
                </div>
            </section>
        </section>

    )
}

export default EditPostScreen
