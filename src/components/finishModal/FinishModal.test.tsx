import { render, screen } from '@testing-library/react'
import FinishModal from './FinishModal'
import { GameProvider } from '../../context/game'
import { PLAYERS_VALUES } from '../../constants'

test('Modal shows default info', () => {
  render(
    <GameProvider>
      <FinishModal />
    </GameProvider>
  )

  const player1Text = screen.getByText(/Player 1 score:/i)
  const player2Text = screen.getByText(/Player 2 score:/i)
  const tieText = screen.getByText('Tie!')

  expect(player1Text).toBeInTheDocument()
  expect(player2Text).toBeInTheDocument()
  expect(tieText).toBeInTheDocument()
})

describe('When there is a winner', () => {
  it('Shows Player winner text', () => {
    const winner = 'P1'
    render(
      <GameProvider defaultValues={{ winner }}>
        <FinishModal />
      </GameProvider>
    )

    const winnerText = screen.getByText(`${PLAYERS_VALUES[winner]} wins!`)

    expect(winnerText).toBeInTheDocument()
  })
})
