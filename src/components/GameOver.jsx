import React, { useEffect, useState, useContext, useRef } from 'react'
import TypingContext from '../context/TypingContext'
import { useNavigate } from 'react-router-dom'
import Highscores from './Highscores'
import TimerArea from './TimerArea'

function GameOver() {
	const { state, dispatch } = useContext(TypingContext)
	const secondsPerRound = state.secondsPerRound
	const secondsRemaining = state.secondsRemaining
	const count = state.count
	const navigate = useNavigate()
	const secondsRef = useRef(null)
	const [submissionName, setSubmissionName] = useState('')
	const [submittedName, setSubmittedName] = useState('')
	const [highscores, setHighscores] = useState()

	const pushScoreToLocalStorage = () => {
		localStorage.setItem(
			[submissionName],
			JSON.stringify({
				time: secondsPerRound,
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
							if (e.target.value.length > 10) {
								console.log('nice try!')
								return
							}
							setSubmissionName(e.target.value)
						}}
					/>
					<button
						id='submitScore'
						className='btn sm:mx-2 sm:mt-4 lg:mx-4 lg:mt-0'
						type='submit'
					>
						Submit to high scores
					</button>
				</form>
				<TimerArea secondsRemaining={secondsRemaining} />
				<div id='replayContainer' className='flex justify-between m-8'>
					<button
						id='replay'
						className='btn btn-secondary mx-4'
						onClick={(e) => {
							e.preventDefault()
							dispatch({ type: 'RESET_COUNT' })
							if (
								secondsRef.current.value &&
								secondsRef.current.value.length > 0
							) {
								dispatch({
									type: 'SET_SECONDS_PER_ROUND',
									payload: secondsRef.current.value.slice(
										0,
										2
									),
								})
								dispatch({
									type: 'SET_SECONDS_REMAINING',
									payload: secondsRef.current.value.slice(
										0,
										2
									),
								})
							}
							dispatch({ type: 'START_GAME' })
							navigate('/game')
						}}
					>
						Play again
					</button>
					<select
						className='select select-primary mx-4'
						defaultValue=''
						ref={secondsRef}
					>
						<option value='' disabled>
							Select a different game duration
						</option>
						<option value='10s'>10s</option>
						<option value='20s'>20s</option>
						<option value='30s'>30s</option>
					</select>
				</div>
			</div>
			<div className='flex flex-col justify-center'>
				<Highscores
					highscores={highscores}
					submittedName={submittedName}
				/>
				{highscores && highscores.length > 0 && (
					<button
						id='clearScores'
						className='btn btn-secondary no-animation my-16 scale-75'
						onClick={(e) => {
							e.preventDefault()
							localStorage.clear()
							setHighscores([])
						}}
					>
						Reset score list
					</button>
				)}
			</div>
		</>
	)
}

export default GameOver
