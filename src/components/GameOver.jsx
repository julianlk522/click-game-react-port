import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Highscores from './Highscores'
import TimerArea from './TimerArea'

function GameOver({
	count,
	secsPerRound,
	setSecsPerRound,
	secsRemaining,
	setSecsRemaining,
	setGameStart,
	setCount,
}) {
	const navigate = useNavigate()
	const [submissionName, setSubmissionName] = useState('')
	const [submittedName, setSubmittedName] = useState('')
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
		setHighscores(values)
	}

	useEffect(() => {
		getTopScoresFromStorage()
	}, [])

	return (
		<>
			<div className='flex flex-col justify-center items-center'>
				<h2 id='gameOver' className='text-3xl font-bold my-8'>
					Game over!
				</h2>
				<h3 className='my-8 text-2xl'>{`Your score was ${count}`}</h3>
				<form
					id='submissionInputForm'
					className='m-8'
					onSubmit={(e) => {
						e.preventDefault()
						pushScoreToLocalStorage()
						getTopScoresFromStorage()
						setSubmittedName(submissionName)
					}}
				>
					<input
						type='text'
						id='nameInput'
						className='w-48 mx-4 p-2 bg-none border-0 text-indigo-600 rounded-lg cursor-text text-sm'
						placeholder='Name for your submission'
						value={submissionName}
						onChange={(e) => {
							setSubmissionName(e.target.value)
						}}
					/>
					<button id='submitScore' className='btn mx-4' type='submit'>
						Save your score!
					</button>
				</form>
				<TimerArea secsRemaining={secsRemaining} />
				<div id='replayContainer' className='flex justify-between m-8'>
					<button
						id='replay'
						className='btn btn-secondary mx-4'
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
					<select
						className='select select-primary mx-4'
						defaultValue=''
						onChange={(e) =>
							setSecsPerRound(e.target.value.slice(0, 2))
						}
					>
						<option value='' disabled>
							Select a different game duration?
						</option>
						<option value='1'>10s</option>
						<option value='2'>20s</option>
						<option value='3'>30s</option>
					</select>
				</div>
			</div>
			<Highscores highscores={highscores} submittedName={submittedName} />
		</>
	)
}

export default GameOver
