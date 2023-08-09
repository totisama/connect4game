export enum GameState {
  Start = 'START',
  GameMode = 'GAME_MODE',
  Color = 'COLOR',
  Playing = 'PLAYING',
  Win = 'WIN',
  Tie = 'TIE'
}

export enum GameMode {
  PvP = 'PLAYER_VS_PLAYER',
  PvE = 'PLAYER_VS_ENVIRONMENT'
}

export interface GameProps {
  children: ReactNode
  defaultValues?: ContextDefaultValues
}

interface ContextDefaultValues {
  gameState?: GameState
  winner?: Move
}

export interface GameContext {
  gameState: GameState
  changeGameState: (newState: GameState) => void
  gameMode: GameMode | null
  selectGameMode: (gameMode: GameMode) => void
  gameBoard: GameBoard | []
  addNewMovement: (move: Move, columnNumber: number) => void
  resetGame: (newState: GameState) => void
  turn: Move
  changeTurn: () => void
  players: Players
  setPlayerInfo: ({ player, key, value }: PlayerInfo) => void
  colors: ColorsType
  setColorsOptions: (newColors: ColorsType) => void
  winner: Move
}

export interface MoveProps {
  move: Move
}

export interface Players {
  P1: Player
  P2: Player
}

interface Player {
  color: Color
  score: number
}

export interface PlayerInfo {
  player: Move
  key: 'color' | 'score'
  value: Color | number
}

export type ColorsType = Record<string, Color>
type Color = `#${string}`
type Move = 'P1' | 'P2' | null
type Column = [Move, Move, Move, Move, Move, Move]

export type GameBoard = [Column | [], Column | [], Column | [], Column | [], Column | [], Column | [], Column | []]
