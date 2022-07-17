import React, { useReducer, createContext } from 'react'
import typingReducer, { AppState, Action } from './TypingReducer'

interface TypingContextProps {
	children: React.ReactNode
}

const initialState = {
	gameActive: false,
	secondsPerRound: 20,
	secondsRemaining: 20,
	count: 0,
	wpm: 0,
}

const TypingContext = createContext<{
	state: AppState
	dispatch: React.Dispatch<Action>
}>({ state: initialState, dispatch: () => {} })

export const ContextProvider = ({ children }: TypingContextProps) => {
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
