
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
        flyingGeneral:
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
  const newGameBoard = (allPositions) => {
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
        flyingGeneral: false,
        check: {},
        checkmate: false,
        availableMoves: 0,
        turnNumber: 0
      },
      board: [],
      notatedBoard: {}
    }
  
    boardState.pieces = populateBoard(allPositions)
    boardState.board = createBoardArray(9, 10)
    boardState.board = mapBoard(boardState.board, boardState.pieces)
    boardState.positions = positionsBySide(boardState.pieces)
    boardState.notatedBoard = notateBoard(boardState.pieces)
    boardState.status.flyingGeneral = flyingGeneralTest(boardState)
  
    return boardState
  }
  
  
  // Populate Board.Pieces Object with Pieces: Type, Side, Starting Position
  // Level 1 Function (Complete)
  const populateBoard = (allPositions) => { // Input: Positions Object
  
    const allPieces = {
      red: {},
      black: {}
    }
  
    const fileNotation = 'abcdefghi'
    
    for (let i = 0; i < Object.keys(allPositions).length; ++i) { // Loop through each piece in Positions Object
  
      const selectedPiece = Object.keys(allPositions)[i], // 'chariot_red_left'
            selectedPieceSplit = selectedPiece.split('_'), // ['chariot', 'red', 'left']
            selectedPieceType = selectedPieceSplit[0], // 'chariot'
            selectedNotationType = notationRules.pieces[selectedPieceType],
            selectedPieceSide = selectedPieceSplit[1], // 'red'
            selectedNotationSide = notationRules.sides[selectedPieceSide]
  
      // Create object with piece name as key and type and currentPosition information
  
      const file = allPositions[selectedPiece][0],
            rank = allPositions[selectedPiece][1],
            notationFile = fileNotation[file]
  
      allPieces[selectedPieceSide][selectedPiece] = {
        type: selectedPieceType,
        notation: selectedNotationSide + selectedNotationType,
        currentPosition: [file, rank],
        notationPosition: notationFile + rank
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
  
        const notatedPosition = boardPieces[side][piece].notationPosition,
              notatedPiece = boardPieces[side][piece].notation
  
        notations[notatedPosition] = notatedPiece
      }
    }
  
    return notations
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
  
      // Loop through each rank and look for pieces between the generals
      for (let i = (9-general_blackPosition[1]) + 1; i < (9-general_redPosition[1]); ++i) {
        if (boardState.board[i][general_redPosition[0]]) {
          return false
        }
      }
    }
  
    return true // Return true if generals face each other directly
  }
  
  // Detect if Check Has Occurred
  const checkTest = (boardState, inCheckSide, checkingSide) => {
  
    let generalName = ''
  
    if (inCheckSide === 'red') generalName = 'general_red'
    else if (inCheckSide === 'black') generalName = 'general_black'
  
    // Create object containing check info
    const checkState = {
      generalPosition: boardState.pieces[inCheckSide][generalName].currentPosition.slice(),
      inCheck: false,
      checkingPieces: []
    }
  
    // Loop through pieces on checkingSide
  
    for (let piece in boardState.pieces[checkingSide]) {
  
      const selectedPiece = boardState.pieces[checkingSide][piece],
            selectedPieceCapture = selectedPiece.availableDestinations.capture,
            selectedPieceCaptureString = JSON.stringify(selectedPieceCapture),
            generalPositionString = JSON.stringify(checkState.generalPosition)
  
        // If the piece's available captures include the enemy general, set check to true
      if (selectedPieceCaptureString.includes(generalPositionString)) {
        checkState.inCheck = true
        checkState.checkingPieces.push(piece)
      }
    }
  
    return checkState
  }
  
  // ----- ESTABLISH AVAILABLE DESTINATIONS ----- //
  
  // Establish Turn
  // Level 4 Function (Complete)
  // Calls: establishAvailableDestinations, checkTest
  const establishTurn = (boardState) => {
  
    const establishedBoard = boardState
    
    const currentTurn = boardState.status.currentTurn,
          nextTurn = boardState.status.nextTurn
  
    for (let piece in boardState.pieces[currentTurn]) { // Find available destinations for the pieces of the side currently in turn
  
      const selectedPiece = establishedBoard.pieces[currentTurn][piece]
      
      selectedPiece.availableDestinations = establishAvailableDestinations(boardState, piece, currentTurn, currentTurn, nextTurn)
  
      establishedBoard.status.availableMoves += selectedPiece.availableDestinations.move.length
      establishedBoard.status.availableMoves += selectedPiece.availableDestinations.capture.length
    }
  
    if (establishedBoard.status.turnNumber > 0) {
      establishedBoard.status.check = checkTest(establishedBoard, currentTurn, nextTurn)
    }
  
    if (establishedBoard.status.availablesMoves === 0 && establishedBoard.status.check.inCheck) {
      establishedBoard.status.checkmate = true
    }
  
    return establishedBoard
  }
  
  // Create Object of Available Destinations
  // Level 3 Function (Complete)
  // Calls: onBoardFilter, definedPathsFilter, moveOrCaptureFilter
  const establishAvailableDestinations = (boardState, pieceName, pieceSide, currentTurn, nextTurn) => {
  
    let availableDestinations = {}
  
    // Lists properties of selected piece
    const pieceObj = boardState.pieces[pieceSide][pieceName],
          pieceType = pieceObj.type,
          piecePosition = pieceObj.currentPosition
          pieceFile = piecePosition[0]
          pieceRank = piecePosition[1]
          enemySide = ''
  
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
  
      if (nextTurnModel(boardState, pieceName, pieceSide, selectedDestination, currentTurn, nextTurn, 'move') === true) {
        filteredAvailableDestinations.move.push(selectedDestination)
      }
  
    }
  
    for (let i = 0; i < availableDestinations.capture.length; ++i) { // Looping through available 'capture' destinations for selected piece
  
      const selectedDestination = availableDestinations.capture[i]
  
      if (nextTurnModel(boardState, pieceName, pieceSide, selectedDestination, currentTurn, nextTurn, 'capture') === true) {
        filteredAvailableDestinations.capture.push(selectedDestination)
      }
    }
  
    return filteredAvailableDestinations
  }
  
  // Models Board State for Next Turn
  
  const nextTurnModel = (boardState, pieceName, pieceSide, selectedDestination, currentTurn, nextTurn, moveOrCapture) => { // currentTurn: red, nextTurn: black
  
    const nextBoardState = deepCopyBoard(boardState) // Create hypothetical board

    if (moveOrCapture === 'capture') { // If selected move is a capture

      const capturedPieceName = boardState.board[9-selectedDestination[1]][selectedDestination[0]] // Find the enemy piece in selected destination
    
      nextBoardState.capturedPieces[nextTurn].push(capturedPieceName) // Add the captured enemy piece to Captured Pieces object (enemy side is same as nextTurn)
  
      delete nextBoardState.pieces[nextTurn][capturedPieceName] // Remove the captured enemy piece from Pieces object
    }
  
    nextBoardState.pieces[pieceSide][pieceName].currentPosition = selectedDestination
    // Play out the selected movement
  
    nextBoardState.board = mapBoard(nextBoardState.board, nextBoardState.pieces) // Map the new board
    nextBoardState.positions = positionsBySide(nextBoardState.pieces) // List positions for new board
    nextBoardState.status.flyingGeneral = flyingGeneralTest(nextBoardState) // Test for flying generals
  
    if (nextBoardState.status.flyingGeneral === true) return false // If flying generals are exposed, immediately skip to next available move
  
    for (let piece in nextBoardState.pieces[nextTurn]) { // Establish available moves for enemy pieces
  
      const selectedPiece = nextBoardState.pieces[nextTurn][piece]
  
      selectedPiece.availableDestinations = establishAvailableDestinations(nextBoardState, piece, nextTurn, currentTurn, nextTurn) // NextTurnTest will not occur here because piecesSide does not match currentTurn
    }
  
    nextBoardState.status.check = checkTest(nextBoardState, currentTurn, nextTurn)
    // Run check function, return false if currentTurn side is checked
  
    if (nextBoardState.status.check.inCheck === true) return false
  
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
  
  
  const movePiece = (boardState, pieceName, selectedDestination) => {
  
    const currentTurn = boardState.status.currentTurn,
          nextTurn = boardState.status.nextTurn
  
    const pieceAvailableDestinationsString = JSON.stringify(boardState.pieces[currentTurn][pieceName].availableDestinations)
  
    const selectedDestinationString = JSON.stringify(selectedDestination)
  
    if (pieceAvailableDestinationsString.includes(selectedDestinationString)) {
  
      const nextBoardState = deepCopyBoard(boardState)
  
      const capturedPieceName = boardState.board[10-selectedDestination[1]][selectedDestination[0]-1]
  
      if (capturedPieceName) { // If selected move is a capture
  
        nextBoardState.capturedPieces[nextTurn].push(capturedPieceName) // Add the captured enemy piece to Captured Pieces object (enemy side is same as nextTurn)
  
        delete nextBoardState.pieces[nextTurn][capturedPieceName] // Remove the captured enemy piece from Pieces object
      }
  
      nextBoardState.pieces[currentTurn][pieceName].currentPosition = selectedDestination
      // Play out the selected movement
  
      nextBoardState.board = mapBoard(nextBoardState.board, nextBoardState.pieces) // Map the new board
      nextBoardState.positions = positionsBySide(nextBoardState.pieces) // List positions for new board
  
      let temp = nextBoardState.status.currentTurn
      nextBoardState.status.currentTurn = nextBoardState.status.nextTurn
      nextBoardState.status.nextTurn = temp
  
      nextBoardState.status.turnNumber++
      nextBoardState.status.availableMoves = 0
  
      for (let piece in boardState.pieces[nextTurn]) { // Find available destinations for the pieces of the side currently in turn
  
        const selectedPiece = nextBoardState.pieces[nextTurn][piece]
        
        selectedPiece.availableDestinations = establishAvailableDestinations(boardState, piece, nextTurn, nextTurn,currentTurn)
  
        nextBoardState.status.availableMoves += selectedPiece.availableDestinations.move.length
        nextBoardState.status.availableMoves += selectedPiece.availableDestinations.capture.length
      }
      
      if (nextBoardState.status.turnNumber > 0) {
        nextBoardState.status.check = checkTest(nextBoardState, nextTurn, currentTurn)
      }
  
      if (nextBoardState.status.availablesMoves === 0 && nextBoardState.status.check.inCheck) {
        nextBoardState.status.checkmate = true
      }
  
      return nextBoardState
    }
  }
  
  // ----- TESTS ----- //
  
  
  const newBoard = newGameBoard(defaultPositions)
  // console.log(newBoard)
  
  const turn0 = establishTurn(newBoard)
  
  console.log(turn0)
  
  // let pieceToMove1 = 'chariot_red_left'
  // let piece1Destination = [1,2]
  // const turn1 = movePiece(turn0, pieceToMove1, piece1Destination)
  
  // console.log(turn1)
  // // console.log(turn1.pieces.red)
  
  // let pieceCheckRed = 'general_red'
  // let pieceCheckBlack = 'general_black'
  
  // console.log(pieceCheckRed, turn1.pieces.red[pieceCheckRed].availableDestinations)
  // console.log(pieceCheckBlack, turn1.pieces.black[pieceCheckBlack].availableDestinations)
  
  // console.log(turn0.pieces.red[pieceToMove1].availableDestinations)
  
  // const board0 = newGameBoard(defaultPositions)
  // console.log(board0)
  // console.log(movePiece(board0, pieceToMove1, [1,10], 'capture'))
  
  // console.log(checkTest(board0))
  // console.log(checkmateDetector(board0))
  
  // console.log(establishAvailableDestinations(board0, pieceToMove1))
  
  // const board1 = deepCopyBoard(board0)
  // console.log(board1)
  
  // const board1 = movePiece(board0, pieceToMove1, [1,2])
  // const board2 = movePiece(board1, pieceToMove1, [5,6])
  // const board3 = movePiece(board2, pieceToMove1, [5,7])
  // const board4 = movePiece(board3, pieceToMove1, [5,8])
  
  // console.log(board0)
  // console.log(positionsBySide(board0.pieces))
  // console.log(board1)
  // console.log(`board 0 ${pieceToMove1}: ${board0.pieces[pieceToMove1].currentPosition}`)
  // console.log(`board 0 ${pieceToMove2}: ${board0.pieces[pieceToMove2].currentPosition}`)
  // console.log(`board 1 ${pieceToMove1}: ${board1.pieces[pieceToMove1].currentPosition}`)
  // console.log(`board 1 ${pieceToMove2}: ${board1.pieces[pieceToMove2].currentPosition}`)
  // console.log(`board 2 ${pieceToMove1}: ${board2.pieces[pieceToMove1].currentPosition}`)
  // console.log(`board 2 ${pieceToMove2}: ${board2.pieces[pieceToMove2].currentPosition}`)
  // console.log(`board 3 ${pieceToMove1}: ${board3.pieces[pieceToMove1].currentPosition}`)
  // console.log(`board 3 ${pieceToMove2}: ${board3.pieces[pieceToMove2].currentPosition}`)
  
  