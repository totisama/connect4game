import { useContext } from 'react'
import { GameContext } from '../context/game'
import { type GameContext as GameContextType } from '../types'

export const useGameState = () => {
  const {
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
  } = useContext(GameContext) as GameContextType

  return {
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
  }
}
