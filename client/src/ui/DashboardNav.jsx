import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../reducers/auth/AuthContext'
import { types } from '../types/types'
import { CgArrowBottomLeftR, CgArrowTopRightR } from "react-icons/cg";

export const DashboardNav = () => {
	const { dispatch } = useContext(AuthContext)
	const [show, setShow] = useState(true)

	const handleLogout = async () => {
		await dispatch({ type: types.logout })
		localStorage.removeItem('bratic-token')
		localStorage.removeItem('bratic-user')
	}

	return (
		<>
			{
				show ? (
					<nav className='dash-nav open'>
						<>
							<div className="close-nav">
								<CgArrowBottomLeftR className='close-icon' onClick={ () => setShow(false) } />
							</div>

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
								<li>
									<Link to='/bratic/blog'>Blog</Link>
								</li>
							</ul>
							<div className='btn-group'>
								<small>Made with &hearts; by Yai</small>
								<small>&copy; Bratic S.L.</small>
								<button className='my-btn secondary mini' onClick={ handleLogout }>Cerrar Sesión</button>
							</div>
						</>
					</nav>
				) : (
					<nav className='dash-nav'>
						<div className="close-nav">
							<CgArrowTopRightR className='close-icon' onClick={ () => setShow(true) } />
						</div>
					</nav>
				)
			}
		</>
	)
}
