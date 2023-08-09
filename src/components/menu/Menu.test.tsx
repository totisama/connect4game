import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Menu from './Menu'
import { GameProvider } from '../../context/game'
import { GameState } from '../../types.d'

// This is to avoid an error that structuredClone is not defined
global.structuredClone = (val) => JSON.parse(JSON.stringify(val))

describe('The elements are shown depending of the gameState value', () => {
  it('Start button is present when gameState is start ', () => {
    const { container } = render(
      <GameProvider>
        <Menu />
      </GameProvider>
    )

    const startButton = container.getElementsByClassName('startButton')

    expect(startButton[0]).toBeInTheDocument()
  })

  it('Game Mode buttons are present when gameState is Gamemode ', () => {
    const { container } = render(
      <GameProvider defaultValues={{ gameState: GameState.GameMode }}>
        <Menu />
      </GameProvider>
    )

    const pvpButton = container.getElementsByClassName('pvpButton')
    const pveButton = container.getElementsByClassName('pveButton')

    expect(pvpButton[0]).toBeInTheDocument()
    expect(pveButton[0]).toBeInTheDocument()
  })

  it('Color buttons are present when gameState is Color ', () => {
    const { container } = render(
      <GameProvider defaultValues={{ gameState: GameState.Color }}>
        <Menu />
      </GameProvider>
    )

    const colors = container.getElementsByClassName('color')

    expect(colors.length).toBe(10)
  })

  it('Players info and buttons are present when gameState is Playing ', () => {
    const { container } = render(
      <GameProvider defaultValues={{ gameState: GameState.Playing }}>
        <Menu />
      </GameProvider>
    )

    const buttons = container.getElementsByClassName('smallMenuButton')
    const playerTurnText = screen.getByText('Player Turn')
    const scoreText = screen.getByText('Score: 0')

    expect(buttons.length).toBe(2)
    expect(playerTurnText).toBeInTheDocument()
    expect(scoreText).toBeInTheDocument()
  })
})

test('When a color is selected, it is removed from the list', () => {
  const { container } = render(
    <GameProvider defaultValues={{ gameState: GameState.Color }}>
      <Menu />
    </GameProvider>
  )

  const colors = container.getElementsByClassName('color')
  const colorsAmount = colors.length

  userEvent.click(colors[0])

  const colorsAfterClick = container.getElementsByClassName('color')
  expect(colorsAfterClick.length).toBe(colorsAmount - 1)
})
