import React from 'react'
import { AiOutlineClockCircle } from 'react-icons/ai'

function TimerArea({ secsRemaining }) {
	//  calc time in mins/secs and update html
	const getTimeInMinsAndSecs = (gameTime) => {
		let minutes = Math.floor(gameTime / 60)
		let seconds = gameTime % 60
		seconds = seconds < 10 ? '0' + seconds : seconds

		return `${minutes} : ${seconds}`
	}

	return (
		<div
			id='timerArea'
			className='p-4 md:m-4 lg:m-8 w-1/2 max-w-[10rem] flex sm:justify-between md:justify-evenly items-center border-2 border-white border-opacity-25 rounded-md'
		>
			<AiOutlineClockCircle className='scale-125 lg:mr-8' />
			<h3 id='timer' className='font-bold min-w-fit'>
				{secsRemaining ? getTimeInMinsAndSecs(secsRemaining) : '0 : 00'}
			</h3>
		</div>
	)
}

export default TimerArea
