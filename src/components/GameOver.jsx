import React from 'react'
import Highscores from './Highscores'
import TimerArea from './TimerArea'

function GameOver({ count, secsPerRound }) {
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
						className='w-48 mx-4 p-1 bg-none border-0 text-indigo-600 rounded-lg cursor-text'
						placeholder='Name for your submission'
					/>
					<button
						id='submitScore'
						className='btn btn-outline mx-4 scale-75'
					>
						Save your score!
					</button>
				</form>
				<TimerArea secsPerRound={secsPerRound} />
				<button id='replay' className='btn btn-secondary'>
					Play again?
				</button>
			</div>
			<Highscores />
		</>
	)
}

export default GameOver
