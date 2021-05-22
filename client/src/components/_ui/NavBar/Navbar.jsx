import React from 'react'
import { Link } from 'react-router-dom'

export const NavBar = () => {
	return (
		<nav className='login-nav'>
			<figure>
				<img src={ process.env.REACT_APP_COMPANY_LOGO_BN } alt='' />
			</figure>
			<ul>
				<li>
					<Link to='/'>Entrar</Link>
				</li>
				<li>
					<Link to='/registro'>Registro</Link>
				</li>
			</ul>
		</nav>
	)
}
