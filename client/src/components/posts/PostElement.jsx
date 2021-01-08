import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const PostElement = ({ askIfDelete, post }) => {
	const [date, setDate] = useState()
	useEffect(() => {
		setDate(new Date(post.createdAt).toLocaleString())
	}, [date, setDate, post])

	return (
		<>
			<article className='each-post'>
				<div className='info'>
					<h6>{post.title}</h6>
					{date && <small>{date}</small>}
				</div>
				<div className='btn-group'>
					<button className='my-btn mini third' onClick={() => askIfDelete(post._id)}>
						Borrar
					</button>
					<Link className='my-btn mini' to={`/bratic/blog/${post._id}`}>
						Ver
					</Link>
				</div>
			</article>
		</>
	)
}

export default PostElement
