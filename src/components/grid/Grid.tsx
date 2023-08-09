import { PLAYER_ONE } from '../../constants'
import { useGameState } from '../../hooks'
import { GameMode, type Color } from '../../types.d'
import { Move } from '../move'
import styles from './Grid.module.scss'

const Grid = () => {
  const { gameBoard, gameMode, addNewMovement, turn, players } = useGameState()
  const color: Color = turn !== null ? players[turn].color : '#000000'

  return (
    <div className={styles.grid}>
      {gameBoard.map((column, columnNumber) => (
        <div key={columnNumber} onClick={() => { addNewMovement(turn, columnNumber) }} className={styles.gridItems}>
          {(gameMode === GameMode.PvP || (gameMode === GameMode.PvE && turn === PLAYER_ONE)) && column.length < 6
            ? <div className={styles.fallingPosition} style={{ backgroundColor: color }} />
            : null}
          {column.map((move, index) => (
            <Move key={index} move={move} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Grid
