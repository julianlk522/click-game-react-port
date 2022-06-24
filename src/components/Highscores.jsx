import React from 'react'

function Highscores() {
	return (
		<div id='scoreArea' className='pt-24'>
			<h2 id='scoreTitle' className='m-8 text-2xl'>
				High Scores:
			</h2>
			<ul id='scoreList' className='list-none'>
				<li id='score'>None yet!</li>
			</ul>
		</div>
	)
}

export default Highscores
