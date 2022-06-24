import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GameScreen from './components/GameScreen.jsx'
import GameOver from './components/GameOver.jsx'
import TitleScreen from './components/TitleScreen.jsx'
import './index.css'

function App() {
	const [count, setCount] = useState(0)
	const [secsPerRound, setSecsPerRound] = useState(10)
	const [secsRemaining, setSecsRemaining] = useState(secsPerRound)
	const [gameStart, setGameStart] = useState(false)

	let timerTimeout

	const countdownLoop = () => {
		timerTimeout = setTimeout(() => {
			setSecsRemaining((prev) => prev - 1)
			console.log(secsRemaining, 'from loop func')
		}, 1000)
		return
	}
	useEffect(() => {
		gameStart && secsRemaining && countdownLoop()

		if (!secsRemaining) {
			setGameStart(false)
		}

		return () => clearTimeout(timerTimeout)
		// eslint-disable-next-line
	}, [secsRemaining, gameStart, timerTimeout])

	return (
		<div
			id='wrapper'
			className='bg-mainBgSvg flex justify-center items-center h-full'
		>
			<div
				id='gameArea'
				className='w-[95%] h-[90%] bg-darkViolet bg-opacity-90 text-yellow-100 rounded-3xl flex justify-evenly relative shadow-actuallyXl'
			>
				<Router>
					<Routes>
						<Route
							path='/'
							element={
								<TitleScreen
									secsPerRound={secsPerRound}
									setCount={setCount}
									setGameStart={setGameStart}
								/>
							}
						/>
						<Route
							path='/game'
							element={
								<GameScreen
									secsRemaining={secsRemaining}
									count={count}
									setCount={setCount}
								/>
							}
						/>
						<Route
							path='/gameOver'
							element={
								<GameOver
									count={count}
									setCount={setCount}
									setGameStart={setGameStart}
									secsPerRound={secsPerRound}
									secsRemaining={secsRemaining}
									setSecsRemaining={setSecsRemaining}
								/>
							}
						/>
					</Routes>
				</Router>
			</div>
		</div>
	)
}

export default App
