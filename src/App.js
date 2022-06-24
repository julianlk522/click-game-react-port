import React, { useState } from 'react'
import TitleScreen from './components/TitleScreen.jsx'
import './index.css'

function App() {
	const [count, setCount] = useState(null)

	return (
		<div id='wrapper' className='bg-mainBgSvg'>
			<div id='gameArea'>
				<TitleScreen />
			</div>
		</div>
	)
}

export default App
