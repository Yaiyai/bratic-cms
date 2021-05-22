import React, { useContext, useEffect, useReducer, useRef, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { Modal } from 'react-bootstrap'
import { fetchSinToken } from '../helpers/fetch'

import { AuthContext } from '../reducers/auth/AuthContext'
import { CompanyContext } from '../reducers/CompanyContext'
import { CompanyReducer } from '../reducers/CompanyReducer'
import { SectionContext } from '../reducers/sections/sectionsContext'
import { SectionsReducer } from '../reducers/sections/SectionsReducer'
import { types } from '../types/types'

import CompanyScreen from '../components/company/CompanyScreen'
import DashboardScreen from '../components/DashboardScreen/DashboardScreen'
import { DashboardNav } from '../components/_ui/DashboardNav/DashboardNav'
import PostsScreen from '../components/posts/PostsScreen/PostsScreen'
import AddPostScreen from '../components/posts/AddPosts/AddPostScreen'
import Post from '../components/posts/Post/Post'
import EditPostScreen from '../components/posts/EditPosts/EditPostScreen'
import { SectionScreen } from '../components/sections/SectionScreen'
import { AddSection } from '../components/sections/AddSection'
import LoginScreen from '../components/auth/LoginScreen/LoginScreen'
import SignupScreen from '../components/auth/SignupScreen/SignupScreen'
import { NavBar } from '../components/_ui/NavBar/NavBar'
import AllSections from '../components/sections/AllSections'

const AppRouter = () => {
	const isMounted = useRef(true)
	const { user } = useContext(AuthContext)
	const [company, dispatchCompany] = useReducer(CompanyReducer, {})
	const [sections, dispatchSections] = useReducer(SectionsReducer, {})

	useEffect(() => {
		return () => {
			isMounted.current = false
		}
	})

	useEffect(() => {
		if (isMounted.current) {
			fetchSinToken(`sections`)
				.then((data) => data.json())
				.then((data) => dispatchSections({ type: types.getSections, payload: data.sections }))
				.catch((err) => new Error(err))
			fetchSinToken(`companies`)
				.then((data) => data.json())
				.then((data) => dispatchCompany({ type: types.getCompany, payload: data.company[0] }))
				.catch((err) => new Error(err))
		}
	}, [])

	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)


	return (
		<Router>
			<div>
				{ user.token ? (
					<CompanyContext.Provider value={ { company, dispatchCompany } }>
						<SectionContext.Provider value={ { sections, dispatchSections } }>

							<div className='dashboard-container'>
								<DashboardNav handleShow={ handleShow } />

								<main>
									<Switch>
										<Route exact path='/bratic' component={ DashboardScreen } />
										<Route exact path='/bratic/empresa' component={ CompanyScreen } />
										<Route exact path='/bratic/blog' component={ PostsScreen } />
										<Route exact path='/bratic/blog/nueva-entrada/:postID' component={ AddPostScreen } />
										<Route exact path='/bratic/blog/:postID' component={ Post } />
										<Route exact path='/bratic/blog/editar-entrada/:postID' component={ EditPostScreen } />
										<Route exact path='/bratic/seccion' component={ AllSections } />
										<Route exact path='/bratic/seccion/:id' component={ (props) => <SectionScreen { ...props } /> } />
										<Redirect to='/bratic' />
									</Switch>

									<Modal dialogClassName='modal-width' centered className='my-modals' show={ show } onHide={ handleClose }>
										<Modal.Header>
											<h4>Añadir Sección a la web</h4>
										</Modal.Header>
										<Modal.Body>
											<AddSection handleClose={ handleClose } />
										</Modal.Body>

										<Modal.Footer>
											<button className='my-btn mini secondary' onClick={ handleClose }>
												cerrar
												</button>
										</Modal.Footer>
									</Modal>
								</main>
							</div>
						</SectionContext.Provider>
					</CompanyContext.Provider>
				) : (
					<section>
						<NavBar />
						<main className='login-container'>
							<figure>
								<img src={ process.env.REACT_APP_LOGIN_IMAGE } alt="" />
							</figure>
							<Switch>
								<Route exact path='/' component={ LoginScreen } />
								<Route path='/registro' component={ SignupScreen } />
								<Redirect to='/' />
							</Switch>
							<div className="copyright">
								<small>Made with &hearts; by Yai</small>
								<small>&copy; Bratic S.L.</small>
							</div>
						</main>
					</section>
				) }
			</div>
		</Router>
	)
}

export default AppRouter
