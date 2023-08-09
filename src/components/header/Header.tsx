import { useGameState } from '../../hooks'
import { GameState } from '../../types.d'
import image from '../../assets/logo/logoSymbol2x.png'
import styles from './Header.module.scss'

const Header = () => {
  const { gameState } = useGameState()

  return gameState === GameState.Playing || gameState === GameState.Win || gameState === GameState.Tie
    ? (
        <div className={styles.logoContainer}>
          <img className={styles.logo} src={image} alt='Connect4 logo' />
        </div>
      )
    : null
}

export default Header
