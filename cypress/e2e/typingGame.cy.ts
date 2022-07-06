describe('Title Screen', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000')
	})

	it('Displays all main elements', () => {
		cy.visit('http://localhost:3000')
		cy.get('#title').children().should('have.length', 2)
		cy.get('#title')
			.children()
			.first()
			.should('have.text', 'Welcome to Type-tastrophe!')
		cy.get('#title')
			.children()
			.last()
			.should(
				'have.text',
				"How many words can you type before it's too late?"
			)
		cy.get('hr').should('exist')
		cy.get('#buttonArea')
			.children()
			.should('have.length', 1)
			.first()
			.should('have.id', 'startButton')
	})

	it('Navigates to Game Screen when user hits start', () => {
		cy.get('#startButton').click()
		cy.url().should('eq', 'http://localhost:3000/game')
	})
})

describe('Game Screen', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/')
		cy.get('#startButton').click()
	})

	it('Displays all main elements', () => {
		cy.get('#gameTitle').should('have.text', 'Type, type for your life!')
		cy.get('#inputArea').children().should('have.length', 3)
		cy.get('#inputArea')
			.children()
			.first()
			.should('have.id', 'timerArea')
			.children()
			.should('have.length', 2)
		cy.get('#inputArea')
			.children()
			.first()
			.next()
			.should('have.id', 'wordHint')
			.children()
			.should('have.id', 'coloredWord')
		cy.get('#inputArea').children().last().should('have.id', 'wordInput')
		cy.get('#completedWords')
			.children()
			.should('have.length', 2)
			.first()
			.should('have.text', 'Completed:')
	})

	it('Has no words yet in the bank', () => {
		cy.get('#wordsList').children().should('have.length', 0)
	})

	it('Focuses the input box when the user clicks somewhere in the game', () => {
		cy.get('#gameScreenContainer').click()
		cy.get('#wordInput').should('be.focused')
	})

	context('Once the user has correctly typed a word', () => {
		beforeEach(() => {
			cy.get('#coloredWord').then((currentWord) => {
				cy.get('#wordInput').type(currentWord.text())
			})
		})

		it('Clears the input field', () => {
			cy.get('#wordInput').should('be.empty')
		})

		it('Adds the completed word to the bank', () => {
			cy.get('#wordsList').children().should('have.length', 1)
		})

		it('Changes the current target word to be different from the last', () => {
			cy.get('#wordsList')
				.children()
				.first()
				.then((firstWord) => {
					cy.get('#coloredWord').should(
						'not.have.text',
						firstWord.text()
					)
				})
		})
	})

	it('Redirects to GameOver Screen after time is up', () => {
		cy.get('#timer').then((timerDisplay) => {
			const startingTime = Number(timerDisplay.text().slice(-2))
			// cy.clock()
			// cy.tick(startingTime * 1000)
			cy.wait(startingTime * 1000)
			cy.url().should('eq', 'http://localhost:3000/gameOver')
		})
	})
})

describe('Game Over Screen', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/gameOver')
	})

	it('Displays all main elements', () => {
		cy.get('#gameOver').should('have.text', 'Game over!')
		cy.get('#scoreTotal').should('contain.text', 'Your score was')
		cy.get('#submissionInputForm')
			.children()
			.should('have.length', 2)
			.first()
			.should('have.id', 'nameInput')
		cy.get('#submissionInputForm')
			.children()
			.last()
			.should('have.id', 'submitScore')
		cy.get('#submissionInputForm')
			.children()
			.last()
			.should('have.text', 'Submit to high scores')
		cy.get('#timerArea').should('exist')
		cy.get('#replayContainer')
			.children()
			.should('have.length', 2)
			.first()
			.should('have.id', 'replay')
		cy.get('#replayContainer')
			.children()
			.last()
			.should('have.id', 'gameTimeSelect')
		cy.get('#replayContainer')
			.children()
			.last()
			.children()
			.should('have.length', 4)
		cy.get('#scoreArea')
			.children()
			.should('have.length', 2)
			.first()
			.should('have.id', 'scoreTitle')
		cy.get('#scoreArea').children().last().should('have.id', 'scoreList')
		cy.get('#scoreList').children().should('have.length', 0)
	})

	it('Redirects to a new game when user clicks Play Again', () => {
		cy.get('#replay').click()
		cy.url().should('eq', 'http://localhost:3000/game')
	})

	it('Allows a user to type a name and submit their score with it to high scores', () => {
		cy.get('#nameInput').click().type('Cypress')
		cy.get('#submitScore').click()
		cy.get('#scoreList').children().should('have.length', 1)
		cy.get('#scoreList')
			.children()
			.children()
			.first()
			.should('have.text', 'Cypress 😎')
	})

	context('Having selected a different game duration', () => {
		beforeEach(() => {
			cy.get('#gameTimeSelect').select(2)
		})

		it('Should show the selected value', () => {
			cy.get('#gameTimeSelect').should('have.value', '20s')
		})

		it('Should use the selected value as the new game time when the user then clicks Play Again', () => {
			cy.get('#replay').click()
			cy.get('#timer').should('contain.text', '20')
		})
	})
})
