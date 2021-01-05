import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import LoginScreen from '../components/auth/LoginScreen'
import SignupScreen from '../components/auth/SignupScreen'
import { Navbar } from '../ui/Navbar'

const AppRouter = () => {
	return (
		<Router>
			<div>
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
			</div>
		</Router>
	)
}

export default AppRouter
