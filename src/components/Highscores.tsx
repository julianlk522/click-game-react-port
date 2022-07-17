import React from 'react'

interface HighscoresProps {
	highscores:
		| {
				name: string
				score: number
				wpm: number
				time: number
		  }[]
		| null
	submittedName: string
}

function Highscores({ highscores, submittedName }: HighscoresProps) {
	return (
		<div id='scoreArea' className='flex flex-col justify-center'>
			<h2 id='scoreTitle' className='mb-16 text-2xl font-semibold'>
				High Scores:
			</h2>
			<ul id='scoreList' className='my-16'>
				{highscores && highscores.length > 0
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
										<li className='sm:text-sm lg:text-base list-none w-32 flex'>{`${
											scoreObj.name === submittedName
												? scoreObj.name + ' 😎'
												: scoreObj.name
										}`}</li>

										<li className='sm:text-sm lg:text-base list-none ml-12 min-w-20'>{`${scoreObj.score} points`}</li>

										<li className='sm:text-sm lg:text-base list-none ml-12 min-w-20'>{`${Math.floor(
											scoreObj.wpm
										)} WPM`}</li>

										<li className='sm:text-sm lg:text-base list-none ml-12'>{`${scoreObj.time}s`}</li>
									</div>
								)
							})
					: 'None yet!'}
			</ul>
		</div>
	)
}

export default Highscores
