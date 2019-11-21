
// ----- GLOBAL OBJECTS ----- //

// Library of Default Positions at Game Start [file, rank]
// Global Object (Complete)
const defaultPositions = { 
  chariot_red_left: [0,0],
  horse_red_left: [1,0],
  elephant_red_left: [2,0],
  advisor_red_left: [3,0],
  general_red: [4,0],
  advisor_red_right: [5,0],
  elephant_red_right: [6,0],
  horse_red_right: [7,0],
  chariot_red_right: [8,0],
  cannon_red_left: [1,2],
  cannon_red_right: [7,2],
  soldier_red_1: [0,3],
  soldier_red_2: [2,3],
  soldier_red_3: [4,3],
  soldier_red_4: [6,3],
  soldier_red_5: [8,3],
  chariot_black_left: [0,9],
  horse_black_left: [1,9],
  elephant_black_left: [2,9],
  advisor_black_left: [3,9],
  general_black: [4,9],
  advisor_black_right: [5,9],
  elephant_black_right: [6,9],
  horse_black_right: [7,9],
  chariot_black_right: [8,9],
  cannon_black_left: [1,7],
  cannon_black_right: [7,7],
  soldier_black_1: [0,6],
  soldier_black_2: [2,6],
  soldier_black_3: [4,6],
  soldier_black_4: [6,6],
  soldier_black_5: [8,6],
}
  
// Notation Rules Used for creating Notated Board in Board State
// Global Object (Complete)
const notationRules = {
  pieces: {
    general: 'K',
    advisor: 'A',
    elephant: 'E',
    horse: 'H',
    chariot: 'R',
    cannon: 'C',
    soldier: 'P'
  },
  sides: {
    red: 'r',
    black: 'b'
  }
}

// Library of Defined Paths for Certain Pieces
// Global Object (Complete)
const definedPathsRules = {
  red: {
    elephant: [[2,0],[6,0],[0,2],[4,2],[8,2],[2,4],[6,4]],
    advisor: [[3,0],[5,0],[4,1],[3,2],[5,2]],
    general: [[3,0],[4,0],[5,0],[3,1],[4,1],[5,1],[3,2],[4,2],[5,2]]
  },

  black: {
    elephant: [[2,9],[6,9],[0,7],[4,7],[8,7],[2,5],[6,5]],
    advisor: [[3,9],[5,9],[4,8],[3,7],[5,7]],
    general: [[3,9],[4,9],[5,9],[3,8],[4,8],[5,8],[3,7],[4,7],[5,7]]
  }
}

// Test if a position is included in an array of positions
const includesPositionTest = (position, positionsArray) => {

  const positionString = JSON.stringify(position),
        positionsArrayString = JSON.stringify(positionsArray)

  if (positionsArrayString.includes(positionString)) return true
  else return false
}

// Library of Movement Rules for Each Piece
// Global Object (Complete)
const movementRules = {

  general: function(boardState, pieceSide, startFile, startRank) {

    const availableDestinations = [
      [startFile + 1, startRank],
      [startFile - 1, startRank],
      [startFile, startRank + 1],
      [startFile, startRank - 1]]

    return availableDestinations
  },

  advisor: function(boardState, pieceSide, startFile, startRank) {
    
    const availableDestinations = [
      [startFile + 1, startRank + 1],
      [startFile - 1, startRank + 1],
      [startFile + 1, startRank - 1],
      [startFile - 1, startRank - 1]]

    return availableDestinations
  },

  elephant: function(boardState, pieceSide, startFile, startRank) {

    const availableDestinations = [],
          movementVectors = [[1,1],[-1,1],[1,-1],[-1,-1]]

    for (let i = 0; i < movementVectors.length; ++i) {
      
      const fileMovement = movementVectors[i][0],
            rankMovement = movementVectors[i][1]

      const intermediatePosition = [startFile + fileMovement, startRank + rankMovement]

      if (!includesPositionTest(intermediatePosition, boardState.positions)) {

        const finalPosition = [startFile + fileMovement*2, startRank + rankMovement*2]

        availableDestinations.push(finalPosition)
      }
    }

    return availableDestinations
  },

  horse: function(boardState, pieceSide, startFile, startRank) {

    const availableDestinations = [],
          orthogonalVectors = [[1,0],[-1,0],[0,1],[0,-1]]

    for (let i = 0; i < orthogonalVectors.length; ++i) {
      
      const fileMovement = orthogonalVectors[i][0],
            rankMovement = orthogonalVectors[i][1]

      const intermediatePosition = [startFile + fileMovement, startRank + rankMovement]

      if (!includesPositionTest(intermediatePosition, boardState.positions)) {

        if (!rankMovement) {
          availableDestinations.push(
            [startFile + fileMovement * 2, startRank + 1],
            [startFile + fileMovement * 2, startRank - 1])

        } else if (!fileMovement) {
          availableDestinations.push(
            [startFile + 1, startRank + rankMovement * 2],
            [startFile - 1, startRank + rankMovement * 2])
        }
      }
    }

    return availableDestinations
  },

  chariot: function(boardState, pieceSide, startFile, startRank) {

    const availableDestinations = []

    for (let i = 1; i <= 9; ++i) {

      availableDestinations.push(
        [startFile + i, startRank],
        [startFile - i, startRank],
        [startFile, startRank + i],
        [startFile, startRank - i])
    }

    return availableDestinations
  },

  cannon: function(boardState, pieceSide, startFile, startRank) {

    const availableDestinations = []

    for (let i = 1; i <= 9; ++i) {

      availableDestinations.push(
        [startFile + i, startRank],
        [startFile - i, startRank],
        [startFile, startRank + i],
        [startFile, startRank - i])
    }

    return availableDestinations
  },

  soldier: function(boardState, pieceSide, startFile, startRank) {
    
    const soldierMovementRules = {
      red: {
        forwardMovement: 1,
        upgradeRanks: [5,6,7,8,9]
      },
      black: {
        forwardMovement: -1,
        upgradeRanks: [0,1,2,3,4]
      }
    }

    const availableDestinations = [],
          soldierSideSpecificMovement = soldierMovementRules[pieceSide]

    if (!soldierSideSpecificMovement.upgradeRanks.includes(startRank)) {
      availableDestinations.push([startFile, startRank + soldierSideSpecificMovement.forwardMovement])

    } else {
      availableDestinations.push(
        [startFile + 1, startRank],
        [startFile - 1, startRank],
        [startFile, startRank + soldierSideSpecificMovement.forwardMovement])
    }

    return availableDestinations
  },
}


// ----- BOARD CREATION ----- //

/* 
  Board State:
    pieces:
      red:
        [pieceName]:
          type: ''
          currentPosition: []
          availableDestinations: [[]]
      black:
        [pieceName]:
          type: ''
          currentPosition: []
          availableDestinations: [[]]
    positions:
      red: [[]]
      black: [[]]
    capturedPieces:
      red: [],
      black: []
    status:
      turn:
      check:
        checkBoolean:
        checkedGeneral:
        checkingPieces:
      checkmate:
      moves:
    board: [[]]

*/

// Initialize Board
// Level 4 Function
// Calls: populateBoard, mapBoard, positionsBySide
const newGame = (allPositions) => {
  const boardState = {
    pieces: {
      red: {},
      black: {}
    },
    positions: {
      red: [],
      black: []
    },
    capturedPieces: {
      red: [],
      black: []
    },
    status: {
      currentTurn: 'red',
      nextTurn: 'black',
      turnNumber: 0,
      check: {},
      checkmate: false,
      gameOver: false,
      availableMoves: {
        red: 0,
        black: 0
      },
    },
    notatedBoard: {}
  }

  boardState.pieces = populateBoard(allPositions)
  // boardState.board = createBoardArray(9, 10)
  // boardState.board = mapBoard(boardState.board, boardState.pieces)
  boardState.positions = positionsBySide(boardState.pieces)
  boardState.notatedBoard = notateBoard(boardState.pieces)
  
  establishPieceMovements(boardState, boardState.status.currentTurn, boardState.status.currentTurn, boardState.status.nextTurn)

  return boardState
}

// Populate Board.Pieces Object with Pieces: Type, Side, Starting Position
// Level 1 Function (Complete)
const populateBoard = (allPositions) => { // Input: Positions Object

  const allPieces = {
    red: {},
    black: {}
  }

  for (let i = 0; i < Object.keys(allPositions).length; ++i) { // Loop through each piece in Positions Object

    const selectedPiece = Object.keys(allPositions)[i], // 'chariot_red_left'
          selectedPieceSplit = selectedPiece.split('_'), // ['chariot', 'red', 'left']
          selectedPieceType = selectedPieceSplit[0], // 'chariot'
          selectedNotationType = notationRules.pieces[selectedPieceType],
          selectedPieceSide = selectedPieceSplit[1], // 'red'
          selectedNotationSide = notationRules.sides[selectedPieceSide]

    // Create object with piece name as key and type and currentPosition information

    const file = allPositions[selectedPiece][0],
          rank = allPositions[selectedPiece][1]

    allPieces[selectedPieceSide][selectedPiece] = {
      type: selectedPieceType,
      notation: selectedNotationSide + selectedNotationType,
      currentPosition: [file, rank],
      notatedPosition: numericalToNotated([file, rank])
    }
  }

  return allPieces // Create Pieces Object
}

// Map Board Array with Pieces at Current Position
// Level 2 Function (Complete)
// Calls: createBoardArray
const mapBoard = (boardArray, allPieces) => {

  const mappedBoard = boardArray // Creates empty board array
  
  for (let side in allPieces) {
    for (let piece in allPieces[side]) {
      const piecePosition = allPieces[side][piece].currentPosition,
            pieceFile = piecePosition[0],
            pieceRank = piecePosition[1]

      mappedBoard[9-pieceRank][pieceFile] = piece // Assigns pieces to their places in the array
    }
  }

  return mappedBoard
}


// Notate Board
// Level 1 Function (Complete)
const notateBoard = (boardPieces) => {

  const notations = {}

  for (let side in boardPieces) {
    for (let piece in boardPieces[side]) {

      const notatedPosition = boardPieces[side][piece].notatedPosition

      notations[notatedPosition] = piece
    }
  }

  return notations
}

// Converts proprietary numerical position array to chess notation (e.g. [0,0] -> a0)
const numericalToNotated = (numericalPosition) => {

  const numericalFile = numericalPosition[0],
        numericalRank = numericalPosition[1],
        fileNotation = 'abcdefghi'

  return String(fileNotation[numericalFile] + numericalRank)
}

// Converts chess notation to proprietary numerical position array  (e.g. a0 -> [0,0])
const notatedToNumerical = (notatedPosition) => {

  const notatedFile = notatedPosition[0],
        notatedRank = notatedPosition[1],
        fileNotation = 'abcdefghi'

  return [fileNotation.indexOf(notatedFile), Number(notatedRank)]
}

// Create Board Array (9 Files by 10 Ranks)
// Level 1 Function (Complete)
const createBoardArray = (files, ranks) => {

  const builtBoard = []

  for (let i = 0; i < ranks; ++i) {

    const currentRank = []

    for (let j = 0; j < files; ++j) {
      currentRank.push('')
    }

    builtBoard.push(currentRank)
  }

  return builtBoard
}

// Create Obj of Positions By Side
// Level 1 Function (Complete)
const positionsBySide = (allPieces) => {

  // Create object
  const positions = {
    red: [],
    black: []
  }

  // Loop through both sides and each piece
  for (let side in allPieces) {
    for (let piece in allPieces[side]) {

      const selectedPiece = allPieces[side][piece],
            selectedPiecePosition = selectedPiece.currentPosition

      positions[side].push(selectedPiecePosition) // Add the positions to respective side
    }
  }
  return positions
}

// Test for Flying Generals
// Level 1 Function (Complete)
const flyingGeneralTest = (boardState) => {

  // Get positions of the two generals
  const general_redPosition = boardState.pieces.red.general_red.currentPosition,
        general_blackPosition = boardState.pieces.black.general_black.currentPosition

  if (general_redPosition[0] !== general_blackPosition[0]) {
    return false // If the two generals are not on the same file, move on

  } else {
    
    const fileNotation = 'abcdefghi',
          generalsFile = fileNotation[general_redPosition[0]]

    // Loop through each rank and look for pieces between the generals
    for (let i = general_redPosition[1] + 1; i < general_blackPosition[1]; ++i) {

      const selectedPosition = String(generalsFile + i)
      
      if (boardState.notatedBoard[selectedPosition]) {
        return false
      }
    }
  }

  return true // Return true if generals face each other directly
}

// Detect if Check Has Occurred
const checkTest = (boardState, side, enemySide) => {
  
  const generalPositions = {
    red: boardState.pieces.red.general_red.currentPosition,
    black: boardState.pieces.black.general_black.currentPosition
  }

  // Create object containing check info
  const checkState = {
    inCheck: false,
    checkingPieces: []
  }

  // Loop through pieces on checkingSide
  for (let piece in boardState.pieces[enemySide]) {

    const selectedPieceCapture = boardState.pieces[enemySide][piece].availableDestinations.capture

    // If the piece's available captures include the enemy general, set check to true
    if (includesPositionTest(generalPositions[side], selectedPieceCapture)) {
      checkState.inCheck = true
      checkState.checkingPieces.push(piece)
    }
  }

  return checkState
}

// Create Object of Available Destinations
// Level 3 Function (Complete)
// Calls: onBoardFilter, definedPathsFilter, moveOrCaptureFilter
const establishAvailableDestinations = (boardState, pieceName, pieceSide, currentTurn, nextTurn) => {

  // Lists properties of selected piece
  const pieceObj = boardState.pieces[pieceSide][pieceName],
        pieceType = pieceObj.type,
        piecePosition = pieceObj.currentPosition,
        pieceFile = piecePosition[0],
        pieceRank = piecePosition[1]
  
  let enemySide = ''

  if (pieceSide === 'red') enemySide = 'black'
  else enemySide = 'red'

  const movementRulesDestinations = movementRules[pieceType](boardState, pieceSide, pieceFile, pieceRank)
  // Finds available destinations based on selected piece's movement rules

  const onBoardDestinations = onBoardFilter(movementRulesDestinations)
  // Filters available destinations to those existing on the board
  
  const definedPathsDestinations = definedPathsFilter(onBoardDestinations, boardState, pieceType, pieceSide)
  // Filters available destinations if selected piece has defined paths

  let moveOrCaptureDestinations = {}

  if (pieceType === 'chariot' || pieceType === 'cannon') {

    moveOrCaptureDestinations = moveOrCaptureFilter[pieceType](definedPathsDestinations, boardState, pieceFile, pieceRank, pieceSide, enemySide)

  } else {
    moveOrCaptureDestinations = moveOrCaptureFilter.default(definedPathsDestinations, boardState, pieceFile, pieceRank, pieceSide, enemySide)
  }

  let nextTurnTestedDestinations = {}

  if (pieceSide === currentTurn) {
    nextTurnTestedDestinations = nextTurnTest(moveOrCaptureDestinations, boardState, pieceName, pieceSide, currentTurn, nextTurn)
  } else {
    nextTurnTestedDestinations = moveOrCaptureDestinations
  }

  return nextTurnTestedDestinations
}


// Filters Moves Based on Results of Next Turn Model
const nextTurnTest = (availableDestinations, boardState, pieceName, pieceSide, currentTurn, nextTurn) => {

  const filteredAvailableDestinations = {
    move: [],
    capture: []
  }

  for (let i = 0; i < availableDestinations.move.length; ++i) { // Looping through available 'move' destinations for selected piece

    const selectedDestination = availableDestinations.move[i]

    if (nextTurnModel(boardState, pieceName, pieceSide, selectedDestination, currentTurn, nextTurn)) {
      filteredAvailableDestinations.move.push(selectedDestination)
    }

  }

  for (let i = 0; i < availableDestinations.capture.length; ++i) { // Looping through available 'capture' destinations for selected piece

    const selectedDestination = availableDestinations.capture[i]

    if (nextTurnModel(boardState, pieceName, pieceSide, selectedDestination, currentTurn, nextTurn)) {
      filteredAvailableDestinations.capture.push(selectedDestination)
    }
  }

  return filteredAvailableDestinations
}

// Models Board State for Next Turn

const nextTurnModel = (boardState, pieceName, pieceSide, selectedDestination, currentTurn, nextTurn) => { // currentTurn: red, nextTurn: black

  const nextBoardState = deepCopyBoard(boardState) // Create hypothetical board

  const notatedDestination = numericalToNotated(selectedDestination)

  const capturedPieceName = nextBoardState.notatedBoard[notatedDestination]

  if (capturedPieceName) { // If selected move is a capture

    nextBoardState.capturedPieces[nextTurn].push(capturedPieceName) // Add the captured enemy piece to Captured Pieces object (enemy side is same as nextTurn)

    delete nextBoardState.pieces[nextTurn][capturedPieceName] // Remove the captured enemy piece from Pieces object
  }

  nextBoardState.pieces[pieceSide][pieceName].currentPosition = selectedDestination
  // Play out the selected movement

  // nextBoardState.board = mapBoard(nextBoardState.board, nextBoardState.pieces) // Map the new board

  nextBoardState.positions = positionsBySide(nextBoardState.pieces) // List positions for new board
  nextBoardState.notatedBoard = notateBoard(boardState.pieces) // Notates new board
  
  if (flyingGeneralTest(nextBoardState)) return false // If flying generals are exposed, immediately skip to next available move

  establishPieceMovements(nextBoardState, nextTurn, currentTurn, nextTurn)

  /*
  for (let piece in nextBoardState.pieces[nextTurn]) { // Establish available moves for enemy pieces

    const selectedPiece = nextBoardState.pieces[nextTurn][piece]

    selectedPiece.availableDestinations = establishAvailableDestinations(nextBoardState, piece, nextTurn, currentTurn, nextTurn) // NextTurnTest will not occur here because piecesSide does not match currentTurn
  }
  */

  if (checkTest(nextBoardState, currentTurn, nextTurn).inCheck) return false
  // Run check function, return false if currentTurn side is checked

  return true
}

// Deep Copy Board Object - Current Method (may lose serialization and type)
// Level 1 Function (Complete)
const deepCopyBoard = (boardState) => {
  return JSON.parse(JSON.stringify(boardState))
}


// Filter Available Destinations by On-Board
// Level 1 Function (Complete)
const onBoardFilter = (initialAvailableDestinations) => {

  const filteredAvailableDestinations = []

  for (let i = 0; i < initialAvailableDestinations.length; ++i) {

    const selectedDestination = initialAvailableDestinations[i],
          selectedFile = selectedDestination[0],
          selectedRank = selectedDestination[1]

    if ((selectedFile >= 0 && selectedFile <= 9) && (selectedRank >= 0 && selectedRank <= 9)) {
      filteredAvailableDestinations.push(selectedDestination)
    }
  }

  return filteredAvailableDestinations
}

// Filter Available Positions by Defined Paths
// Level 1 Function (Complete)
const definedPathsFilter = (availableDestinations, boardState, pieceType, pieceSide) => {

  if (definedPathsRules[pieceSide].hasOwnProperty(pieceType)) {

    const selectedDefinedPaths = definedPathsRules[pieceSide][pieceType],
          selectedDefinedPathsString = JSON.stringify(selectedDefinedPaths),
          filteredAvailableDestinations = []
    
    for (let i = 0; i < availableDestinations.length; ++i) {

      const selectedDestination = availableDestinations[i],
            selectedDestinationString = JSON.stringify(selectedDestination)

      if (selectedDefinedPathsString.includes(selectedDestinationString)) {
        filteredAvailableDestinations.push(selectedDestination)
      }
    }
    return filteredAvailableDestinations

  } else {
    return availableDestinations
  }
}

// Filter Available Positions by Moves/Captures (Contains Special Rules for Chariot and Cannon)
// Level 1 Function Object (Complete)
const moveOrCaptureFilter = {

  // All Pieces Except Chariot and Cannon
  default: function(availableDestinations, boardState, pieceFile, pieceRank, pieceSide, enemySide) {
  
    const filteredAvailableDestinations = {
      move: [],
      capture: []
    }
    
    // Positions of friend and enemy units
    const friendPositions = boardState.positions[pieceSide],
          enemyPositions = boardState.positions[enemySide]

    for (let i = 0; i < availableDestinations.length; ++i) {

      const selectedDestination = availableDestinations[i]
      
      // If destination contains enemy unit, push as capture
      if (includesPositionTest(selectedDestination, enemyPositions)) {
        filteredAvailableDestinations.capture.push(selectedDestination)
      
      // If destination doesn't contain friend unit, push as move
      } else if (!includesPositionTest(selectedDestination, friendPositions)) {
        filteredAvailableDestinations.move.push(selectedDestination)
      }
    }

    return filteredAvailableDestinations
  },

  chariot: function(availableDestinations, boardState, pieceFile, pieceRank, pieceSide, enemySide) {

    const filteredAvailableDestinations = {
      move: [],
      capture: []
    }

    const friendPositions = boardState.positions[pieceSide],
          enemyPositions = boardState.positions[enemySide],
          movementVectors = [[1,0],[-1,0],[0,1],[0,-1]]

    for (let i = 0; i < movementVectors.length; ++i) { // Looping through each direction (right, left, up, down)

      const fileVector = movementVectors[i][0], // 1
            rankVector = movementVectors[i][1] // 0

      for (let j = 1; j <= 9; ++j) { // Looping through 9 orthogonal steps

        const orthogonalDestination = [pieceFile + fileVector*j, pieceRank + rankVector*j] // [1*1, 0*1]

        if (includesPositionTest(orthogonalDestination, availableDestinations)) { 

          if (includesPositionTest(orthogonalDestination, enemyPositions)) {
            filteredAvailableDestinations.capture.push(orthogonalDestination)
            break // Stop at first enemy found along an orthogonal direction (and capture)

          } else if (includesPositionTest(orthogonalDestination, friendPositions)) {
            break // Stop at first friend found along an orthogonal direction

          } else {
            filteredAvailableDestinations.move.push(orthogonalDestination)
            // Allow movement if no pieces are in the way
          }
        }
      }
    }

    return filteredAvailableDestinations
  },

  cannon: function(availableDestinations, boardState, pieceFile, pieceRank, pieceSide, enemySide) {

    const filteredAvailableDestinations = {
      move: [],
      capture: []
    }

    const friendPositions = boardState.positions[pieceSide],
          enemyPositions = boardState.positions[enemySide],
          movementVectors = [[1,0],[-1,0],[0,1],[0,-1]]
    
    for (let i = 0; i < movementVectors.length; ++i) { // Looping through each direction (right, left, up, down)
    
      let intermediatePiecePosition = [],
          fileVector = movementVectors[i][0],
          rankVector = movementVectors[i][1]

      for (let j = 1; j <= 9; ++j) { // Looping through 9 orthogonal steps

        const orthogonalDestination = [pieceFile + fileVector*j, pieceRank + rankVector*j]

        if (includesPositionTest(orthogonalDestination, availableDestinations)) {

          if (!intermediatePiecePosition.length) { // If no intermediate piece has been found yet

            if (includesPositionTest(orthogonalDestination, enemyPositions) || includesPositionTest(orthogonalDestination, friendPositions)) {

              intermediatePiecePosition = orthogonalDestination // First friend or enemy piece in orthogonal direction is assigned as intermediate piece

            } else {
              filteredAvailableDestinations.move.push(orthogonalDestination) // Allow movement if no pieces are in the way
            }

          } else { // If an intermediate piece has already been found

            if (includesPositionTest(orthogonalDestination, enemyPositions)) {
              filteredAvailableDestinations.capture.push(orthogonalDestination)
              break // Allow capture on the next enemy piece found
            }
          }
        }
      }
    }

    return filteredAvailableDestinations
  }
}


// ----- MOVE PIECE ----- //

const movePiece = (boardState, selectedNotatedSource, selectedNotatedDestination) => {
  
  if (boardState.status.gameOver === true) return

  const movingSide = boardState.status.currentTurn
 
  let currentTurn = boardState.status.currentTurn,
      nextTurn = boardState.status.nextTurn

  const pieceName = boardState.notatedBoard[selectedNotatedSource]
  // console.log(boardState.notatedBoard)
  // console.log(pieceName)
  // console.log(boardState.pieces.red.soldier_red_3)

  // console.log(boardState.pieces[movingSide].soldier_red_3)
  const pieceAvailableDestinations = boardState.pieces[movingSide][pieceName].availableDestinations,
        selectedDestination = notatedToNumerical(selectedNotatedDestination)

  if (includesPositionTest(selectedDestination, pieceAvailableDestinations)) {

    const newBoardState = deepCopyBoard(boardState)

    const capturedPieceName = boardState.notatedBoard[selectedNotatedDestination] // Is there a piece being  captured?

    if (capturedPieceName) { // If selected move is a capture

      newBoardState.capturedPieces[nextTurn].push(capturedPieceName) // Add the captured enemy piece to Captured Pieces object (enemy side is same as nextTurn)

      delete newBoardState.pieces[nextTurn][capturedPieceName] // Remove the captured enemy piece from Pieces object
    }

    newBoardState.pieces[currentTurn][pieceName].currentPosition = selectedDestination
    newBoardState.pieces[currentTurn][pieceName].notatedPosition = selectedNotatedDestination
    // Play out the selected movement

    // nextBoardState.board = mapBoard(nextBoardState.board, nextBoardState.pieces) // Map the new board

    // Updated positions and notatedBoard
    newBoardState.positions = positionsBySide(newBoardState.pieces)

    newBoardState.notatedBoard = notateBoard(newBoardState.pieces)

    // Switch currentTurn and nextTurn (change the sides)
    currentTurn = newBoardState.status.nextTurn.slice()
    nextTurn = newBoardState.status.currentTurn.slice()
    newBoardState.status.currentTurn = currentTurn
    newBoardState.status.nextTurn = nextTurn

    // Increase turn count
    newBoardState.status.turnNumber++

    establishPieceMovements(newBoardState, movingSide, currentTurn, nextTurn)
    
    establishPieceMovements(newBoardState, currentTurn, currentTurn, nextTurn)

    if (newBoardState.status.turnNumber > 0) {
      newBoardState.status.check[nextTurn] = checkTest(newBoardState, nextTurn, currentTurn)
      newBoardState.status.check[currentTurn] = checkTest(newBoardState, currentTurn, nextTurn)
    }

    newBoardState.status.checkmate = checkmateTest(newBoardState, currentTurn)
    newBoardState.status.gameOver = newBoardState.status.checkmate
    
    console.log(`checkmate: ${newBoardState.status.checkmate}`)
    console.log(`gameOver: ${newBoardState.status.gameOver}`)
    return newBoardState
  }
}

const establishPieceMovements = (boardState, side, currentTurn, nextTurn) => {

  boardState.status.availableMoves[side] = 0
  
  for (let piece in boardState.pieces[side]) {

    const selectedPiece = boardState.pieces[side][piece]
    
    selectedPiece.availableDestinations = establishAvailableDestinations(boardState, piece, side, currentTurn, nextTurn)

    boardState.status.availableMoves[side] += (selectedPiece.availableDestinations.move.length + selectedPiece.availableDestinations.capture.length)
  }
}

const checkmateTest = (boardState, checkedSide) => {

  const inCheck = boardState.status.check[checkedSide].inCheck,
        availableMoves = boardState.status.availableMoves[checkedSide]

  console.log(availableMoves)
  console.log(inCheck)
  if (inCheck && !availableMoves) return true
  else return false
}



// ----- TESTS ----- //

// const board1 = newGame(defaultPositions)

// console.log(board1)
// console.log(board1.pieces.red.chariot_red_left)

