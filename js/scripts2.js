let board = null;
let game = newGame(defaultPositions);

function onDragStart (source, piece, position, orientation) {
  // do not pick up pieces if the game is over
  if (game.status.gameOver) {
    return false;
  }

//   only pick up pieces for the side to move
  if ((game.status.currentTurn === 'red' && piece.search(/^b/) !== -1) ||
      (game.status.currentTurn === 'black' && piece.search(/^r/) !== -1)) {
    return false;
  }
}

function onDrop (source, target) {
  // see if the move is legal
  // console.log(typeof(game))
  let move = movePiece(game, source, target);
  // console.log(source, target)
  // illegal move
  if (!move) return 'snapback';

  game = move
  // updateStatus();
}

function onSnapEnd () {
  board.position(board.objToFen(game.notatedBoard));
}

let config = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
//   onSnapEnd: onSnapEnd
};
board = Xiangqiboard('myBoard', config);

// updateStatus();