import React from 'react'
import { useNavigate } from 'react-router-dom'
import Highscores from './Highscores'
import TimerArea from './TimerArea'

function GameOver({
	count,
	secsPerRound,
	secsRemaining,
	setSecsRemaining,
	setGameStart,
	setCount,
}) {
	const navigate = useNavigate()

	return (
		<>
			<div className='flex flex-col justify-center items-center'>
				<h2 id='gameOver' className='text-3xl font-bold mb-16'>
					Game over!
				</h2>
				<h3 className='text-2xl mb-24'>{`Your score was ${count}`}</h3>
				<form id='submissionInputForm' className='p-8 m-8'>
					<input
						type='text'
						id='nameInput'
						className='w-48 mx-4 p-2 bg-none border-0 text-indigo-600 rounded-lg cursor-text text-sm'
						placeholder='Name for your submission'
					/>
					<button
						id='submitScore'
						className='btn btn-outline mx-4 scale-75'
					>
						Save your score!
					</button>
				</form>
				<TimerArea secsRemaining={secsRemaining} />
				<button
					id='replay'
					className='btn btn-secondary'
					onClick={(e) => {
						e.preventDefault()
						setCount(0)
						setSecsRemaining(10)
						setGameStart(true)
						navigate('/game')
					}}
				>
					Play again?
				</button>
			</div>
			<Highscores />
		</>
	)
}

export default GameOver
