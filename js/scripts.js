let board = null;
let game = new ChineseChess(); // execute engine
let $status = $('#status'); // status div on index.html
// let $fen = $('#fen'); // fen div on index.html
// let $pgn = $('#pgn'); // pgn div on index.html

function onDragStart (source, piece, position, orientation) {
  // do not pick up pieces if the game is over
  if (game.turn0.status.gameOver) return false;

  // only pick up pieces for the side to move
  if ((game.turn0.status.currentTurn === 'red' && piece.search(/^b/) !== -1) ||
      (game.turn0.status.currentTurn === 'black' && piece.search(/^r/) !== -1)) {
    return false;
  }
}

function onDrop (source, target) {
  // see if the move is legal
  let move = game.move(source, target);

  // illegal move
  if (move === null) return 'snapback';

  updateStatus();
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd () {
  board.position(board.objToFen(game.turn0.boardState.notatedBoard));
}

function updateStatus () {
  let status = '';

  let moveColor = 'Red';
  if (game.turn0.status.currentTurn === 'black') {
    moveColor = 'Black';
  }

  // checkmate?
  if (game.turn0.status.checkmate) {
    status = 'Game over, ' + moveColor + ' is in checkmate.';
  }

//   // draw?
//   else if (game.in_draw()) {
//     status = 'Game over, drawn position';
//   }

  // game still on
  else {
    status = moveColor + ' to move';

    // check?
    if (game.turn0.status.checkState.inCheck) {
      status += ', ' + moveColor + ' is in check';
    }
  }

  $status.html(status);
//   $fen.html(game.fen());
//   $pgn.html(game.pgn());
}

let config = {
  draggable: true,
  dropOffBoard: 'snapback',
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
};

board = Xiangqiboard('myBoard', config);

updateStatus();