import { useEffect, useReducer, useRef } from 'react'
import { AuthContext } from './reducers/auth/AuthContext'
import { AuthReducer } from './reducers/auth/authReducer'
// Import Swiper styles
import 'swiper/swiper.scss'
import 'swiper/components/pagination/pagination.scss'
//Photoswipe
import 'react-photoswiper/lib/photoswipe.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import './global.scss'

import AppRouter from './routers/AppRouter'

const init = () => {
	return JSON.parse(localStorage.getItem('bratic-user')) || { logged: false }
}

const App = () => {
	const isMounted = useRef(true)
	const [user, dispatch] = useReducer(AuthReducer, {}, init)
	useEffect(() => {
		return () => {
			isMounted.current = false
		}
	}, [])

	useEffect(() => {
		if (isMounted.current) {
			localStorage.setItem('bratic-user', JSON.stringify(user))
		}
	}, [user])


	return (
		<>
			<AuthContext.Provider value={ { user, dispatch } }>
				<AppRouter />
			</AuthContext.Provider>
		</>
	)
}

export default App
