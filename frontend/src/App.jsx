import Home from "./components/Home"
import Outpass from "./components/outpass/Outpass"
import Login from "./components/Login/Login"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Profile from "./components/profile/Profile"
import Gh2 from './components/Gh2/Gh2';
import ProtectedRoute from "./components/ProtectedRoute"
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={
          <ProtectedRoute>
          <Home/>
          </ProtectedRoute>
          }/>
        <Route path="/outpass" element={
          <ProtectedRoute>
          <Outpass/>
          </ProtectedRoute>
          }/>
        <Route path="/" element={<Login/>}/>
        <Route path="/profile" element={
          <ProtectedRoute>
          <Profile/>
          </ProtectedRoute>
          }/>
        <Route path="/gh2" element={
          <ProtectedRoute>
          <Gh2/>
          </ProtectedRoute>
          }/>
        
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
