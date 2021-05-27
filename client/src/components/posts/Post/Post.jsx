
import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'

import { deletePost, getThisPost } from '../../../actions/posts.action'
import SectionTitle from '../../_ui/SectionTitle/SectionTitle'
//Swiper
import SwiperCore, { Autoplay, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import Swal from 'sweetalert2'
import dayjs from 'dayjs'
import 'dayjs/locale/es' // load on demand
import { PhotoSwipeGallery } from 'react-photoswiper'
SwiperCore.use([Autoplay, Pagination])

dayjs.locale('es')
const Post = () => {
	const isMounted = useRef(true)
	const { postID } = useParams()
	let history = useHistory();

	const [post, setPost] = useState()
	const [items, setItems] = useState([])
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
	useEffect(() => {
		if (post?.isGallery) {
			post?.content?.image.forEach((elm) => {
				setItems(items => [...items, {
					src: elm.image,
					thumbnail: getThumbnails(elm.image),
					w: 1200,
					h: 900,
				}])
			})
		}
	}, [post])

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
	const getThumbnails = (str) => {
		let splitStr = str.split('upload/')
		let newStr = 'upload/w_200/'
		return `${splitStr[0]}${newStr}${splitStr[1]}`
	}

	const getThumbnailContent = (item) => {
		return (
			<img src={ item.thumbnail } alt='' />
		)
	}


	return (
		<>
			<SectionTitle
				image='https://res.cloudinary.com/bratic-app/image/upload/v1621696886/web/dashboard_jrqf3g.svg'
				title="Muestra de la entrada"
				instructions="Así es como se verá la entrada en la web :)"
			/>
			<section id="post-preview">
				<h1>{ post?.title }</h1>
				<div className="date-cat">
					{ post?.categories.length > 0 && (
						<div className="categories">
							{
								post?.categories?.map(cat => (
									<small key={ cat }>{ cat }</small>
								))
							}
						</div>
					) }
					{ post?.categories.length > 0 && <span className="separator"> · </span> }
					{
						post?.postDate ? <small>{ dayjs(post?.postDate).format('DD/MM/YYYY') }</small> : <small>{ dayjs(post?.createdAt).format('DD/MM/YYYY') }</small>
					}
				</div>
				{ post?.content?.image.length > 0 && (
					<figure className="main-image">
						<img key={ post?.content.image[0]._id } src={ post?.content.image[0].image } alt='' />
					</figure>
				) }
				{ }
				<div className="app-container">
					{ post?.subtitle && <h2>{ post?.subtitle }</h2> }
					{ post?.content?.text?.length > 0 && (
						post?.content?.text?.map((txt, idx) => (
							<div className='post-text' key={ txt._id } dangerouslySetInnerHTML={ txt.parsedText }></div>
						))
					) }
					{ post?.isSlider && (
						<Swiper
							spaceBetween={ 16 }
							autoplay={ {
								delay: 2500,
							} }
							slidesPerView={ 3 }
						>
							{ post?.content?.image.map((picture, idx) => (
								<SwiperSlide key={ idx }>
									<img src={ picture.image } alt='' />
								</SwiperSlide>
							)) }
						</Swiper>
					) }
					{
						post?.isGallery && (
							items?.length > 0 && (
								<PhotoSwipeGallery items={ items } thumbnailContent={ getThumbnailContent } />
							)
						)
					}


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
		</>
	)
}

export default Post
