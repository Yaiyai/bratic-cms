import React from 'react'
import { addVideo } from '../../../actions/post-content/video.action'
import useForm from '../../../hooks/useForm'

const AddVideo = ({ saveElement, postID, increment }) => {
	const { values, handleFileChange } = useForm()

	const saveVideo = async () => {
		const theVideo = await addVideo({ video: values.video }, postID)
		saveElement('video', theVideo)
		increment()
	}

	return (
		<section id="add-video">
			<div className='file-group'>
				<input type='file' className='file-input' name='video' id='video' onChange={ handleFileChange } />
			</div>
			{
				values.video && (
					<>
						<figure className="video-preview">
							<video className='video-preview' src={ values.video } controls muted />
						</figure>
						<button className='my-btn mini' onClick={ () => saveVideo() }> Añadir Vídeo a la entrada </button>
					</>
				)
			}

		</section>
	)
}

export default AddVideo
