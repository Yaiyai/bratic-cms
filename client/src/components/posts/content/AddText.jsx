import React, { useEffect, useRef, useState } from 'react'
import { addText } from '../../../actions/post-content/text.action'
import useForm from '../../../hooks/useForm'
import TextEditor from '../../../ui/TextEditor'

const AddText = ({ saveElement, postID, increment }) => {
	const isMounted = useRef(true)
	const [quill, setQuill] = useState()
	const { values, setValues } = useForm()

	const saveText = async () => {
		const theText = await addText(values, postID)
		increment()
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
				...values,
				text: quill,
				parsedText: { __html: quill },
			})
		}
	}, [quill, setValues])

	return (
		<div>
			<TextEditor setQuill={ setQuill } />
			<button className='my-btn mini' onClick={ () => saveText() }>
				Añadir Texto a la entrada
			</button>
		</div>
	)
}

export default AddText
