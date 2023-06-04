
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Landing'
import Layout from './components/Layout'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />}/> 
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
    </Route>
      
  ))

  return (
    <RouterProvider router={router}/>
  )
}

export default App