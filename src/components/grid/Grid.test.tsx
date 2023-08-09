import { render } from '@testing-library/react'
import Grid from './Grid'
import { GameProvider } from '../../context/game'

test('Grid class is present', () => {
  const { container } = render(
    <GameProvider>
      <Grid />
    </GameProvider>
  )

  const grid = container.getElementsByClassName('grid')

  expect(grid[0]).toBeInTheDocument()
})
