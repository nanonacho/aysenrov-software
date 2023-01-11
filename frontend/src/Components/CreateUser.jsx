import axios from "axios"
import { useRef, useState } from "react"

function CreateUser(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const [user, setUser] = useState({})
    
    const rut = useRef(null)
    const name = useRef(null)
    const lastname = useRef(null)
    const email = useRef(null)
    const password = useRef(null)
    const role = useRef(null)

    const resetForm = () => {
        rut.current.value = ""
        name.current.value = ""
        lastname.current.value = ""
        email.current.value = ""
        password.current.value = ""
        role.current.value = ""
    }

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value.trim()
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        axios.post("http://localhost:4000/auth/register", user)
        .then(res => {
            setIsLoading(false)
            setError(false)
            props.handleReload()
            console.log(res)
        })
        .catch(error => {
            console.log(error)
            setIsLoading(false)
            setError(true)
            console.error("Error al crear usuario")
        })
        resetForm()
        setUser({})
    }

    const handleClose = () => {
        setIsLoading(false)
        setError(null)
        setUser({})
        resetForm()
    }

    return (
    <div className="d-flex ">
        <button data-bs-toggle="modal" data-bs-target="#addmodal" className="btn btn-info" >Crear Usuario</button>
            <div className="modal fade" id="addmodal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Crear Usuario</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                        </div>
                        <div className="modal-body">
                        {error === true && (
                                <div className="alert alert-danger" role="alert"> Error al crear usuario! </div>
                        ) 
                        }
                        {      
                        error === false && (
                            <div className="alert alert-primary" role="alert"> Usuario Creado</div>
                        )
                        }
                        <form onSubmit={handleSubmit}>
                            <div className="form-group pt-3">
                                <label>Rut</label>
                                <input type="text" ref={rut} onChange={handleChange} name="rut" className="form-control" placeholder="Ingresa el rut (con guión y sin puntos                                                      )" />
                            </div>
                            <div className="form-group pt-3">
                                <label>Nombre</label>
                                <input type="text" ref={name} onChange={handleChange} name="name" defaultValue="" className="form-control" placeholder="Ingresa el nombre" />
                            </div>
                            <div className="form-group pt-3">
                                <label>Apellido</label>
                                <input type="text" ref={lastname} onChange={handleChange} defaultValue="" name="lastname" className="form-control" placeholder="Ingresa el apellido"/>
                            </div>
                            <div className="form-group pt-3">
                                <label>Email</label>
                                <input type="email" ref={email} onChange={handleChange} defaultValue="" name="email" className="form-control" placeholder="Ingresa el email"/>
                            </div>
                            <div className="form-group pt-3">
                                <label>Contraseña</label>
                                <input type="password" ref={password} onChange={handleChange} defaultValue="" name="password" className="form-control" placeholder="Ingresa la contraseña"/>
                            </div>
                            <div className="form-group pt-3">
                                <label>Permisos</label>
                                <select name="role" ref={role} className="form-select" aria-label="Default select example" onChange={handleChange}>
                                    <option> Seleccione una opción</option>
                                    <option value={1111}>Administrador</option>
                                    <option value={2222}>Recursos Humanos</option>
                                    <option value={3333}>Finanzas</option>
                                </select>
                            </div>
                        </form>
                        </div>
                        <div className="modal-footer">
                            { isLoading ? ( 
                                <div>
                                    <button type="button" className="btn btn-secondary" disabled>Cancelar</button>
                                    <button type="button" className="btn btn-info">
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        Crear
                                    </button>
                                </div>
                                ) : (
                                error === null ? (
                                    <div>
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>Cancelar</button>
                                        <button type="button" onClick={handleSubmit} className="btn btn-info">Crear</button>
                                    </div>
                                    ) : (
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>Cerrar</button>
                                        )
                                        ) 
                            }
                        </div>
                    </div>
                </div>
            </div>
    </div>
    )
}

export default CreateUser