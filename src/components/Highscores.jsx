import React from 'react'

function Highscores() {
	return (
		<div id='scoreArea' className='pt-24'>
			<h2 id='scoreTitle' className='m-8'>
				High Scores:
			</h2>
			<ul id='scoreList' className='list-none'>
				<li id='score'>None yet!</li>
				<li id='score2'></li>
				<li id='score3'></li>
			</ul>
		</div>
	)
}

export default Highscores
