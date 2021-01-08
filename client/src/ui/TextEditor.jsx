import React, { useEffect, useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const TextEditor = ({ setQuill }) => {
	const [value, setValue] = useState('')
	const quillRef = useRef(null)

	const modules = {
		toolbar: {
			container: [
				[{ header: [1, 2, 3, 4, 5, 6, false] }],
				[{ color: [] }, { background: [] }],
				[{ align: [] }],
				['bold', 'italic', 'underline', 'strike', 'blockquote'],
				[{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
				[{ script: 'sub' }, { script: 'super' }],
				['link'],
			],
		},
		clipboard: {
			matchVisual: false,
		},
	}

	useEffect(() => {
		setQuill(value)
	})

	return (
		<div>
			<div className='text-editor'>
				<ReactQuill ref={quillRef} modules={modules} formats={TextEditor.formats} theme='snow' value={value} onChange={setValue} />
			</div>
		</div>
	)
}

TextEditor.formats = ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'align', 'color', 'script', 'background']

export default TextEditor
