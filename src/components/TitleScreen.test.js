import TitleScreen from './TitleScreen.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { ContextProvider } from '../context/TypingContext.js'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('start button appears and navigates to GameScreen', () => {
	render(
		<ContextProvider>
			<Router>
				<TitleScreen />
			</Router>
		</ContextProvider>
	)

	userEvent.click(
		screen.getByRole('button', { name: /click me to start playing!/i })
	)

	expect(window.location.href).toEqual('http://localhost/game')
})
