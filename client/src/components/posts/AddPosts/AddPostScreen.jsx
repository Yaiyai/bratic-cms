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

//Componentes


const AddPostScreen = () => {
    let history = useHistory();
    let params = useParams()
    const select = useRef()


    const { values, handleInputChange } = useForm()
    const [postId, setPostId] = useState()

    const [auxContent, setAuxContent] = useState('default')
    const [selectedPost, setSelectedPost] = useState({ title: 'Sin título', subtitle: '', content: { slider: [], image: [], text: [], video: [], gallery: [] } })

    useEffect(() => {
        setPostId(params.postID)
        findCurrentPost(params.postID)
    }, [params.postID])


    //Post Methods
    const findCurrentPost = async (id) => {
        const currentPost = await getThisPost(id)
        setSelectedPost(currentPost)
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
                    <PostState savePostState={ savePostState } postState={ selectedPost.status } />
                    <WhatToAdd auxContent={ auxContent } setAuxContent={ setAuxContent } select={ select } postId={ postId } saveElement={ saveElement } />
                    { selectedPost.content.image.length > 1 && <ImageType setSelectedPost={ setSelectedPost } /> }
                </div>

                <div className="view-area">
                    <div className="titles-btn">
                        <div>
                            {
                                selectedPost.title && <h1>{ selectedPost.title }</h1>
                            }
                            {
                                selectedPost.subtitle && <h2>{ selectedPost.subtitle }</h2>
                            }
                        </div>
                    </div>
                    {
                        selectedPost.content.text.length > 0 && selectedPost.content.text.map(text => (
                            <div key={ text._id } >
                                <div dangerouslySetInnerHTML={ text.parsedText } >
                                </div>
                                <button className="my-btn mini" onClick={ () => deleteThis('text', text._id) }>Borrar</button>
                            </div>

                        ))
                    }
                    {
                        selectedPost.content.image.length > 0 && selectedPost.content.image.map(image => (
                            <div key={ image._id } >
                                <figure>
                                    <img src={ image.image } alt="" />
                                </figure>
                                <button className="my-btn mini" onClick={ () => deleteThis('image', image._id) }>Borrar</button>
                            </div>
                        ))
                    }
                </div>

            </section>
        </section>

    )
}

export default AddPostScreen
