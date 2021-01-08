import React, { useEffect, useState } from 'react'
import { addText } from '../../../actions/post-content/text.action'
import useForm from '../../../hooks/useForm'
import TextEditor from '../../../ui/TextEditor'

const AddText = ({ saveElement, postID }) => {
	const [quill, setQuill] = useState()
	const { values, setValues } = useForm()

	const saveText = async () => {
		const theText = await addText(values, postID)
		saveElement('text', theText)
	}

	useEffect(() => {
		setValues({
			...values,
			text: quill,
			parsedText: { __html: quill },
		})
	}, [quill, values, setValues])

	return (
		<div>
			<TextEditor setQuill={setQuill} />
			<button className='my-btn mini' onClick={() => saveText()}>
				Añadir Texto a la entrada
			</button>
		</div>
	)
}

export default AddText
