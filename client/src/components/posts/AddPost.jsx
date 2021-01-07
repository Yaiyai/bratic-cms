import React, { useContext, useReducer, useState } from 'react'
import useForm from '../../hooks/useForm'
import { AuthContext } from '../../reducers/auth/AuthContext'
import { PostsReducer } from '../../reducers/posts/PostsReducer'
import AddText from './content/AddText'

const AddPost = ({ postID }) => {
	const { user } = useContext(AuthContext)
	const [auxContent, setContent] = useState('default')

	const [post, dispatchPost] = useReducer(PostsReducer, {})
	const { values, setValues, handleInputChange, handleFileChange } = useForm()
	const { content, title, author } = values

	const addThis = ({ target }) => {
		switch (target.value) {
			case 'text':
				setContent('text')
				break
			default:
				setContent('default')
				break
		}
	}
	// const saveElement = (what) => {
	//     setValues(
	//         ...values,
	//         content: [...content, what]
	//     )
	// }

	return (
		<>
			<article>
				<select onChange={addThis} name='select' placeholder='Añadir...'>
					<option defaultValue>Añadir...</option>
					<option value='text'>Texto</option>
					<option value='image'>Imagen única</option>
					<option value='gallery'>Galería de imágenes</option>
					<option value='slider'>Slider</option>
					<option value='video'>Vídeo</option>
				</select>
			</article>
			<article>
				{auxContent === 'default' && <p>Añadir elemento al post</p>}
				{auxContent === 'text' && <AddText />}
			</article>
		</>
	)
}

export default AddPost
