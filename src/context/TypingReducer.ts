export type AppState = {
	gameActive: boolean
	secondsPerRound: number
	secondsRemaining: number
	count: number
}

export type Action =
	| { type: 'RESET_COUNT' }
	| { type: 'INCREMENT_COUNT' }
	| { type: 'START_GAME' }
	| { type: 'END_GAME' }
	| { type: 'SET_SECONDS_PER_ROUND'; payload: number }
	| { type: 'SET_SECONDS_REMAINING'; payload: number }
	| { type: 'DECREMENT_SECONDS_REMAINING' }
	| { type: 'DEFAULT' }

const typingReducer = (state: AppState, action: Action) => {
	switch (action.type) {
		case 'RESET_COUNT':
			return {
				...state,
				count: 0,
			}
		case 'INCREMENT_COUNT':
			return {
				...state,
				count: state.count + 1,
			}
		case 'START_GAME':
			return {
				...state,
				gameActive: true,
			}
		case 'END_GAME':
			return {
				...state,
				gameActive: false,
			}
		case 'SET_SECONDS_PER_ROUND':
			return {
				...state,
				secondsPerRound: action.payload,
			}
		case 'SET_SECONDS_REMAINING':
			return {
				...state,
				secondsRemaining: action.payload,
			}
		case 'DECREMENT_SECONDS_REMAINING':
			return {
				...state,
				secondsRemaining: state.secondsRemaining - 1,
			}
		default:
			return {
				...state,
			}
	}
}

export default typingReducer
