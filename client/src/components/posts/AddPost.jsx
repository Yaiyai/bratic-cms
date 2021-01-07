import React, { useState } from 'react'
import AddImage from './content/AddImage'
import AddText from './content/AddText'

const AddPost = ({ postID, handleUpdatePost }) => {
	const [auxContent, setAuxContent] = useState('default')

	const [getContent, setGetContent] = useState([])

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
	const saveElement = (element) => {
		if (getContent.length > 0) {
			setGetContent([...getContent, element])
		} else {
			setGetContent([element])
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
			</article>
			<button onClick={() => handleUpdatePost(postID, getContent)}>Guardar</button>
		</>
	)
}

export default AddPost
