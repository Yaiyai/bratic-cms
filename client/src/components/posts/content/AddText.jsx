import React, { useState } from 'react'
import { addText } from '../../../actions/post-content/text.action'
import useForm from '../../../hooks/useForm'
import TextEditor from '../../../ui/TextEditor'

const AddText = ({ saveElement, postID }) => {
	const [quill, setQuill] = useState()
	const [parsed, setParsed] = useState()
	const { values, setValues } = useForm()

	const handleQuill = async (e) => {
		e.preventDefault()
		setValues({
			...values,
			text: quill,
			parsedText: parsed,
		})
	}

	const saveText = async () => {
		const theText = await addText(values, postID)
		saveElement('text', theText)
	}

	return (
		<div>
			<TextEditor setQuill={setQuill} handleQuill={handleQuill} setParsed={setParsed} />
			<button onClick={() => saveText()}>Añadir Texto</button>
		</div>
	)
}

export default AddText
