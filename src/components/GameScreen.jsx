import React, { useEffect, useState, useContext, useRef } from 'react'
import TypingContext from '../context/TypingContext'
import { useNavigate } from 'react-router-dom'
import { GiCheckMark } from 'react-icons/gi'
import TimerArea from './TimerArea'

function GameScreen() {
	const { state, dispatch } = useContext(TypingContext)
	const secondsRemaining = state.secondsRemaining
	const gameActive = state.gameActive
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
		inputRef.current.focus()
	}

	let timerTimeout
	const countdownLoop = () => {
		timerTimeout = setTimeout(() => {
			dispatch({
				type: 'DECREMENT_SECONDS_REMAINING',
			})
		}, 1000)
		return
	}

	useEffect(() => {
		dispatch({ type: 'START_GAME' })
		fetchNewWord()
	}, [])

	useEffect(() => {
		if (word && partialWord === word) {
			setPartialWord('')
			setCompletedWords([...completedWords, word])
			dispatch({ type: 'INCREMENT_COUNT' })
			fetchNewWord()
		}
	}, [partialWord])

	useEffect(() => {
		gameActive && secondsRemaining && countdownLoop()

		if (!secondsRemaining) {
			dispatch({ type: 'END_GAME' })
			navigate('/gameOver')
		}

		return () => clearTimeout(timerTimeout)
		// eslint-disable-next-line
	}, [secondsRemaining, gameActive, timerTimeout])

	return (
		<div
			className='w-full flex flex-col items-center'
			id='gameScreenContainer'
			onClick={() => inputRef.current.focus()}
		>
			<div id='gameTitle'>
				<h2 className='sm:text-4xl md:text-5xl font-semibold m-8'>
					Type, type for your life!
				</h2>
			</div>
			<hr className='sm:mt-4 m-8 w-4/5' />
			<div
				className='w-full flex sm:flex-col md:flex-row flex-grow sm:justify-evenly md:justify-between items-center'
				id='mainContent'
			>
				<div
					id='inputArea'
					className='px-8 sm:px-4 w-1/2 flex flex-col justify-center items-center'
				>
					<TimerArea secondsRemaining={secondsRemaining} />
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
						className={`sm:text-sm lg:text-base w-full md:my-8 input input-bordered uppercase ${
							inputRef.current?.value &&
							!word.startsWith(inputRef.current.value)
								? 'text-red-500'
								: 'text-lime-500'
						}`}
						value={partialWord ? partialWord : ''}
						placeholder='Click anywhere to focus me!'
						autoComplete='off'
						onChange={(e) => {
							if (
								(!e.target.value.match(/[^a-zA-Z]/) &&
									word.startsWith(
										inputRef.current.value.slice(0, -1)
									)) ||
								e.nativeEvent.data === null
							) {
								setPartialWord(e.target.value)
							}
						}}
					/>
				</div>
				<div
					id='completedWords'
					className='sm:h-1/3 md:h-full md:w-1/2 xl:px-8 flex flex-col justify-center items-center sm:text-sm lg:text-base'
				>
					<h3 className='sm:hidden md:block text-2xl font-semibold m-8'>
						Completed:
					</h3>
					<div
						id='wordsList'
						className='flex flex-col flex-wrap uppercase gap-1 md:mt-12'
					>
						{completedWords && completedWords.length <= 6 ? (
							completedWords.map((word, index) => {
								return (
									<div className='flex' key={index}>
										<p>{word}</p>
										<GiCheckMark className='text-lime-500 sm:ml-2 lg:ml-4' />
									</div>
								)
							})
						) : completedWords.length <= 12 ? (
							<div
								id='completedWordsGrid'
								className='grid grid-cols-2 sm:gap-x-4 lg:gap-x-8 gap-y-1'
							>
								{completedWords.map((word, index) => {
									return (
										<div className='flex' key={index}>
											<p>{word}</p>
											<GiCheckMark className='text-lime-500 sm:ml-2 lg:ml-4' />
										</div>
									)
								})}
							</div>
						) : (
							<div
								id='completedWordsGrid'
								className='grid grid-cols-3 sm:gap-x-4 lg:gap-x-8 gap-y-1'
							>
								{completedWords.map((word, index) => {
									return (
										<div className='flex' key={index}>
											<p>{word}</p>
											<GiCheckMark className='text-lime-500 sm:ml-2 lg:ml-4' />
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
