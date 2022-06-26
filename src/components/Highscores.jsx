import React from 'react'

function Highscores({ highscores }) {
	return (
		<div id='scoreArea' className='pt-24'>
			<h2 id='scoreTitle' className='m-8 text-2xl'>
				High Scores:
			</h2>
			<ul id='scoreList'>
				{highscores
					? highscores
							.sort((a, b) => {
								if (a.score > b.score) return -1
								if (b.score > a.score) return 1
								return 0
							})
							.map((scoreObj, index) => {
								return (
									<li
										className='list-none'
										key={index}
									>{`${scoreObj.name}: ${scoreObj.score} points (${scoreObj.time} seconds)`}</li>
								)
							})
					: 'None yet!'}
			</ul>
		</div>
	)
}

export default Highscores
