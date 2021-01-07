import { types } from '../../types/types'

export const PostsReducer = (state = [], action) => {
	switch (action.type) {
		case types.getPosts:
			return action.payload

		case types.getThisPost:
			return action.payload

		case types.postUpdate:
			return { ...action.payload }

		case types.addPost:
			return { ...action.payload }

		case types.featuresUpdate:
			return {
				...state,
				features: action.payload,
			}
		case types.galleryUpdate:
			return {
				...state,
				gallery: action.payload,
			}
		default:
			return state
	}
}
