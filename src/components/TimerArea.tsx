import React from 'react'
import { useContext } from 'react'
import { AiOutlineClockCircle } from 'react-icons/ai'
import TypingContext from '../context/TypingContext'

interface TimerAreaProps {
	secondsRemaining: number
}

function TimerArea({ secondsRemaining }: TimerAreaProps) {
	const { state } = useContext(TypingContext)
	const gameActive = state.gameActive

	//  calc time in mins/secs and update html
	const getTimeInMinsAndSecs = (gameTime: number): string => {
		let minutes = Math.floor(gameTime / 60)
		let seconds: number | string = gameTime % 60
		seconds = seconds < 10 ? '0' + seconds : seconds

		return `${minutes} : ${seconds}`
	}

	return (
		<div
			id='timerArea'
			role='timer'
			className='p-4 md:my-8 w-1/2 max-w-[10rem] flex justify-evenly items-center border-2 border-white border-opacity-25 rounded-md'
		>
			<AiOutlineClockCircle className='scale-125 lg:mr-8' />
			<h3
				id='timer'
				className={`font-bold min-w-fit ${
					gameActive && secondsRemaining <= 5 && 'text-red-500'
				}`}
			>
				{secondsRemaining
					? getTimeInMinsAndSecs(secondsRemaining)
					: '0 : 00'}
			</h3>
		</div>
	)
}

export default TimerArea
