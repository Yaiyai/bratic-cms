import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const PostElement = ({ askIfDelete, post }) => {
	const [date, setDate] = useState()
	const [updateDate, setUpdateDate] = useState()

	useEffect(() => {
		setDate(new Date(post.createdAt).toLocaleString())
		setUpdateDate(new Date(post.updatedAt).toLocaleString())
	}, [date, setDate, post])

	return (
		<>
			<article className='each-post-prev'>
				<div className='info'>
					<h5>{ post.title }</h5>
					{ date && <p>Fecha de la publicación: <strong>{ date }</strong></p> }
					{ updateDate && <p>Fecha de la última edición: <strong>{ updateDate }</strong></p> }
					<p className="status">Estado de la publicación: <strong>{ post.status }</strong></p>
				</div>
				<div className='btn-group'>
					<button className='my-btn mini third' onClick={ () => askIfDelete(post._id) }>
						Borrar Entrada
					</button>
					<Link className='my-btn mini secondary' to={ `/bratic/blog/editar-entrada/${post._id}` }>
						Editar Entrada
					</Link>
					<Link className='my-btn mini ' to={ `/bratic/blog/${post._id}` }>
						Ver Muestra
					</Link>
				</div>
			</article>
		</>
	)
}

export default PostElement
