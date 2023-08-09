import { type GameBoard, type Players, type ColorsType } from './types'

export const initialGameBoard: GameBoard = [[], [], [], [], [], [], []]

export const initialPlayers: Players = {
  P1: {
    color: '#32a852',
    score: 0
  },
  P2: {
    color: '#4432a8',
    score: 0
  }
}

export const PLAYER_ONE = 'P1'
export const PLAYER_TWO = 'P2'

export const COLORS: ColorsType = {
  black: '#000000',
  sky: '#00A8FF',
  skyBlue: '#0097E6',
  blue: '#0075B3',
  yellow: '#FCE38A',
  orange: '#FCBF49',
  pink: '#F38181',
  red: '#D62828',
  aqua: '#17EAD9',
  purple: '#6078EA'
}

export const CONSECUTIVE_MOVES = 4

export const PLAYERS_VALUES = {
  P1: 'Player 1',
  P2: 'Player 2'
}
