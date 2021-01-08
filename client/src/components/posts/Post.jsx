//Photoswipe
import { PhotoSwipeGallery } from 'react-photoswiper'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { deleteGallery } from '../../actions/post-content/gallery.action'
import { deleteImage } from '../../actions/post-content/image.action'
import { deleteSlider } from '../../actions/post-content/slider.action'
import { deleteText } from '../../actions/post-content/text.action'
import { deleteVideo } from '../../actions/post-content/video.action'
import { getThisPost } from '../../actions/posts.action'

//Swiper
import SwiperCore, { Autoplay, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
SwiperCore.use([Autoplay, Pagination])

const Post = () => {
	const isMounted = useRef(true)
	const { postID } = useParams()
	const [post, setPost] = useState()
	const [items, setItems] = useState()

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

	const deleteThis = (type, id, idx) => {
		switch (type) {
			case 'video':
				const videoCopy = [...post?.content.video]
				videoCopy.splice(idx, 1)
				setPost({ ...post, content: { ...post?.content, video: videoCopy } })
				deleteVideo(id)
				break
			case 'image':
				const imageCopy = [...post?.content.image]
				imageCopy.splice(idx, 1)
				setPost({ ...post, content: { ...post?.content, image: imageCopy } })
				deleteImage(id)
				break
			case 'text':
				const textCopy = [...post?.content.text]
				textCopy.splice(idx, 1)
				setPost({ ...post, content: { ...post?.content, text: textCopy } })
				deleteText(id)
				break
			case 'slider':
				const sliderCopy = [...post?.content.slider]
				sliderCopy.splice(idx, 1)
				setPost({ ...post, content: { ...post?.content, slider: sliderCopy } })
				deleteSlider(id)
				break
			case 'gallery':
				const galleryCopy = [...post?.content.gallery]
				galleryCopy.splice(idx, 1)
				setPost({ ...post, content: { ...post?.content, gallery: galleryCopy } })
				deleteGallery(id)
				break
			default:
				break
		}
	}

	const getThumbnails = (str) => {
		let splitStr = str.split('upload/')
		let newStr = 'upload/w_200/'
		return `${splitStr[0]}${newStr}${splitStr[1]}`
	}
	const getThumbnailContent = (item) => {
		if (item.src) {
			return <img src={item.thumbnail} />
		}
	}

	return (
		<section className='each-post'>
			<h1>{post?.title}</h1>
			{post?.subtitle && <h2>{post?.subtitle}</h2>}
			<hr />
			{post?.content.text.length > 0 && (
				<div className='preview'>
					<h6>Textos</h6>
					{post?.content.text.map((txt, idx) => (
						<>
							<div key={txt._id} dangerouslySetInnerHTML={txt.parsedText}></div>
							<button className='my-btn mini secondary' onClick={() => deleteThis('text', txt._id, idx)}>
								Borrar
							</button>
						</>
					))}
				</div>
			)}
			{post?.content.image.length > 0 && (
				<div className='preview'>
					<h6>Imagen Simple</h6>
					{post?.content.image.map((img, idx) => (
						<>
							<img key={img._id} className='unique-image' src={img.image} alt='' />
							<button className='my-btn mini secondary' onClick={() => deleteThis('image', img._id, idx)}>
								Borrar
							</button>
						</>
					))}
				</div>
			)}
			{post?.content.video.length > 0 && (
				<div className='preview'>
					<h6>Vídeo</h6>
					{post?.content.video.map((vid, idx) => (
						<>
							<video className='video-preview' src={vid.video} controls muted />
							<button className='my-btn mini secondary' onClick={() => deleteThis('video', vid._id, idx)}>
								Borrar
							</button>
						</>
					))}
				</div>
			)}
			{post?.content.gallery?.length > 0 && (
				<div className='preview'>
					<h6>Galerías de fotos</h6>
					{items && <PhotoSwipeGallery items={items} thumbnailContent={getThumbnailContent} />}

					{post?.content.gallery.map((gal, idx) => (
						<>
							<div key={gal._id} className='gallery'>
								{gal.gallery.map((picture, idx) => (
									<figure className='each-picture' key={idx}>
										<img src={picture} alt='' />
									</figure>
								))}
							</div>
							<button className='my-btn mini secondary' onClick={() => deleteThis('gallery', gal._id, idx)}>
								Borrar
							</button>
						</>
					))}
				</div>
			)}
			{post?.content.slider?.length > 0 && (
				<div className='preview'>
					<h6>Slider de fotos</h6>

					{post?.content.slider.map((sld, idx) => (
						<>
							<Swiper
								spaceBetween={0}
								autoplay={{
									delay: 2500,
								}}
								slidesPerView={1}
								pagination={{ clickable: true }}>
								{sld.slides.map((picture, idx) => (
									<SwiperSlide key={idx}>
										<img src={picture} alt='' />
									</SwiperSlide>
								))}
							</Swiper>

							<button className='my-btn mini secondary' onClick={() => deleteThis('slider', sld._id, idx)}>
								Borrar
							</button>
						</>
					))}
				</div>
			)}
		</section>
	)
}

export default Post
