import React, { useState } from 'react'
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
	const [submissionName, setSubmissionName] = useState('')
	const [highscores, setHighscores] = useState()

	const pushScoreToLocalStorage = () => {
		localStorage.setItem(
			[submissionName],
			JSON.stringify({
				time: secsPerRound,
				score: count,
			})
		)
	}

	const getTopScoresFromStorage = () => {
		let values = []
		let keys = Object.keys(localStorage)

		for (let i = 0; i < keys.length; i++) {
			values.push({
				name: keys[i],
				...JSON.parse(localStorage.getItem(keys[i])),
			})
		}

		console.log(values)
		setHighscores(values)
	}

	return (
		<>
			<div className='flex flex-col justify-center items-center'>
				<h2 id='gameOver' className='text-3xl font-bold mb-16'>
					Game over!
				</h2>
				<h3 className='text-2xl mb-24'>{`Your score was ${count}`}</h3>
				<form
					id='submissionInputForm'
					className='p-8 m-8'
					onSubmit={(e) => {
						e.preventDefault()
						pushScoreToLocalStorage()
						getTopScoresFromStorage()
					}}
				>
					<input
						type='text'
						id='nameInput'
						className='w-48 mx-4 p-2 bg-none border-0 text-indigo-600 rounded-lg cursor-text text-sm'
						placeholder='Name for your submission'
						value={submissionName}
						onChange={(e) => setSubmissionName(e.target.value)}
					/>
					<button
						id='submitScore'
						className='btn btn-outline mx-4 scale-75'
						type='submit'
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
						setSecsRemaining(secsPerRound)
						setGameStart(true)
						navigate('/game')
					}}
				>
					Play again?
				</button>
			</div>
			<Highscores highscores={highscores} />
		</>
	)
}

export default GameOver
