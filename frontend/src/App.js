import "bootswatch/dist/flatly/bootstrap.min.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./Auth/auth"
import { IndexPage, LoginPage } from "./Routes/IndexRoutes"
import Header from "./Components/Header"
import ProtectedRoutes from "./Components/ProtectedRoutes"

function App() {
  return (
    <Router>
      <div className="container">
        <AuthProvider>
          <Header></Header>
          <Routes>
            <Route path="/" element={ <IndexPage/> } />
            <Route element={<ProtectedRoutes allowedRoles={["admin"]}/>}>
              <Route path="/login" element={ <LoginPage/> } />
            </Route> 
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  )
}

export default App
