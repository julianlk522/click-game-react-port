import React from 'react'

function GameScreen({ secsPerRound, count }) {
	//  calc time in mins/secs and update html
	const newTimeCalcs = (secsPerRound) => {
		let minutes = Math.floor(secsPerRound / 60)
		let seconds = secsPerRound % 60
		seconds = seconds < 10 ? '0' + seconds : seconds

		return `${minutes} : ${seconds}`
	}

	return (
		<>
			<div id='gameTitle'>
				<h2 className='text-2xl font-semibold m-16'>Keep clicking!</h2>
			</div>
			<div
				id='timerArea'
				className='m-16 w-1/2 flex justify-center items-center'
			>
				<h3 id='timer'>{newTimeCalcs(secsPerRound)}</h3>
			</div>
			<div
				id='buttonArea'
				className='m-16 w-1/2 flex justify-center items-center'
			>
				<button id='gameButton' className='btn btn-secondary'>
					<span id='currentCount'>{`Clicks: ${count}`}</span>
				</button>
			</div>
		</>
	)
}

export default GameScreen
