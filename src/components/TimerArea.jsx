import React from 'react'

function TimerArea({ secsPerRound }) {
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
			className='m-16 w-1/2 flex justify-center items-center'
		>
			<h3 id='timer' className='font-bold'>
				{secsPerRound ? getTimeInMinsAndSecs(secsPerRound) : '0 : 00'}
			</h3>
		</div>
	)
}

export default TimerArea
