import GameScreen from './GameScreen.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { ContextProvider } from '../context/TypingContext.js'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('all essential elements are present on page-load', () => {
	render(
		<ContextProvider>
			<Router>
				<GameScreen />
			</Router>
		</ContextProvider>
	)

	expect(screen.getByRole('timer')).toBeInTheDocument()
	expect(screen.getByRole('form')).toBeInTheDocument()
	expect(screen.getByRole('status')).toBeInTheDocument()
	expect(screen.getByRole('group')).toBeInTheDocument()
	expect(
		screen.getByRole('heading', { name: /type, type for your life!/i })
	).toBeInTheDocument()
	expect(
		screen.getByRole('heading', { name: /completed:/i })
	).toBeInTheDocument()
})
