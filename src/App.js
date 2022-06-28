import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ContextProvider } from './context/TypingContext.js'
import GameScreen from './components/GameScreen.jsx'
import GameOver from './components/GameOver.jsx'
import TitleScreen from './components/TitleScreen.jsx'
import './index.css'

function App() {
	return (
		<div
			id='wrapper'
			className='bg-mainBgSvg flex justify-center items-center h-full'
		>
			<div
				id='gameArea'
				className='w-full h-[95%] m-[2.5%] sm:p-4 md:p-8 xl:p-16 bg-darkViolet bg-opacity-90 text-yellow-100 rounded-3xl flex justify-evenly shadow-actuallyXl relative'
			>
				<ContextProvider>
					<Router>
						<Routes>
							<Route path='/' element={<TitleScreen />} />
							<Route path='/game' element={<GameScreen />} />
							<Route path='/gameOver' element={<GameOver />} />
						</Routes>
					</Router>
				</ContextProvider>
			</div>
		</div>
	)
}

export default App
