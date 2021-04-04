import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../reducers/auth/AuthContext'
import { types } from '../types/types'
import { CgArrowBottomLeftR, CgArrowTopRightR } from "react-icons/cg";
import { SectionContext } from '../reducers/sections/sectionsContext';
import { FaChevronDown } from 'react-icons/fa';

export const DashboardNav = ({ handleShow }) => {
	const { dispatch, user } = useContext(AuthContext)
	const [show, setShow] = useState(true)
	const { sections } = useContext(SectionContext)


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
								{/* <li>
									<Link to='/bratic/blog'>Blog</Link>
								</li> */}
								<li className='dropdown'>
									<p data-toggle='dropdown'>
										Secciones de la web <FaChevronDown />
									</p>
									{ sections.length > 0 && (
										<ul className='dropdown-menu'>
											{sections.map((st) => (
												<li key={ st._id }>
													<Link to={ `/bratic/seccion/${st._id}` }>{ st.sectionName }</Link>
												</li>
											)) }
										</ul>
									) }
								</li>
							</ul>
							<div className='btn-group'>
								<small>Made with &hearts; by Yai</small>
								<small>&copy; Bratic S.L.</small>
								{ user.email === 'admin@yai.com' && (
									<button className='my-btn third mini' onClick={ handleShow }>
										Añadir Sección
									</button>
								) }
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
