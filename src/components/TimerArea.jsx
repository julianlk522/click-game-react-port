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
			className='p-4 m-8 w-1/2 flex justify-center items-center border-2 border-white border-opacity-25 rounded-sm'
		>
			<AiOutlineClockCircle className='mr-8 scale-125' />
			<h3 id='timer' className='font-bold'>
				{secsRemaining ? getTimeInMinsAndSecs(secsRemaining) : '0 : 00'}
			</h3>
		</div>
	)
}

export default TimerArea
