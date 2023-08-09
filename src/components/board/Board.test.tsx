import { render, screen } from '@testing-library/react'
import Board from './Board'
import { GameProvider } from '../../context/game'
import { GameState } from '../../types.d'

test('Board renders default image', () => {
  render(
    <GameProvider>
      <Board />
    </GameProvider>
  )

  const image = screen.getByAltText(/Connect4 logo/i)

  expect(image).toBeInTheDocument()
})

test('Menu parent is present', () => {
  const { container } = render(
    <GameProvider>
      <Board />
    </GameProvider>
  )

  const menuParent = container.getElementsByClassName('initialMenu')

  expect(menuParent[0]).toBeInTheDocument()
})

describe('While state is playing', () => {
  it('Grid is present', () => {
    const { container } = render(
      <GameProvider defaultValues={{ gameState: GameState.Playing }}>
        <Board />
      </GameProvider>
    )

    const grid = container.getElementsByClassName('grid')

    expect(grid[0]).toBeInTheDocument()
  })

  it('Menu parent style is playingMenu', () => {
    const { container } = render(
      <GameProvider defaultValues={{ gameState: GameState.Playing }}>
        <Board />
      </GameProvider>
    )

    const menuParent = container.getElementsByClassName('playingMenu')

    expect(menuParent[0]).toBeInTheDocument()
  })
})

describe('While game is Finished', () => {
  it('FinishModal is present when Win', () => {
    const { container } = render(
      <GameProvider defaultValues={{ gameState: GameState.Win }}>
        <Board />
      </GameProvider>
    )

    const finishContainer = container.getElementsByClassName('finishContainer')

    expect(finishContainer[0]).toBeInTheDocument()
  })

  it('FinishModal is present when Tie', () => {
    const { container } = render(
      <GameProvider defaultValues={{ gameState: GameState.Tie }}>
        <Board />
      </GameProvider>
    )

    const finishContainer = container.getElementsByClassName('finishContainer')

    expect(finishContainer[0]).toBeInTheDocument()
  })
})
