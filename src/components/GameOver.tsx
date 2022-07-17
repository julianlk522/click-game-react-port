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
	const wpm = state.wpm

	const secondsRef = useRef<HTMLSelectElement | null>(null)
	const navigate = useNavigate()

	// local highscores state
	type ScoreValues = {
		name: string
		score: number
		time: number
		wpm: number
	}

	const [toBeSubmittedName, setToBeSubmittedName] = useState<string>('')
	const [submittedName, setSubmittedName] = useState<string>('')
	const [highscores, setHighscores] = useState<ScoreValues[] | null>(null)

	const pushScoreToLocalStorage = (): void => {
		localStorage.setItem(
			toBeSubmittedName,
			JSON.stringify({
				time: secondsPerRound,
				score: count,
				wpm: wpm,
			})
		)
	}

	type LocalStorageData = {
		score: number
		time: number
		wpm: number
	}

	const getTopScoresFromStorage = () => {
		let values: ScoreValues[] = []
		let keys = Object.keys(localStorage)

		for (let i = 0; i < keys.length; i++) {
			const scoreData: LocalStorageData = JSON.parse(
				localStorage?.getItem(keys[i]) ?? ''
			)
			keys[i] !== 'user' &&
				values.push({
					name: keys[i],
					...scoreData,
				})
		}
		setHighscores(
			keys.length > 5
				? values
						.sort((a, b) => {
							if (a.time > b.time) return -1
							if (a.time === b.time && a.score > b.score)
								return -1
							if (b.score > a.score) return 1
							return 0
						})
						.slice(0, 5)
				: values
		)
	}

	useEffect(() => {
		getTopScoresFromStorage()
	}, [])

	return (
		<>
			<div className='flex flex-col justify-center items-center'>
				{/* title */}
				<h2 id='gameOver' className='text-3xl font-bold my-8'>
					Game over!
				</h2>

				{/* total score */}
				<h3 id='scoreDescription' className='my-8 text-2xl'>
					Your score was
					<span
						id='finalScore'
						className='ml-8 text-3xl text-red-500'
					>
						{count}
					</span>
					<span id='finalWpm' className='ml-8'>
						({wpm.toFixed(1)} WPM)
					</span>
				</h3>

				{/* submit score input form */}
				<form
					id='submissionInputForm'
					className='m-8'
					onSubmit={(e) => {
						const newScoreValues: ScoreValues = {
							name: toBeSubmittedName,
							score: count,
							wpm: wpm,
							time: secondsPerRound,
						}
						e.preventDefault()
						pushScoreToLocalStorage()
						setHighscores(
							highscores
								? highscores.concat(newScoreValues)
								: [newScoreValues]
						)
						setSubmittedName(toBeSubmittedName)
					}}
				>
					<input
						type='text'
						id='nameInput'
						className='w-48 mx-4 p-2 bg-none border-0 text-indigo-600 rounded-lg cursor-text text-sm'
						placeholder='Name for your submission'
						value={toBeSubmittedName}
						onChange={(e) => {
							if (e.target.value.length > 10) {
								console.log('nice try!')
								return
							}
							setToBeSubmittedName(e.target.value)
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

				{/* timer */}
				<TimerArea secondsRemaining={secondsRemaining} />

				{/* play again */}
				<div id='replayContainer' className='flex justify-between m-8'>
					<button
						id='replay'
						className='btn btn-secondary mx-4'
						onClick={(e) => {
							e.preventDefault()
							dispatch({ type: 'RESET_COUNT' })
							if (
								secondsRef?.current?.value &&
								secondsRef?.current?.value?.length > 0
							) {
								const newSecondsPerRound = parseInt(
									secondsRef.current.value.slice(0, 2)
								)
								dispatch({
									type: 'SET_SECONDS_PER_ROUND',
									payload: newSecondsPerRound,
								})
								dispatch({
									type: 'SET_SECONDS_REMAINING',
									payload: newSecondsPerRound,
								})
							} else {
								dispatch({
									type: 'SET_SECONDS_REMAINING',
									payload: secondsPerRound,
								})
							}
							dispatch({ type: 'START_GAME' })
							navigate('/game')
						}}
					>
						Play again
					</button>

					{/* pick game duration select */}
					<select
						className='select select-primary mx-4'
						defaultValue=''
						ref={secondsRef}
						id='gameTimeSelect'
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
