import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import AuthProvider from "./pages/auth/AuthProvider"
import Login from "./pages/auth/Login"
import Cart from "./pages/Cart"


function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<AuthProvider />} >
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
