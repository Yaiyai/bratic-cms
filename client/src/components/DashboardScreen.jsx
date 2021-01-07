import React, { useContext } from 'react'
import { AuthContext } from '../reducers/auth/AuthContext'

const DashboardScreen = () => {
	const { user } = useContext(AuthContext)
	return (
		<div>
			<h1>¡Bienvenid@ {user.name}!</h1>
		</div>
	)
}

export default DashboardScreen
