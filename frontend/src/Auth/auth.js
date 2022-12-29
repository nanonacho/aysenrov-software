import { useEffect } from "react"
import { useState, createContext, useContext } from "react"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    // Store user data to local storage
    const login = user => {
        setUser(user)
        localStorage.setItem("user", JSON.stringify(user))
    }

    // Remove user data in local storage
    const logout = () => {
        setUser(null)
        localStorage.setItem("user", null)
    } 

    // Persist "user" data when reload the page
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")));
      }, [])

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => { return useContext(AuthContext) }