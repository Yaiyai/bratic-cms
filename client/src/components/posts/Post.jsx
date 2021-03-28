import Swal from 'sweetalert2'
//Photoswipe
import { PhotoSwipeGallery } from 'react-photoswiper'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { deletePost, getThisPost } from '../../actions/posts.action'

//Swiper
import SwiperCore, { Autoplay, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
SwiperCore.use([Autoplay, Pagination])

const Post = () => {
	const isMounted = useRef(true)
	const { postID } = useParams()
	let history = useHistory();

	const [post, setPost] = useState()
	const [items, setItems] = useState()

	const [content, setContent] = useState([])


	const orderPreviousContent = async (id) => {
		const currentPost = await getThisPost(id)
		const postContent = currentPost.content
		let aux = []
		for (const content in postContent) {
			postContent[content].forEach(elm => aux.push(elm))
		}
		aux.sort((a, b) => a.order - b.order)
		setContent(aux)
	}

	const getPost = async () => {
		const thePost = await getThisPost(postID)
		setPost(thePost)
	}

	useEffect(() => {
		if (isMounted.current) {
			getPost()
			orderPreviousContent(postID)
		}
		return () => {
			isMounted.current = false
		}
	})

	useEffect(() => {
		setItems(
			post?.content.gallery.map((elm) => {
				return elm.gallery.map((gal) => {
					return {
						src: gal,
						thumbnail: getThumbnails(gal),
						w: 1200,
						h: 900,
					}
				})
			})
		)
	}, [post])


	const getThumbnails = (str) => {
		let splitStr = str.split('upload/')
		let newStr = 'upload/w_200/'
		return `${splitStr[0]}${newStr}${splitStr[1]}`
	}

	const getThumbnailContent = (item) => {
		item.map(elm => {
			return (
				<img src={ elm.thumbnail } alt='' />
			)
		})
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
	const handleDeletePost = async (id) => {
		await deletePost(id)
		history.push('/bratic/blog')
	}


	return (
		<section id="post-preview">
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
			<h1>{ post?.title }</h1>
			{ post?.subtitle && <h2>{ post?.subtitle }</h2> }
			{ post?.createdAt && <small className="date">{ post?.createdAt }</small> }
			{ post?.content.image.length > 0 && (
				<figure className="main-image">
					<img key={ post?.content.image[0]._id } src={ post?.content.image[0].image } alt='' />
				</figure>
			) }
			<div className="container">
				{ post?.content.text.length > 0 && (
					post?.content.text.map((txt, idx) => (
						<div className='post-text' key={ txt._id } dangerouslySetInnerHTML={ txt.parsedText }></div>
					))
				) }

				{ post?.content.video.length > 0 && (
					post?.content.video.map((vid, idx) => (
						<video className='video-preview' src={ vid.video } controls muted />
					))
				) }
				{ items?.length > 0 && (
					<PhotoSwipeGallery items={ items } thumbnailContent={ getThumbnailContent } />
				) }

				{ post?.content.slider?.length > 0 && (
					<div className='preview'>
						<h6>Slider de fotos</h6>
						{post?.content.slider.map((sld, idx) => (
							<>
								<Swiper
									spaceBetween={ 0 }
									autoplay={ {
										delay: 2500,
									} }
									slidesPerView={ 1 }
									pagination={ { clickable: true } }>
									{ sld.slides.map((picture, idx) => (
										<SwiperSlide key={ idx }>
											<img src={ picture } alt='' />
										</SwiperSlide>
									)) }
								</Swiper>
							</>
						)) }
					</div>
				) }

			</div>


		</section>
	)
}

export default Post
