import { GameState, GameMode, type Color, type ColorsType } from '../../types.d'
import { useGameState } from '../../hooks'
import restart from '../../assets/buttons/icon/restart.png'
import close from '../../assets/buttons/icon/close.png'
import { PLAYER_ONE, PLAYER_TWO } from '../../constants'
import styles from './Menu.module.scss'

const Menu = () => {
  const { gameState, gameMode, changeGameState, selectGameMode, resetGame, players, setPlayerInfo, turn, changeTurn, colors, setColorsOptions } = useGameState()
  const gameFinished = gameState === GameState.Win || gameState === GameState.Tie
  const playerColor = turn !== null ? players[turn].color : '#e6e6e6'
  const playerScore = turn !== null ? players[turn].score : 0
  const colorsArray = Object.entries(colors)

  const setGameMode = (gameMode: GameMode) => {
    selectGameMode(gameMode)
    changeGameState(GameState.Color)
  }

  const setColor = (colorChosen: Color) => {
    if (turn !== PLAYER_ONE && gameMode === GameMode.PvE) {
      return
    }

    const newColors: ColorsType = Object.fromEntries(
      colorsArray.filter(([, hex]: [string, Color]) => hex !== colorChosen)
    )

    changeTurn()
    setColorsOptions(newColors)
    setPlayerInfo({ player: turn, key: 'color', value: colorChosen })

    if (turn === PLAYER_TWO) {
      changeGameState(GameState.Playing)
    }
  }

  return (
    <>
      {gameState === GameState.Start
        ? (
            <button className={styles.startButton} onClick={() => { changeGameState(GameState.GameMode) }} />
          )
        : null}
      {gameState === GameState.GameMode
        ? (
            <>
              <button className={`${styles.gameModeButton} ${styles.pvpButton}`} onClick={() => { setGameMode(GameMode.PvP) }} />
              <button className={`${styles.gameModeButton} ${styles.pveButton}`} onClick={() => { setGameMode(GameMode.PvE) }} />
            </>
          )
        : null}
      {gameState === GameState.Color
        ? (
          <div className={styles.colorPicker}>
            <h2 className={styles.playerText}>{ turn === PLAYER_ONE ? 'Player 1' : 'Player 2'}</h2>
            <ul className={styles.colorsContainer}>
              {colorsArray.map(([color, hex]) => (
                <li key={color} className={styles.color} style={{ backgroundColor: hex }} onClick={() => { setColor(hex) }} />
              ))}
            </ul>
          </div>
          )
        : null}
      {gameState === GameState.Playing || gameFinished
        ? (
            <>
              <div className={styles.currentPlayer}>
                <div className={styles.playerColor} style={{ backgroundColor: playerColor }} />
                <div className={styles.playerInfo}>
                  <p className={styles.playerText}>Player Turn</p>
                  <p className={styles.playerScore}>Score: {playerScore}</p>
                </div>
              </div>
              <div className={styles.playingButtons}>
                <button className={styles.smallMenuButton} onClick={() => { resetGame(GameState.GameMode) }}>
                  <img src={restart} />
                </button>
                <button className={styles.smallMenuButton} onClick={() => { resetGame(GameState.Start) }} >
                  <img src={close} />
                </button>
              </div>
            </>
          )
        : null}
    </>
  )
}

export default Menu
