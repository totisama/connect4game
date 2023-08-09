import { type FC } from 'react'
import { type Color, type MoveProps } from '../../types.d'
import styles from './Move.module.scss'
import { useGameState } from '../../hooks'

const Move: FC<MoveProps> = ({ move }) => {
  const { players } = useGameState()
  const color: Color = move !== null ? players[move].color : '#000000'

  return (
    <div className={styles.move} style={{ backgroundColor: `${color}` }} />
  )
}

export default Move
