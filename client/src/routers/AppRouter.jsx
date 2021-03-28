import React, { useContext, useEffect, useReducer, useRef } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import LoginScreen from '../components/auth/LoginScreen'
import SignupScreen from '../components/auth/SignupScreen'
import CompanyScreen from '../components/CompanyScreen'
import DashboardScreen from '../components/DashboardScreen'
import { fetchSinToken } from '../helpers/fetch'
import { AuthContext } from '../reducers/auth/AuthContext'
import { CompanyContext } from '../reducers/CompanyContext'
import { CompanyReducer } from '../reducers/CompanyReducer'
import { DashboardNav } from '../ui/DashboardNav'
import { Navbar } from '../ui/Navbar'
import { types } from '../types/types'
import PostsScreen from '../components/PostsScreen'
import Post from '../components/posts/Post'
import AddPostScreen from '../components/posts/AddPostScreen'
import EditPostScreen from '../components/posts/EditPostScreen'

const AppRouter = () => {
	const isMounted = useRef(true)
	const { user } = useContext(AuthContext)
	const [company, dispatchCompany] = useReducer(CompanyReducer, {})

	useEffect(() => {
		return () => {
			isMounted.current = false
		}
	})

	useEffect(() => {
		if (isMounted.current) {
			fetchSinToken(`companies`)
				.then((data) => data.json())
				.then((data) => dispatchCompany({ type: types.getCompany, payload: data.company[0] }))
				.catch((err) => new Error(err))
		}
	}, [])

	return (
		<Router>
			<div>
				{ user.token ? (
					<CompanyContext.Provider value={ { company, dispatchCompany } }>
						<div className='dashboard-container'>
							<DashboardNav />

							<main>
								<Switch>
									<Route exact path='/bratic' component={ DashboardScreen } />
									<Route exact path='/bratic/empresa' component={ CompanyScreen } />
									<Route exact path='/bratic/blog' component={ PostsScreen } />
									<Route exact path='/bratic/blog/nueva-entrada/:postID' component={ AddPostScreen } />
									<Route exact path='/bratic/blog/:postID' component={ Post } />
									<Route exact path='/bratic/blog/editar-entrada/:postID' component={ EditPostScreen } />
									<Redirect to='/bratic' />
								</Switch>
							</main>
						</div>
					</CompanyContext.Provider>
				) : (
					<>
						<Navbar />
						<main className='container'>
							<Switch>
								<Route exact path='/' component={ LoginScreen } />
								<Route path='/registro' component={ SignupScreen } />
								<Redirect to='/' />
							</Switch>
							<small>Made with &hearts; by Yai</small>
							<small>&copy; Bratic S.L.</small>
						</main>
					</>
				) }
			</div>
		</Router>
	)
}

export default AppRouter
