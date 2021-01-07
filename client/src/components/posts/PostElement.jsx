import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const PostElement = ({ askIfDelete, post }) => {
	return (
		<>
			<article className='each-post'>
				<h6>{post.title}</h6>
				<Link to={`/bratic/blog/${post._id}`}>
					<button className='my-btn mini secondary'>Ver</button>
				</Link>

				<button className='my-btn mini secondary' onClick={() => askIfDelete(post._id)}>
					Borrar
				</button>
			</article>
		</>
	)
}

export default PostElement
