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

		it.only('Clears the input field', () => {
			cy.get('#wordInput').should('be.empty')
		})

		// it('Should generate a different word')
	})
})
