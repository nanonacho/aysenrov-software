import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../Auth/auth"
import Logo  from "../Images/aysen-rov.png"

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
                <Link className="navbar-brand" to=""> 
                    <img src={Logo} width="60" height="60" class="d-inline-block align-top" alt=""/>
                </Link>
                <Link className="navbar-brand" to=""> 
                    Aysen Rov 
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarScroll">
                    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" >
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="">Inicio</Link>
                        </li>
                    
                    {auth?.user?.role === 1111 && (
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="users">Usuarios</Link>
                        </li>
                    )}
                    {auth?.user?.role === 1111 && (
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="employees">Trabajadores</Link>
                        </li>
                    )}
                    {auth?.user?.role === 1111 && (
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="contracts">Contratos</Link>
                        </li>
                    )}
                    </ul>
                    {auth.user && (
                        <form className="d-flex">
                            <button onClick={handleLogout} className="btn btn-outline-dark me-2">Cerrar Sesión</button>
                        </form>
                    )}
                    {!auth.user && (
                        <form className="d-flex">
                            <Link className="btn btn btn-outline-success" to="login" type="button">Iniciar Sesión</Link>
                        </form>
                    )}
                </div>
            </div>
        </nav>    
    )
}

export default Header