
import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'

import { deletePost, getThisPost } from '../../actions/posts.action'
//Swiper
import Swal from 'sweetalert2'
import dayjs from 'dayjs'
import 'dayjs/locale/es' // load on demand

dayjs.locale('es')
const Post = () => {
	const isMounted = useRef(true)
	const { postID } = useParams()
	let history = useHistory();

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
				Swal.fire('¡Entrada borrada!', 'Esta entrada se marchó para no volver', 'success')
			}
		})
	}

	const handleDeletePost = async (id) => {
		await deletePost(id)
		history.push('/bratic/blog')
	}


	return (
		<section id="post-preview">
			<h1>{ post?.title }</h1>
			{ post?.createdAt && <small>Publicada el { dayjs(post?.createdAt).format('DD/MM/YYYY') }</small> }
			{ post?.content?.image.length > 0 && (
				<figure className="main-image">
					<img key={ post?.content.image[0]._id } src={ post?.content.image[0].image } alt='' />
				</figure>
			) }
			<div className="container">
				{ post?.subtitle && <h2>{ post?.subtitle }</h2> }
				{ post?.content?.text?.length > 0 && (
					post?.content?.text?.map((txt, idx) => (
						<div className='post-text' key={ txt._id } dangerouslySetInnerHTML={ txt.parsedText }></div>
					))
				) }

			</div>
			<div className="btn-group">
				<button className='my-btn mini third' onClick={ () => askIfDelete(post?._id) }>
					Borrar
				</button>
				<Link className='my-btn mini secondary' to={ `/bratic/blog/editar-entrada/${post?._id}` }>
					Editar
				</Link>
				<Link className='my-btn mini thirsd' to={ `/bratic/blog/` }>
					Volver al blog
				</Link>

			</div>

		</section>
	)
}

export default Post
