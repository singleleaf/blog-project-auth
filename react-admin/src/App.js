/* eslint-disable react/react-in-jsx-scope */

import './App.less'
import { BrowserRouter as Router } from 'react-router-dom'
import Index from './pages/index'

function App() {
  return (
    <Router>
      <Index />
    </Router>
  )
}

export default App
