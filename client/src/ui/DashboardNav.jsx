import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../reducers/auth/AuthContext'
import { types } from '../types/types'

export const DashboardNav = () => {
	const { dispatch } = useContext(AuthContext)

	const handleLogout = async () => {
		await dispatch({ type: types.logout })
		localStorage.removeItem('bratic-token')
		localStorage.removeItem('bratic-user')
	}

	return (
		<>
			<nav className='dash-nav'>
				<ul>
					<li>
						<Link to='/bratic'>
							<figure>
								<img src='https://res.cloudinary.com/bratic-app/image/upload/v1609866461/logoBN_ujpbti.svg' alt='' />
							</figure>
						</Link>
					</li>
					<li>
						<Link to='/bratic/empresa'>Datos de empresa</Link>
					</li>
				</ul>
				<div className='btn-group'>
					<small>Made with &hearts; by Yai</small>
					<small>&copy; Bratic S.L.</small>
					<button className='my-btn secondary mini' onClick={handleLogout}>
						Cerrar Sesión
					</button>
				</div>
			</nav>
		</>
	)
}
