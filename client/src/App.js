import "./App.css"
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Signin from "./pages/Auth/Signin"
import Signup from "./pages/Auth/Signup"
function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div id="content">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/signin" exact element={<Signin />} />
            <Route path="/signup" exact element={<Signup />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

function Home() {
  return <h1>Home</h1>
}

export default App
