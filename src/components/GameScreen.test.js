import React from 'react'
import GameScreen from './GameScreen.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { ContextProvider } from '../context/TypingContext.js'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

beforeEach(() => {
	render(
		<ContextProvider>
			<Router>
				<GameScreen />
			</Router>
		</ContextProvider>
	)
})

test('all essential elements are present on page-load', () => {
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

test('input box is focused when the user clicks somewhere on the page', () => {
	userEvent.click(screen.getByRole('main'))
	expect(screen.getByRole('form')).toHaveFocus()
})

describe('newly-typed word', () => {
	test.todo(
		'it will cause the previous word to be replaced and the wordHint text to update',
		async () => {
			jest.spyOn(React, 'useEffect').mockImplementation((f) => f())

			userEvent.click(screen.getByRole('main'))
			let firstWord = screen.getByRole('status').textContent
			userEvent.type(firstWord)

			await expect(screen.getByRole('status')).not.toHaveTextContent(
				firstWord
			)
		}
	)
})
