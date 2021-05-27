import React from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import 'dayjs/locale/es' // load on demand
dayjs.locale('es')

const PostElement = ({ askIfDelete, post }) => {

    return (
        <>
            <article className='each-post-prev'>
                <div className='info'>
                    <h5>{ post.title }</h5>
                    { post?.postDate ? <p>Fecha de publicación: <strong>{ dayjs(post?.postDate).format('DD/MM/YYYY') }</strong></p> : <p>Fecha de publicación: <strong>{ dayjs(post?.createdAt).format('DD/MM/YYYY') }</strong></p> }
                    <p>Fecha de la última edición: <strong>{ dayjs(post?.updatedAt).format('DD/MM/YYYY') }</strong></p>
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
