import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TimerArea from './TimerArea'

function GameScreen({ secsPerRound, count, setCount }) {
	const navigate = useNavigate()

	useEffect(() => {
		!secsPerRound && navigate('/gameOver')
	}, [secsPerRound, navigate])

	return (
		<div className='flex flex-col justify-center'>
			<div id='gameTitle'>
				<h2 className='text-2xl font-semibold m-16'>Keep clicking!</h2>
			</div>
			<TimerArea secsPerRound={secsPerRound} />
			<div
				id='buttonArea'
				className='m-16 w-1/2 flex justify-center items-center'
			>
				<button id='gameButton' className='btn btn-secondary'>
					<span id='currentCount'>{`Clicks: ${count}`}</span>
				</button>
			</div>
		</div>
	)
}

export default GameScreen
