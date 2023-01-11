import "bootswatch/dist/flatly/bootstrap.min.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./Auth/auth"
import { Employees, IndexPage, LoginPage, Users } from "./Routes/IndexRoutes"
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
            <Route element={<ProtectedRoutes noAuth={true} />}>
              <Route path="/login" element={ <LoginPage/> } />
            </Route>
            <Route element={<ProtectedRoutes allowedRoles={[1111]}/>}>
              <Route path="/users" element={ <Users/> } />
            </Route>
            <Route element={<ProtectedRoutes allowedRoles={[1111]}/>}>
              <Route path="/employees" element={ <Employees/> } />
            </Route> 
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  )
}

export default App
