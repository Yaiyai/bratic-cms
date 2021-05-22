import React from 'react'
import SectionTitle from '../_ui/SectionTitle/SectionTitle'

const DashboardScreen = () => {
	return (
		<section id="dashboard-screen">
			<SectionTitle
				image='https://res.cloudinary.com/bratic-app/image/upload/v1621696920/web/dashboard2_zwjqif.svg'
				title="Dashboard"
				instructions="Éste es el dashboard de gestión de contenido de tu web :)"
			/>
		</section>
	)
}

export default DashboardScreen
