import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TimerArea from './TimerArea'

function GameScreen({ secsRemaining, count, setCount }) {
	const navigate = useNavigate()

	useEffect(() => {
		!secsRemaining && navigate('/gameOver')
	}, [secsRemaining, navigate])

	return (
		<div className='flex flex-col justify-center'>
			<div id='gameTitle'>
				<h2 className='text-2xl font-semibold m-16'>Keep clicking!</h2>
			</div>
			<TimerArea secsRemaining={secsRemaining} />
			<div
				id='buttonArea'
				className='m-16 w-1/2 flex justify-center items-center'
			>
				<button
					id='gameButton'
					className='btn btn-secondary'
					onClick={(e) => {
						e.preventDefault()
						setCount((prev) => prev + 1)
					}}
				>
					<span id='currentCount'>{`Clicks: ${count}`}</span>
				</button>
			</div>
		</div>
	)
}

export default GameScreen
