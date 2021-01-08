import React, { useContext, useEffect, useRef, useState } from 'react'
import Modal from 'react-bootstrap/esm/Modal'
import Swal from 'sweetalert2'
import { addPost, deletePost, getUserPosts, updatePost } from '../actions/posts.action'
import { AuthContext } from '../reducers/auth/AuthContext'
import AddPost from './posts/AddPost'
import PostElement from './posts/PostElement'

const PostsScreen = () => {
	const isMounted = useRef(true)
	const [posts, setPosts] = useState()
	const [postID, setPostID] = useState()
	const { user } = useContext(AuthContext)

	const [show, setShow] = useState(false)
	const [modalId, setModalId] = useState()

	const allMyPosts = async () => {
		const posts = await getUserPosts(user.id)
		setPosts(posts)
	}

	useEffect(() => {
		return () => {
			isMounted.current = false
		}
	}, [])

	useEffect(() => {
		if (isMounted.current) {
			allMyPosts()
		}
		return () => {
			isMounted.current = false
		}
	})

	const handleAdd = async () => {
		const newPost = await addPost({ title: 'Nueva Entrada', author: user.id })
		await handleModal(true, 'add')
		setPostID(newPost._id)
	}

	const handleDeletePost = async (id) => {
		await deletePost(id)
		await allMyPosts()
		handleModal(false, '')
	}

	const handleUpdatePost = async (id, content) => {
		await updatePost(id, content)
		allMyPosts()
		handleModal(false, '')
	}

	const handleModal = async (visible, modalId) => {
		setShow(visible)
		setModalId(modalId)
	}

	const displayModal = (modalId) => {
		if (show) {
			switch (modalId) {
				case 'add':
					return <AddPost postID={postID} setShow={setShow} handleUpdatePost={handleUpdatePost} handleDeletePost={handleDeletePost} />
				default:
					break
			}
		}
	}

	const askIfDelete = (id) => {
		Swal.fire({
			title: '¿Seguro?',
			text: 'Si borras esto, la entrada desaparece',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '¡Borrar Entrada!',
			cancelButtonText: '¡Uy, no!',
		}).then((result) => {
			if (result.isConfirmed) {
				handleDeletePost(id)
				// Swal.fire('¡Entrada borrada!', 'Esta entrada se marchó para no volver', 'success')
			}
		})
	}

	return (
		<div>
			<h2>Entradas del Blog</h2>
			<button className='my-btn mini' onClick={() => handleAdd()}>
				Añadir entrada
			</button>

			{posts?.length > 0 ? (
				<section className='all-posts'>
					{posts?.map((elm) => (
						<PostElement askIfDelete={askIfDelete} post={elm} key={elm._id} />
					))}
				</section>
			) : (
				<article className='empty-posts'>No tienes entradas del blog</article>
			)}
			<Modal dialogClassName='modal-width' centered className='my-modals' show={show} onHide={() => handleModal(false, '')}>
				{displayModal(modalId)}
			</Modal>
		</div>
	)
}

export default PostsScreen
