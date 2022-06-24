import React from 'react'

function gameOver() {
	return (
		<div>
			<h3 id='gameOver'>Game over!</h3>
			<form id='submissionInputForm'>
				<input
					type='text'
					id='nameInput'
					placeholder='Name for your submission'
				/>
				<button id='submitScore' class='button'>
					Save your score!
				</button>
			</form>
			<button id='replay' class='button'>
				Play again?
			</button>
		</div>
	)
}

export default gameOver
