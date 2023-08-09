import { type Column, type GameBoard } from '../types.d'
import { getRandomNumber, checkHorizontal, checkVertical, checkDiagonal } from './game-utils'

describe('Get random numbers', () => {
  it('get random number', () => {
    const number = getRandomNumber(10)
    expect(number).toBeLessThan(10)
  })

  it('random number is 0', () => {
    const number = getRandomNumber(0)
    expect(number).toBe(0)
  })
})

describe('Check win with movements', () => {
  it('First move doest win', () => {
    const board: GameBoard = [[], [], [], [], [], [], []]

    const firstCheck = checkHorizontal(board, 'P1', 6, 2)
    const secondCheck = checkHorizontal(board, 'P1', 6, 2)
    const thirdCheck = checkHorizontal(board, 'P1', 6, 2)

    expect(firstCheck).toBe(false)
    expect(secondCheck).toBe(false)
    expect(thirdCheck).toBe(false)
  })

  it('Horizontal left Win', () => {
    const column: Column = ['P1', 'P2', null, null, null, null]
    const move: Column = ['P1', null, null, null, null, null]
    const board: GameBoard = [move, column, column, column, [], [], []]

    const horizontalCheck = checkHorizontal(board, 'P1', 0, 1)

    expect(horizontalCheck).toBe(true)
  })

  it('Horizontal right Win', () => {
    const column: Column = ['P1', 'P2', null, null, null, null]
    const move: Column = ['P1', null, null, null, null, null]
    const board: GameBoard = [[], column, column, column, move, [], []]

    const horizontalCheck = checkHorizontal(board, 'P1', 0, 1)

    expect(horizontalCheck).toBe(true)
  })

  it('Vertical Win', () => {
    const move: Column = ['P1', 'P1', 'P1', 'P1', null, null]
    const board: GameBoard = [[], move, [], [], [], [], []]

    const verticalCheck = checkVertical(board, 'P1', 3, 1)

    expect(verticalCheck).toBe(true)
  })

  it('Diagonal top right Win', () => {
    const col1: Column = ['P1', null, null, null, null, null]
    const col2: Column = ['P2', 'P1', null, null, null, null]
    const col3: Column = ['P2', 'P2', 'P1', null, null, null]
    const col4: Column = ['P1', 'P2', 'P1', 'P1', null, null]
    const board: GameBoard = [col1, col2, col3, col4, [], [], []]

    const topRightCheck = checkDiagonal(board, 'P1', 3, 3)

    expect(topRightCheck).toBe(true)
  })

  it('Diagonal top left Win', () => {
    const col4: Column = ['P1', 'P2', 'P1', 'P1', null, null]
    const col3: Column = ['P2', 'P2', 'P1', null, null, null]
    const col2: Column = ['P2', 'P1', null, null, null, null]
    const col1: Column = ['P1', null, null, null, null, null]
    const board: GameBoard = [col4, col3, col2, col1, [], [], []]

    const topLeftCheck = checkDiagonal(board, 'P1', 3, 0)

    expect(topLeftCheck).toBe(true)
  })

  it('Diagonal bottom right Win', () => {
    const col4: Column = ['P1', 'P2', 'P1', 'P1', null, null]
    const col3: Column = ['P2', 'P2', 'P1', null, null, null]
    const col2: Column = ['P2', 'P1', null, null, null, null]
    const col1: Column = ['P1', null, null, null, null, null]
    const board: GameBoard = [col4, col3, col2, col1, [], [], []]

    const bottomRightCheck = checkDiagonal(board, 'P1', 0, 3)

    expect(bottomRightCheck).toBe(true)
  })

  it('Diagonal bottom left Win', () => {
    const col1: Column = ['P1', null, null, null, null, null]
    const col2: Column = ['P2', 'P1', null, null, null, null]
    const col3: Column = ['P2', 'P2', 'P1', null, null, null]
    const col4: Column = ['P1', 'P2', 'P1', 'P1', null, null]
    const board: GameBoard = [col1, col2, col3, col4, [], [], []]

    const bottomRightCheck = checkDiagonal(board, 'P1', 0, 0)

    expect(bottomRightCheck).toBe(true)
  })
})
