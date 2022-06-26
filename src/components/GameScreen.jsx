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
		//	words between 4 and 8 letters long
		let randomLength = Math.floor(Math.random() * 5 + 4)
		const data = await fetch(
			`https://random-word-api.herokuapp.com/word?length=${randomLength}`
		)
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
		<div
			className='w-full flex flex-col items-center'
			id='gameScreenContainer'
			onClick={() => inputRef.current.focus()}
		>
			<div id='gameTitle'>
				<h2 className='text-5xl font-semibold m-8'>
					Type, type for your life!
				</h2>
			</div>
			<hr className='m-8 w-4/5' />
			<div className='w-full mt-16 flex justify-between' id='mainContent'>
				<div
					id='inputArea'
					className='px-8 w-1/2 flex flex-col justify-center items-center'
				>
					<TimerArea secsRemaining={secsRemaining} />
					<p id='wordHint' className='my-8'>
						The word is:
						<span
							id='coloredWord'
							className='text-red-500 ml-4 uppercase'
						>
							{word}
						</span>
					</p>
					<input
						id='wordInput'
						ref={inputRef}
						className='w-full my-8 input input-bordered uppercase'
						value={partialWord ? partialWord : ''}
						placeholder='Click anywhere to focus me!'
						autoComplete='off'
						onChange={(e) => {
							if (!e.target.value.match(/[^a-zA-Z]/)) {
								setPartialWord(e.target.value)
							}
						}}
					/>
				</div>
				<div
					id='completedWords'
					className='h-full w-1/2 px-8 flex flex-col items-center'
				>
					<h3 className='text-2xl font-semibold m-8 '>Completed:</h3>
					<div
						id='wordsList'
						className='flex flex-col flex-wrap uppercase gap-1 mt-12'
					>
						{completedWords && completedWords.length <= 10 ? (
							completedWords.map((word, index) => {
								return (
									<div className='flex' key={index}>
										<p>{word}</p>
										<GiCheckMark className='text-lime-500 ml-4' />
									</div>
								)
							})
						) : (
							<div
								id='completedWordsGrid'
								className='grid grid-cols-3 gap-x-8 gap-y-1'
							>
								{completedWords.map((word, index) => {
									return (
										<div className='flex' key={index}>
											<p>{word}</p>
											<GiCheckMark className='text-lime-500 ml-4' />
										</div>
									)
								})}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default GameScreen
