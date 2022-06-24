import React from 'react'

function gameOver() {
	return (
		<div>
			<h3 id='gameOver' className='hidden mb-16'>
				Game over!
			</h3>
			<form id='submissionInputForm' className='hidden p-8 m-8'>
				<input
					type='text'
					id='nameInput'
					className='w-48 mx-4 p-1 bg-none border-0 text-indigo-600 rounded-lg cursor-text'
					placeholder='Name for your submission'
				/>
				<button id='submitScore' class='button mx-4 scale-75'>
					Save your score!
				</button>
			</form>
			<button id='replay' class='button hidden'>
				Play again?
			</button>
		</div>
	)
}

export default gameOver
