const typingReducer = (state, action) => {
	switch (action.type) {
		case 'SET_LOADING':
			return {
				...state,
				loading: true,
			}
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
