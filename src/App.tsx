import { Board, Header } from './components'
import styles from './App.module.scss'

function App () {
  return (
    <div className={styles.App}>
      <Header />
      <Board />
    </div>
  )
}

export default App
