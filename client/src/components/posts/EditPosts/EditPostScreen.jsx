import React, { useEffect, useState } from 'react'
//Hooks
import { useParams } from 'react-router-dom';

//Componentes
import PostMethods from '../PostMethods/PostMethods';
import SectionTitle from '../../_ui/SectionTitle/SectionTitle';

import { getThisPost } from '../../../actions/posts.action';


const EditPostScreen = () => {
    let params = useParams()

    const [selectedPost, setSelectedPost] = useState({ title: 'Sin título', subtitle: '', slugArray: [], content: { slider: [], image: [], text: [], video: [], gallery: [] } })

    useEffect(() => {
        findCurrentPost(params.postID)
    }, [params.postID])

    //Post Methods
    const findCurrentPost = async (id) => {
        const currentPost = await getThisPost(id)
        setSelectedPost(currentPost)
    }

    return (
        <section id="add-posts-screen">
            <SectionTitle
                image='https://res.cloudinary.com/bratic-app/image/upload/v1621695842/web/blog-single_zvpet3.svg'
                title="Estás editando esta entrada:"
                instructions={ selectedPost?.title }
            />
            <PostMethods selectedPost={ selectedPost } setSelectedPost={ setSelectedPost } />
        </section>
    )
}

export default EditPostScreen
