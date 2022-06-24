import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GameScreen from './components/GameScreen.jsx'
import GameOver from './components/GameOver.jsx'
import TitleScreen from './components/TitleScreen.jsx'
import './index.css'

function App() {
	const [count, setCount] = useState(0)
	const [secsPerRound, setSecsPerRound] = useState(0)
	const [gameStart, setGameStart] = useState(false)

	let timerTimeout

	const countdownLoop = () => {
		timerTimeout = setTimeout(() => {
			setSecsPerRound((prev) => prev - 1)
			console.log(secsPerRound, 'from loop func')
		}, 1000)
		return
	}
	useEffect(() => {
		gameStart && secsPerRound && countdownLoop()

		if (!secsPerRound) {
			setGameStart(false)
		}

		return () => clearTimeout(timerTimeout)
		// eslint-disable-next-line
	}, [secsPerRound, gameStart, timerTimeout])

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
									secsPerRound={secsPerRound}
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
									secsPerRound={secsPerRound}
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
