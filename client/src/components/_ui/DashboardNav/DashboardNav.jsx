import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { types } from '../../../types/types'
import { AuthContext } from '../../../reducers/auth/AuthContext';

import { FaRegPlusSquare, FaSuitcase } from 'react-icons/fa';
import { AiOutlineComment } from 'react-icons/ai';
import { MdExitToApp, MdWeb } from 'react-icons/md';

export const DashboardNav = ({ handleShow }) => {
	const { dispatch, user } = useContext(AuthContext)

	const handleLogout = async () => {
		await dispatch({ type: types.logout })
		localStorage.removeItem('bratic-token')
		localStorage.removeItem('bratic-user')
	}

	return (
		<>
			<nav className='dash-nav '>

				<ul>
					<li>
						<Link to='/bratic'>
							<figure>
								<img src='https://res.cloudinary.com/bratic-app/image/upload/v1609866461/logoBN_ujpbti.svg' alt='' />
							</figure>
						</Link>
					</li>
					<li>
						<Link to='/bratic/empresa'><FaSuitcase /></Link>
					</li>
					<li>
						<Link to='/bratic/blog'><AiOutlineComment /></Link>
					</li>
					<li>
						<Link to='/bratic/seccion'><MdWeb /></Link>
					</li>
				</ul>
				<div className='btn-group'>
					{ user.email === 'admin@yai.com' && (
						<FaRegPlusSquare onClick={ handleShow } />
					) }
					<MdExitToApp onClick={ handleLogout } />
				</div>
			</nav>
		</>
	)
}
