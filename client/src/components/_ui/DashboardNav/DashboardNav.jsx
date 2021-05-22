import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { types } from '../../../types/types'
import { AuthContext } from '../../../reducers/auth/AuthContext';

import { AiOutlineBank, AiOutlineCloseCircle, AiOutlineComment, AiOutlineLayout, AiOutlinePlusCircle } from 'react-icons/ai';

export const DashboardNav = ({ handleShow }) => {
	const { dispatch, user } = useContext(AuthContext)
	const [currentNav, setCurrentNav] = useState()

	const handleLogout = async () => {
		await dispatch({ type: types.logout })
		localStorage.removeItem('bratic-token')
		localStorage.removeItem('bratic-user')
	}

	return (
		<>
			<nav className='dash-nav '>

				<Link to='/bratic' onClick={ () => setCurrentNav('') }>
					<figure>
						<img src='https://res.cloudinary.com/bratic-app/image/upload/v1609866461/logoBN_ujpbti.svg' alt='' />
					</figure>
				</Link>

				<ul>
					<li>
						<Link to='/bratic/empresa' onClick={ () => setCurrentNav('empresa') }><AiOutlineBank className={ currentNav === 'empresa' ? 'active' : null } /><span>Empresa</span></Link>
					</li>
					<li>
						<Link to='/bratic/blog' onClick={ () => setCurrentNav('blog') }><AiOutlineComment className={ currentNav === 'blog' ? 'active' : null } /><span>Blog</span></Link>
					</li>
					<li>
						<Link to='/bratic/seccion' onClick={ () => setCurrentNav('secciones') }><AiOutlineLayout className={ currentNav === 'secciones' ? 'active' : null } /><span>Secciones</span></Link>
					</li>
				</ul>
				<div className='btn-group'>
					{ user.email === 'admin@yai.com' && (
						<AiOutlinePlusCircle onClick={ handleShow } />
					) }
					<AiOutlineCloseCircle onClick={ handleLogout } />
				</div>
			</nav>
		</>
	)
}
