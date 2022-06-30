import { useReducer, createContext } from 'react'
import typingReducer from './TypingReducer'

const TypingContext = createContext()

export const ContextProvider = ({ children }) => {
	const initialState = {
		gameActive: false,
		secondsPerRound: 10,
		secondsRemaining: 10,
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
