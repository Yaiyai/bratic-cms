import React, { useEffect, useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const TextEditorSections = ({ setQuill, handleQuill, setParsed }) => {
	const [value, setValue] = useState('')
	const quillRef = useRef(null)

	const createHTLM = (text) => {
		return { __html: text }
	}

	const modules = {
		toolbar: {
			container: [
				[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
				[{ font: [] }],
				[{ 'color': ['#dd4124', '#f38b2e'] }, { 'background': ['#dd4124', '#f38b2e'] }],
				['bold', 'italic', 'underline', 'strike', 'blockquote'],
				[{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
				['link'],
			],
		},
		clipboard: {
			matchVisual: false,
		},
	}

	useEffect(() => {
		setQuill(value)
		setParsed(createHTLM(value))
	}, [value, setQuill, setParsed])

	return (
		<div>
			<div className='text-editor'>
				<ReactQuill ref={ quillRef } modules={ modules } formats={ TextEditorSections.formats } theme='snow' value={ value } onChange={ setValue } />
			</div>
			<form onSubmit={ handleQuill }>
				<button type='submit' className='my-btn mini secondary'>
					Guardar texto
				</button>
			</form>
		</div>
	)
}

TextEditorSections.formats = ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'align', 'color', 'script', 'background']

export default TextEditorSections
