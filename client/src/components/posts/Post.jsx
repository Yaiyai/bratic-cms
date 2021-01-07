import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getThisPost } from '../../actions/posts.action'

const Post = () => {
	const isMounted = useRef(true)
	const { postID } = useParams()
	const [post, setPost] = useState()

	const getPost = async () => {
		const thePost = await getThisPost(postID)
		setPost(thePost)
	}

	useEffect(() => {
		if (isMounted.current) {
			getPost()
		}
		return () => {
			isMounted.current = false
		}
	})

	return <div>El post</div>
}

export default Post
