import React from 'react'
import { useNavigate } from 'react-router-dom'

function TitleScreen({ secsPerRound }) {
	const navigate = useNavigate()

	// parse secsPerRound and return formatted string
	const buildFormattedTimeString = () => {
		let startingMinutes = Math.floor(secsPerRound / 60)
		let startingSeconds = secsPerRound % 60

		const timeString = !startingMinutes
			? startingSeconds === 1
				? '1 second'
				: `${startingSeconds} seconds`
			: startingMinutes === 1
			? !startingSeconds
				? '1 minute'
				: startingSeconds === 1
				? '1 minute and 1 second'
				: `1 minute and ${startingSeconds} seconds`
			: !startingSeconds
			? `${startingMinutes} minutes`
			: startingSeconds === 1
			? `${startingMinutes} minutes and 1 second`
			: `${startingMinutes} minutes and ${startingSeconds} seconds`

		return timeString
	}
	return (
		<div
			id='userArea'
			className='flex flex-col justify-center items-center'
		>
			<div id='title'>
				<h1 className='text-3xl font-bold m-16'>
					Welcome to the Click Game!
				</h1>
				<h2 id='subtitle' className='text-2xl mb-24'>
					How many can you click before it's too late?
				</h2>
			</div>
			<div
				id='timerArea'
				className='m-16 w-1/2 flex justify-center items-center'
			>
				<h3 id='timer'>{`${buildFormattedTimeString(
					secsPerRound
				)} until time is up!`}</h3>
			</div>
			<hr className='m-8 w-4/5' />
			<div
				id='buttonArea'
				className='m-16 w-1/2 flex justify-center items-center'
			>
				<button
					id='startButton'
					className='btn btn-secondary'
					onClick={() => navigate('/game')}
				>
					Click me to start playing!
				</button>
			</div>
		</div>
	)
}

export default TitleScreen
