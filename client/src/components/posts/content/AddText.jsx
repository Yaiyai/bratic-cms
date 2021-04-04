import React, { useEffect, useRef, useState } from 'react'
import { addText } from '../../../actions/post-content/text.action'
import useForm from '../../../hooks/useForm'
import TextEditor from '../../../ui/TextEditor'

const AddText = ({ saveElement, postID, increment, order }) => {
	const isMounted = useRef(true)
	const [quill, setQuill] = useState()
	const { values, setValues } = useForm()

	const saveText = async () => {
		const theText = await addText(values, postID)
		saveElement('text', theText)
		increment()
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
				order: order
			})
		}
	}, [quill, setValues, order])

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
