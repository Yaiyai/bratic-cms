import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
	return (
		<nav className='login-nav'>
			<div className='container'>
				<figure>
					<img src='https://res.cloudinary.com/bratic-app/image/upload/v1609866461/logoBN_ujpbti.svg' alt='' />
				</figure>
				<ul>
					<li>
						<Link to='/'>Entrar</Link>
					</li>
					<li>
						<Link to='/registro'>Registro</Link>
					</li>
				</ul>
			</div>
		</nav>
	)
}
