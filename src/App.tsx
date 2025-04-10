import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import Home from './pages/HOME/Home'
import { paths } from './path/path'

function App() {

  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path={paths.HOME} element={<Home />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>

  )
}

export default App
