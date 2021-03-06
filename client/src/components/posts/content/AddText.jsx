import React, { useEffect, useRef, useState } from 'react'
import { addText } from '../../../actions/post-content/text.action'
import useForm from '../../../hooks/useForm'
import TextEditor from '../../_ui/TextEditor/TextEditor'

const AddText = ({ saveElement, postID }) => {
	const isMounted = useRef(true)
	const [quill, setQuill] = useState()
	const { values, setValues } = useForm()

	const saveText = async () => {
		const theText = await addText(values, postID)
		saveElement('text', theText)
	}

	useEffect(() => {
		return () => {
			isMounted.current = false
		}
	}, [])

	useEffect(() => {
		if (isMounted.current) {
			setValues({
				text: quill,
				parsedText: { __html: quill },
			})
		}
	}, [quill, setValues])

	return (
		<section className="add-text">
			<TextEditor setQuill={ setQuill } />
			<button className='my-btn mini' onClick={ () => saveText() }>
				Añadir Texto a la entrada
			</button>
		</section>
	)
}

export default AddText
