import { useGameState } from '../../hooks'
import { GameState } from '../../types.d'
import { Menu } from '../menu'
import { Grid } from '../grid'
import logo from '../../assets/logo/logoFull2x.png'
import styles from './Board.module.scss'
import { FinishModal } from '../finishModal'

const Board = () => {
  const { gameState } = useGameState()
  const isPlaying = gameState === GameState.Playing
  const gameFinished = gameState === GameState.Win || gameState === GameState.Tie

  return (
    <main className={styles.game}>
      <div className={styles.mask}>
        <section className={styles.board}>
          {isPlaying
            ? (
                <Grid />
              )
            : gameFinished
              ? (
                  <FinishModal />
                )
              : (
                  <img className={styles.logo} src={logo} alt='Connect4 logo' />
                )
          }
        </section>
        <section className={isPlaying || gameFinished ? styles.playingMenu : styles.initialMenu} >
          <Menu />
        </section>
      </div>
    </main>
  )
}

export default Board
