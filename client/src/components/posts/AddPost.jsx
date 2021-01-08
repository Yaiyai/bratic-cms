import React, { useState } from 'react'
import AddGallery from './content/AddGallery'
import AddImage from './content/AddImage'
import AddText from './content/AddText'
import AddVideo from './content/AddVideo'

const AddPost = ({ postID, handleUpdatePost }) => {
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
	const saveElement = (type, element) => {
		switch (type) {
			case 'text':
				if (getContent.text.length > 0) {
					const contentCopy = [...getContent.text, element]
					setGetContent({ ...getContent, text: contentCopy })
				} else {
					const contentCopy = [element]
					setGetContent({ ...getContent, text: contentCopy })
				}
				break
			case 'image':
				if (getContent.image.length > 0) {
					const contentCopy = [...getContent.image, element]
					setGetContent({ ...getContent, image: contentCopy })
				} else {
					const contentCopy = [element]
					setGetContent({ ...getContent, image: contentCopy })
				}
				break
			case 'gallery':
				if (getContent.gallery.length > 0) {
					const contentCopy = [...getContent.gallery, element]
					setGetContent({ ...getContent, gallery: contentCopy })
				} else {
					const contentCopy = [element]
					setGetContent({ ...getContent, gallery: contentCopy })
				}
				break
			case 'video':
				if (getContent.video.length > 0) {
					const contentCopy = [...getContent.video, element]
					setGetContent({ ...getContent, video: contentCopy })
				} else {
					const contentCopy = [element]
					setGetContent({ ...getContent, video: contentCopy })
				}
				break
			case 'slider':
				if (getContent.slider.length > 0) {
					const contentCopy = [...getContent.slider, element]
					setGetContent({ ...getContent, slider: contentCopy })
				} else {
					const contentCopy = [element]
					setGetContent({ ...getContent, slider: contentCopy })
				}
				break
			default:
				break
		}
	}

	return (
		<>
			<article>
				<select onChange={addThis} name='content' placeholder='Añadir...'>
					<option defaultValue>Añadir...</option>
					<option value='text'>Texto</option>
					<option value='image'>Imagen única</option>
					<option value='gallery'>Galería de imágenes</option>
					<option value='slider'>Slider</option>
					<option value='video'>Vídeo</option>
				</select>
			</article>
			<article></article>
			<article>
				{auxContent === 'default' && <p>Añadir elemento al post</p>}
				{auxContent === 'text' && <AddText saveElement={saveElement} postID={postID} />}
				{auxContent === 'image' && <AddImage saveElement={saveElement} postID={postID} />}
				{auxContent === 'gallery' && <AddGallery saveElement={saveElement} postID={postID} />}
				{auxContent === 'video' && <AddVideo saveElement={saveElement} postID={postID} />}
			</article>
			<button onClick={() => handleUpdatePost(postID, getContent)}>Guardar</button>
		</>
	)
}

export default AddPost
