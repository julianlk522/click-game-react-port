import React from 'react'
import GameScreen from './GameScreen'
import { BrowserRouter as Router } from 'react-router-dom'
import { ContextProvider } from '../context/TypingContext'
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
			userEvent.click(screen.getByRole('main'))
			let firstWord: string = screen.getByRole('status').textContent ?? ''
			userEvent.type(screen.getByRole('main'), firstWord)

			expect(screen.getByRole('status')).not.toHaveTextContent(firstWord)
		}
	)
})
