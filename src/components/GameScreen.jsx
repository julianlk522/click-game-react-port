import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { GiCheckMark } from 'react-icons/gi'
import TimerArea from './TimerArea'

function GameScreen({ secsRemaining, count, setCount }) {
	const navigate = useNavigate()

	const inputRef = useRef(null)

	const [word, setWord] = useState('')
	const [partialWord, setPartialWord] = useState('')
	const [completedWords, setCompletedWords] = useState([])

	const fetchNewWord = async () => {
		const data = await fetch('https://random-word-api.herokuapp.com/word')
		const response = await data.json()
		setWord(response[0])
		console.log(response)
		inputRef.current.focus()
	}

	useEffect(() => {
		fetchNewWord()
	}, [])

	useEffect(() => {
		if (word && partialWord === word) {
			setPartialWord('')
			setCompletedWords([...completedWords, word])
			setCount((count) => count + 1)
			fetchNewWord()
		}
	}, [partialWord])

	useEffect(() => {
		!secsRemaining && navigate('/gameOver')
	}, [secsRemaining, navigate])

	return (
		<>
			<div className='flex flex-col items-center mt-12'>
				<div id='gameTitle'>
					<h2 className='text-2xl font-semibold m-16'>
						Type, type for your life!
					</h2>
				</div>
				<TimerArea secsRemaining={secsRemaining} />
				<div
					id='inputArea'
					className='m-16 w-1/2 flex justify-center items-center'
				>
					<input
						id='wordInput'
						ref={inputRef}
						className='input innput-bordered input-primary uppercase'
						value={partialWord ? partialWord : ''}
						placeholder='Input goes here!'
						autoComplete='off'
						onChange={(e) => {
							if (!e.target.value.match(/[^a-zA-Z]/)) {
								setPartialWord(e.target.value)
							}
						}}
					/>
				</div>
				<p id='wordHint'>{`The word is ${word}`}</p>
			</div>
			<div
				id='completedWords'
				className='flex flex-col items-center mt-12'
			>
				<h3 className='text-2xl font-semibold m-16 '>Completed:</h3>
				<div id='wordsList' className='flex flex-col uppercase mt-12'>
					{completedWords &&
						completedWords.map((word, index) => {
							return (
								<div className='flex' key={index}>
									<p>{word}</p>
									<GiCheckMark className='text-lime-500 ml-4' />
								</div>
							)
						})}
				</div>
			</div>
		</>
	)
}

export default GameScreen
