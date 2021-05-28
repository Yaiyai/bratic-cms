import React, { useEffect, useRef, useState } from 'react'
//Hooks
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import useForm from '../../../hooks/useForm';

//Actions
import { deletePost, getThisPost, updatePost } from '../../../actions/posts.action'
import { deleteText } from '../../../actions/post-content/text.action';
import { deleteImage } from '../../../actions/post-content/image.action';
import TitlesArea from '../../_ui/TitlesArea/TitlesArea';
import WhatToAdd from '../../_ui/WhatToAdd/WhatToAdd';
import PostState from '../../_ui/Posts/PostState/PostState';
import SectionTitle from '../../_ui/SectionTitle/SectionTitle';
import Swal from 'sweetalert2';
import ImageType from '../../_ui/ImageType/ImageType';
import { convertSlug } from '../../../helpers/convertSlug';

//Componentes

import DateInput from '../../_ui/DateInput/DateInput';
import PostCategories from '../../_ui/Posts/PostCategories/PostCategories';
import { FaTimesCircle } from 'react-icons/fa';

import dayjs from 'dayjs'
import 'dayjs/locale/es' // load on demand
dayjs.locale('es')

const AddPostScreen = () => {
    let history = useHistory();
    let params = useParams()
    const select = useRef()

    const { values, handleInputChange } = useForm()
    const [postId, setPostId] = useState()

    const [auxContent, setAuxContent] = useState('default')
    const [selectedPost, setSelectedPost] = useState({ title: 'Sin título', slug: '', postDate: '', slugArray: [], subtitle: '', content: { image: [], text: [] } })

    useEffect(() => {
        setPostId(params.postID)
        findCurrentPost(params.postID)
    }, [params.postID])

    useEffect(() => {
        let newSlug = convertSlug(selectedPost.title)
        setSelectedPost(selectedPost => ({ ...selectedPost, slug: newSlug, slugArray: selectedPost.title === 'Entrada Sin Título' ? [...selectedPost.slugArray] : [...selectedPost.slugArray, newSlug] }))
    }, [selectedPost.title])

    //Post Methods
    const findCurrentPost = async (id) => {
        const currentPost = await getThisPost(id)
        setSelectedPost(currentPost)
    }

    const savePostState = (status) => {
        setSelectedPost({ ...selectedPost, status: status })
    }

    const saveCategory = (category) => {
        if (!selectedPost.categories.includes(category)) {
            setSelectedPost(prevState => ({ ...prevState, categories: [...prevState.categories, category] }))
        }
    }

    const deleteCategory = (category) => {
        const categoryCopy = [...selectedPost.categories].filter(cat => cat !== category)
        setSelectedPost(prevState => ({ ...prevState, categories: categoryCopy }))
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
            default:
                break
        }
    }

    const saveTitles = (e) => {
        e.preventDefault()
        setSelectedPost({ ...selectedPost, title: values.title, subtitle: values.subtitle })
    }
    const saveDate = (e) => {
        e.preventDefault()
        setSelectedPost({ ...selectedPost, postDate: values.postDate })
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



    return (
        <section id="add-posts-screen">
            <SectionTitle
                image='https://res.cloudinary.com/bratic-app/image/upload/v1621695842/web/blog-single_zvpet3.svg'
                title="Nueva entrada"
                instructions="Estás añadiendo una entrada nueva al blog :)"
            />

            <article className="post-btn-group">
                <button className="my-btn mini" onClick={ () => handleUpdatePost(postId, selectedPost) }>Guardar Entrada</button>
                <button className="my-btn mini third" onClick={ () => checkIfSaved() }>Salir</button>
                <button className="my-btn mini danger" onClick={ () => handleDeletePost(postId) }>Borrar Entrada</button>
            </article>

            <section className="edit-post">
                <div className="edit-area">
                    <TitlesArea selectedPost={ setSelectedPost } handleInputChange={ handleInputChange } saveTitles={ saveTitles } />
                    <DateInput selectedPost={ setSelectedPost } handleInputChange={ handleInputChange } saveDate={ saveDate } />
                    <PostState savePostState={ savePostState } postState={ selectedPost.status } />
                    <PostCategories saveCategory={ saveCategory } deleteCategory={ deleteCategory } />
                    <WhatToAdd auxContent={ auxContent } setAuxContent={ setAuxContent } select={ select } postId={ postId } saveElement={ saveElement } />
                    { selectedPost.content.image.length > 1 && <ImageType setSelectedPost={ setSelectedPost } /> }
                </div>

                <div className="view-area">
                    <div className="titles-btn">
                        <div>
                            {
                                selectedPost.title && <h1>Titulo: { selectedPost.title }</h1>
                            }
                            {
                                selectedPost.subtitle && <h2>Subtitulo: { selectedPost.subtitle }</h2>
                            }
                            {
                                selectedPost.postDate ? <p>Publicada el: { dayjs(selectedPost.postDate).format('DD/MM/YYYY') }</p> : <p>Publicada el: { dayjs(selectedPost.createdAt).format('DD/MM/YYYY') }</p>
                            }
                            { selectedPost.categories?.length > 0 && (
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
                    </div>
                    {
                        selectedPost.content.text.length > 0 && selectedPost.content.text.map(text => (
                            <div key={ text._id } className="each-text" >
                                <div dangerouslySetInnerHTML={ text.parsedText } >
                                </div>
                                <button className="my-btn mini" onClick={ () => deleteThis('text', text._id) }>Borrar este texto</button>
                            </div>

                        ))
                    }
                    {
                        selectedPost.content.image.length > 0 && selectedPost.content.image.map(image => (
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
        </section>

    )
}

export default AddPostScreen
