import React, { useContext } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import LoginScreen from '../components/auth/LoginScreen'
import SignupScreen from '../components/auth/SignupScreen'
import { DashboardScreen } from '../components/DashboardScreen'
import { AuthContext } from '../reducers/auth/AuthContext'
import { DashboardNav } from '../ui/DashboardNav'
import { Navbar } from '../ui/Navbar'

const AppRouter = () => {
	const { user } = useContext(AuthContext)

	return (
		<Router>
			<div>
				{user.token ? (
					<div className='dashboard-container'>
						<DashboardNav />

						<main>
							<Switch>
								<Route exact path='/bratic' component={DashboardScreen} />
								<Redirect to='/bratic' />
							</Switch>
						</main>
					</div>
				) : (
					<>
						<Navbar />
						<main className='container'>
							<Switch>
								<Route exact path='/' component={LoginScreen} />
								<Route path='/registro' component={SignupScreen} />
								<Redirect to='/' />
							</Switch>
							<small>Made with &hearts; by Yai</small>
							<small>&copy; Bratic S.L.</small>
						</main>
					</>
				)}
			</div>
		</Router>
	)
}

export default AppRouter
