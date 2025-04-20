import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import Home from './pages/HOME/Home'
import { paths } from './path/path'
import Auction from './pages/AUCTION/Auction'
import Auctions from './pages/AUCTIONS/Auctions'
import BuyValueSell from './pages/BUYVALUESELL/BuyValueSell'
import Results from './pages/RESULTS/Results'
import Register from './pages/AUTH/Register'
import Profile from './pages/PROFILE/Profile'
import ProfileOutlet from './layout/ProfileOutlet'

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path={paths.HOME} element={<Home />} />
          <Route path={paths.AUCTION} element={<Auction />} />
          <Route path={paths.AUCTIONS} element={<Auctions />} />
          <Route path={paths.RESULT} element={<Results />} />
          <Route path={paths.BVS} element={<BuyValueSell />} />
          <Route path={paths.REGISTER} element={<Register />} />
          {/* <Route path={paths.PROFILE} element={<Profile />} /> */}

          <Route element={<ProfileOutlet />}>
            <Route
              path={paths.PROFILE}
              element={
                // <Suspense fallback={<Preloader />}>
                  <Profile />
                // </Suspense>
              }
            />
          </Route>
        </Routes>
      </AppLayout>

      
    </BrowserRouter>

  )
}

export default App
