import React from 'react'

function TitleScreen() {
	return (
		<div id='userArea'>
			<div id='title' className='text-sm'>
				<h1>Welcome to the Click Game!</h1>
				<h2 id='subtitle'>
					How many can you click before it's too late?
				</h2>
			</div>
			<div id='timerArea'>
				<h3 id='timer'>Time left</h3>
			</div>
			<hr />
			<div id='buttonArea'>
				<button id='button' className='btn'>
					<span id='currentCount'>Click me to start playing!</span>
				</button>
			</div>
		</div>
	)
}

export default TitleScreen
