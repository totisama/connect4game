import { render, screen } from '@testing-library/react'
import Header from './Header'
import { GameProvider } from '../../context/game'
import { GameState } from '../../types.d'
// import { useGameState } from '../../hooks'

test('Header doesnt renders anything', () => {
  render(
    <GameProvider>
      <Header />
    </GameProvider>
  )

  const codeMessage = screen.queryAllByAltText(/Connect4 logo/i)
  expect(codeMessage).toHaveLength(0)
})

test('Header renders Connect logo when state is playing', () => {
  render(
    <GameProvider defaultValues={{ gameState: GameState.Playing }}>
      <Header />
    </GameProvider>
  )

  const codeMessage = screen.getByAltText(/Connect4 logo/i)
  expect(codeMessage).toBeInTheDocument()
})

test('Header renders Connect logo when state is Win', () => {
  render(
    <GameProvider defaultValues={{ gameState: GameState.Win }}>
      <Header />
    </GameProvider>
  )

  const codeMessage = screen.getByAltText(/Connect4 logo/i)
  expect(codeMessage).toBeInTheDocument()
})

test('Header renders Connect logo when state is Tie', () => {
  render(
    <GameProvider defaultValues={{ gameState: GameState.Tie }}>
      <Header />
    </GameProvider>
  )

  const codeMessage = screen.getByAltText(/Connect4 logo/i)
  expect(codeMessage).toBeInTheDocument()
})
