import React, { useState } from 'react'
import useForm from '../../../hooks/useForm'
import TextEditor from '../../../ui/TextEditor'

const AddText = ({ saveElement }) => {
	const [quill, setQuill] = useState()
	const [parsed, setParsed] = useState()
	const { values, setValues } = useForm()

	const handleQuill = (e) => {
		e.preventDefault()
		setValues({
			...values,
			text: quill,
			parsedText: parsed,
		})
	}

	return (
		<div>
			<TextEditor setQuill={setQuill} handleQuill={handleQuill} setParsed={setParsed} />
		</div>
	)
}

export default AddText
