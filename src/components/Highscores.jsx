import React from 'react'

function Highscores({ highscores, submittedName }) {
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
									<div
										className='flex justify-between'
										key={index}
									>
										<li className='list-none w-32 flex'>{`${
											scoreObj.name === submittedName
												? scoreObj.name + ' 😎'
												: scoreObj.name
										}`}</li>

										<li className='list-none ml-12 w-16'>{`${scoreObj.score} points`}</li>

										<li className='list-none ml-12'>{`${scoreObj.time}s`}</li>
									</div>
								)
							})
					: 'None yet!'}
			</ul>
		</div>
	)
}

export default Highscores
