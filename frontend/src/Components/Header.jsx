import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../Auth/auth"

function Header() {
    const auth = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        auth.logout()
        navigate("/")
    }

    return (
        <nav className="navbar navbar-expand-lg bg-secundary" >
            <div className="container-fluid">
                <Link className="navbar-brand" to=""> Aysen Rov </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarScroll">
                    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" >
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="">Inicio</Link>
                        </li>
                    
                    {!auth.user && (
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="users">Usuarios</Link>
                        </li>
                    )}
                    </ul>
                    {auth.user && (
                        <form className="d-flex">
                            <button onClick={handleLogout} className="btn btn-outline-dark me-2">Sign Out</button>
                        </form>
                    )}
                    {!auth.user && (
                        <form className="d-flex">
                            <Link className="btn btn-outline-dark me-2" to="register" type="button">Sign Up</Link>
                            <Link className="btn btn btn-outline-success" to="login" type="button">Sign In</Link>
                        </form>
                    )}
                </div>
            </div>
        </nav>    
    )
}

export default Header