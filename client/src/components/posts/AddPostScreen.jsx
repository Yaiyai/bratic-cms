import React, { useEffect, useRef, useState } from 'react'
import { deletePost, getThisPost, updatePost } from '../../actions/posts.action'
import { useHistory } from "react-router-dom";
import useForm from '../../hooks/useForm';
import { findVideoAndUpdate, findVideoAndUpdateReturn } from '../../actions/post-content/video.action';
import { findImageAndUpdate, findImageAndUpdateReturn } from '../../actions/post-content/image.action';
import { findTextAndUpdate, findTextAndUpdateReturn } from '../../actions/post-content/text.action';
import { findSliderAndUpdate, findSliderAndUpdateReturn } from '../../actions/post-content/slider.action';
import { findGalleryAndUpdate, findGalleryAndUpdateReturn } from '../../actions/post-content/gallery.action';
import AddText from './content/AddText';
import AddImage from './content/AddImage';
import AddGallery from './content/AddGallery';
import AddVideo from './content/AddVideo';
import AddSlider from './content/AddSlider';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import useCounter from '../../hooks/useCounter';
import RenderContentByType from './content/RenderContentByType';
import PostState from './content/PostState';

const AddPostScreen = () => {
    let history = useHistory();
    const { counter, increment, decrement, } = useCounter(1)
    let params = useParams()
    const [postId, setPostId] = useState()
    const select = useRef()
    const [auxContent, setAuxContent] = useState('default')
    const { values, handleInputChange } = useForm()

    const [content, setContent] = useState([])


    const [selectedPost, setSelectedPost] = useState({ title: 'Sin título', subtitle: '', content: { slider: [], image: [], text: [], video: [], gallery: [] } })


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

    const savePostState = (status) => {
        setSelectedPost({ ...selectedPost, status: status })
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


    //Drag and Drop Methods
    const drop = async (e) => {
        e.preventDefault()
        const tag = e.dataTransfer.getData('card_id')
        const card = document.getElementById(tag)
        const cardType = (e.dataTransfer.getData('card_type'));

        card.style.display = 'block'
        card.className = 'preview'

        e.target.appendChild(card)
        const spaceId = card.parentElement.id
        let filteredArray = []
        let orderedNew = []

        switch (cardType) {
            case 'text':
                await findTextAndUpdate(tag, { order: spaceId })
                const updatedText = await findTextAndUpdateReturn(tag, { order: spaceId })
                filteredArray = content.filter(elm => elm._id !== tag)
                orderedNew = [...filteredArray, updatedText.text].sort((a, b) => a.order - b.order)
                setContent(orderedNew)

                break;
            case 'imagen':
                await findImageAndUpdate(tag, { order: spaceId })
                const updatedImage = await findImageAndUpdateReturn(tag, { order: spaceId })
                filteredArray = content.filter(elm => elm._id !== tag)
                orderedNew = [...filteredArray, updatedImage.image].sort((a, b) => a.order - b.order)
                setContent(orderedNew)

                break;
            case 'gallery':
                await findGalleryAndUpdate(tag, { order: spaceId })
                const updatedGallery = await findGalleryAndUpdateReturn(tag, { order: spaceId })
                filteredArray = content.filter(elm => elm._id !== tag)
                orderedNew = [...filteredArray, updatedGallery.gallery].sort((a, b) => a.order - b.order)
                setContent(orderedNew)

                break;
            case 'video':
                await findVideoAndUpdate(tag, { order: spaceId })
                const updatedVideo = await findVideoAndUpdateReturn(tag, { order: spaceId })
                filteredArray = content.filter(elm => elm._id !== tag)
                orderedNew = [...filteredArray, updatedVideo.video].sort((a, b) => a.order - b.order)
                setContent(orderedNew)

                break;
            case 'slider':
                await findSliderAndUpdate(tag, { order: spaceId })
                const updatedSlider = await findSliderAndUpdateReturn(tag, { order: spaceId })
                filteredArray = content.filter(elm => elm._id !== tag)
                orderedNew = [...filteredArray, updatedSlider.slider].sort((a, b) => a.order - b.order)
                setContent(orderedNew)

                break;
            default:
                break;
        }



    }

    const dragOverReceptor = (e) => {
        e.preventDefault()
    }

    const dragStart = (e) => {
        const target = e.target
        e.dataTransfer.setData('card_id', target.id)
        e.dataTransfer.setData('card_type', target.attributes.posttype.value)

        setTimeout(() => {
            target.style.display = 'none'
            target.className = 'preview'
        }, 0)
    }

    const dragOver = (e) => {
        e.stopPropagation()
    }



    return (
        <section id="add-posts-screen">
            <article className="post-btn-group">
                <p>¿Qué hacemos con éste post?</p>
                <button className="my-btn mini secondary" onClick={ () => handleDeletePost(postId) }>Borrar Entrada</button>
                <button className="my-btn mini third" onClick={ () => handleUpdatePost(postId, selectedPost) }>Guardar Entrada</button>
                <button className="my-btn mini" onClick={ () => handleExit() }>Salir</button>
            </article>
            <section className="edit-post">
                <div className="edit-area">
                    <PostState savePostState={ savePostState } postState={ selectedPost.status } />
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
                        { auxContent === 'text' && <AddText saveElement={ saveElement } postID={ postId } increment={ increment } /> }
                        { auxContent === 'image' && <AddImage saveElement={ saveElement } postID={ postId } increment={ increment } /> }
                        { auxContent === 'gallery' && <AddGallery saveElement={ saveElement } postID={ postId } increment={ increment } /> }
                        { auxContent === 'video' && <AddVideo saveElement={ saveElement } postID={ postId } increment={ increment } /> }
                        { auxContent === 'slider' && <AddSlider saveElement={ saveElement } postID={ postId } increment={ increment } /> }
                    </article>
                    <article className="content-to-order">
                        <h6>Contenido generado para ordenar</h6>
                        {
                            content.length > 0 && <RenderContentByType content={ content } dragStart={ dragStart } dragOver={ dragOver } decrement={ decrement } />
                        }
                    </article>
                </div>
                <div className="view-area">
                    {
                        selectedPost.title && <h1>{ selectedPost.title }</h1>
                    }
                    {
                        selectedPost.subtitle && <h2>{ selectedPost.subtitle }</h2>
                    }
                    <h6>Orden de aparicion de los elementos</h6>
                    { [...Array(counter)].map((elm, idx) => (
                        idx !== 0 && (
                            <div onDrop={ drop } onDragOver={ dragOverReceptor } id={ idx } key={ `contenedor-${idx}` } className="receiving-container">
                                <p className="container-number">
                                    { idx }
                                </p>
                            </div>
                        )
                    ))
                    }

                </div>
            </section>
        </section>

    )
}

export default AddPostScreen
