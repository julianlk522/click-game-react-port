import React from 'react'

function GameScreen({ secsPerRound, count, setCount }) {
	//  calc time in mins/secs and update html
	const getTimeInMinsAndSecs = (gameTime) => {
		let minutes = Math.floor(gameTime / 60)
		let seconds = gameTime % 60
		seconds = seconds < 10 ? '0' + seconds : seconds

		return `${minutes} : ${seconds}`
	}

	return (
		<div className='flex flex-col justify-center'>
			<div id='gameTitle'>
				<h2 className='text-2xl font-semibold m-16'>Keep clicking!</h2>
			</div>
			<div
				id='timerArea'
				className='m-16 w-1/2 flex justify-center items-center'
			>
				<h3 id='timer' className='font-bold'>
					{getTimeInMinsAndSecs(secsPerRound)}
				</h3>
			</div>
			<div
				id='buttonArea'
				className='m-16 w-1/2 flex justify-center items-center'
			>
				<button id='gameButton' className='btn btn-secondary'>
					<span id='currentCount'>{`Clicks: ${count}`}</span>
				</button>

				{secsPerRound <= 0 && <h1>Out of time!</h1>}
			</div>
		</div>
	)
}

export default GameScreen
