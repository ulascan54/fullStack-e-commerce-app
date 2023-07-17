import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Signin from "./pages/Auth/Signin"
import Signup from "./pages/Auth/Signup"
import Products from "./pages/Products"
function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div id="content">
          <Routes>
            <Route path="/" exact element={<Products />} />
            <Route path="/signin" exact element={<Signin />} />
            <Route path="/signup" exact element={<Signup />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
