import React from 'react'
import { addVideo } from '../../../actions/post-content/video.action'
import useForm from '../../../hooks/useForm'

const AddVideo = ({ saveElement, postID }) => {
	const { values, handleFileChange } = useForm()
	const saveVideo = async () => {
		const theVideo = await addVideo({ video: values.video }, postID)
		saveElement('video', theVideo)
	}

	return (
		<div>
			<label htmlFor='video'>Añadir video</label>
			{values?.video && <video className='each-preview' src={values.video} controls muted />}
			<input type='file' className='file-input' name='video' id='video' onChange={handleFileChange} />
			<button onClick={() => saveVideo()}>Añadir Vídeo</button>
		</div>
	)
}

export default AddVideo
