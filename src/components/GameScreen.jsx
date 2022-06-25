import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TimerArea from './TimerArea'

function GameScreen({ secsRemaining, count, setCount }) {
	const navigate = useNavigate()

	const [word, setWord] = useState('')
	const [guess, setGuess] = useState('')

	useEffect(() => {
		const fetchNewWord = async () => {
			const data = await fetch(
				'https://random-word-api.herokuapp.com/word'
			)
			const response = await data.json()
			setWord(response)
			console.log(response)
		}
		fetchNewWord()
	}, [])

	// useEffect(() => {
	// 	!secsRemaining && navigate('/gameOver')
	// }, [secsRemaining, navigate])

	return (
		<div className='flex flex-col justify-center items-center'>
			<div id='gameTitle'>
				<h2 className='text-2xl font-semibold m-16'>Keep clicking!</h2>
			</div>
			<TimerArea secsRemaining={secsRemaining} />
			<div
				id='inputArea'
				className='m-16 w-1/2 flex justify-center items-center'
			>
				<input
					id='wordInput'
					className='input innput-bordered input-primary'
					value={guess ? guess : 'start typing!'}
				/>
			</div>
			<p id='wordHint'>{`The word is ${word}`}</p>
		</div>
	)
}

export default GameScreen
