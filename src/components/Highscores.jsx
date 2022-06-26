import React from 'react'

function Highscores({ highscores, submittedName }) {
	return (
		<div id='scoreArea' className='flex flex-col justify-center'>
			<h2 id='scoreTitle' className='mb-16 text-2xl font-semibold'>
				High Scores:
			</h2>
			<ul id='scoreList'>
				{highscores
					? highscores
							.sort((a, b) => {
								if (a.time > b.time) return -1
								if (a.time === b.time && a.score > b.score)
									return -1
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
