import React, { useContext, useEffect, useRef, useState } from 'react'
import Modal from 'react-bootstrap/esm/Modal'
import { getUserPosts, addPost, deletePost } from '../actions/posts.action'
import { AuthContext } from '../reducers/auth/AuthContext'
import AddPost from './posts/AddPost'

const PostsScreen = () => {
	const isMounted = useRef(false)
	const [posts, setPosts] = useState()
	const [postID, setPostID] = useState()
	const { user } = useContext(AuthContext)

	const [show, setShow] = useState(false)
	const [modalId, setModalId] = useState()

	const handleModal = async (visible, modalId) => {
		setShow(visible)
		setModalId(modalId)
	}

	const handleAdd = async () => {
		const newPost = await addPost({ title: 'Nueva Entrada' })
		await handleModal(true, 'add')
		setPostID(newPost._id)
	}

	const handleDeletePost = (id) => {
		deletePost(id)
		handleModal(false, '')
	}

	const displayModal = (modalId) => {
		if (show) {
			switch (modalId) {
				case 'add':
					return (
						<>
							<Modal.Header>
								<Modal.Title>Añadir Post</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<AddPost postID={postID} setShow={setShow} />
								<button onClick={() => handleDeletePost(postID)}>Cancelar</button>
							</Modal.Body>
						</>
					)
				default:
					break
			}
		}
	}

	useEffect(() => {
		// if (isMounted) {
		// 	const prueba = getUserPosts(user.id)
		// 	console.log(prueba)
		// }
		return () => {
			isMounted.current = false
		}
	}, [])

	return (
		<div>
			<h2>Entradas del Blog</h2>
			<button className='my-btn mini' onClick={() => handleAdd()}>
				Añadir entrada
			</button>

			{posts ? <article>hay</article> : <article className='empty-posts'>No tienes entradas del blog</article>}
			<Modal dialogClassName='modal-width' centered className='my-modals' show={show} onHide={() => handleModal(false, '')}>
				{displayModal(modalId)}

				<Modal.Footer>
					<button className='my-btn mini secondary' onClick={() => handleModal(false, '')}>
						cerrar
					</button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

export default PostsScreen
