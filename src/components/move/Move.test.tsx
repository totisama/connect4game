import { render } from '@testing-library/react'
import Move from './Move'
import { GameProvider } from '../../context/game'

test('Move div is present', () => {
  const { container } = render(
    <GameProvider>
      <Move move={'P1'} />
    </GameProvider>
  )

  const move = container.getElementsByClassName('move')

  expect(move[0]).toBeInTheDocument()
})
