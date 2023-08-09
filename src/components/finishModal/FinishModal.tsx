import { PLAYERS_VALUES } from '../../constants'
import { useGameState } from '../../hooks'
import styles from './FinishModal.module.scss'

const FinishModal = () => {
  const { players, winner } = useGameState()
  const playerValue = winner !== null ? PLAYERS_VALUES[winner] : null

  return (
    <div className={styles.finishContainer}>
      <div className={styles.finish}>
        <h1 className={styles.title}>{playerValue !== null ? `${playerValue} wins!` : 'Tie!' }</h1>
        <div className={styles.playersScore}>
          <p className={styles.playerScore}>Player 1 score: {players.P1.score}</p>
          <p className={styles.playerScore}>Player 2 score: {players.P2.score}</p>
        </div>
      </div>
    </div>
  )
}

export default FinishModal
