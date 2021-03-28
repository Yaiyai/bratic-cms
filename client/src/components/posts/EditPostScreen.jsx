import React, { useCallback, useEffect, useRef, useState } from 'react'
//Hooks
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import useForm from '../../hooks/useForm';
import useCounter from '../../hooks/useCounter';

//Actions
import { deletePost, getThisPost, updatePost } from '../../actions/posts.action'
import { findVideoAndUpdate, findVideoAndUpdateReturn } from '../../actions/post-content/video.action';
import { findImageAndUpdate, findImageAndUpdateReturn } from '../../actions/post-content/image.action';
import { findTextAndUpdate, findTextAndUpdateReturn } from '../../actions/post-content/text.action';
import { findSliderAndUpdate, findSliderAndUpdateReturn } from '../../actions/post-content/slider.action';
import { findGalleryAndUpdate, findGalleryAndUpdateReturn } from '../../actions/post-content/gallery.action';
import { dragOver, dragOverReceptor, dragStart } from '../../helpers/dranAndDrop';

//Componentes
import PostState from './content/_ui/PostState';
import RenderContentByType from './content/_ui/RenderContentByType';
import WhatToAdd from './content/_ui/WhatToAdd';
import TitlesArea from './content/_ui/TitlesArea';

//Dependencias
import Swal from 'sweetalert2';
import ViewAreaEdit from './content/_ui/ViewAreaEdit';

const EditPostScreen = () => {
    let history = useHistory();
    let params = useParams()
    const select = useRef()

    const { counter, increment, decrement, setCounter } = useCounter(1)
    const { values, handleInputChange } = useForm()
    const [postId, setPostId] = useState()

    const [auxContent, setAuxContent] = useState('default')
    const [selectedPost, setSelectedPost] = useState({ title: 'Sin título', subtitle: '', content: { slider: [], image: [], text: [], video: [], gallery: [] } })
    const [content, setContent] = useState([])

    //Edit Methods

    const orderPreviousContent = useCallback(async (id) => {
        const currentPost = await getThisPost(id)
        let aux = []

        if (currentPost.orderedContent.length > 0) {
            setCounter(currentPost.orderedContent.length + 1)
            return
        } else {

            const postContent = currentPost.content
            for (const content in postContent) {
                postContent[content].forEach(elm => aux.push(elm))
            }
            aux.sort((a, b) => a.order - b.order)
            setContent(aux)
            setCounter(aux.length + 1)
        }

    }, [setCounter])


    useEffect(() => {
        setPostId(params.postID)
        findCurrentPost(params.postID)
        orderPreviousContent(params.postID)
    }, [params.postID, orderPreviousContent])




    //Post Methods
    const findCurrentPost = async (id) => {
        const currentPost = await getThisPost(id)
        setSelectedPost(currentPost)
    }

    const handleSaveContent = () => {
        setSelectedPost({ ...selectedPost, orderedContent: [...selectedPost.orderedContent, content] })
        Swal.fire('¡Bien!', 'Orden Guardado', 'success')
        setToDefault()
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


    //Select Methods
    const setToDefault = () => {
        select.current.selectedIndex = 0
        setAuxContent('default')
    }


    //Buttons Methods
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

    //Drop Method
    const drop = async (e) => {
        e.preventDefault()
        const tag = e.dataTransfer.getData('card_id')
        const card = document.getElementById(tag)
        const cardType = e.dataTransfer.getData('card_type')
        console.log(tag);

        card.style.display = 'block'
        card.className = 'preview'

        e.target.appendChild(card)
        const spaceId = card.parentElement.id
        let filteredArray = []
        let orderedNew = []

        switch (cardType) {
            case 'texto':
                await findTextAndUpdate(tag, { order: spaceId })
                const updatedText = await findTextAndUpdateReturn(tag, { order: spaceId })
                filteredArray = content.filter((elm) => elm._id !== tag)
                orderedNew = [...filteredArray, updatedText.text].sort((a, b) => a.order - b.order)
                setContent(orderedNew)

                break
            case 'imagen':
                await findImageAndUpdate(tag, { order: spaceId })
                const updatedImage = await findImageAndUpdateReturn(tag, { order: spaceId })
                filteredArray = content.filter((elm) => elm._id !== tag)
                orderedNew = [...filteredArray, updatedImage.image].sort((a, b) => a.order - b.order)
                setContent(orderedNew)

                break
            case 'galeria':
                await findGalleryAndUpdate(tag, { order: spaceId })
                const updatedGallery = await findGalleryAndUpdateReturn(tag, { order: spaceId })
                filteredArray = content.filter((elm) => elm._id !== tag)
                orderedNew = [...filteredArray, updatedGallery.gallery].sort((a, b) => a.order - b.order)
                setContent(orderedNew)

                break
            case 'video':
                await findVideoAndUpdate(tag, { order: spaceId })
                const updatedVideo = await findVideoAndUpdateReturn(tag, { order: spaceId })
                filteredArray = content.filter((elm) => elm._id !== tag)
                orderedNew = [...filteredArray, updatedVideo.video].sort((a, b) => a.order - b.order)
                setContent(orderedNew)

                break
            case 'slider':
                await findSliderAndUpdate(tag, { order: spaceId })
                const updatedSlider = await findSliderAndUpdateReturn(tag, { order: spaceId })
                filteredArray = content.filter((elm) => elm._id !== tag)
                orderedNew = [...filteredArray, updatedSlider.slider].sort((a, b) => a.order - b.order)
                setContent(orderedNew)

                break
            default:
                break
        }
    }



    return (
        <section id="add-posts-screen">
            <article className="post-btn-group">
                <h3>Editar entrada : { selectedPost.title }</h3>
                <button className="my-btn mini secondary" onClick={ () => handleDeletePost(postId) }>Borrar Entrada</button>
                <button className="my-btn mini third" onClick={ () => handleUpdatePost(postId, selectedPost) }>Guardar Entrada</button>
                <button className="my-btn mini" onClick={ () => handleExit() }>Salir</button>
            </article>
            <section className="edit-post">
                <div className="edit-area">
                    <PostState savePostState={ savePostState } postState={ selectedPost.status } />
                    <TitlesArea selectedPost={ setSelectedPost } handleInputChange={ handleInputChange } saveTitles={ saveTitles } />
                    <WhatToAdd auxContent={ auxContent } setAuxContent={ setAuxContent } select={ select } postId={ postId } saveElement={ saveElement } increment={ increment } />

                    <article className="content-to-order" onDrop={ drop } onDragOver={ dragOverReceptor }>
                        <h6>Contenido generado para ordenar</h6>
                        {
                            content.length > 0 && <RenderContentByType content={ content } setContent={ setContent } dragStart={ dragStart } dragOver={ dragOver } decrement={ decrement } />
                        }
                    </article>
                </div>

                <ViewAreaEdit selectedPost={ selectedPost } dragOverReceptor={ dragOverReceptor } dragOver={ dragOver } drop={ drop } decrement={ decrement } counter={ counter } handleSaveContent={ handleSaveContent } dragStart={ dragStart } setContent={ setContent } />
            </section>
        </section>

    )
}

export default EditPostScreen
