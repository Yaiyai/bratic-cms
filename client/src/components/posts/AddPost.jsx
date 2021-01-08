import React, { useRef, useState } from 'react'
import AddGallery from './content/AddGallery'
import AddImage from './content/AddImage'
import AddSlider from './content/AddSlider'
import AddText from './content/AddText'
import AddVideo from './content/AddVideo'
import Modal from 'react-bootstrap/esm/Modal'

const AddPost = ({ postID, handleUpdatePost, handleDeletePost }) => {
	const select = useRef()
	const [auxContent, setAuxContent] = useState('default')

	const [getContent, setGetContent] = useState({ slider: [], image: [], text: [], video: [], gallery: [] })

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
				if (getContent.text.length > 0) {
					const contentCopy = [...getContent.text, element]
					setGetContent({ ...getContent, text: contentCopy })
					setToDefault()
				} else {
					const contentCopy = [element]
					setGetContent({ ...getContent, text: contentCopy })
					setToDefault()
				}
				break
			case 'image':
				if (getContent.image.length > 0) {
					const contentCopy = [...getContent.image, element]
					setGetContent({ ...getContent, image: contentCopy })
					setToDefault()
				} else {
					const contentCopy = [element]
					setGetContent({ ...getContent, image: contentCopy })
					setToDefault()
				}
				break
			case 'gallery':
				if (getContent.gallery.length > 0) {
					const contentCopy = [...getContent.gallery, element]
					setGetContent({ ...getContent, gallery: contentCopy })
					setToDefault()
				} else {
					const contentCopy = [element]
					setGetContent({ ...getContent, gallery: contentCopy })
					setToDefault()
				}
				break
			case 'video':
				if (getContent.video.length > 0) {
					const contentCopy = [...getContent.video, element]
					setGetContent({ ...getContent, video: contentCopy })
					setToDefault()
				} else {
					const contentCopy = [element]
					setGetContent({ ...getContent, video: contentCopy })
					setToDefault()
				}
				break
			case 'slider':
				if (getContent.slider.length > 0) {
					const contentCopy = [...getContent.slider, element]
					setGetContent({ ...getContent, slider: contentCopy })
					setToDefault()
				} else {
					const contentCopy = [element]
					setGetContent({ ...getContent, slider: contentCopy })
					setToDefault()
				}
				break
			default:
				break
		}
	}

	return (
		<>
			<Modal.Header>
				<Modal.Title>Añadir Post</Modal.Title>
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
						{getContent.text.length > 0 && (
							<div className='texts'>
								<h6>Textos</h6>
								{getContent.text.map((txt) => (
									<div key={txt._id} dangerouslySetInnerHTML={txt.parsedText}></div>
								))}
							</div>
						)}
						{getContent.image.length > 0 && (
							<div className='texts'>
								<h6>Imagen Simple</h6>
								{getContent.image.map((img) => (
									<img className='unique-image' src={img.image} alt='' />
								))}
							</div>
						)}
						{getContent.video.length > 0 && (
							<div className='texts'>
								<h6>Vídeo</h6>
								{getContent.video.map((vid) => (
									<video className='video-preview' src={vid.video} controls muted />
								))}
							</div>
						)}
						{getContent.gallery?.length > 0 && (
							<div className='texts'>
								<h6>Galerías de fotos</h6>
								{getContent.gallery.map((gal) => (
									<div className='gallery'>
										{gal.gallery.map((picture, idx) => (
											<figure className='each-picture' key={idx}>
												<img src={picture} alt='' />
											</figure>
										))}
									</div>
								))}
							</div>
						)}
						{getContent.slider?.length > 0 && (
							<div className='texts'>
								<h6>Slider de fotos</h6>
								{getContent.slider.map((sld) => (
									<div className='gallery'>
										{sld.slides.map((picture, idx) => (
											<figure className='each-picture' key={idx}>
												<img src={picture} alt='' />
											</figure>
										))}
									</div>
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
