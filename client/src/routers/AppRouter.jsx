import React, { useContext, useEffect, useReducer, useRef, useState } from 'react'
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
import { SectionScreen } from '../components/SectionScreen'
import { Modal } from 'react-bootstrap'
import { AddSection } from '../components/sections/AddSection'
import { SectionContext } from '../reducers/sections/sectionsContext'
import { SectionsReducer } from '../reducers/sections/SectionsReducer'

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
										<Route exact path='/bratic/seccion/:id' component={ (props) => <SectionScreen { ...props } /> } />
										<Redirect to='/bratic' />
									</Switch>

									<Modal dialogClassName='modal-width' centered className='my-modals' show={ show } onHide={ handleClose }>
										<Modal.Header>
											<h1>Añadir Sección a la web</h1>
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
