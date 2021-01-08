import React, { useRef, useState } from 'react'
import AddGallery from './content/AddGallery'
import AddImage from './content/AddImage'
import AddSlider from './content/AddSlider'
import AddText from './content/AddText'
import AddVideo from './content/AddVideo'
import Modal from 'react-bootstrap/esm/Modal'
import useForm from '../../hooks/useForm'
import { deleteVideo } from '../../actions/post-content/video.action'
import { deleteImage } from '../../actions/post-content/image.action'
import { deleteSlider } from '../../actions/post-content/slider.action'
import { deleteGallery } from '../../actions/post-content/gallery.action'
import { deleteText } from '../../actions/post-content/text.action'

const AddPost = ({ postID, handleUpdatePost, handleDeletePost }) => {
	const select = useRef()
	const [auxContent, setAuxContent] = useState('default')
	const { values, handleInputChange } = useForm()

	const [getContent, setGetContent] = useState({ title: 'Sin título', subtitle: '', content: { slider: [], image: [], text: [], video: [], gallery: [] } })

	const addThis = ({ target }) => {
		switch (target.value) {
			case 'text':
				setAuxContent('text')
				break
			case 'image':
				setAuxContent('image')
				break
			case 'gallery':
				setAuxContent('gallery')
				break
			case 'video':
				setAuxContent('video')
				break
			case 'slider':
				setAuxContent('slider')
				break
			default:
				setAuxContent('default')
				break
		}
	}

	const setToDefault = () => {
		select.current.selectedIndex = 0
		setAuxContent('default')
	}

	const saveElement = (type, element) => {
		switch (type) {
			case 'text':
				if (getContent.content.text.length > 0) {
					const contentCopy = [...getContent.content.text, element]
					setGetContent({ ...getContent, content: { ...getContent.content, text: contentCopy } })
					setToDefault()
				} else {
					const contentCopy = [element]
					setGetContent({ ...getContent, content: { ...getContent.content, text: contentCopy } })
					setToDefault()
				}
				break
			case 'image':
				if (getContent.content.image.length > 0) {
					const contentCopy = [...getContent.content.image, element]
					setGetContent({ ...getContent, content: { ...getContent.content, image: contentCopy } })
					setToDefault()
				} else {
					const contentCopy = [element]
					setGetContent({ ...getContent, content: { ...getContent.content, image: contentCopy } })
					setToDefault()
				}
				break
			case 'gallery':
				if (getContent.content.gallery.length > 0) {
					const contentCopy = [...getContent.content.gallery, element]
					setGetContent({ ...getContent, content: { ...getContent.content, gallery: contentCopy } })
					setToDefault()
				} else {
					const contentCopy = [element]
					setGetContent({ ...getContent, content: { ...getContent.content, gallery: contentCopy } })
					setToDefault()
				}
				break
			case 'video':
				if (getContent.content.video.length > 0) {
					const contentCopy = [...getContent.content.video, element]
					setGetContent({ ...getContent, content: { ...getContent.content, video: contentCopy } })
					setToDefault()
				} else {
					const contentCopy = [element]
					setGetContent({ ...getContent, content: { ...getContent.content, video: contentCopy } })
					setToDefault()
				}
				break
			case 'slider':
				if (getContent.content.slider.length > 0) {
					const contentCopy = [...getContent.content.slider, element]
					setGetContent({ ...getContent, content: { ...getContent.content, slider: contentCopy } })
					setToDefault()
				} else {
					const contentCopy = [element]
					setGetContent({ ...getContent, content: { ...getContent.content, slider: contentCopy } })
					setToDefault()
				}
				break
			default:
				break
		}
	}

	const saveTitles = (e) => {
		e.preventDefault()
		setGetContent({ ...getContent, title: values.title, subtitle: values.subtitle })
	}

	const deleteThis = (type, id, idx) => {
		switch (type) {
			case 'video':
				const videoCopy = [...getContent.content.video]
				videoCopy.splice(idx, 1)
				setGetContent({ ...getContent, content: { ...getContent.content, video: videoCopy } })
				deleteVideo(id)
				break
			case 'image':
				const imageCopy = [...getContent.content.image]
				imageCopy.splice(idx, 1)
				setGetContent({ ...getContent, content: { ...getContent.content, image: imageCopy } })
				deleteImage(id)
				break
			case 'text':
				const textCopy = [...getContent.content.text]
				textCopy.splice(idx, 1)
				setGetContent({ ...getContent, content: { ...getContent.content, text: textCopy } })
				deleteText(id)
				break
			case 'slider':
				const sliderCopy = [...getContent.content.slider]
				sliderCopy.splice(idx, 1)
				setGetContent({ ...getContent, content: { ...getContent.content, slider: sliderCopy } })
				deleteSlider(id)
				break
			case 'gallery':
				const galleryCopy = [...getContent.content.gallery]
				galleryCopy.splice(idx, 1)
				setGetContent({ ...getContent, content: { ...getContent.content, gallery: galleryCopy } })
				deleteGallery(id)
				break
			default:
				break
		}
	}

	return (
		<>
			<Modal.Header>
				<Modal.Title>Añadir Entrada {values?.title && <span>: {values?.title}</span>}</Modal.Title>
				<form className='form-title' onSubmit={saveTitles}>
					<label htmlFor='title'>Título de la Entrada</label>
					<input id='title' type='text' name='title' onChange={handleInputChange} placeholder={getContent.title} />
					<label htmlFor='subtitle'>Subtítulo de la Entrada</label>
					<input id='subtitle' type='text' name='subtitle' placeholder={getContent.subtitle} onChange={handleInputChange} />
					<button className='my-btn mini' type='submit'>
						Guardar
					</button>
				</form>
			</Modal.Header>
			<Modal.Body>
				<select ref={select} onChange={addThis} name='content' placeholder='Añadir...'>
					<option value='default' defaultValue>
						Añadir...
					</option>
					<option value='text'>Texto</option>
					<option value='image'>Imagen única</option>
					<option value='gallery'>Galería de imágenes</option>
					<option value='slider'>Slider</option>
					<option value='video'>Vídeo</option>
				</select>
				<section className='add-post'>
					<article className='left'>
						{auxContent === 'default' && <p>Añadir elemento al post</p>}
						{auxContent === 'text' && <AddText saveElement={saveElement} postID={postID} />}
						{auxContent === 'image' && <AddImage saveElement={saveElement} postID={postID} />}
						{auxContent === 'gallery' && <AddGallery saveElement={saveElement} postID={postID} />}
						{auxContent === 'video' && <AddVideo saveElement={saveElement} postID={postID} />}
						{auxContent === 'slider' && <AddSlider saveElement={saveElement} postID={postID} />}
					</article>
					<article className='right'>
						{getContent.content.text.length > 0 && (
							<div className='preview'>
								<h6>Textos</h6>
								{getContent.content.text.map((txt, idx) => (
									<>
										<div key={txt._id} dangerouslySetInnerHTML={txt.parsedText}></div>
										<button className='my-btn mini secondary' onClick={() => deleteThis('text', txt._id, idx)}>
											Borrar
										</button>
									</>
								))}
							</div>
						)}
						{getContent.content.image.length > 0 && (
							<div className='preview'>
								<h6>Imagen Simple</h6>
								{getContent.content.image.map((img, idx) => (
									<>
										<img key={img._id} className='unique-image' src={img.image} alt='' />
										<button className='my-btn mini secondary' onClick={() => deleteThis('image', img._id, idx)}>
											Borrar
										</button>
									</>
								))}
							</div>
						)}
						{getContent.content.video.length > 0 && (
							<div className='preview'>
								<h6>Vídeo</h6>
								{getContent.content.video.map((vid, idx) => (
									<>
										<video className='video-preview' src={vid.video} controls muted />
										<button className='my-btn mini secondary' onClick={() => deleteThis('video', vid._id, idx)}>
											Borrar
										</button>
									</>
								))}
							</div>
						)}
						{getContent.content.gallery?.length > 0 && (
							<div className='preview'>
								<h6>Galerías de fotos</h6>
								{getContent.content.gallery.map((gal, idx) => (
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
						{getContent.content.slider?.length > 0 && (
							<div className='preview'>
								<h6>Slider de fotos</h6>
								{getContent.content.slider.map((sld, idx) => (
									<>
										<div key={sld._id} className='gallery'>
											{sld.slides.map((picture, idx) => (
												<figure className='each-picture' key={idx}>
													<img src={picture} alt='' />
												</figure>
											))}
										</div>
										<button className='my-btn mini secondary' onClick={() => deleteThis('slider', sld._id, idx)}>
											Borrar
										</button>
									</>
								))}
							</div>
						)}
					</article>
				</section>
			</Modal.Body>
			<Modal.Footer>
				<button className='my-btn mini secondary' onClick={() => handleDeletePost(postID)}>
					Cancelar Entrada
				</button>
				<button className='my-btn mini' onClick={() => handleUpdatePost(postID, getContent)}>
					Guardar Entrada
				</button>
			</Modal.Footer>
		</>
	)
}

export default AddPost
