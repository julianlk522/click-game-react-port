import { useReducer, createContext } from 'react'
import typingReducer from './TypingReducer'

const TypingContext = createContext()

export const ContextProvider = ({ children }) => {
	const initialState = {
		loading: false,
		gameActive: false,
		secondsPerRound: 20,
		secondsRemaining: 20,
		count: 0,
	}

	const [state, dispatch] = useReducer(typingReducer, initialState)

	return (
		<TypingContext.Provider
			value={{
				state,
				dispatch,
			}}
		>
			{children}
		</TypingContext.Provider>
	)
}

export default TypingContext
