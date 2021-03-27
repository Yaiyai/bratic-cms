import React, { useEffect, useRef, useState } from 'react'
import { deletePost, getThisPost, updatePost } from '../../actions/posts.action'
import { useHistory } from "react-router-dom";
import useForm from '../../hooks/useForm';
import { deleteVideo } from '../../actions/post-content/video.action';
import { deleteImage } from '../../actions/post-content/image.action';
import { deleteText } from '../../actions/post-content/text.action';
import { deleteSlider } from '../../actions/post-content/slider.action';
import { deleteGallery } from '../../actions/post-content/gallery.action';
import AddText from './content/AddText';
import AddImage from './content/AddImage';
import AddGallery from './content/AddGallery';
import AddVideo from './content/AddVideo';
import AddSlider from './content/AddSlider';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const AddPostScreen = () => {
    let history = useHistory();
    let params = useParams()
    const [postId, setPostId] = useState()
    const select = useRef()
    const [auxContent, setAuxContent] = useState('default')
    const { values, handleInputChange } = useForm()

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

    const saveElement = (type, element) => {
        switch (type) {
            case 'text':
                if (selectedPost.content.text.length > 0) {
                    const contentCopy = [...selectedPost.content.text, element]
                    setSelectedPost({ ...selectedPost, content: { ...selectedPost.content, text: contentCopy } })
                    setToDefault()
                } else {
                    const contentCopy = [element]
                    setSelectedPost({ ...selectedPost, content: { ...selectedPost.content, text: contentCopy } })
                    setToDefault()
                }
                break
            case 'image':
                if (selectedPost.content.image.length > 0) {
                    const contentCopy = [...selectedPost.content.image, element]
                    setSelectedPost({ ...selectedPost, content: { ...selectedPost.content, image: contentCopy } })
                    setToDefault()
                } else {
                    const contentCopy = [element]
                    setSelectedPost({ ...selectedPost, content: { ...selectedPost.content, image: contentCopy } })
                    setToDefault()
                }
                break
            case 'gallery':
                if (selectedPost.content.gallery.length > 0) {
                    const contentCopy = [...selectedPost.content.gallery, element]
                    setSelectedPost({ ...selectedPost, content: { ...selectedPost.content, gallery: contentCopy } })
                    setToDefault()
                } else {
                    const contentCopy = [element]
                    setSelectedPost({ ...selectedPost, content: { ...selectedPost.content, gallery: contentCopy } })
                    setToDefault()
                }
                break
            case 'video':
                if (selectedPost.content.video.length > 0) {
                    const contentCopy = [...selectedPost.content.video, element]
                    setSelectedPost({ ...selectedPost, content: { ...selectedPost.content, video: contentCopy } })
                    setToDefault()
                } else {
                    const contentCopy = [element]
                    setSelectedPost({ ...selectedPost, content: { ...selectedPost.content, video: contentCopy } })
                    setToDefault()
                }
                break
            case 'slider':
                if (selectedPost.content.slider.length > 0) {
                    const contentCopy = [...selectedPost.content.slider, element]
                    setSelectedPost({ ...selectedPost, content: { ...selectedPost.content, slider: contentCopy } })
                    setToDefault()
                } else {
                    const contentCopy = [element]
                    setSelectedPost({ ...selectedPost, content: { ...selectedPost.content, slider: contentCopy } })
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
                break
            case 'image':
                const imageCopy = [...selectedPost.content.image]
                imageCopy.splice(idx, 1)
                setSelectedPost({ ...selectedPost, content: { ...selectedPost.content, image: imageCopy } })
                deleteImage(id)
                break
            case 'text':
                const textCopy = [...selectedPost.content.text]
                textCopy.splice(idx, 1)
                setSelectedPost({ ...selectedPost, content: { ...selectedPost.content, text: textCopy } })
                deleteText(id)
                break
            case 'slider':
                const sliderCopy = [...selectedPost.content.slider]
                sliderCopy.splice(idx, 1)
                setSelectedPost({ ...selectedPost, content: { ...selectedPost.content, slider: sliderCopy } })
                deleteSlider(id)
                break
            case 'gallery':
                const galleryCopy = [...selectedPost.content.gallery]
                galleryCopy.splice(idx, 1)
                setSelectedPost({ ...selectedPost, content: { ...selectedPost.content, gallery: galleryCopy } })
                deleteGallery(id)
                break
            default:
                break
        }
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
                        { auxContent === 'text' && <AddText saveElement={ saveElement } postID={ postId } /> }
                        { auxContent === 'image' && <AddImage saveElement={ saveElement } postID={ postId } /> }
                        { auxContent === 'gallery' && <AddGallery saveElement={ saveElement } postID={ postId } /> }
                        { auxContent === 'video' && <AddVideo saveElement={ saveElement } postID={ postId } /> }
                        { auxContent === 'slider' && <AddSlider saveElement={ saveElement } postID={ postId } /> }
                    </article>
                </div>
                <div className="view-area">
                    <article className='right'>
                        {
                            selectedPost.title && <h1>{ selectedPost.title }</h1>
                        }
                        {
                            selectedPost.subtitle && <h1>{ selectedPost.subtitle }</h1>
                        }
                        { selectedPost.content.text.length > 0 && (
                            <div className='preview post-text'>
                                <h6>Textos</h6>
                                {selectedPost.content.text.map((txt, idx) => (
                                    <div key={ txt._id }>
                                        <div dangerouslySetInnerHTML={ txt.parsedText }></div>
                                        <button className='my-btn mini underlined' onClick={ () => deleteThis('text', txt._id, idx) }>
                                            Borrar
										</button>
                                    </div>
                                )) }
                            </div>
                        ) }
                        { selectedPost.content.image.length > 0 && (
                            <div className='preview post-simple-image'>
                                <h6>Imagen Simple</h6>
                                {selectedPost.content.image.map((img, idx) => (
                                    <div key={ img._id }>
                                        <img className='unique-image' src={ img.image } alt='' />
                                        <button className='my-btn mini underlined' onClick={ () => deleteThis('image', img._id, idx) }>
                                            Borrar
										</button>
                                    </div>
                                )) }
                            </div>
                        ) }
                        { selectedPost.content.video.length > 0 && (
                            <div className='preview post-video'>
                                <h6>Vídeo</h6>
                                {selectedPost.content.video.map((vid, idx) => (
                                    <div key={ vid._id }>
                                        <video className='video-preview' src={ vid.video } controls muted />
                                        <button className='my-btn mini underlined' onClick={ () => deleteThis('video', vid._id, idx) }>
                                            Borrar
										</button>
                                    </div>
                                )) }
                            </div>
                        ) }
                        { selectedPost.content.gallery?.length > 0 && (
                            <div className='preview post-gallery'>
                                <h6>Galerías de fotos</h6>
                                {selectedPost.content.gallery.map((gal, idx) => (
                                    <div key={ gal._id }>
                                        <div className='gallery'>
                                            { gal.gallery.map((picture, idx) => (
                                                <figure className='each-picture' key={ idx }>
                                                    <img src={ picture } alt='' />
                                                </figure>
                                            )) }
                                        </div>
                                        <button className='my-btn mini underlined' onClick={ () => deleteThis('gallery', gal._id, idx) }>
                                            Borrar
										</button>
                                    </div>
                                )) }
                            </div>
                        ) }
                        { selectedPost.content.slider?.length > 0 && (
                            <div className='preview post-slider'>
                                <h6>Slider de fotos</h6>
                                {selectedPost.content.slider.map((sld, idx) => (
                                    <div key={ sld._id }>
                                        <div className='gallery'>
                                            { sld.slides.map((picture, idx) => (
                                                <figure className='each-picture' key={ idx }>
                                                    <img src={ picture } alt='' />
                                                </figure>
                                            )) }
                                        </div>
                                        <button className='my-btn mini underlined' onClick={ () => deleteThis('slider', sld._id, idx) }>
                                            Borrar
										</button>
                                    </div>
                                )) }
                            </div>
                        ) }
                    </article>
                </div>
            </section>
        </section>

    )
}

export default AddPostScreen
