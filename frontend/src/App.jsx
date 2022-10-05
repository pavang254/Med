import Main from "./components/Main"
import Navbar from "./components/Navbar"
import AddNew from "./components/AddNew"
import Edit from "./components/Edit"
import {Routes, Route, Link} from "react-router-dom"

function App() {

  return (
    <div className="App">
      <Link style={{textDecoration: 'none'}} to='/'>
        <Navbar />
      </Link>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='create/' element={<AddNew />} />
        <Route path='edit/' element={<Edit />} />
      </Routes>
    </div>
  )
}

export default App
