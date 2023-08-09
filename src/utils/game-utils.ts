import { CONSECUTIVE_MOVES } from '../constants'
import { type GameBoard, type Move } from '../types'

export const getRandomNumber = (max: number) => {
  return Math.floor(Math.random() * max)
}

export const checkHorizontal = (board: GameBoard, turn: Move, depth: number, column: number): boolean => {
  if (turn === null) {
    return false
  }
  const horizontalMoves: Move[] = []
  //  Check left values
  for (let index = column; index >= 0; index--) {
    const move = board[index][depth]

    if (move !== turn) {
      break
    }

    horizontalMoves.push(move)
  }

  //  Check right values
  for (let index = column + 1; index < 7; index++) {
    const move = board[index][depth]

    if (move !== turn) {
      break
    }

    horizontalMoves.push(move)
  }

  // Because of the condition inside both for's,
  // there can only be one type of values in the moves array
  return horizontalMoves.length >= CONSECUTIVE_MOVES
}

export const checkVertical = (board: GameBoard, turn: Move, depth: number, column: number): boolean => {
  if (turn === null) {
    return false
  }
  const verticalMoves: Move[] = []

  //  Check below values
  for (let index = depth; index >= 0; index--) {
    const move = board[column][index]

    if (move !== turn) {
      break
    }

    verticalMoves.push(move)
  }

  // Because of the condition inside if the for,
  // there can only be one type of Move in the verticalMoves array
  return verticalMoves.length >= CONSECUTIVE_MOVES
}

export const checkDiagonal = (board: GameBoard, turn: Move, depth: number, column: number): boolean => {
  if (turn === null) {
    return false
  }
  // Check diagonal from top-right to bottom-left
  let rowIndex = depth
  let columnIndex = column

  const topRightBottomLeft: Move[] = []
  iterateDiagonally(board, turn, rowIndex, columnIndex, topRightBottomLeft, (index) => index - 1, (index) => index - 1)

  rowIndex = depth + 1
  columnIndex = column + 1
  iterateDiagonally(board, turn, rowIndex, columnIndex, topRightBottomLeft, (index) => index + 1, (index) => index + 1)

  // Check diagonal from top-left to bottom-right
  rowIndex = depth
  columnIndex = column

  const topLeftBottomRight: Move[] = []
  iterateDiagonally(board, turn, rowIndex, columnIndex, topLeftBottomRight, (index) => index + 1, (index) => index - 1)

  rowIndex = depth - 1
  columnIndex = column + 1
  iterateDiagonally(board, turn, rowIndex, columnIndex, topLeftBottomRight, (index) => index - 1, (index) => index + 1)

  return topRightBottomLeft.length >= CONSECUTIVE_MOVES || topLeftBottomRight.length >= CONSECUTIVE_MOVES
}

const iterateDiagonally = (board: GameBoard, turn: Move, rowIndex: number, columnIndex: number, result: Move[], rowIndexExp: (index: number) => number, columnIndexExp: (index: number) => number) => {
  const numRows = 6
  const numColumns = 7

  while (rowIndex >= 0 && rowIndex < numRows && columnIndex >= 0 && columnIndex < numColumns) {
    const move = board[columnIndex][rowIndex]

    if (move !== turn) {
      break
    }

    result.push(move)

    rowIndex = rowIndexExp(rowIndex)
    columnIndex = columnIndexExp(columnIndex)
  }
}
