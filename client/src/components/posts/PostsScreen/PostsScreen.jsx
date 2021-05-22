import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'
import { addPost, deletePost, getUserPosts } from '../../../actions/posts.action'
import { AuthContext } from '../../../reducers/auth/AuthContext'
import PostElement from '../../_ui/Posts/PostElement/PostElement';
import SectionTitle from '../../_ui/SectionTitle/SectionTitle';

const PostsScreen = () => {
	let history = useHistory();
	const isMounted = useRef(true)
	const [posts, setPosts] = useState()
	const { user } = useContext(AuthContext)


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
		const newPost = await addPost({ title: 'Entrada Sin Título', author: user.id })
		history.push(`/bratic/blog/nueva-entrada/${newPost._id}`)
	}

	const handleDeletePost = async (id) => {
		await deletePost(id)
		await allMyPosts()
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
		<div id="posts-screen">
			<SectionTitle
				image='https://res.cloudinary.com/bratic-app/image/upload/v1621695842/web/blog_vadvsn.svg'
				title="Entradas del Blog"
				instructions={ `Estás viendo las entradas del blog que ${user.name} (tú, señor@) ha creado` }
			/>

			<button className="my-btn primary mini" onClick={ handleAdd }>Añadir entrada del blog</button>

			{posts?.length > 0 ? (
				<section className='all-posts'>
					{posts?.map((elm) => (
						<PostElement askIfDelete={ askIfDelete } post={ elm } key={ elm._id } />
					)) }
				</section>
			) : (
				<article className='empty-posts'>No tienes entradas del blog</article>
			) }
		</div>
	)
}

export default PostsScreen
