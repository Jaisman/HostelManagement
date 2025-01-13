import Login from './components/Login/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home/Home';
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
