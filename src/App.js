import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GameScreen from './components/GameScreen.jsx'
import TitleScreen from './components/TitleScreen.jsx'
import './index.css'

function App() {
	const [count, setCount] = useState(null)
	const [secsPerRound, setSecsPerRound] = useState(5)

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
								<TitleScreen secsPerRound={secsPerRound} />
							}
						/>
						<Route
							path='/game'
							element={
								<GameScreen
									secsPerRound={secsPerRound}
									count={count}
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
