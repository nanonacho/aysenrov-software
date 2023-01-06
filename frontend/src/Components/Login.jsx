import { useState } from "react"
import axios from "axios"
import { useAuth } from "../Auth/auth"
import { useNavigate } from "react-router-dom"

function Login() {
    const [userData, setUserData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const auth = useAuth()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)  
        axios.post("http://localhost:4000/auth/login", userData)
        .then(res => {
            setIsLoading(false)
            console.log(res)
            auth.login({email: userData.email, token: res.data.data.token, role: res.data.data.role})
            navigate("/")
        })
        .catch(error => {
            setIsLoading(false)
            setError(true)
            setUserData({
                ...userData,
                "password": ""
            })
            console.error("Error al iniciar sesión")
        })
    }

    return (
        <div className="container p-5">
            <div className="row justify-content-center">
                <aside className="col-sm-4">
                    <div className="card">
                        <article className="card-body">
                            <h4 className="card-title text-center mb-4 mt-1">Sign in</h4>
                            <hr/>
                            <form>
                                
                                { error ? (
                                <div className="alert alert-danger" role="alert"> Error al iniciar sesión! </div>
                                ) : (
                                <div/>    
                                )
                                }

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input onChange={handleChange} type="email" className="form-control" name="email" id="email" placeholder="name@example.com" required/>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Contraseña</label>
                                    <input onChange={handleChange} value={userData.password} type="password" className="form-control" name="password" id="password" placeholder="*********" required/>
                                </div>

                                <div className="form-group">
                                    
                                    { isLoading ? ( 
                                    <button class="btn btn-primary" type="button" disabled>
                                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        Iniciar Sesión
                                    </button>
                                    ) : (
                                    <button onClick={handleSubmit} className="btn btn-primary btn-block"> Iniciar Sesión  </button>
                                    ) 
                                    }

                                </div>
                                
                            </form>
                        </article>
                    </div> 
                </aside>
            </div>
        </div>
        )
}

export default Login