export default function renderPuzzle(state) {
	let puzzle = state.gameController.currentQuestion.puzzle;
	// the four rows to be rendered on the game board
	let rows = [[], [], [], []];
	// split answer into array of words
	let tempArr = puzzle.split(' ');
	// add spaces after words except the last one
	tempArr = tempArr.map((word) => {
		return `${word} `;
	});
	// one row answer
	if (puzzle.length <= 12) {
		for (let word of tempArr) {
			rows[1] = [...rows[1], ...word.split('')];
		}
	} else if (puzzle.length <= 26) {
		// two row answer
		for (let word of tempArr) {
			// fill in rows starting at top
			if (rows[2].length === 0 && word.length + rows[1].length <= 14) {
				rows[1] = [...rows[1], ...word.split('')];
			} else {
				rows[2] = [...rows[2], ...word.split('')];
			}
		}
	} else if (puzzle.length <= 38) {
		// three row answer
		for (let word of tempArr) {
			// fill in rows starting at top
			if (rows[1].length === 0 && word.length + rows[0].length <= 12) {
				rows[0] = [...rows[0], ...word.split('')];
			} else if (rows[2].length === 0 && word.length + rows[1].length <= 14) {
				rows[1] = [...rows[1], ...word.split('')];
			} else {
				rows[2] = [...rows[2], ...word.split('')];
			}
		}
	} else if (puzzle.length <= 52) {
		// four row answer
		for (let word of tempArr) {
			// fill in rows starting at top
			if (rows[1].length === 0 && word.length + rows[0].length <= 12) {
				rows[0] = [...rows[0], ...word.split('')];
			} else if (rows[2].length === 0 && word.length + rows[1].length <= 14) {
				rows[1] = [...rows[1], ...word.split('')];
			} else if (rows[3].length === 0 && word.length + rows[2].length <= 14) {
				rows[2] = [...rows[2], ...word.split('')];
			} else {
				rows[3] = [...rows[3], ...word.split('')];
			}
		}
	} else {
		throw new Error('Puzzle length too long');
	}
	// fill in outside spaces so rows render centered on the board
	const rowsRender = rows.map((row) => {
		// remove whitespace after last words on line
		if (row.length > 0) {
			row.pop();
		}
		while (row.length < 14) {
			if (row.length % 2 === 0) {
				row.unshift(' ');
				row.push(' ');
			} else {
				row.push(' ');
			}
		}
		return row;
	});
	return rowsRender;
}
