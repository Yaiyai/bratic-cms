import React, { useEffect, useRef, useState } from 'react'
//Hooks
import { useHistory } from "react-router-dom";

//Actions
import { deletePost, updatePost } from '../../../actions/posts.action'
import { deleteText } from '../../../actions/post-content/text.action';
import { deleteImage } from '../../../actions/post-content/image.action';
import { convertSlug } from '../../../helpers/convertSlug';

//Componentes
import PostState from '../../_ui/Posts/PostState/PostState';
import WhatToAdd from '../../_ui/WhatToAdd/WhatToAdd';
import TitlesArea from '../../_ui/TitlesArea/TitlesArea';
import ImageType from '../../_ui/ImageType/ImageType';
import DateInput from '../../_ui/DateInput/DateInput';
import PostCategories from '../../_ui/Posts/PostCategories/PostCategories';

import { FaTimesCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import dayjs from 'dayjs'
import 'dayjs/locale/es' // load on demand
dayjs.locale('es')


const PostMethods = ({ selectedPost, setSelectedPost }) => {
    let history = useHistory();
    const select = useRef()
    const [postId, setPostId] = useState()

    const [auxContent, setAuxContent] = useState('default')


    useEffect(() => {
        setPostId(selectedPost?._id)
        if (selectedPost?.title) {
            let newSlug = convertSlug(selectedPost?.title)
            let newSlugArray = [...selectedPost?.slugArray]
            if (!newSlugArray.includes(newSlug)) {
                setSelectedPost(selectedPost => ({ ...selectedPost, slug: newSlug, slugArray: [...selectedPost?.slugArray, newSlug] }))
            } else {
                setSelectedPost(selectedPost => ({ ...selectedPost, slug: newSlug }))
            }
        }
    }, [selectedPost?.title, selectedPost?.slugArray, setSelectedPost, selectedPost?._id])




    const saveElement = (type, element) => {
        switch (type) {
            case 'text':
                if (selectedPost?.content.text.length > 0) {
                    const contentCopy = [...selectedPost?.content.text, element]
                    setSelectedPost({ ...selectedPost, content: { ...selectedPost?.content, text: contentCopy } })
                    setToDefault()
                } else {
                    const contentCopy = [element]
                    setSelectedPost({ ...selectedPost, content: { ...selectedPost?.content, text: contentCopy } })
                    setToDefault()
                }
                break
            case 'image':
                if (selectedPost?.content.image.length > 0) {
                    const contentCopy = [...selectedPost?.content.image, element]
                    setSelectedPost({ ...selectedPost, content: { ...selectedPost?.content, image: contentCopy } })
                    setToDefault()
                } else {
                    const contentCopy = [element]
                    setSelectedPost({ ...selectedPost, content: { ...selectedPost?.content, image: contentCopy } })
                    setToDefault()
                }
                break
            default:
                break
        }
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
    const checkIfSaved = () => {
        Swal.fire({
            title: '¿Seguro?',
            text: 'No has guardado, si sales sin guardar, se perderán los cambios',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, salir!',
            cancelButtonText: '¡Uy, no!',
        }).then((result) => {
            if (result.isConfirmed) {
                handleExit()
            }
        })

    }


    const handleDeletePost = async (id) => {
        await deletePost(id)
        history.goBack()
    }

    const handleUpdatePost = async (id, content) => {
        await updatePost(id, content)
        history.goBack()
    }

    const deleteThis = async (type, id) => {
        switch (type) {
            case 'text':
                await deleteText(id)
                setSelectedPost(prevState => ({ ...prevState, content: { ...prevState.content, text: prevState.content.text.filter(text => text._id !== id) } }))
                break
            case 'image':
                await deleteImage(id)
                setSelectedPost(prevState => ({ ...prevState, content: { ...prevState.content, image: prevState.content.image.filter(image => image._id !== id) } }))
                break
            default:
                break
        }
    }
    const deleteCategory = (category) => {
        const categoryCopy = [...selectedPost?.categories].filter(cat => cat !== category)
        setSelectedPost(prevState => ({ ...prevState, categories: categoryCopy }))
    }


    return (
        <>
            <article className="post-btn-group">
                <button className="my-btn mini" onClick={ () => handleUpdatePost(postId, selectedPost) }>Guardar Entrada</button>
                <button className="my-btn mini third" onClick={ () => checkIfSaved() }>Salir</button>
                <button className="my-btn mini danger" onClick={ () => handleDeletePost(postId) }>Borrar Entrada</button>
            </article>
            <section className="edit-post">
                <div className="edit-area">
                    <TitlesArea selectedPost={ selectedPost } setSelectedPost={ setSelectedPost } />
                    <DateInput selectedPost={ selectedPost } setSelectedPost={ setSelectedPost } />
                    <PostState selectedPost={ selectedPost } setSelectedPost={ setSelectedPost } />
                    <PostCategories selectedPost={ selectedPost } setSelectedPost={ setSelectedPost } />

                    <WhatToAdd auxContent={ auxContent } setAuxContent={ setAuxContent } select={ select } postId={ postId } saveElement={ saveElement } />
                    { selectedPost?.content.image.length > 1 && <ImageType setSelectedPost={ setSelectedPost } selectedPost={ selectedPost } /> }
                </div>
                <div className="view-area">
                    <div className="titles-btn">
                        {
                            selectedPost?.title && <h1>Título: { selectedPost?.title }</h1>
                        }
                        {
                            selectedPost?.subtitle && <h2>Subtítulo: { selectedPost?.subtitle }</h2>
                        }
                        {
                            selectedPost?.postDate ? <p>Publicada el: { dayjs(selectedPost?.postDate).format('DD/MM/YYYY') }</p> : <p>Publicada el: { dayjs(selectedPost?.createdAt).format('DD/MM/YYYY') }</p>
                        }
                        { selectedPost?.categories?.length > 0 && (
                            <div className="features-view">
                                <p>Categorías de la publicación</p>
                                <div className="features">
                                    {
                                        selectedPost?.categories?.map(cat => <div className="each-feat" key={ cat }>{ cat } <FaTimesCircle onClick={ () => deleteCategory(cat) } /> </div>)
                                    }
                                </div>
                            </div>
                        ) }

                    </div>

                    {
                        selectedPost?.content.text.length > 0 && selectedPost?.content.text.map(text => (
                            <div key={ text._id } className="each-text" >
                                <div dangerouslySetInnerHTML={ text.parsedText } >
                                </div>
                                <button className="my-btn mini" onClick={ () => deleteThis('text', text._id) }>Borrar este texto</button>
                            </div>

                        ))
                    }
                    {
                        selectedPost?.content.image.length > 0 && selectedPost?.content.image.map(image => (
                            <div key={ image._id } className="each-image">
                                <figure>
                                    <img src={ image.image } alt="" />
                                </figure>
                                <button className="my-btn mini" onClick={ () => deleteThis('image', image._id) }>Borrar esta imagen</button>
                            </div>
                        ))
                    }
                </div>
            </section>
        </>
    )
}

export default PostMethods
