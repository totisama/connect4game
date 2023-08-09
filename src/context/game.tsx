import { createContext, useState, useEffect, type FC } from 'react'
import {
  GameState,
  GameMode,
  type GameBoard,
  type GameProps,
  type GameContext as GameContextType,
  type Move,
  type Column,
  type Players,
  type PlayerInfo,
  type Color,
  type ColorsType
} from '../types.d'
import { initialGameBoard, initialPlayers, PLAYER_ONE, PLAYER_TWO, COLORS } from '../constants'
import {
  checkHorizontal,
  checkVertical,
  checkDiagonal,
  getRandomNumber
} from '../utils'

export const GameContext = createContext<GameContextType | null>(null)

export const GameProvider: FC<GameProps> = ({ children, defaultValues }) => {
  const defaultValuesPresent = defaultValues !== null && defaultValues !== undefined
  const [gameState, setGameState] = useState<GameState>(defaultValuesPresent ? (defaultValues.gameState as GameState) : GameState.Start)
  const [gameMode, setGameMode] = useState<GameMode | null>(null)
  const [gameBoard, setBoard] = useState<GameBoard>(initialGameBoard)
  const [turn, setTurn] = useState<Move>(PLAYER_ONE)
  const [players, setPlayers] = useState<Players>(initialPlayers)
  const [winner, setWinner] = useState<Move>(defaultValuesPresent ? (defaultValues.winner as Move) : null)
  const colorsObj: ColorsType = Object.entries(COLORS).reduce<ColorsType>((acc, [key, value]) => {
    acc[key] = value
    return acc
  }, {})
  const [colors, setColors] = useState<ColorsType>(colorsObj)

  const resetGame = (newState: GameState) => {
    setTurn(PLAYER_ONE)
    setGameState(newState)
    setGameMode(null)
    setWinner(null)
    setBoard(initialGameBoard)
    setColorsOptions(colorsObj)
    setPlayers(initialPlayers)
  }

  const changeGameState = (newState: GameState) => {
    setGameState(newState)
  }

  const selectGameMode = (gameMode: GameMode) => {
    setGameMode(gameMode)
  }

  const setColorsOptions = (newColors: ColorsType) => {
    setColors(newColors)
  }

  const setWinState = (winner: Move) => {
    if (winner === null) {
      return
    }

    setWinner(winner)
    setTimeout(() => {
      setGameState(GameState.Win)
    }, 1500)
  }

  const setPlayerInfo = ({ player, key, value }: PlayerInfo) => {
    if (player === null) {
      return
    }

    const playersInfo = structuredClone(players) as Players

    if (key === 'color') {
      value = value as Color
      playersInfo[player][key] = value
    } else {
      value = value as number
      playersInfo[player][key] += value
    }

    setPlayers(playersInfo)
  }

  const changeTurn = () => {
    const newTurn = turn === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE
    setTurn(newTurn)
  }

  const addNewMovement = (move: Move, columnNumber: number) => {
    const board = structuredClone(gameBoard) as GameBoard
    const column = board[columnNumber] as Column

    if (column.length >= 6 || (gameMode === GameMode.PvE && turn === PLAYER_TWO) || winner !== null) {
      return
    }

    column.push(move)
    board[columnNumber] = column

    setBoard(board)

    const newWinner = checkWin(board, turn, columnNumber)
    setPlayerInfo({ player: turn, key: 'score', value: 10 })

    if (newWinner !== null) {
      setWinState(newWinner)
    } else {
      checkTie(board)
      changeTurn()
    }
  }

  const environmentMove = () => {
    const randomColumnNumber = getRandomNumber(7)
    const board = [...gameBoard] as GameBoard
    const column = board[randomColumnNumber] as Column

    if (board[randomColumnNumber].length >= 6) {
      environmentMove()
      return
    }

    column.push(PLAYER_TWO)
    board[randomColumnNumber] = column

    const timeOut = getRandomNumber(3000)

    setTimeout(() => {
      setBoard(board)

      const newWinner = checkWin(board, turn, randomColumnNumber)
      setPlayerInfo({ player: turn, key: 'score', value: 10 })

      if (newWinner !== null) {
        setWinState(newWinner)
      } else {
        checkTie(board)
        changeTurn()
      }
    }, timeOut)
  }

  const checkWin = (board: GameBoard, turn: Move, column: number): Move => {
    const depth = board[column].length - 1

    if (checkHorizontal(board, turn, depth, column)) {
      return turn
    }

    if (checkVertical(board, turn, depth, column)) {
      return turn
    }
    const check = checkDiagonal(board, turn, depth, column)

    if (check) {
      return turn
    }

    return null
  }

  const checkTie = (newBoard: GameBoard) => {
    let tie = true

    for (let index = 0; index < 7; index++) {
      const column = newBoard[index]

      if (column.length < 6) {
        tie = false
        break
      }
    }

    if (tie) {
      setGameState(GameState.Tie)
    }
  }

  const chooseRandomColor = () => {
    const colorsArray = Object.entries(colors)
    const randomColorIndex = getRandomNumber(colorsArray.length)
    const chosenColor = colorsArray[randomColorIndex][1]

    setPlayerInfo({ player: turn, key: 'color', value: chosenColor })
    changeTurn()
    changeGameState(GameState.Playing)
  }

  useEffect(() => {
    const environmentTurn = (gameMode === GameMode.PvE && turn === PLAYER_TWO)

    if (environmentTurn && gameState === GameState.Playing && winner === null) {
      environmentMove()
    }

    if (environmentTurn && gameState === GameState.Color) {
      setTimeout(() => {
        chooseRandomColor()
      }, 1000)
    }
  }, [turn])

  return (
    <GameContext.Provider value={{
      gameState,
      changeGameState,
      gameMode,
      selectGameMode,
      gameBoard,
      addNewMovement,
      resetGame,
      turn,
      changeTurn,
      players,
      setPlayerInfo,
      colors,
      setColorsOptions,
      winner
    }}
    >
      {children}
    </GameContext.Provider>
  )
}
