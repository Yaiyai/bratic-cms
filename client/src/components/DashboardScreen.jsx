import React, { useContext } from 'react'
import { AuthContext } from '../reducers/auth/AuthContext'

const DashboardScreen = () => {
	const { user } = useContext(AuthContext)
	return (
		<section id="dashboard-screen">
			<h3>¡Bienvenid@ { user.name }!</h3>
		</section>
	)
}

export default DashboardScreen
